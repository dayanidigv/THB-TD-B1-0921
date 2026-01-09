// ==========================================
// EMBEDDED DOCUMENTS (One-to-One & One-to-Many)
// ==========================================

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function embeddedDocuments() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    const users = db.collection("users_embedded");

    await users.deleteMany({});

    // ONE-TO-ONE: User with Address
    console.log("=== ONE-TO-ONE (User + Address) ===");
    const userWithAddress = {
      name: "Alice",
      email: "alice@example.com",
      address: {
        street: "123 Main St",
        city: "NYC",
        zip: "10001",
        country: "USA"
      }
    };
    await users.insertOne(userWithAddress);
    console.log("✅ Inserted user with embedded address");

    // Query embedded field
    const nycUser = await users.findOne({ "address.city": "NYC" });
    console.log("NYC User:", nycUser?.name);

    // ONE-TO-MANY: User with Multiple Orders
    console.log("\n=== ONE-TO-MANY (User + Orders) ===");
    const userWithOrders = {
      name: "Bob",
      email: "bob@example.com",
      orders: [
        { orderId: 1, product: "Laptop", amount: 1000, date: new Date("2024-01-01") },
        { orderId: 2, product: "Mouse", amount: 25, date: new Date("2024-01-15") },
        { orderId: 3, product: "Keyboard", amount: 75, date: new Date("2024-02-01") }
      ]
    };
    await users.insertOne(userWithOrders);
    console.log("✅ Inserted user with embedded orders");

    // Query array field
    const highValueUser = await users.findOne({ "orders.amount": { $gt: 500 } });
    console.log("User with high-value order:", highValueUser?.name);

    // Count orders
    const bobsOrders = await users.findOne({ name: "Bob" });
    console.log(`Bob's order count: ${bobsOrders?.orders?.length}`);

    // NESTED EMBEDDED DOCUMENTS
    console.log("\n=== NESTED EMBEDDING ===");
    await users.insertOne({
      name: "Charlie",
      profile: {
        bio: "Developer",
        social: {
          twitter: "@charlie",
          github: "charlie-dev"
        },
        skills: ["JavaScript", "MongoDB", "Node.js"]
      }
    });
    console.log("✅ Inserted user with nested documents");

    // Query nested field
    const dev = await users.findOne({ "profile.social.github": "charlie-dev" });
    console.log("Found developer:", dev?.name);

    // PROS of Embedded Documents
    console.log("\n=== PROS ===");
    console.log("✅ Single query retrieves all data");
    console.log("✅ No joins needed");
    console.log("✅ Better read performance");
    console.log("✅ Atomic updates");

    // CONS of Embedded Documents
    console.log("\n=== CONS ===");
    console.log("⚠️ Document size limit (16MB)");
    console.log("⚠️ Data duplication if shared");
    console.log("⚠️ Hard to query embedded data independently");

    console.log("\n✅ Embedded Documents Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

embeddedDocuments();
