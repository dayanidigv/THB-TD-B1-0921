// ==========================================
// AGGREGATION - $lookup (JOIN)
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function lookupExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const orders = db.collection("orders");
    const customers = db.collection("customers");

    // Setup sample data
    await orders.deleteMany({});
    await customers.deleteMany({});

    await customers.insertMany([
      { name: "Alice", email: "alice@example.com", city: "NYC" },
      { name: "Bob", email: "bob@example.com", city: "LA" },
      { name: "Charlie", email: "charlie@example.com", city: "Chicago" }
    ]);

    await orders.insertMany([
      { customer: "Alice", product: "Laptop", amount: 1000,},
      { customer: "Bob", product: "Mouse", amount: 25 },
      { customer: "Alice", product: "Keyboard", amount: 75 },
      { customer: "Charlie", product: "Monitor", amount: 300 }
    ]);

    // $lookup - Basic join
    console.log("=== BASIC $lookup ===");
    const ordersWithCustomers = await orders.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "name",
          as: "customerInfo"
        }
      }
    ]).toArray();
    console.log("Orders with customer info:");
    // console.log(ordersWithCustomers);
    // console.log(ordersWithCustomers[0]);
    // console.log(ordersWithCustomers[0].customerInfo);
    ordersWithCustomers.forEach(o => 
      console.log(`${o.product} - ${o.customerInfo[0]?.email}`)
    );

    // $lookup with $unwind
    console.log("\n=== $lookup + $unwind ===");
    const unwound = await orders.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "name",
          as: "customerInfo"
        }
      },
      { $unwind: "$customerInfo" }
    ]).toArray();
    console.log("Unwound customer info:");
    unwound.forEach(o => 
      console.log(`${o.customer}: ${o.product} (${o.customerInfo.city})`)
    );

    // $lookup with projection
    console.log("\n=== $lookup + $project ===");
    const projected = await orders.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "name",
          as: "customerInfo"
        }
      },
      { $unwind: "$customerInfo" },
      {
        $project: {
          product: 1,
          amount: 1,
          customerName: "$customerInfo.name",
          customerEmail: "$customerInfo.email",
          _id: 0
        }
      }
    ]).toArray();
    console.log("Projected data:");
    console.log(projected);

    // $lookup with filter
    console.log("\n=== $lookup + FILTER ===");
    const filtered = await orders.aggregate([
      { $match: { amount: { $gte: 100 } } },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "name",
          as: "customerInfo"
        }
      },
      { $unwind: "$customerInfo" },
      {
        $project: {
          customer: 1,
          product: 1,
          amount: 1,
          email: "$customerInfo.email",
          _id: 0
        }
      }
    ]).toArray();
    console.log("High-value orders with customer:");
    console.log(filtered);

    // $lookup with grouping
    console.log("\n=== $lookup + $group ===");
    const grouped = await orders.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "name",
          as: "customerInfo"
        }
      },
      { $unwind: "$customerInfo" },
      {
        $group: {
          _id: "$customerInfo.city",
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$amount" }
        }
      }
    ]).toArray();
    console.log("Orders by city:");
    grouped.forEach(g => 
      console.log(`${g._id}: ${g.totalOrders} orders, $${g.totalRevenue}`)
    );

    console.log("\n✅ Lookup Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

lookupExamples();
