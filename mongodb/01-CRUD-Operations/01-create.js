// ==========================================
// CREATE - Insert Operations
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function createExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const products = db.collection("products");

    // 📝 INSERT ONE
    console.log("=== INSERT ONE ===");
    
    const product = {
      name: "Laptop",
      price: 999,
      category: "Electronics",
      inStock: true,
      tags: ["computer", "tech"]
    };

    const insertResult = await products.insertOne(product);

    console.log("Inserted ID:", insertResult.insertedId);
    console.log("Acknowledged:", insertResult.acknowledged);

    // 📝 INSERT MANY
    console.log("\n=== INSERT MANY ===");
    
    const multipleProducts = [
      { name: "Mouse", price: 25, category: "Electronics", inStock: true },
      { name: "Keyboard", price: 50, category: "Electronics", inStock: false },
      { name: "Desk", price: 200, category: "Furniture", inStock: true },
      { name: "Chair", price: 150, category: "Furniture", inStock: true }
    ];

    const insertManyResult = await products.insertMany(multipleProducts);

    console.log("Inserted Count:", insertManyResult.insertedCount);
    console.log("Inserted IDs:", Object.values(insertManyResult.insertedIds));

    // 📊 Final Count
    const totalCount = await products.countDocuments();
    
    console.log("\nTotal Products in DB:", totalCount);

    console.log("\n✅ Create Examples Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

createExamples();
