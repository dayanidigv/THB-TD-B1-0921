// ==========================================
// MONGOOSE VIRTUALS & METHODS
// ==========================================

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongoose_app");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  dateOfBirth: Date
}, { timestamps: true });

// VIRTUAL PROPERTIES (not stored in DB)
userSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("fullName").set(function(name) {
  const parts = name.split(" ");
  this.firstName = parts[0];
  this.lastName = parts[1];
});

userSchema.virtual("ageGroup").get(function() {
  if (this.age < 18) return "Minor";
  if (this.age < 65) return "Adult";
  return "Senior";
});

// INSTANCE METHODS
userSchema.methods.getFullInfo = function() {
  return `${this.fullName} (${this.email}) - ${this.ageGroup}`;
};

userSchema.methods.isAdult = function() {
  return this.age >= 18;
};

userSchema.methods.calculateAge = function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// STATIC METHODS
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

userSchema.statics.findAdults = function() {
  return this.find({ age: { $gte: 18 } });
};

userSchema.statics.findByAgeRange = function(min, max) {
  return this.find({ age: { $gte: min, $lte: max } });
};

// QUERY HELPERS
userSchema.query.byEmail = function(email) {
  return this.where({ email });
};

userSchema.query.adults = function() {
  return this.where({ age: { $gte: 18 } });
};

const User = mongoose.model("User", userSchema);

async function runVirtualsMethodsExamples() {
  try {
    console.log("\n=== MONGOOSE VIRTUALS & METHODS ===\n");

    await User.deleteMany({});

    // CREATE USERS
    await User.insertMany([
      { firstName: "Alice", lastName: "Smith", email: "alice@example.com", age: 25 },
      { firstName: "Bob", lastName: "Johnson", email: "bob@example.com", age: 17 },
      { firstName: "Charlie", lastName: "Brown", email: "charlie@example.com", age: 70 },
      { 
        firstName: "Diana", 
        lastName: "Wilson", 
        email: "diana@example.com", 
        dateOfBirth: new Date("1995-06-15")
      }
    ]);

    // VIRTUAL GETTERS
    console.log("=== VIRTUAL GETTERS ===");
    const alice = await User.findOne({ firstName: "Alice" });
    console.log("Full name:", alice.fullName);
    console.log("Age group:", alice.ageGroup);

    // VIRTUAL SETTERS
    console.log("\n=== VIRTUAL SETTERS ===");
    const user = new User();
    user.fullName = "John Doe";
    console.log("First name:", user.firstName);
    console.log("Last name:", user.lastName);

    // INSTANCE METHODS
    console.log("\n=== INSTANCE METHODS ===");
    const bob = await User.findOne({ firstName: "Bob" });
    console.log("Full info:", alice.getFullInfo());
    console.log("Is Alice adult?", alice.isAdult());
    console.log("Is Bob adult?", bob.isAdult());

    const diana = await User.findOne({ firstName: "Diana" });
    console.log("Diana's calculated age:", diana.calculateAge());

    // STATIC METHODS
    console.log("\n=== STATIC METHODS ===");
    
    const foundByEmail = await User.findByEmail("alice@example.com");
    console.log("Found by email:", foundByEmail?.fullName);

    const adults = await User.findAdults();
    console.log("Adults:", adults.map(u => u.fullName).join(", "));

    const youngAdults = await User.findByAgeRange(18, 30);
    console.log("Young adults:", youngAdults.map(u => u.fullName).join(", "));

    // QUERY HELPERS
    console.log("\n=== QUERY HELPERS ===");
    
    const userByEmail = await User.find().byEmail("bob@example.com");
    console.log("Query helper result:", userByEmail[0]?.fullName);

    const adultsQuery = await User.find().adults();
    console.log("Adults (query helper):", adultsQuery.map(u => u.fullName).join(", "));

    // CHAINING QUERY HELPERS
    console.log("\n=== CHAINING ===");
    const result = await User.find().adults().sort({ age: -1 });
    console.log("Adults sorted by age:");
    result.forEach(u => console.log(`- ${u.fullName}: ${u.age}`));

    // VIRTUALS IN JSON/Object
    console.log("\n=== VIRTUALS IN OUTPUT ===");
    userSchema.set("toJSON", { virtuals: true });
    userSchema.set("toObject", { virtuals: true });
    
    const userJson = alice.toJSON();
    console.log("User JSON includes virtuals:", !!userJson.fullName);

    console.log("\n✅ Virtuals & Methods Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

mongoose.connection.once("open", () => {
  console.log("✅ Mongoose connected!\n");
  runVirtualsMethodsExamples();
});
