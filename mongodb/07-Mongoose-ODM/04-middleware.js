// ==========================================
// MONGOOSE MIDDLEWARE (Hooks)
// ==========================================

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongoose_app");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number
}, { timestamps: true });

// PRE SAVE HOOK
userSchema.pre("save", function(next) {
  console.log(`⏳ About to save: ${this.name}`);
  
  // Example: Hash password before saving
  if (this.isModified("password")) {
    this.password = `hashed_${this.password}`;
  }
  
  next();
});

// POST SAVE HOOK
userSchema.post("save", function(doc) {
  console.log(`✅ Saved: ${doc.name} (ID: ${doc._id})`);
});

// PRE FIND HOOK
userSchema.pre("find", function(next) {
  console.log("⏳ About to execute find query");
  this.start = Date.now();
  next();
});

// POST FIND HOOK
userSchema.post("find", function(docs) {
  console.log(`✅ Found ${docs.length} documents in ${Date.now() - this.start}ms`);
});

// PRE UPDATE HOOK
userSchema.pre("updateOne", function(next) {
  console.log("⏳ About to update document");
  this.set({ updatedAt: new Date() });
  next();
});

// PRE DELETE HOOK
userSchema.pre("deleteOne", { document: true, query: false }, function(next) {
  console.log(`⏳ About to delete: ${this.name}`);
  next();
});

// POST DELETE HOOK
userSchema.post("deleteOne", { document: true, query: false }, function(doc) {
  console.log(`✅ Deleted: ${doc.name}`);
});

// ERROR HANDLING HOOK
userSchema.post("save", function(error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Email already exists"));
  } else {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

async function runMiddlewareExamples() {
  try {
    console.log("\n=== MONGOOSE MIDDLEWARE ===\n");

    await User.deleteMany({});

    // SAVE MIDDLEWARE
    console.log("=== SAVE HOOKS ===");
    const user1 = new User({
      name: "Alice",
      email: "alice@example.com",
      password: "secret123",
      age: 25
    });
    await user1.save();
    console.log("Password hashed:", user1.password);

    // FIND MIDDLEWARE
    console.log("\n=== FIND HOOKS ===");
    await User.create({ name: "Bob", email: "bob@example.com", age: 30 });
    await User.find({});

    // UPDATE MIDDLEWARE
    console.log("\n=== UPDATE HOOKS ===");
    await User.updateOne({ name: "Alice" }, { age: 26 });

    // DELETE MIDDLEWARE
    console.log("\n=== DELETE HOOKS ===");
    const userToDelete = await User.findOne({ name: "Bob" });
    await userToDelete.deleteOne();

    // VALIDATION HOOK
    console.log("\n=== VALIDATION HOOKS ===");
    
    userSchema.pre("validate", function(next) {
      console.log("⏳ Validating document");
      next();
    });

    userSchema.post("validate", function(doc) {
      console.log("✅ Validation passed");
    });

    const user2 = new User({
      name: "Charlie",
      email: "charlie@example.com"
    });
    await user2.validate();

    // AGGREGATE MIDDLEWARE
    console.log("\n=== AGGREGATE HOOKS ===");
    
    userSchema.pre("aggregate", function(next) {
      console.log("⏳ About to aggregate");
      next();
    });

    await User.aggregate([
      { $match: { age: { $gte: 25 } } }
    ]);

    console.log("\n✅ Middleware Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

mongoose.connection.once("open", () => {
  console.log("✅ Mongoose connected!\n");
  runMiddlewareExamples();
});
