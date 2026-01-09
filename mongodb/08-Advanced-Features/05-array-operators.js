// ==========================================
// ARRAY OPERATORS
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function arrayOperatorsExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const lists = db.collection("lists");

    await lists.deleteMany({});

    await lists.insertOne({
      name: "Shopping",
      items: ["milk", "bread", "eggs"]
    });

    // $push - Add element
    console.log("=== $push ===");
    await lists.updateOne(
      { name: "Shopping" },
      { $push: { items: "butter" } }
    );
    let list = await lists.findOne({ name: "Shopping" });
    console.log("After push:", list.items);

    // $push with $each - Add multiple
    console.log("\n=== $push with $each ===");
    await lists.updateOne(
      { name: "Shopping" },
      { $push: { items: { $each: ["cheese", "yogurt"] } } }
    );
    list = await lists.findOne({ name: "Shopping" });
    console.log("After push each:", list.items);

    // $pull - Remove element
    console.log("\n=== $pull ===");
    await lists.updateOne(
      { name: "Shopping" },
      { $pull: { items: "bread" } }
    );
    list = await lists.findOne({ name: "Shopping" });
    console.log("After pull:", list.items);

    // $addToSet - Add if not exists
    console.log("\n=== $addToSet ===");
    await lists.updateOne(
      { name: "Shopping" },
      { $addToSet: { items: "milk" } }
    );
    list = await lists.findOne({ name: "Shopping" });
    console.log("After addToSet (milk already exists):", list.items);

    await lists.updateOne(
      { name: "Shopping" },
      { $addToSet: { items: "juice" } }
    );
    list = await lists.findOne({ name: "Shopping" });
    console.log("After addToSet (juice is new):", list.items);

    // $pop - Remove first or last
    console.log("\n=== $pop ===");
    await lists.updateOne(
      { name: "Shopping" },
      { $pop: { items: 1 } } // Remove last
    );
    list = await lists.findOne({ name: "Shopping" });
    console.log("After pop last:", list.items);

    await lists.updateOne(
      { name: "Shopping" },
      { $pop: { items: -1 } } // Remove first
    );
    list = await lists.findOne({ name: "Shopping" });
    console.log("After pop first:", list.items);

    // $pullAll - Remove multiple
    console.log("\n=== $pullAll ===");
    await lists.updateOne(
      { name: "Shopping" },
      { $pullAll: { items: ["butter", "cheese"] } }
    );
    list = await lists.findOne({ name: "Shopping" });
    console.log("After pullAll:", list.items);

    // ARRAY QUERY OPERATORS
    console.log("\n=== ARRAY QUERY OPERATORS ===");
    
    await lists.insertMany([
      { name: "Scores", values: [10, 20, 30, 40, 50] },
      { name: "Numbers", values: [5, 15, 25, 35] }
    ]);

    // $in - Contains any
    const hasValues = await lists.find({ values: { $in: [20, 25] } }).toArray();
    console.log("Has 20 or 25:", hasValues.map(l => l.name));

    // $all - Contains all
    const hasAll = await lists.find({ values: { $all: [10, 20] } }).toArray();
    console.log("Has both 10 and 20:", hasAll.map(l => l.name));

    // $size - Array length
    await lists.insertOne({ name: "Short", values: [1, 2] });
    const sizeThree = await lists.find({ values: { $size: 3 } }).toArray();
    console.log("Arrays with 3 elements:", sizeThree.map(l => l.name));

    // $elemMatch - Complex match
    await lists.insertOne({
      name: "Products",
      items: [
        { name: "Laptop", price: 1000 },
        { name: "Mouse", price: 25 }
      ]
    });

    const expensiveProducts = await lists.findOne({
      items: { $elemMatch: { price: { $gte: 500 } } }
    });
    console.log("Has expensive item:", expensiveProducts?.name);

    // POSITION OPERATIONS
    console.log("\n=== POSITION OPERATIONS ===");
    
    await lists.updateOne(
      { name: "Shopping" },
      { $push: { items: { $each: ["apple", "banana"], $position: 0 } } }
    );
    list = await lists.findOne({ name: "Shopping" });
    console.log("After insert at position 0:", list.items);

    // $slice - Limit array size
    await lists.updateOne(
      { name: "Shopping" },
      { $push: { items: { $each: ["orange"], $slice: -5 } } }
    );
    list = await lists.findOne({ name: "Shopping" });
    console.log("After slice to last 5:", list.items);

    console.log("\n✅ Array Operators Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

arrayOperatorsExamples();
