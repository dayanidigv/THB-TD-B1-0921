// ==========================================
// SINGLE FIELD INDEX
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function singleIndexExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const books = db.collection("books");

    // Insert sample data
    await books.deleteMany({});
    const sampleBooks = [];
    for (let i = 1; i <= 1000; i++) {
      sampleBooks.push({
        title: `Book ${i}`,
        isbn: `ISBN-${1000 + i}`,
        price: Math.floor(Math.random() * 100) + 10
      });
    }
    await books.insertMany(sampleBooks);
    console.log("✅ Inserted 1000 books\n");

    // Query WITHOUT index
    console.log("=== WITHOUT INDEX ===");
    let start = Date.now();
    await books.findOne({ isbn: "ISBN-1500" });
    console.log(`Time without index: ${Date.now() - start}ms`);

    // CREATE index
    console.log("\n=== CREATE INDEX ===");
    await books.createIndex({ isbn: 1 });
    console.log("✅ Created index on isbn");

    // Query WITH index
    start = Date.now();
    await books.findOne({ isbn: "ISBN-1500" });
    console.log(`Time with index: ${Date.now() - start}ms`);

    // List indexes
    console.log("\n=== LIST INDEXES ===");
    const indexes = await books.indexes();
    indexes.forEach(idx => console.log(`- ${JSON.stringify(idx.key)}`));

    // Index on price
    console.log("\n=== INDEX ON PRICE ===");
    await books.createIndex({ price: 1 });
    console.log("✅ Created index on price");

    const expensive = await books.find({ price: { $gt: 80 } }).toArray();
    console.log(`Found ${expensive.length} expensive books`);

    console.log("\n✅ Single Index Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

singleIndexExamples();
