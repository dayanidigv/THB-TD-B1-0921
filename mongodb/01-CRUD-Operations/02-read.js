// ==========================================
// READ - Find Operations
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function readExamples() {
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
      { name: "Chair", price: 150, category: "Furniture", inStock: true }
    ]);

    // 📖 FIND ALL
    console.log("=== FIND ALL ===");
    const allProducts = await products.find({}).toArray();
    console.log("Total Products:", allProducts.length);
    allProducts.forEach(p => console.log(`- ${p.name}: $${p.price}`));

    // 📖 FIND ONE
    console.log("\n=== FIND ONE ===");
    const oneProduct = await products.findOne({ name: "Laptop" });
    console.log("Found:", oneProduct?.name);
    console.log("Details:", oneProduct);

    // 📖 FIND WITH FILTER
    console.log("\n=== FIND WITH FILTER ===");
    const electronics = await products.find({ category: "Electronics" }).toArray();
    console.log("Electronics:", electronics.length);
    electronics.forEach(p => console.log(`- ${p.name}`));

    // 📖 FIND WITH MULTIPLE CONDITIONS
    console.log("\n=== MULTIPLE CONDITIONS ===");
    const inStockElectronics = await products.find({
      category: "Electronics",
      inStock: true
    }).toArray();
    console.log("In Stock Electronics:", inStockElectronics.length);
    inStockElectronics.forEach(p => console.log(`- ${p.name}`));

    // 📖 FIND BY ID
    console.log("\n=== FIND BY ID ===");
    const firstProduct = await products.findOne({});
    if (firstProduct) {
      const byId = await products.findOne({ _id: firstProduct._id });
      console.log("Found by ID:", byId?.name);
    }

    console.log("\n✅ Read Examples Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

readExamples();
