const { MongoClient } = require("mongodb");

async function initReplicaSet() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const admin = client.db().admin();
    const result = await admin.command({ replSetInitiate: {} });
    
    console.log("✅ Replica set initialized successfully!");
    console.log(result);
  } catch (error) {
    if (error.message.includes("already initialized")) {
      console.log("✅ Replica set is already initialized");
    } else {
      console.error("❌ Error:", error.message);
    }
  } finally {
    await client.close();
  }
}

initReplicaSet();
