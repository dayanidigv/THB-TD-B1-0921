// ==========================================
// REGEX SEARCH
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function regexSearch() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const users = db.collection("users");


    // Setup sample data
    await users.deleteMany({});
    await users.insertMany([
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@test.com" },
      { name: "Charlie", email: "charlie@example.com" },
      { name: "Diana", email: "diana@example.org" },
      { name: "eve", email: "eve@test.com" }
    ]);

    // STARTS WITH (case-insensitive)
    console.log("=== STARTS WITH ===");
    const startsWithC = await users.find({ name: /^C/i }).toArray();
    console.log("Names starting with 'C':", startsWithC.map(u => u.name));

    // ENDS WITH
    console.log("\n=== ENDS WITH ===");
    const endsWithE = await users.find({ name: /e$/i }).toArray();
    console.log("Names ending with 'e':", endsWithE.map(u => u.name));

    // CONTAINS
    console.log("\n=== CONTAINS ===");
    const containsA = await users.find({ name: /a/i }).toArray();
    console.log("Names containing 'a':", containsA.map(u => u.name));

    // EXACT MATCH (case-insensitive)
    console.log("\n=== EXACT MATCH ===");
    const exactMatch = await users.find({ name: /^alice$/i }).toArray();
    console.log("Exact match 'alice':", exactMatch.map(u => u.name));

    // EMAIL DOMAIN SEARCH
    console.log("\n=== EMAIL DOMAIN ===");
    const exampleDomain = await users.find({ email: /@example\.com$/i }).toArray();
    console.log("@example.com emails:", exampleDomain.map(u => u.email));

    // MULTIPLE PATTERNS (OR)
    console.log("\n=== MULTIPLE PATTERNS ===");
    const multiPattern = await users.find({ name: /^(A|B)/i }).toArray();
    console.log("Starting with A or B:", multiPattern.map(u => u.name));

    // $regex OPERATOR
    console.log("\n=== $regex OPERATOR ===");
    const regexOp = await users.find({ 
      name: { $regex: "li", $options: "i" } 
    }).toArray();
    console.log("Contains 'li':", regexOp.map(u => u.name));

    // CASE-SENSITIVE SEARCH
    console.log("\n=== CASE-SENSITIVE ===");
    const uppercaseSensitive = await users.find({ name: /^[A-Z]/ }).toArray();
    console.log("Starts with uppercase:", uppercaseSensitive.map(u => u.name));

    console.log("\n✅ Regex Search Complete!");

    // CASE-SENSITIVE SEARCH
    console.log("\n=== CASE-SENSITIVE ===");
    const caseSensitive = await users.find({ name: /^([A-Z]|[a-z])/ }).toArray();
    console.log("Starts with uppercase:", caseSensitive.map(u => u.name));

    console.log("\n✅ Regex Search Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

regexSearch();
