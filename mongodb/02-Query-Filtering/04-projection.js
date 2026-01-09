// ==========================================
// PROJECTION (Select Fields)
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function projectionExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const users = db.collection("users");

    // Setup sample data
    await users.deleteMany({});
    await users.insertMany([
      { name: "Alice", age: 25, email: "alice@example.com", salary: 50000, password: "secret123" },
      { name: "Bob", age: 30, email: "bob@example.com", salary: 60000, password: "pass456" },
      { name: "Charlie", age: 35, email: "charlie@example.com", salary: 75000, password: "pwd789" }
    ]);

    // INCLUDE SPECIFIC FIELDS
    console.log("=== INCLUDE SPECIFIC FIELDS ===");
    const namesOnly = await users.find({}, { projection: { name: 1, age: 1 } }).toArray();
    console.log("Names & Age:");
    console.log(namesOnly);

    // EXCLUDE _id
    console.log("\n=== EXCLUDE _id ===");
    const noId = await users.find({}, { projection: { name: 1, email: 1, _id: 0 } }).toArray();
    console.log("Without _id:");
    console.log(noId);

    // EXCLUDE SPECIFIC FIELDS
    console.log("\n=== EXCLUDE SPECIFIC FIELDS ===");
    const noPassword = await users.find({}, { projection: { password: 0 } }).toArray();
    console.log("Without password:");
    console.log(noPassword)

    // MULTIPLE EXCLUSIONS
    console.log("\n=== MULTIPLE EXCLUSIONS ===");
    const publicData = await users.find({}, { 
      projection: { password: 0, salary: 0 } 
    }).toArray();
    console.log("Public data only:");
    console.log(publicData);

    // PROJECTION WITH FILTER
    console.log("\n=== PROJECTION WITH FILTER ===");
    const filteredProjection = await users.find(
      { age: { $gte: 30 } },
      { projection: { name: 1, age: 1, _id: 0 } }
    ).toArray();
    console.log("Users 30+ (name & age only):");
    console.log(filteredProjection);

    // NESTED FIELD PROJECTION
    await users.updateOne(
      { name: "Alice" },
      { $set: { address: { city: "NYC", zip: "10001" } } }
    );
    
    console.log("\n=== NESTED FIELD PROJECTION ===");
    const nested = await users.findOne(
      { name: "Alice" },
      { projection: { name: 1, "address.city": 1, _id: 0 } }
    );
    console.log("Nested field:");
    console.log(nested);

    console.log("\n✅ Projection Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

projectionExamples();
