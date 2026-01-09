// ==========================================
// COMPARISON OPERATORS
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function comparisonOperators() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const users = db.collection("users");

    // Setup sample data
    await users.deleteMany({});
    await users.insertMany([
      { name: "Alice", age: 25, city: "NYC", salary: 50000 },
      { name: "Bob", age: 30, city: "LA", salary: 60000 },
      { name: "Charlie", age: 35, city: "NYC", salary: 75000 },
      { name: "Diana", age: 28, city: "Chicago", salary: 55000 },
      { name: "Eve", age: 32, city: "LA", salary: 80000 }
    ]);

    console.log("=== (Equal) ===");
    const age28 = await users.find({ age: 28 }).toArray();
    console.log("Age = 28:", age28.map(u => `${u.name}(${u.age})`));

    // $gt (Greater Than)
    console.log("=== $gt (Greater Than) ===");
    const over30 = await users.find({ age: { $gt: 30 } }).toArray();
    console.log("Age > 30:", over30.map(u => `${u.name}(${u.age})`));

    // $gte (Greater Than or Equal)
    console.log("\n=== $gte (Greater Than or Equal) ===");
    const gte30 = await users.find({ age: { $gte: 30 } }).toArray();
    console.log("Age >= 30:", gte30.map(u => `${u.name}(${u.age})`));

    // $lt (Less Than)
    console.log("\n=== $lt (Less Than) ===");
    const under30 = await users.find({ age: { $lt: 30 } }).toArray();
    console.log("Age < 30:", under30.map(u => `${u.name}(${u.age})`));

    // $lte (Less Than or Equal)
    console.log("\n=== $lte (Less Than or Equal) ===");
    const lte30 = await users.find({ age: { $lte: 30 } }).toArray();
    console.log("Age <= 30:", lte30.map(u => `${u.name}(${u.age})`));

    // $ne (Not Equal)
    console.log("\n=== $ne (Not Equal) ===");
    const notNYC = await users.find({ city: { $ne: "NYC" } }).toArray();
    console.log("Not NYC:", notNYC.map(u => `${u.name} (${u.city})`));

    // $in (In Array)
    console.log("\n=== $in (In Array) ===");
    const nycOrLA = await users.find({ city: { $in: ["NYC", "LA"] } }).toArray();
    console.log("NYC or LA:", nycOrLA.map(u => `${u.name} (${u.city})`));

    // $nin (Not In Array)
    console.log("\n=== $nin (Not In Array) ===");
    const notNycLA = await users.find({ city: { $nin: ["NYC", "LA"] } }).toArray();
    console.log("Not NYC or LA:", notNycLA.map(u => `${u.name} (${u.city})`));

    // Range Query
    console.log("\n=== RANGE QUERY ===");
    const ageRange = await users.find({ 
      age: { $gte: 25, $lte: 32 } 
    }).toArray();
    console.log("Age 25-32:", ageRange.map(u => `${u.name}(${u.age})`));
    

    console.log("\n✅ Comparison Operators Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

comparisonOperators();
