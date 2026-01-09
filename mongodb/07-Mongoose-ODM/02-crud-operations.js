// ==========================================
// MONGOOSE CRUD OPERATIONS
// ==========================================

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongoose_app");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number,
  role: { type: String, default: "user" }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

async function runCrudExamples() {
  try {
    console.log("\n=== MONGOOSE CRUD ===\n");

    await User.deleteMany({});

    // CREATE
    console.log("=== CREATE ===");
    
    // Single create
    const user1 = await User.create({
      name: "Alice",
      email: "alice@example.com",
      age: 25
    });
    console.log("Created:", user1.name);

    // Bulk create
    const users = await User.insertMany([
      { name: "Bob", email: "bob@example.com", age: 30 },
      { name: "Charlie", email: "charlie@example.com", age: 35 },
      { name: "Diana", email: "diana@example.com", age: 28 }
    ]);
    console.log(`Created ${users.length} users`);

    // READ
    console.log("\n=== READ ===");
    
    // Find all
    const allUsers = await User.find({});
    console.log("Total users:", allUsers.length);

    // Find one
    const alice = await User.findOne({ name: "Alice" });
    console.log("Found:", alice?.name);

    // Find by ID
    const byId = await User.findById(alice._id);
    console.log("By ID:", byId?.name);

    // Find with conditions
    const adults = await User.find({ age: { $gte: 30 } });
    console.log("Age 30+:", adults.length);

    // Select specific fields
    const names = await User.find({}).select("name email -_id");
    console.log("Names:", names.map(u => u.name).join(", "));

    // Sort and limit
    const top2 = await User.find({}).sort({ age: -1 }).limit(2);
    console.log("Oldest 2:", top2.map(u => `${u.name}(${u.age})`).join(", "));

    // UPDATE
    console.log("\n=== UPDATE ===");
    
    // Update one
    await User.updateOne({ name: "Bob" }, { age: 31, role: "moderator" });
    console.log("Updated Bob");

    // Update many
    await User.updateMany({ age: { $lt: 30 } }, { $set: { role: "junior" } });
    console.log("Updated junior users");

    // Find and update (returns new document)
    const updated = await User.findOneAndUpdate(
      { name: "Charlie" },
      { age: 36 },
      { new: true } // Return updated document
    );
    console.log("Updated Charlie, new age:", updated.age);

    // Find by ID and update
    const updatedById = await User.findByIdAndUpdate(
      alice._id,
      { role: "admin" },
      { new: true }
    );
    console.log("Updated Alice role:", updatedById.role);

    // DELETE
    console.log("\n=== DELETE ===");
    
    // Delete one
    await User.deleteOne({ name: "Bob" });
    console.log("Deleted Bob");

    // Find and delete
    const deleted = await User.findOneAndDelete({ name: "Diana" });
    console.log("Deleted:", deleted?.name);

    // Find by ID and delete
    const deletedById = await User.findByIdAndDelete(alice._id);
    console.log("Deleted by ID:", deletedById?.name);

    // COUNT
    console.log("\n=== COUNT ===");
    const count = await User.countDocuments();
    console.log("Remaining users:", count);

    // EXISTS
    const exists = await User.exists({ name: "Charlie" });
    console.log("Charlie exists:", !!exists);

    console.log("\n✅ CRUD Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

mongoose.connection.once("open", () => {
  console.log("✅ Mongoose connected!\n");
  runCrudExamples();
});
