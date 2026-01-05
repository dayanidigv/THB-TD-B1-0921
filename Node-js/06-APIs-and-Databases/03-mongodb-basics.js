// ==========================================
// MONGODB BASICS
// ==========================================

// Install: npm install mongodb
// Start MongoDB: mongod

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!\n");

    const db = client.db("nodejs_db");
    const users = db.collection("users");

    // 1. Insert
    const user = { name: "Alice", age: 25, email: "alice@example.com" };
    const result = await users.insertOne(user);
    console.log("1. Inserted:", result.insertedId);

    // 2. Find All
    const allUsers = await users.find({}).toArray();
    console.log("\n2. All users:", allUsers.length);

    // 3. Find One
    const foundUser = await users.findOne({ name: "Alice" });
    console.log("\n3. Found:", foundUser?.name);

    // 4. Update
    await users.updateOne(
      { name: "Alice" },
      { $set: { age: 26 } }
    );
    console.log("\n4. Updated age");

    // 5. Delete
    await users.deleteOne({ name: "Alice" });
    console.log("\n5. Deleted user");

    console.log("\n✅ Done!");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await client.close();
  }
}

main();
