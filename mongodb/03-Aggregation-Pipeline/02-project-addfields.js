// ==========================================
// AGGREGATION - $project & $addFields
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function projectAddFieldsExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const orders = db.collection("orders");

    // Setup sample data
    await orders.deleteMany({});
    await orders.insertMany([
      { customer: "Alice", product: "Laptop", quantity: 1, price: 1000 },
      { customer: "Bob", product: "Mouse", quantity: 2, price: 25 },
      { customer: "Charlie", product: "Monitor", quantity: 2, price: 300 }
    ]);

    // $project - Select fields
    console.log("=== $project (SELECT FIELDS) ===");
    const selected = await orders.aggregate([
      {
        $project: {
          customer: 1,
          product: 1,
          _id: 0
        }
      }
    ]).toArray();
    console.log("Selected fields:");
    console.log(selected);

    // $project - Calculated field
    console.log("\n=== $project (CALCULATE) ===");
    const withTotal = await orders.aggregate([
      {
        $project: {
          customer: 1,
          product: 1,
          total: { $multiply: ["$quantity", "$price"] },
          _id: 0
        }
      }
    ]).toArray();
    console.log("With calculated total:");
    withTotal.forEach(o => console.log(`${o.customer}: ${o.product} = $${o.total}`));

    // $project - Rename fields
    console.log("\n=== $project (RENAME) ===");
    const renamed = await orders.aggregate([
      {
        $project: {
          customerName: "$customer",
          itemName: "$product",
          qty: "$quantity",
          _id: 0
        }
      }
    ]).toArray();
    console.log("Renamed fields:");
    console.log(renamed);

    // $addFields - Add without removing others
    console.log("\n=== $addFields ===");
    const addedFields = await orders.aggregate([
      {
        $addFields: {
          totalAmount: { $multiply: ["$quantity", "$price"] },
          discountedPrice: { $multiply: ["$price", 0.9] }
        }
      }
    ]).toArray();
    console.log("Added fields:");
    addedFields.forEach(o => 
      console.log(`${o.customer}: ${o.product} = $${o.totalAmount} (with discount: $${o.discountedPrice.toFixed(2)})`)
    );

    // $project - String operations
    console.log("\n=== STRING OPERATIONS ===");
    const stringOps = await orders.aggregate([
      {
        $project: {
          customer: 1,
          upperProduct: { $toUpper: "$product" },
          productLength: { $strLenCP: "$product" },
          _id: 0
        }
      }
    ]).toArray();
    console.log("String operations:");
    console.log(stringOps);

    // $project - Conditional
    console.log("\n=== CONDITIONAL ===");
    const conditional = await orders.aggregate([
      {
        $project: {
          customer: 1,
          product: 1,
          total: { $multiply: ["$quantity", "$price"] },
          category: {
            $cond: {
              if: { $gte: [{ $multiply: ["$quantity", "$price"] }, 500] },
              then: "High Value",
              else: "Regular"
            }
          },
          _id: 0
        }
      }
    ]).toArray();
    console.log("With category:");
    console.log(conditional);

    console.log("\n✅ Project & AddFields Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

projectAddFieldsExamples();
