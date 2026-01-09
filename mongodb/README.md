# MongoDB Examples - Complete Guide

Basic to Advanced MongoDB concepts with practical examples.

## 📚 Folder Structure

Each topic is in its own folder with dedicated examples:

### Basic Concepts
1. **01-CRUD-Operations/** - Create, Read, Update, Delete operations
2. **02-Query-Filtering/** - Queries, filters, sorting, pagination
3. **03-Aggregation-Pipeline/** - Aggregation framework with examples

### Intermediate Concepts
4. **04-Indexes-Performance/** - Indexing strategies and performance optimization
5. **05-Relationships/** - Embedded vs Referenced documents, relationships

### Advanced Concepts
6. **06-Transactions/** - ACID transactions and multi-document operations
7. **07-Mongoose-ODM/** - Complete Mongoose ODM guide
8. **08-Advanced-Features/** - Text search, geospatial, TTL, validation

## 🚀 Quick Start

### Prerequisites
```bash
# Install MongoDB
brew install mongodb-community  # macOS
# or download from mongodb.com

# Install Node.js dependencies
npm install mongodb mongoose
```

### Start MongoDB
```bash
# Start MongoDB service
brew services start mongodb-community  # macOS
# or
mongod
```

### Run Examples
```bash
# Navigate to any topic folder and run the example
cd 01-CRUD-Operations && node crud.js
cd 02-Query-Filtering && node queries.js
cd 03-Aggregation-Pipeline && node aggregation.js
# ... etc
```

## 📖 Learning Path

### Beginner
- Start with `01-CRUD-Operations/` - Learn basic database operations
- Move to `02-Query-Filtering/` - Master querying and filtering
- Practice `03-Aggregation-Pipeline/` - Understand data aggregation

### Intermediate
- Study `04-Indexes-Performance/` - Optimize queries with indexes
- Learn `05-Relationships/` - Design data relationships

### Advanced
- Explore `06-Transactions/` - Handle complex operations safely
- Master `07-Mongoose-ODM/` - Use Mongoose ODM
- Review `08-Advanced-Features/` - Advanced MongoDB features

## 🎯 Key Concepts Covered

### CRUD Operations
- insertOne, insertMany
- find, findOne
- updateOne, updateMany
- deleteOne, deleteMany

### Queries & Filters
- Comparison operators ($gt, $lt, $gte, $lte, $ne, $in)
- Logical operators ($and, $or, $not)
- Sorting, limiting, pagination
- Projection (field selection)
- Regular expressions

### Aggregation
- $match, $group, $project
- $sort, $limit, $skip
- $lookup (joins)
- $unwind, $addFields
- Statistical operations

### Indexes
- Single field indexes
- Compound indexes
- Text indexes
- Unique indexes
- Partial indexes
- Performance analysis

### Relationships
- Embedded documents
- Referenced documents
- One-to-One, One-to-Many, Many-to-Many
- Tree structures

### Transactions
- ACID properties
- Multi-document operations
- Rollback handling

### Mongoose ODM
- Schema definition
- Validation
- Middleware (hooks)
- Virtual properties
- Population (joins)
- Static and instance methods

### Advanced Features
- Text search
- Geospatial queries
- TTL indexes
- Bulk operations
- Array operators
- Schema validation
- Capped collections

## 💡 Tips

1. **Always start MongoDB** before running examples
2. **Comment/uncomment** code sections to run specific examples
3. **Read the console output** to understand what's happening
4. **Experiment** by modifying the code
5. **Check MongoDB Compass** for visual database inspection

## 🔗 Useful Commands

```bash
# MongoDB Shell
mongosh

# Show databases
show dbs

# Use database
use learn_db

# Show collections
show collections

# Drop database
db.dropDatabase()
```

## 📦 Dependencies

```json
{
  "mongodb": "^6.0.0",
  "mongoose": "^8.0.0"
}
```

## 🛠️ Troubleshooting

**MongoDB not starting?**
- Check if port 27017 is available
- Try: `brew services restart mongodb-community`

**Connection errors?**
- Ensure MongoDB is running
- Check connection URI: `mongodb://localhost:27017`

**Transactions not working?**
- Transactions require MongoDB Replica Set
- Not available in standalone mode

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB University](https://university.mongodb.com/)

---

Happy Learning! 🎉
