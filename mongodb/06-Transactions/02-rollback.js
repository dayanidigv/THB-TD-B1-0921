// ==========================================
// TRANSACTION ROLLBACK
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function transactionRollback() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const accounts = db.collection("accounts");

    await accounts.deleteMany({});

    // Setup accounts
    await accounts.insertMany([
      { accountId: "A001", owner: "Alice", balance: 1000 },
      { accountId: "A002", owner: "Bob", balance: 500 }
    ]);

    console.log("=== INITIAL BALANCES ===");
    const initial = await accounts.find({}).toArray();
    initial.forEach(a => console.log(`${a.owner}: $${a.balance}`));

    // SCENARIO 1: Insufficient Funds
    console.log("\n=== ROLLBACK: INSUFFICIENT FUNDS ===");
    const session1 = client.startSession();

    try {
      await session1.withTransaction(async () => {
        // Try to transfer more than available
        const result = await accounts.updateOne(
          { accountId: "A002", balance: { $gte: 1000 } },
          { $inc: { balance: -1000 } },
          { session: session1 }
        );

        if (result.modifiedCount === 0) {
          throw new Error("Insufficient funds");
        }

        await accounts.updateOne(
          { accountId: "A001" },
          { $inc: { balance: 1000 } },
          { session: session1 }
        );
      });

    } catch (error) {
      console.log("❌ Transaction rolled back:", error.message);
    } finally {
      await session1.endSession();
    }

    // Verify no changes
    const afterRollback = await accounts.findOne({ accountId: "A002" });
    console.log(`Bob's balance unchanged: $${afterRollback.balance}`);

    // SCENARIO 2: Business Rule Violation
    console.log("\n=== ROLLBACK: BUSINESS RULE ===");
    const session2 = client.startSession();

    try {
      await session2.withTransaction(async () => {
        // Deduct from Alice
        await accounts.updateOne(
          { accountId: "A001" },
          { $inc: { balance: -100 } },
          { session: session2 }
        );

        // Check if Alice's balance goes below minimum
        const alice = await accounts.findOne(
          { accountId: "A001" },
          { session: session2 }
        );

        if (alice.balance < 100) {
          throw new Error("Balance cannot go below minimum $100");
        }

        // Add to Bob
        await accounts.updateOne(
          { accountId: "A002" },
          { $inc: { balance: 100 } },
          { session: session2 }
        );
      });

    } catch (error) {
      console.log("❌ Transaction rolled back:", error.message);
    } finally {
      await session2.endSession();
    }

    // SCENARIO 3: Partial Failure
    console.log("\n=== ROLLBACK: PARTIAL FAILURE ===");
    const session3 = client.startSession();

    try {
      await session3.withTransaction(async () => {
        // Multiple operations
        await accounts.updateOne(
          { accountId: "A001" },
          { $inc: { balance: -50 } },
          { session: session3 }
        );

        await accounts.updateOne(
          { accountId: "A002" },
          { $inc: { balance: 25 } },
          { session: session3 }
        );

        // Simulate error
        throw new Error("Network error occurred");

        // This won't execute
        await accounts.updateOne(
          { accountId: "A001" },
          { $inc: { balance: 25 } },
          { session: session3 }
        );
      });

    } catch (error) {
      console.log("❌ All changes rolled back:", error.message);
    } finally {
      await session3.endSession();
    }

    // Final state
    console.log("\n=== FINAL BALANCES (UNCHANGED) ===");
    const final = await accounts.find({}).toArray();
    final.forEach(a => console.log(`${a.owner}: $${a.balance}`));

    console.log("\n✅ Rollback Examples Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

transactionRollback();

// NOTE: All operations within a transaction are rolled back if any fails
