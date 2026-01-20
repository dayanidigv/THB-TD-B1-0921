// seed.js
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function seed() {
  await client.connect();
  const db = client.db("ai_demo");
  const users = db.collection("users");

  await users.deleteMany({});

  await users.insertMany([
    { name: "vijay", email: "vijay@test.com", role: "admin" },
    { name: "kalai", email: "kalai@test.com", role: "user" },
    { name: "Daya", email: "daya@test.com", role: "admin" },
    { name: "Ram", email: "ram@test.com", role: "superadmin" },
    { name: "Sri", email: "sri@test.com", role: "superuser" }
  ]);

  console.log("Seeded DB");
  await client.close();
}

seed();
