// ==========================================
// AGGREGATION - $match & $group
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function matchGroupExamples() {
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
      { customer: "Bob", product: "Laptop", quantity: 1, price: 1000, status: "completed" },
      { customer: "Diana", product: "Mouse", quantity: 5, price: 25, status: "cancelled" }
    ]);

    // $match - Filter documents
    console.log("=== $match (FILTER) ===");
    const completedOrders = await orders.aggregate([
      { $match: { status: "completed" } }
    ]).toArray();
    console.log("Completed orders:", completedOrders.length);

    // $group - Basic grouping
    console.log("\n=== $group (COUNT BY CUSTOMER) ===");
    const ordersByCustomer = await orders.aggregate([
      {
        $group: {
          _id: "$customer",
          totalOrders: { $sum: 1 }
        }
      }
    ]).toArray();
    console.log("Orders by customer:");
    ordersByCustomer.forEach(c => console.log(`${c._id}: ${c.totalOrders} orders`));

    // $group - Calculate totals
    console.log("\n=== $group (CALCULATE TOTALS) ===");
    const totalSpent = await orders.aggregate([
      {
        $group: {
          _id: "$customer",
          totalSpent: { $sum: { $multiply: ["$quantity", "$price"] } },
          orderCount: { $sum: 1 }
        }
      }
    ]).toArray();
    console.log("Total spent by customer:");
    totalSpent.forEach(c => console.log(`${c._id}: $${c.totalSpent} (${c.orderCount} orders)`));

    // $match + $group - Combined
    console.log("\n=== $match + $group ===");
    const completedRevenue = await orders.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: "$customer",
          revenue: { $sum: { $multiply: ["$quantity", "$price"] } }
        }
      }
    ]).toArray();
    console.log("Revenue from completed orders:");
    completedRevenue.forEach(c => console.log(`${c._id}: $${c.revenue}`));

    // $group by product
    console.log("\n=== GROUP BY PRODUCT ===");
    const productSales = await orders.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: "$product",
          totalQuantity: { $sum: "$quantity" },
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } }
        }
      }
    ]).toArray();
    console.log("Sales by product:");
    productSales.forEach(p => console.log(`${p._id}: ${p.totalQuantity} units, $${p.totalRevenue}`));

    // $group - All documents
    console.log("\n=== OVERALL STATISTICS ===");
    const overallStats = await orders.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
          avgOrderValue: { $avg: { $multiply: ["$quantity", "$price"] } }
        }
      }
    ]).toArray();
    console.log("Overall stats:", overallStats[0]);

    console.log("\n✅ Match & Group Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

matchGroupExamples();
