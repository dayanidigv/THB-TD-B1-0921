// ==========================================
// COMPOUND INDEX (Multiple Fields)
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function compoundIndexExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const books = db.collection("books");

    // Insert sample data
    await books.deleteMany({});
    const sampleBooks = [];
    for (let i = 1; i <= 100000; i++) {
      sampleBooks.push({
        author: `Author ${i % 50}`,
        publishYear: 2000 + (i % 25),
        title: `Book ${i}`,
        price: Math.floor(Math.random() * 100) + 10
      });
    }
    await books.insertMany(sampleBooks);
    console.log("✅ Inserted 1000 books\n");

    // WITHOUT compound index
    console.log("=== WITHOUT COMPOUND INDEX ===");
    let start = Date.now();
    await books.find({ author: "Author 10", publishYear: { $gte: 2010 } }).toArray();
    console.log(`Time without index: ${Date.now() - start}ms`);

    // CREATE compound index
    console.log("\n=== CREATE COMPOUND INDEX ===");
    await books.createIndex({ author: 1, publishYear: -1 });
    console.log("✅ Created compound index on author (asc) & publishYear (desc)");

    // WITH compound index
    start = Date.now();
    const result = await books.find({ author: "Author 10", publishYear: { $gte: 2010 } }).toArray();
    console.log(`Time with index: ${Date.now() - start}ms`);
    console.log(`Found ${result.length} books`);

    // Index order matters
    console.log("\n=== INDEX FIELD ORDER ===");
    
    // This uses index efficiently
    const query1 = await books.find({ author: "Author 10" }).toArray();
    console.log(`Query by author only: ${query1.length} results`);
    
    // This doesn't use index efficiently
    const query2 = await books.find({ publishYear: 2015 }).toArray();
    console.log(`Query by year only: ${query2.length} results`);

    // Multiple field index
    console.log("\n=== THREE FIELD INDEX ===");
    await books.createIndex({ author: 1, publishYear: -1, price: 1 });
    console.log("✅ Created 3-field index");

    const complex = await books.find({
      author: "Author 10",
      publishYear: { $gte: 2010 },
      price: { $lt: 50 }
    }).toArray();
    console.log(`Complex query: ${complex.length} results`);

    // List all indexes
    console.log("\n=== ALL INDEXES ===");
    const indexes = await books.indexes();
    indexes.forEach(idx => console.log(`- ${JSON.stringify(idx.key)}`));

    console.log("\n✅ Compound Index Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

compoundIndexExamples();
