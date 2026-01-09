// ==========================================
// UPDATE - Modify Operations
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function updateExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const products = db.collection("products");

    // Setup sample data
    await products.deleteMany({});

    await products.insertMany([
      { name: "Laptop", price: 999, category: "Electronics", inStock: true, tags: ["computer"] },
      { name: "Mouse", price: 25, category: "Electronics", inStock: true },
      { name: "Keyboard", price: 50, category: "Electronics", inStock: false },
      { name: "Desk", price: 200, category: "Furniture", inStock: true }
    ]);

    // ✏️ UPDATE ONE
    console.log("=== UPDATE ONE ===");
    const updateOne = await products.updateOne(
      { name: "Mouse" },
      { $set: { price: 30, inStock: true } }
    );
    console.log("Matched Count:", updateOne.matchedCount);
    console.log("Modified Count:", updateOne.modifiedCount);
    
    const updated = await products.findOne({ name: "Mouse" });
    console.log("New Price:", updated?.price);

    // ✏️ UPDATE MANY
    console.log("\n=== UPDATE MANY ===");
    const updateMany = await products.updateMany(
      { category: "Electronics" },
      { $set: { discount: 10 } }
    );
    console.log("Updated Many:", updateMany.modifiedCount);

    // ✏️ INCREMENT VALUE ($inc)
    console.log("\n=== INCREMENT ===");
    await products.updateOne(
      { name: "Laptop" },
      { $inc: { price: 100 } }
    );
    const laptop = await products.findOne({ name: "Laptop" });
    console.log("Laptop new price:", laptop?.price);

    // ✏️ PUSH TO ARRAY ($push)
    console.log("\n=== PUSH TO ARRAY ===");
    await products.updateOne(
      { name: "Laptop" },
      { $push: { tags: "portable" } }
    );
    const laptopWithTags = await products.findOne({ name: "Laptop" });
    console.log("Laptop tags:", laptopWithTags?.tags);

    // ✏️ MULTIPLE FIELDS
    console.log("\n=== UPDATE MULTIPLE FIELDS ===");
    await products.updateOne(
      { name: "Desk" },
      { 
        $set: { 
          price: 180, 
          discount: 20,
          featured: true 
        } 
      }
    );
    const desk = await products.findOne({ name: "Desk" });
    console.log("Desk updated:", desk);

    console.log("\n✅ Update Examples Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

updateExamples();
