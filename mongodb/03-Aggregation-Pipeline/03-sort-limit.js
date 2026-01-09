// ==========================================
// AGGREGATION - $sort & $limit
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function sortLimitExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const orders = db.collection("orders");

    // Setup sample data
    await orders.deleteMany({});
    await orders.insertMany([
      { customer: "Alice", product: "Laptop", quantity: 1, price: 1000, status: "completed" },
      { customer: "Bob", product: "Mouse", quantity: 2, price: 25, status: "completed" },
      { customer: "Alice", product: "Keyboard", quantity: 1, price: 75, status: "pending" },
      { customer: "Charlie", product: "Monitor", quantity: 2, price: 300, status: "completed" },
      { customer: "Bob", product: "Laptop", quantity: 1, price: 1000, status: "completed" }
    ]);

    // $sort - Ascending
    console.log("=== $sort ASCENDING ===");
    const sortedAsc = await orders.aggregate([
      { $sort: { price: 1 } }
    ]).toArray();
    console.log("Sorted by price (asc):");
    sortedAsc.forEach(o => console.log(`${o.product}: $${o.price}`));

    // $sort - Descending
    console.log("\n=== $sort DESCENDING ===");
    const sortedDesc = await orders.aggregate([
      { $sort: { price: -1 } }
    ]).toArray();
    console.log("Sorted by price (desc):");
    sortedDesc.forEach(o => console.log(`${o.product}: $${o.price}`));

    // $limit
    console.log("\n=== $limit ===");
    const limited = await orders.aggregate([
      { $sort: { price: -1 } },
      { $limit: 3 }
    ]).toArray();
    console.log("Top 3 expensive:");
    limited.forEach(o => console.log(`${o.product}: $${o.price}`));

    // $skip
    console.log("\n=== $skip ===");
    const skipped = await orders.aggregate([
      { $sort: { price: -1 } },
      { $skip: 2 },
      { $limit: 2 }
    ]).toArray();
    console.log("Skip 2, limit 2:");
    skipped.forEach(o => console.log(`${o.product}: $${o.price}`));

    // Top customers by spending
    console.log("\n=== TOP CUSTOMERS ===");
    const topCustomers = await orders.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: "$customer",
          totalSpent: { $sum: { $multiply: ["$quantity", "$price"] } }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 3 }
    ]).toArray();
    console.log("Top 3 customers:");
    topCustomers.forEach(c => console.log(`${c._id}: $${c.totalSpent}`));

    // Bottom products
    console.log("\n=== LEAST POPULAR PRODUCTS ===");
    const leastPopular = await orders.aggregate([
      {
        $group: {
          _id: "$product",
          totalSold: { $sum: "$quantity" }
        }
      },
      { $sort: { totalSold: 1 } },
      { $limit: 2 }
    ]).toArray();
    console.log("Least sold:");
    leastPopular.forEach(p => console.log(`${p._id}: ${p.totalSold} units`));

    console.log("\n✅ Sort & Limit Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

sortLimitExamples();
