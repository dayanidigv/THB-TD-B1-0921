// ==========================================
// SORTING & LIMITING
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function sortingLimiting() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const users = db.collection("users");

    // Setup sample data
    await users.deleteMany({});
    await users.insertMany([
      { name: "Alice", age: 25, salary: 50000 },
      { name: "Bob", age: 30, salary: 60000 },
      { name: "Charlie", age: 35, salary: 75000 },
      { name: "Diana", age: 28, salary: 55000 },
      { name: "Eve", age: 32, salary: 80000 }
    ]);

    // SORT ASCENDING (1)
    console.log("=== SORT ASCENDING ===");
    const sortedAsc = await users.find({}).sort({ age: 1 }).toArray();
    console.log("By age (asc):", sortedAsc.map(u => `${u.name}(${u.age})`));

    // SORT DESCENDING (-1)
    console.log("\n=== SORT DESCENDING ===");
    const sortedDesc = await users.find({}).sort({ salary: -1 }).toArray();
    console.log("By salary (desc):", sortedDesc.map(u => `${u.name}($${u.salary})`));

    // MULTIPLE SORT FIELDS
    console.log("\n=== MULTIPLE SORT FIELDS ===");
    const multiSort = await users.find({}).sort({ age: -1, name: 1 }).toArray();
    console.log("By age desc, then name asc:", multiSort.map(u => `${u.name}(${u.age})`));

    // LIMIT
    console.log("\n=== LIMIT ===");
    const top3 = await users.find({}).sort({ salary: -1 }).limit(3).toArray();
    console.log("Top 3 earners:", top3.map(u => `${u.name}($${u.salary})`));

    // SKIP (Offset)
    console.log("\n=== SKIP ===");
    const skip2 = await users.find({}).sort({ name: 1 }).skip(2).toArray();
    console.log("Skip first 2:", skip2.map(u => u.name));

    // PAGINATION (Skip + Limit)
    console.log("\n=== PAGINATION ===");
    const pageSize = 2;
    
    // Page 1
    const page1 = await users.find({}).sort({ name: 1 }).skip(0).limit(pageSize).toArray();
    console.log("Page 1:", page1.map(u => u.name));
    
    // Page 2
    const page2 = await users.find({}).sort({ name: 1 }).skip(pageSize * 1).limit(pageSize).toArray();
    console.log("Page 2:", page2.map(u => u.name));
    
    // Page 3
    const page3 = await users.find({}).sort({ name: 1 }).skip(pageSize * 2).limit(pageSize).toArray();
    console.log("Page 3:", page3.map(u => u.name));

    // COUNT TOTAL (for pagination)
    const totalUsers = await users.countDocuments();
    const totalPages = Math.ceil(totalUsers / pageSize);
    console.log(`\nTotal users: ${totalUsers}, Total pages: ${totalPages}`);

    console.log("\n✅ Sorting & Limiting Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

sortingLimiting();
