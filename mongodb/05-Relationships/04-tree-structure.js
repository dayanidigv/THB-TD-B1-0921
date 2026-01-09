// ==========================================
// TREE STRUCTURE (Hierarchical Data)
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function treeStructure() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const categories = db.collection("categories");

    await categories.deleteMany({});

    // PARENT REFERENCE PATTERN
    console.log("=== PARENT REFERENCE PATTERN ===");
    await categories.insertMany([
      { _id: 1, name: "Electronics", parent: null },
      { _id: 2, name: "Computers", parent: 1 },
      { _id: 3, name: "Laptops", parent: 2 },
      { _id: 4, name: "Desktops", parent: 2 },
      { _id: 5, name: "Phones", parent: 1 },
      { _id: 6, name: "Smartphones", parent: 5 },
      { _id: 7, name: "Feature Phones", parent: 5 },
      { _id: 8, name: "Gaming Laptops", parent: 3 },
      { _id: 9, name: "Business Laptops", parent: 3 }
    ]);

    console.log("✅ Inserted category tree");

    // Find Root Categories
    console.log("\n=== ROOT CATEGORIES ===");
    const roots = await categories.find({ parent: null }).toArray();
    roots.forEach(r => console.log(`- ${r.name}`));

    // Find Direct Children
    console.log("\n=== DIRECT CHILDREN OF ELECTRONICS ===");
    const electronicsChildren = await categories.find({ parent: 1 }).toArray();
    electronicsChildren.forEach(c => console.log(`- ${c.name}`));

    // Find Parent of a Category
    console.log("\n=== PARENT OF LAPTOPS ===");
    const laptops = await categories.findOne({ _id: 3 });
    const parent = await categories.findOne({ _id: laptops.parent });
    console.log(`${laptops.name} → ${parent.name}`);

    // Find All Descendants (using aggregation)
    console.log("\n=== ALL DESCENDANTS OF COMPUTERS ===");
    const descendants = await categories.aggregate([
      { $match: { _id: 2 } },
      {
        $graphLookup: {
          from: "categories",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parent",
          as: "descendants",
          maxDepth: 10
        }
      }
    ]).toArray();

    if (descendants[0]?.descendants) {
      console.log("Computers descendants:");
      descendants[0].descendants.forEach(d => console.log(`- ${d.name}`));
    }

    // Find Ancestors (Path to Root)
    console.log("\n=== ANCESTORS OF GAMING LAPTOPS ===");
    let current = await categories.findOne({ _id: 8 });
    const path = [current.name];
    
    while (current.parent !== null) {
      current = await categories.findOne({ _id: current.parent });
      path.unshift(current.name);
    }
    
    console.log("Path:", path.join(" → "));

    // Count Children
    console.log("\n=== COUNT CHILDREN ===");
    const allCategories = await categories.find({}).toArray();
    
    for (const cat of allCategories) {
      const childCount = await categories.countDocuments({ parent: cat._id });
      if (childCount > 0) {
        console.log(`${cat.name}: ${childCount} children`);
      }
    }

    // CHILD REFERENCE PATTERN (Alternative)
    console.log("\n=== CHILD REFERENCE PATTERN ===");
    const productsTree = db.collection("products_tree");
    await productsTree.deleteMany({});

    await productsTree.insertMany([
      { _id: 1, name: "Electronics", children: [2, 5] },
      { _id: 2, name: "Computers", children: [3, 4] },
      { _id: 3, name: "Laptops", children: [] },
      { _id: 4, name: "Desktops", children: [] },
      { _id: 5, name: "Phones", children: [6, 7] },
      { _id: 6, name: "Smartphones", children: [] },
      { _id: 7, name: "Feature Phones", children: [] }
    ]);

    const electronics = await productsTree.findOne({ _id: 1 });
    console.log(`${electronics.name} has ${electronics.children.length} direct children`);

    // Find children
    const children = await productsTree.find({ 
      _id: { $in: electronics.children } 
    }).toArray();
    console.log("Children:", children.map(c => c.name).join(", "));

    console.log("\n✅ Tree Structure Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

treeStructure();
