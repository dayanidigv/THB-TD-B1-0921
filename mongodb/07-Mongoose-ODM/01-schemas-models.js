// ==========================================
// MONGOOSE SCHEMAS & MODELS
// ==========================================

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongoose_app");

// BASIC SCHEMA
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"],
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
  },
  age: { 
    type: Number, 
    min: [18, "Must be at least 18"],
    max: 120
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user"
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true // Adds createdAt & updatedAt automatically
});

// Create Model
const User = mongoose.model("User", userSchema);

// SCHEMA WITH NESTED OBJECTS
const profileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  profile: {
    bio: String,
    avatar: String,
    social: {
      twitter: String,
      github: String
    }
  },
  address: {
    street: String,
    city: String,
    country: String,
    zip: String
  }
});

const Profile = mongoose.model("Profile", profileSchema);

// RUN EXAMPLES
async function runSchemaExamples() {
  try {
    console.log("\n=== MONGOOSE SCHEMAS ===\n");

    await User.deleteMany({});
    await Profile.deleteMany({});

    // CREATE with validation
    console.log("=== CREATE USER ===");
    const user = await User.create({
      name: "Alice",
      email: "alice@example.com",
      age: 25,
      role: "admin",
      tags: ["developer", "designer"]
    });
    console.log("✅ Created:", user.name);

    // VALIDATION ERROR
    console.log("\n=== VALIDATION ===");
    try {
      await User.create({ 
        name: "X", // Too short
        email: "invalid-email" 
      });
    } catch (error) {
      console.log("❌ Validation failed:");
      console.log("- Name:", error.errors.name?.message);
      console.log("- Email:", error.errors.email?.message);
    }

    // NESTED OBJECT
    console.log("\n=== NESTED SCHEMA ===");
    const profile = await Profile.create({
      username: "alice_dev",
      profile: {
        bio: "Full-stack developer",
        social: {
          twitter: "@alice",
          github: "alice-codes"
        }
      },
      address: {
        city: "NYC",
        country: "USA"
      }
    });
    console.log("✅ Created profile:", profile.username);

    // SCHEMA TYPES
    console.log("\n=== SCHEMA TYPES ===");
    console.log("String:", typeof user.name);
    console.log("Number:", typeof user.age);
    console.log("Boolean:", typeof user.isActive);
    console.log("Date:", user.createdAt instanceof Date);
    console.log("Array:", Array.isArray(user.tags));

    console.log("\n✅ Schemas Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

mongoose.connection.once("open", () => {
  console.log("✅ Mongoose connected!\n");
  runSchemaExamples();
});
