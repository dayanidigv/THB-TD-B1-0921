// ==========================================
// REFERENCED DOCUMENTS (Normalized)
// ==========================================

const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function referencedDocuments() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const authors = db.collection("authors");
    const articles = db.collection("articles");

    await authors.deleteMany({});
    await articles.deleteMany({});

    // ONE-TO-MANY: Author -> Articles
    console.log("=== ONE-TO-MANY (Author -> Articles) ===");

    // Insert Authors
    const authorDocs = await authors.insertMany([
      { name: "John Doe", bio: "Tech writer", email: "john@example.com" },
      { name: "Jane Smith", bio: "Science writer", email: "jane@example.com" }
    ]);

    const johnId = authorDocs.insertedIds[0];
    const janeId = authorDocs.insertedIds[1];

    console.log("✅ Inserted 2 authors");

    // Insert Articles with Author References
    await articles.insertMany([
      { title: "Node.js Basics", authorId: johnId, views: 1000, published: new Date("2024-01-01") },
      { title: "MongoDB Guide", authorId: johnId, views: 2000, published: new Date("2024-02-01") },
      { title: "Python Tips", authorId: janeId, views: 1500, published: new Date("2024-01-15") },
      { title: "Data Science 101", authorId: janeId, views: 1800, published: new Date("2024-02-15") }
    ]);

    console.log("✅ Inserted 4 articles with references");

    // MANUAL JOIN (Find author's articles)
    console.log("\n=== MANUAL JOIN ===");
    const author = await authors.findOne({ name: "John Doe" });
    const authorArticles = await articles.find({ authorId: author._id }).toArray();
    console.log(`${author.name}'s articles:`);
    authorArticles.forEach(a => console.log(`- ${a.title} (${a.views} views)`));

    // REVERSE LOOKUP (Find article's author)
    console.log("\n=== REVERSE LOOKUP ===");
    const article = await articles.findOne({ title: "Python Tips" });
    const articleAuthor = await authors.findOne({ _id: article.authorId });
    console.log(`Article: ${article.title}`);
    console.log(`Author: ${articleAuthor.name} (${articleAuthor.email})`);

    // POPULATE PATTERN (Get articles with author info)
    console.log("\n=== POPULATE PATTERN ===");
    const allArticles = await articles.find({}).toArray();
    
    for (const article of allArticles) {
      const author = await authors.findOne({ _id: article.authorId });
      console.log(`${article.title} by ${author.name}`);
    }

    // COUNT ARTICLES PER AUTHOR
    console.log("\n=== COUNT PER AUTHOR ===");
    const allAuthors = await authors.find({}).toArray();
    
    for (const author of allAuthors) {
      const count = await articles.countDocuments({ authorId: author._id });
      console.log(`${author.name}: ${count} articles`);
    }

    // PROS of Referenced Documents
    console.log("\n=== PROS ===");
    console.log("✅ No data duplication");
    console.log("✅ Smaller document size");
    console.log("✅ Can query referenced data independently");
    console.log("✅ Better for frequently updated data");

    // CONS of Referenced Documents
    console.log("\n=== CONS ===");
    console.log("⚠️ Requires multiple queries or $lookup");
    console.log("⚠️ Slower read performance");
    console.log("⚠️ No atomic updates across documents");

    console.log("\n✅ Referenced Documents Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

referencedDocuments();
