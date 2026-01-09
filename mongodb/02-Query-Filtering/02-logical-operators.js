// ==========================================
// LOGICAL OPERATORS
// ==========================================

const { MongoClient } = require("mongodb");


const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function logicalOperators() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const users = db.collection("users");

    // Setup sample data
    await users.deleteMany({});
    await users.insertMany([
      { name: "Alice", age: 25, city: "NYC", salary: 50000, active: true },
      { name: "Bob", age: 30, city: "LA", salary: 60000, active: false },
      { name: "Charlie", age: 35, city: "NYC", salary: 75000, active: true },
      { name: "Diana", age: 28, city: "Chicago", salary: 55000, active: true },
      { name: "Eve", age: 32, city: "LA", salary: 80000, active: true }
    ]);

    // AND (implicit)
    console.log("=== AND (Implicit) ===");
    const nycAndActive = await users.find({
      city: "NYC",
      active: true
    }).toArray();
    console.log("NYC & Active:", nycAndActive.map(u => u.name));

    // $or
    console.log("\n=== $or ===");
    const nycOrHighSalary = await users.find({
      $or: [
        { city: "NYC" },
        { salary: { $gt: 70000 } }
      ]
    }).toArray();
    console.log("NYC or Salary > 70k:", nycOrHighSalary.map(u => u.name));

    // $and (explicit)
    console.log("\n=== $and (Explicit) ===");
    const explicitAnd = await users.find({
      $and: [
        { age: { $gte: 30 } },
        { age: { $lt : 35 } },
        { salary: { $gte: 60000 } }
      ]
    }).toArray();
    console.log("Age >= 30 AND Salary >= 60k:", explicitAnd.map(u => u.name));

    // $not
    console.log("\n=== $not ===");
    const notOver30 = await users.find({
      age: { $not: { $gt: 30 } }
    }).toArray();
    console.log("Not > 30:", notOver30.map(u => `${u.name}(${u.age})`));

    // $nor (Neither/Nor)
    console.log("\n=== $nor ===");
    const norExample = await users.find({
      $nor: [
        { city: "NYC" },
        { age: { $gt: 30 } }
      ]
    }).toArray();
    console.log("Not NYC and Not > 30:", norExample.map(u => u.name));

    // Complex combination
    console.log("\n=== COMPLEX COMBINATION ===");
    const complex = await users.find({
      $and: [
        { active: true },
        {
          $or: [
            { city: "NYC" },
            { salary: { $gt : 70000 } }
          ]
        }
      ]
    }).toArray();
    console.log("Active AND (NYC OR Salary >= 70k):", complex.map(u => u.name));

    console.log("\n✅ Logical Operators Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

logicalOperators();
