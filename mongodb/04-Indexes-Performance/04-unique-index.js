// ==========================================
// UNIQUE INDEX
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function uniqueIndexExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const users = db.collection("users");

    // Clean up
    await users.deleteMany({});

    // CREATE unique index
    console.log("=== CREATE UNIQUE INDEX ===");
    await users.createIndex({ email: 1 }, { unique: true });
    console.log("✅ Created unique index on email");

    // Insert first user
    console.log("\n=== INSERT USER ===");
    await users.insertOne({ name: "Alice", email: "alice@example.com" });
    console.log("✅ Inserted Alice");

    // Try to insert duplicate
    console.log("\n=== TRY DUPLICATE EMAIL ===");
    try {
      await users.insertOne({ name: "Bob", email: "alice@example.com" });
    } catch (error) {
      console.log("❌ Duplicate prevented:", error.message.includes("duplicate"));
    }

    // Insert with different email (success)
    console.log("\n=== INSERT WITH UNIQUE EMAIL ===");
    await users.insertOne({ name: "Bob", email: "bob@example.com" });
    console.log("✅ Inserted Bob with unique email");

    // Compound unique index
    console.log("\n=== COMPOUND UNIQUE INDEX ===");
    const products = db.collection("products");
    await products.deleteMany({});
    
    await products.createIndex({ name: 1, category: 1 }, { unique: true });
    console.log("✅ Created compound unique index on name + category");

    // These are allowed (different combinations)
    await products.insertOne({ name: "Laptop", category: "Electronics" });
    await products.insertOne({ name: "Laptop", category: "Gaming" }); // Same name, different category
    await products.insertOne({ name: "Mouse", category: "Electronics" }); // Different name, same category
    console.log("✅ Inserted 3 products with unique combinations");

    // This will fail (duplicate combination)
    try {
      await products.insertOne({ name: "Laptop", category: "Electronics" });
    } catch (error) {
      console.log("❌ Duplicate combination prevented");
    }

    // Partial unique index
    console.log("\n=== PARTIAL UNIQUE INDEX ===");
    const accounts = db.collection("accounts");
    await accounts.deleteMany({});
    
    await accounts.createIndex(
      { username: 1 },
      { 
        unique: true,
        partialFilterExpression: { status: "active" }
      }
    );
    console.log("✅ Created partial unique index (active accounts only)");

    // Multiple inactive accounts with same username (allowed)
    await accounts.insertOne({ username: "john", status: "inactive" });
    await accounts.insertOne({ username: "john", status: "inactive" });
    console.log("✅ Allowed duplicate usernames for inactive accounts");

    // But active must be unique
    await accounts.insertOne({ username: "alice", status: "active" });
    try {
      await accounts.insertOne({ username: "alice", status: "active" });
    } catch (error) {
      console.log("❌ Duplicate active username prevented");
    }

    // List unique indexes
    console.log("\n=== LIST UNIQUE INDEXES ===");
    const userIndexes = await users.indexes();
    userIndexes.forEach(idx => {
      if (idx.unique) {
        console.log(`- ${JSON.stringify(idx.key)} (unique)`);
      }
    });

    console.log("\n✅ Unique Index Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

uniqueIndexExamples();
