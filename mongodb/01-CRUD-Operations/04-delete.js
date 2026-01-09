// ==========================================
// DELETE - Remove Operations
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function deleteExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const products = db.collection("products");

    // Setup sample data
    await products.deleteMany({});
    await products.insertMany([
      { name: "Laptop", price: 999, category: "Electronics", inStock: true },
      { name: "Mouse", price: 25, category: "Electronics", inStock: true },
      { name: "Keyboard", price: 50, category: "Electronics", inStock: false },
      { name: "Desk", price: 200, category: "Furniture", inStock: true },
      { name: "Chair", price: 150, category: "Furniture", inStock: true },
      { name: "Monitor", price: 300, category: "Electronics", inStock: false }
    ]);

    console.log("Starting with", await products.countDocuments(), "products\n");

    // 🗑️ DELETE ONE
    console.log("=== DELETE ONE ===");
    const deleteOne = await products.deleteOne({ name: "Keyboard" });
    console.log("Deleted Count:", deleteOne.deletedCount);
    console.log("Remaining:", await products.countDocuments());

    // 🗑️ DELETE MANY
    console.log("\n=== DELETE MANY ===");
    const deleteMany = await products.deleteMany({ category: "Furniture" });
    console.log("Deleted Count:", deleteMany.deletedCount);
    console.log("Remaining:", await products.countDocuments());

    // 🗑️ DELETE WITH CONDITION
    console.log("\n=== DELETE WITH CONDITION ===");
    const deleteCondition = await products.deleteMany({ inStock: false });
    console.log("Deleted out of stock items:", deleteCondition.deletedCount);
    console.log("Remaining:", await products.countDocuments());

    // 📋 LIST REMAINING
    console.log("\n=== REMAINING PRODUCTS ===");
    const remaining = await products.find({}).toArray();
    remaining.forEach(p => console.log(`- ${p.name}: $${p.price}`));

    // 🗑️ DELETE ALL (use with caution!)
    console.log("\n=== DELETE ALL ===");
    const deleteAll = await products.deleteMany({});
    console.log("Deleted all:", deleteAll.deletedCount);
    console.log("Final count:", await products.countDocuments());

    console.log("\n✅ Delete Examples Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

deleteExamples();
