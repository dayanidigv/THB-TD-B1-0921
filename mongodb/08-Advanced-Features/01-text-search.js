// ==========================================
// TEXT SEARCH
// ==========================================
require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.DB_URL;
const client = new MongoClient(uri);

async function textSearchExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const articles = db.collection("articles");

    await articles.deleteMany({});

    // Create text index
    await articles.createIndex({ title: "text", content: "text" });

    await articles.insertMany([
      { title: "Node.js Tutorial", content: "Learn Node.js from scratch with practical examples" },
      { title: "MongoDB Guide", content: "Complete MongoDB database reference and tutorial" },
      { title: "React Basics", content: "Introduction to React framework for beginners" },
      { title: "MongoDB Indexing", content: "How to create and optimize indexes in MongoDB" },
      { title: "Advanced", content: "Advanced Node.js patterns and best practices" }
    ]);

    // Simple search
    console.log("=== SIMPLE SEARCH ===");
    const search1 = await articles.find({ $text: { $search: "MongoDB" } }).toArray();
    console.log("Search 'MongoDB':", search1.map(a => a.title));

    // Multiple words (OR)
    console.log("\n=== MULTIPLE WORDS ===");
    const search2 = await articles.find({ $text: { $search: "MongoDB Node" } }).toArray();
    console.log("Search 'MongoDB Node':", search2.map(a => a.title));

    // Phrase search
    console.log("\n=== PHRASE SEARCH ===");
    const search3 = await articles.find({ $text: { $search: "\"Node.js Tutorial\"" } }).toArray();
    console.log("Exact phrase:", search3.map(a => a.title));

    // Exclude words
    console.log("\n=== EXCLUDE WORDS ===");
    const search4 = await articles.find({ $text: { $search: "MongoDB -Indexing" } }).toArray();
    console.log("MongoDB but not Indexing:", search4.map(a => a.title));

    // Search with relevance score
    console.log("\n=== WITH RELEVANCE SCORE ===");
    const scored = await articles.find(
      { $text: { $search: "MongoDB tutorial" } },
      { projection: { title: 1, score: { $meta: "textScore" }, _id: 0 } }
    ).sort({ score: { $meta: "textScore" } }).toArray();
    
    console.log("Results by relevance:");
    scored.forEach(a => console.log(`- ${a.title} (score: ${a.score.toFixed(2)})`));

    console.log("\n✅ Text Search Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

textSearchExamples();
