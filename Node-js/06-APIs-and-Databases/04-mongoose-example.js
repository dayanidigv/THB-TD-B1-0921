// ==========================================
// MONGOOSE (MongoDB ODM)
// ==========================================

// Install: npm install mongoose

const mongoose = require("mongoose");

// Connect
mongoose.connect("mongodb://localhost:27017/nodejs_app");

// Define Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Create Model
const User = mongoose.model("User", userSchema);

// Run examples
async function main() {
  try {
    console.log("=== MONGOOSE ===\n");

    // 1. Create
    const user = await User.create({
      name: "Bob",
      email: "bob@example.com",
      age: 30,
    });
    console.log("1. Created:", user.name);

    // 2. Find All
    const users = await User.find({});
    console.log("\n2. All users:", users.length);

    // 3. Find One
    const foundUser = await User.findOne({ name: "Bob" });
    console.log("\n3. Found:", foundUser?.email);

    // 4. Update
    await User.updateOne({ name: "Bob" }, { age: 31 });
    console.log("\n4. Updated");

    // 5. Delete
    await User.deleteOne({ name: "Bob" });
    console.log("\n5. Deleted");

    console.log("\n✅ Done!");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

mongoose.connection.once("open", () => {
  console.log("✅ Connected!\n");
  main();
});
