// ==========================================
// TEXT INDEX (Full-text Search)
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function textIndexExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const articles = db.collection("articles");

    // Insert sample data
    await articles.deleteMany({});
    await articles.insertMany([
      { title: "MongoDB Tutorial", content: "Learn MongoDB from scratch with examples" },
      { title: "Node.js Guide", content: "Complete Node.js programming guide" },
      { title: "MongoDB Indexing", content: "How to create and use indexes in MongoDB" },
      { title: "JavaScript Basics", content: "Learn JavaScript fundamentals" },
      { title: "MongoDB Aggregation", content: "Master aggregation pipeline in MongoDB" }
    ]);

    // CREATE text index
    console.log("=== CREATE TEXT INDEX ===");
    await articles.createIndex({ title: "text", content: "text" });
    console.log("✅ Created text index on title & content");

    // Simple text search
    console.log("\n=== SIMPLE TEXT SEARCH ===");
    const search1 = await articles.find({ $text: { $search: "MongoDB" } }).toArray();
    console.log("Search 'MongoDB':");
    search1.forEach(a => console.log(`- ${a.title}`));

    // Multiple words (OR)
    console.log("\n=== MULTIPLE WORDS (OR) ===");
    const search2 = await articles.find({ $text: { $search: "MongoDB Node" } }).toArray();
    console.log("Search 'MongoDB Node':");
    search2.forEach(a => console.log(`- ${a.title}`));

    // Phrase search
    console.log("\n=== PHRASE SEARCH ===");
    const search3 = await articles.find({ $text: { $search: "\"MongoDB Tutorial\"" } }).toArray();
    console.log("Search exact phrase 'MongoDB Tutorial':");
    search3.forEach(a => console.log(`- ${a.title}`));

    // Exclude words
    console.log("\n=== EXCLUDE WORDS ===");
    const search4 = await articles.find({ $text: { $search: "MongoDB -Aggregation" } }).toArray();
    console.log("Search 'MongoDB' but not 'Aggregation':");
    search4.forEach(a => console.log(`- ${a.title}`));

    // Text search with score
    console.log("\n=== SEARCH WITH SCORE ===");
    const scored = await articles.find(
      { $text: { $search: "MongoDB" } },
      { projection: { title: 1, score: { $meta: "textScore" }, _id: 0 } }
    ).sort({ score: { $meta: "textScore" } }).toArray();
    console.log("Sorted by relevance:");
    scored.forEach(a => console.log(`- ${a.title} (score: ${a.score.toFixed(2)})`));

    // Text search with filter
    console.log("\n=== TEXT SEARCH + FILTER ===");
    await articles.updateMany({}, { $set: { published: true } });
    await articles.updateOne({ title: "JavaScript Basics" }, { $set: { published: false } });
    
    const filtered = await articles.find({
      $text: { $search: "JavaScript MongoDB" },
      published: true
    }).toArray();
    console.log("Published articles about 'JavaScript MongoDB':");
    filtered.forEach(a => console.log(`- ${a.title}`));

    console.log("\n✅ Text Index Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

textIndexExamples();
