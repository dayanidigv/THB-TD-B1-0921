// ==========================================
// EXPLAIN QUERY (Performance Analysis)
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function explainExamples() {
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
        author: `Author ${i % 50}`,
        isbn: `ISBN-${1000 + i}`,
        price: Math.floor(Math.random() * 100) + 10
      });
    }
    await books.insertMany(sampleBooks);
    console.log("✅ Inserted 1000 books\n");

    // EXPLAIN without index
    console.log("=== EXPLAIN WITHOUT INDEX ===");
    const explain1 = await books.find({ isbn: "ISBN-1500" }).explain("executionStats");
    console.log("Execution Stats:");
    console.log(`- Stage: ${explain1.executionStats.executionStages.stage}`);
    console.log(`- Docs examined: ${explain1.executionStats.totalDocsExamined}`);
    console.log(`- Docs returned: ${explain1.executionStats.nReturned}`);
    console.log(`- Execution time: ${explain1.executionStats.executionTimeMillis}ms`);

    // Create index
    await books.createIndex({ isbn: 1 });
    console.log("\n✅ Created index on isbn");

    // EXPLAIN with index
    console.log("\n=== EXPLAIN WITH INDEX ===");
    const explain2 = await books.find({ isbn: "ISBN-1500" }).explain("executionStats");
    console.log("Execution Stats:");
    console.log(`- Stage: ${explain2.executionStats.executionStages.stage}`);
    console.log(`- Docs examined: ${explain2.executionStats.totalDocsExamined}`);
    console.log(`- Docs returned: ${explain2.executionStats.nReturned}`);
    console.log(`- Execution time: ${explain2.executionStats.executionTimeMillis}ms`);
    console.log(`- Index used: ${explain2.executionStats.executionStages.indexName}`);

    // EXPLAIN query planner
    console.log("\n=== QUERY PLANNER ===");
    const planner = await books.find({ isbn: "ISBN-1500" }).explain("queryPlanner");
    console.log("Winning plan:");
    console.log(`- Stage: ${planner.queryPlanner.winningPlan.stage}`);
    console.log(`- Index: ${planner.queryPlanner.winningPlan.indexName || 'none'}`);

    // Range query explain
    console.log("\n=== RANGE QUERY EXPLAIN ===");
    await books.createIndex({ price: 1 });
    const rangeExplain = await books.find({ price: { $gte: 50, $lte: 75 } }).explain("executionStats");
    console.log(`- Docs examined: ${rangeExplain.executionStats.totalDocsExamined}`);
    console.log(`- Docs returned: ${rangeExplain.executionStats.nReturned}`);
    console.log(`- Index used: ${rangeExplain.executionStats.executionStages.indexName}`);

    // Sort explain
    console.log("\n=== SORT EXPLAIN ===");
    const sortExplain = await books.find({}).sort({ isbn: 1 }).limit(10).explain("executionStats");
    console.log(`- Stage: ${sortExplain.executionStats.executionStages.stage}`);
    console.log(`- In-memory sort: ${sortExplain.executionStats.executionStages.stage === 'SORT'}`);

    // All execution stats explain
    console.log("\n=== ALL EXECUTION STATS ===");
    const allStats = await books.find({ price: { $gt: 80 } }).explain("allPlansExecution");
    console.log(`- Considered ${allStats.executionStats.allPlansExecution.length} plan(s)`);
    console.log(`- Winning plan time: ${allStats.executionStats.executionTimeMillis}ms`);

    console.log("\n✅ Explain Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

explainExamples();
