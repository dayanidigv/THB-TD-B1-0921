// ==========================================
// MONGOOSE POPULATE (References)
// ==========================================

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongoose_app");

// SCHEMAS
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  email: String
});

const bookSchema = new mongoose.Schema({
  title: String,
  price: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author"
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    rating: Number,
    comment: String
  }]
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const Author = mongoose.model("Author", authorSchema);
const Book = mongoose.model("Book", bookSchema);
const User = mongoose.model("User", userSchema);

async function runPopulateExamples() {
  try {
    console.log("\n=== MONGOOSE POPULATE ===\n");

    await Author.deleteMany({});
    await Book.deleteMany({});
    await User.deleteMany({});

    // CREATE DATA
    console.log("=== SETUP DATA ===");
    
    const author = await Author.create({
      name: "John Doe",
      bio: "Tech writer",
      email: "john@example.com"
    });

    const user = await User.create({
      name: "Alice",
      email: "alice@example.com"
    });

    const book = await Book.create({
      title: "MongoDB Mastery",
      price: 29.99,
      author: author._id,
      reviews: [
        { user: user._id, rating: 5, comment: "Excellent book!" }
      ]
    });

    console.log("✅ Created author, user, and book");

    // BASIC POPULATE
    console.log("\n=== BASIC POPULATE ===");
    const bookWithAuthor = await Book.findById(book._id).populate("author");
    console.log("Book:", bookWithAuthor.title);
    console.log("Author:", bookWithAuthor.author.name);

    // POPULATE SPECIFIC FIELDS
    console.log("\n=== POPULATE SELECT FIELDS ===");
    const bookWithAuthorFields = await Book.findById(book._id)
      .populate("author", "name email -_id");
    console.log("Author info:", bookWithAuthorFields.author);

    // POPULATE NESTED
    console.log("\n=== POPULATE NESTED ===");
    const bookWithReviews = await Book.findById(book._id)
      .populate("author")
      .populate("reviews.user", "name");
    console.log("Book:", bookWithReviews.title);
    console.log("Author:", bookWithReviews.author.name);
    console.log("Reviewer:", bookWithReviews.reviews[0].user.name);

    // POPULATE MULTIPLE
    console.log("\n=== POPULATE MULTIPLE ===");
    const bookWithAll = await Book.findById(book._id)
      .populate("author")
      .populate({ 
        path: "reviews.user",
        select: "name email"
      });
    console.log("Full data populated");

    // POPULATE WITH CONDITIONS
    console.log("\n=== POPULATE WITH FILTER ===");
    
    // Add more books
    await Book.create({
      title: "Node.js Guide",
      price: 24.99,
      author: author._id
    });

    const books = await Book.find({ price: { $gte: 25 } })
      .populate("author", "name");
    console.log("Expensive books with authors:");
    books.forEach(b => console.log(`- ${b.title} by ${b.author.name}`));

    // POPULATE ALL
    console.log("\n=== FIND AND POPULATE ===");
    const allBooks = await Book.find({}).populate("author");
    console.log("All books:");
    allBooks.forEach(b => console.log(`- ${b.title} by ${b.author.name}`));

    // VIRTUAL POPULATE
    console.log("\n=== REVERSE POPULATE ===");
    
    // Add virtual to author schema
    authorSchema.virtual("books", {
      ref: "Book",
      localField: "_id",
      foreignField: "author"
    });

    const Author2 = mongoose.model("Author", authorSchema);
    const authorWithBooks = await Author2.findById(author._id)
      .populate("books");
    
    if (authorWithBooks.books) {
      console.log(`${authorWithBooks.name}'s books:`, authorWithBooks.books.length);
    }

    console.log("\n✅ Populate Complete!");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

mongoose.connection.once("open", () => {
  console.log("✅ Mongoose connected!\n");
  runPopulateExamples();
});
