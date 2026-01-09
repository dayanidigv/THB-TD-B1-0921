// ==========================================
// AGGREGATION - $unwind (Array Deconstruction)
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function unwindExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const carts = db.collection("carts");

    // Setup sample data
    await carts.deleteMany({});
    await carts.insertMany([
      { 
        customer: "Alice", 
        items: ["Laptop", "Mouse", "Keyboard"],
        total: 1100
      },
      { 
        customer: "Bob", 
        items: ["Monitor", "Cable"],
        total: 350
      },
      {
        customer: "Charlie",
        items: ["Mouse"],
        total: 25
      }
    ]);


    // Basic $unwind
    console.log("=== BASIC $unwind ===");
    const unwound = await carts.aggregate([
      { $unwind: "$items" }
    ]).toArray();
    console.log("Unwound items:");
    console.log(unwound);
    console.log("Customer items:");
    unwound.forEach(c => console.log(`${c.customer}: ${c.items}`));

    // $unwind with projection
    console.log("\n=== $unwind + $project ===");
    const projected = await carts.aggregate([
      { $unwind: "$items" },
      {
        $project: {
          customer: 1,
          item: "$items",
          _id: 0
        }
      }
    ]).toArray();
    console.log("Clean format:");
    console.log(projected);

    // Count items per customer
    console.log("\n=== COUNT AFTER $unwind ===");
    const counted = await carts.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$customer",
          itemCount: { $sum: 1 }
        }
      }
    ]).toArray();
    console.log("Items per customer:");
    counted.forEach(c => console.log(`${c._id}: ${c.itemCount} items`));

    // Group by item
    console.log("\n=== GROUP BY ITEM ===");
    const byItem = await carts.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items",
          customerCount: { $sum: 1 },
          customers: { $push: "$customer" }
        }
      }
    ]).toArray();
    console.log("Customers by item:");
    console.log(byItem);
    byItem.forEach(i => 
      console.log(`${i._id}: ${i.customerCount} customers (${i.customers.join(", ")})`)
    );

    // $unwind with filter
    console.log("\n=== $unwind + FILTER ===");
    const filtered = await carts.aggregate([
      { $unwind: "$items" },
      { $match: { items: "Mouse" } },
      { $project: { customer: 1, _id: 0 } }
    ]).toArray();
    console.log("Customers who bought Mouse:");
    filtered.forEach(c => console.log(`- ${c.customer}`));

    // Nested array example
    const orders = db.collection("orders");
    await orders.deleteMany({});
    await orders.insertOne({
      orderId: "ORD001",
      customer: "Alice",
      items: [
        { product: "Laptop", price: 1000, qty: 1 },
        { product: "Mouse", price: 25, qty: 2 }
      ]
    });

    console.log("\n=== NESTED ARRAY $unwind ===");
    const nestedUnwind = await orders.aggregate([
      { $unwind: "$items" },
      {
        $project: {
          customer: "$customer",
          product: "$items.product",
          subtotal: { $multiply: ["$items.price", "$items.qty"] },
          _id: 0
        }
      }
    ]).toArray();
    console.log("Unwound order items:");
    console.log(nestedUnwind);

    console.log("\n✅ Unwind Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

unwindExamples();
