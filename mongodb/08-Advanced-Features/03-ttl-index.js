// ==========================================
// TTL INDEX (Time To Live)
// ==========================================
require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.DB_URL;
const client = new MongoClient(uri);

// Sleep utility function
function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function ttlIndexExamples() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB\n");

    const db = client.db("learn_db");
    
    // SESSION MANAGEMENT
    console.log("=== SESSION TTL (50 seconds) ===");
    const sessions = db.collection("sessions");
    await sessions.deleteMany({});

    // Create TTL index (expires after 50 seconds)
    await sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 50 });

    await sessions.insertMany([
      { userId: "user123", token: "abc123", createdAt: new Date() },
      { userId: "user456", token: "def456", createdAt: new Date() }
    ]);

    console.log("✅ Created 2 sessions (will expire in 50 seconds)");
    console.log("Current count:", await sessions.countDocuments());
    
    console.log("⏳ Waiting 70 seconds to see TTL deletion...");
    await sleep(70);
    console.log("After 70 seconds - count:", await sessions.countDocuments());
    console.log("✅ Sessions expired and deleted by TTL!");

    // CACHE WITH TTL
    console.log("\n=== CACHE TTL (5 minutes) ===");
    const cache = db.collection("cache");
    await cache.deleteMany({});

    await cache.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await cache.insertOne({
      key: "user_data_123",
      value: { name: "Alice", role: "admin" },
      expiresAt: expiresAt
    });

    console.log("✅ Created cache entry (expires at:", expiresAt.toLocaleTimeString() + ")");

    // TEMPORARY LOGS
    console.log("\n=== LOG TTL (1 hour) ===");
    const logs = db.collection("logs");
    await logs.deleteMany({});

    await logs.createIndex({ timestamp: 1 }, { expireAfterSeconds: 3600 });

    await logs.insertMany([
      { level: "info", message: "User logged in", timestamp: new Date() },
      { level: "error", message: "Connection failed", timestamp: new Date() },
      { level: "warning", message: "High memory usage", timestamp: new Date() }
    ]);

    console.log("✅ Created logs (will expire in 1 hour)");

    // VERIFICATION CODES
    console.log("\n=== VERIFICATION CODE (10 minutes) ===");
    const verifications = db.collection("verifications");
    await verifications.deleteMany({});

    await verifications.createIndex({ createdAt: 1 }, { expireAfterSeconds: 600 });

    await verifications.insertOne({
      email: "user@example.com",
      code: "123456",
      createdAt: new Date()
    });

    console.log("✅ Created verification code (expires in 10 minutes)");

    // CHECK TTL INDEXES
    console.log("\n=== LIST TTL INDEXES ===");
    const sessionIndexes = await sessions.indexes();
    sessionIndexes.forEach(idx => {
      if (idx.expireAfterSeconds !== undefined) {
        console.log(`- ${idx.name}: expires after ${idx.expireAfterSeconds}s`);
      }
    });

    // IMPORTANT NOTES
    console.log("\n=== IMPORTANT NOTES ===");
    console.log("⏰ MongoDB runs TTL deletion every 60 seconds");
    console.log("⏰ Documents may exist briefly after expiration");
    console.log("⏰ TTL index must be on Date field");
    console.log("⏰ Only one field can be used for TTL");

    console.log("\n✅ TTL Index Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

ttlIndexExamples();

// ==========================================
// USE CASES FOR TTL INDEXES
// ==========================================
`
User sessions - auto-expire login sessions and refresh tokens
OTP / verification codes - email, SMS, password reset codes
API cache - temporary cached responses or computed data
Temporary logs - debug, error, or audit logs
Rate limiting - reset API request counters automatically
Security tokens - password reset, account recovery links
Temporary notifications - alerts that expire after some time
Background jobs - expire stuck or outdated jobs
Upload metadata - temporary file upload records
Analytics buffers - short-lived metrics or sampling data

One rule to remember:
If data has an expiry time, use TTL.
`