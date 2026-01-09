// ==========================================
// BASIC TRANSACTION (Money Transfer)
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function basicTransaction() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const accounts = db.collection("accounts");

    await accounts.deleteMany({});

    // Setup initial accounts
    await accounts.insertMany([
      { accountId: "A001", owner: "Alice", balance: 1000 },
      { accountId: "A002", owner: "Bob", balance: 500 }
    ]);

    console.log("=== INITIAL BALANCES ===");
    const initial = await accounts.find({}).toArray();
    initial.forEach(a => console.log(`${a.owner}: $${a.balance}`));

    // TRANSACTION: Transfer Money
    console.log("\n=== MONEY TRANSFER TRANSACTION ===");
    const session = client.startSession();

    try {
      await session.withTransaction(async () => {
        // Step 1: Deduct from Alice
        await accounts.updateOne(
          { accountId: "A001" },
          { $inc: { balance: -200 } },
          { session }
        );

        // Step 2: Add to Bob
        await accounts.updateOne(
          { accountId: "A002" },
          { $inc: { balance: 200 } },
          { session }
        );

        console.log("✅ Transferred $200 from Alice to Bob");
      });

    } catch (error) {
      console.error("❌ Transaction failed:", error.message);
    } finally {
      await session.endSession();
    }

    // Check final balances
    console.log("\n=== FINAL BALANCES ===");
    const final = await accounts.find({}).toArray();
    final.forEach(a => console.log(`${a.owner}: $${a.balance}`));

    // BENEFITS
    console.log("\n=== BENEFITS OF TRANSACTIONS ===");
    console.log("✅ Atomicity: All-or-nothing");
    console.log("✅ Consistency: Valid state maintained");
    console.log("✅ Isolation: No interference");
    console.log("✅ Durability: Changes are permanent");

    console.log("\n✅ Basic Transaction Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

basicTransaction();

// NOTE: Transactions require MongoDB Replica Set
