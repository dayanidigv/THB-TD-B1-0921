// ==========================================
// BULK OPERATIONS
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function bulkOperationsExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const products = db.collection("products");

    await products.deleteMany({});

    // ORDERED BULK WRITE
    console.log("=== ORDERED BULK WRITE ===");
    const orderedOps = [
      { insertOne: { document: { name: "Laptop", price: 1000, stock: 10 } } },
      { insertOne: { document: { name: "Mouse", price: 25, stock: 100 } } },
      { insertOne: { document: { name: "Keyboard", price: 75, stock: 50 } } },
      { updateOne: { filter: { name: "Laptop" }, update: { $set: { price: 950 } } } },
      { deleteOne: { filter: { name: "Mouse" } } }
    ];

    const orderedResult = await products.bulkWrite(orderedOps);
    console.log("Results:");
    console.log(`- Inserted: ${orderedResult.insertedCount}`);
    console.log(`- Updated: ${orderedResult.modifiedCount}`);
    console.log(`- Deleted: ${orderedResult.deletedCount}`);

    // UNORDERED BULK WRITE
    console.log("\n=== UNORDERED BULK WRITE ===");
    await products.deleteMany({});

    const unorderedOps = [
      { insertOne: { document: { name: "Monitor", price: 300 } } },
      { insertOne: { document: { name: "Webcam", price: 80 } } },
      { insertOne: { document: { name: "Headset", price: 60 } } }
    ];

    const unorderedResult = await products.bulkWrite(unorderedOps, { ordered: false });
    console.log(`Inserted: ${unorderedResult.insertedCount}`);

    // COMPLEX BULK OPERATIONS
    console.log("\n=== COMPLEX BULK OPS ===");
    
    const complexOps = [
      // Insert multiple
      { insertOne: { document: { name: "Product A", price: 100, category: "Electronics" } } },
      { insertOne: { document: { name: "Product B", price: 200, category: "Electronics" } } },
      
      // Update multiple fields
      { 
        updateMany: { 
          filter: { category: "Electronics" }, 
          update: { $set: { discount: 10, featured: true } } 
        } 
      },
      
      // Replace one
      { 
        replaceOne: { 
          filter: { name: "Monitor" }, 
          replacement: { name: "4K Monitor", price: 500, specs: "3840x2160" } 
        } 
      },
      
      // Update or insert
      { 
        updateOne: { 
          filter: { name: "Speaker" }, 
          update: { $set: { price: 120 } },
          upsert: true 
        } 
      }
    ];

    const complexResult = await products.bulkWrite(complexOps);
    console.log("Complex operations:");
    console.log(`- Inserted: ${complexResult.insertedCount}`);
    console.log(`- Updated: ${complexResult.modifiedCount}`);
    console.log(`- Upserted: ${complexResult.upsertedCount}`);

    // BATCH INSERT
    console.log("\n=== BATCH INSERT ===");
    await products.deleteMany({});

    const batchData = [];
    for (let i = 1; i <= 100; i++) {
      batchData.push({ name: `Item ${i}`, price: i * 10 });
    }

    const batchResult = await products.insertMany(batchData);
    console.log(`Inserted ${batchResult.insertedCount} documents in batch`);

    // ERROR HANDLING
    console.log("\n=== ERROR HANDLING ===");
    
    try {
      await products.bulkWrite([
        { insertOne: { document: { name: "Test1" } } },
        { insertOne: { document: { _id: "duplicate" } } },
        { insertOne: { document: { _id: "duplicate" } } }, // This will fail
        { insertOne: { document: { name: "Test2" } } }
      ]);
    } catch (error) {
      console.log("❌ Bulk operation had errors");
      console.log(`Inserted before error: ${error.result?.nInserted || 0}`);
    }

    // PERFORMANCE BENEFITS
    console.log("\n=== PERFORMANCE BENEFITS ===");
    console.log("✅ Single network round-trip");
    console.log("✅ Reduced overhead");
    console.log("✅ Better throughput");
    console.log("✅ Can be ordered or unordered");

    console.log("\n✅ Bulk Operations Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

bulkOperationsExamples();
