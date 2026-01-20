import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { MongoClient, ObjectId } from "mongodb"

const server = new McpServer({
  name: "MongoDB MCP Server",
  version: "1.0.0",
})

// MongoDB connection
let client = null
let db = null

async function connectToMongoDB(uri, dbName) {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
    db = client.db(dbName)
  }
  return db
}

// Tool: Connect to MongoDB
server.tool(
  "mongo_connect",
  "Connect to a MongoDB database",
  {
    uri: z.string().describe("MongoDB connection URI (e.g., mongodb://localhost:27017)"),
    database: z.string().describe("Database name to connect to"),
  },
  async ({ uri, database }) => {
    try {
      await connectToMongoDB(uri, database)
      return {
        content: [{ type: "text", text: `Successfully connected to database: ${database}` }],
      }
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error connecting to MongoDB: ${error.message}` }],
        isError: true,
      }
    }
  }
)

// Tool: Find documents
server.tool(
  "mongo_find",
  "Find documents in a MongoDB collection",
  {
    collection: z.string().describe("Collection name"),
    query: z.string().describe("Query filter as JSON string (e.g., '{\"name\": \"John\"}')"),
    limit: z.number().optional().describe("Maximum number of documents to return"),
  },
  async ({ collection, query, limit }) => {
    try {
      if (!db) {
        return {
          content: [{ type: "text", text: "Not connected to MongoDB. Use mongo_connect first." }],
          isError: true,
        }
      }
      const filter = JSON.parse(query)
      const coll = db.collection(collection)
      const cursor = limit ? coll.find(filter).limit(limit) : coll.find(filter)
      const documents = await cursor.toArray()
      return {
        content: [{ type: "text", text: JSON.stringify(documents, null, 2) }],
      }
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error finding documents: ${error.message}` }],
        isError: true,
      }
    }
  }
)

// Tool: Insert document
server.tool(
  "mongo_insert",
  "Insert a document into a MongoDB collection",
  {
    collection: z.string().describe("Collection name"),
    document: z.string().describe("Document to insert as JSON string"),
  },
  async ({ collection, document }) => {
    try {
      if (!db) {
        return {
          content: [{ type: "text", text: "Not connected to MongoDB. Use mongo_connect first." }],
          isError: true,
        }
      }
      const doc = JSON.parse(document)
      const coll = db.collection(collection)
      const result = await coll.insertOne(doc)
      return {
        content: [{ type: "text", text: `Document inserted with ID: ${result.insertedId}` }],
      }
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error inserting document: ${error.message}` }],
        isError: true,
      }
    }
  }
)

// Tool: Update documents
server.tool(
  "mongo_update",
  "Update documents in a MongoDB collection",
  {
    collection: z.string().describe("Collection name"),
    filter: z.string().describe("Filter to match documents as JSON string"),
    update: z.string().describe("Update operations as JSON string (e.g., '{\"$set\": {\"age\": 30}}')"),
  },
  async ({ collection, filter, update }) => {
    try {
      if (!db) {
        return {
          content: [{ type: "text", text: "Not connected to MongoDB. Use mongo_connect first." }],
          isError: true,
        }
      }
      const filterObj = JSON.parse(filter)
      const updateObj = JSON.parse(update)
      const coll = db.collection(collection)
      const result = await coll.updateMany(filterObj, updateObj)
      return {
        content: [{ type: "text", text: `Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}` }],
      }
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error updating documents: ${error.message}` }],
        isError: true,
      }
    }
  }
)

// Tool: Delete documents
server.tool(
  "mongo_delete",
  "Delete documents from a MongoDB collection",
  {
    collection: z.string().describe("Collection name"),
    filter: z.string().describe("Filter to match documents as JSON string"),
  },
  async ({ collection, filter }) => {
    try {
      if (!db) {
        return {
          content: [{ type: "text", text: "Not connected to MongoDB. Use mongo_connect first." }],
          isError: true,
        }
      }
      const filterObj = JSON.parse(filter)
      const coll = db.collection(collection)
      const result = await coll.deleteMany(filterObj)
      return {
        content: [{ type: "text", text: `Deleted ${result.deletedCount} document(s)` }],
      }
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error deleting documents: ${error.message}` }],
        isError: true,
      }
    }
  }
)

// Tool: Aggregate
server.tool(
  "mongo_aggregate",
  "Run an aggregation pipeline on a MongoDB collection",
  {
    collection: z.string().describe("Collection name"),
    pipeline: z.string().describe("Aggregation pipeline as JSON string array"),
  },
  async ({ collection, pipeline }) => {
    try {
      if (!db) {
        return {
          content: [{ type: "text", text: "Not connected to MongoDB. Use mongo_connect first." }],
          isError: true,
        }
      }
      const pipelineArray = JSON.parse(pipeline)
      const coll = db.collection(collection)
      const result = await coll.aggregate(pipelineArray).toArray()
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      }
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error running aggregation: ${error.message}` }],
        isError: true,
      }
    }
  }
)

// Tool: List collections
server.tool(
  "mongo_list_collections",
  "List all collections in the connected database",
  {},
  async ({}) => {
    try {
      if (!db) {
        return {
          content: [{ type: "text", text: "Not connected to MongoDB. Use mongo_connect first." }],
          isError: true,
        }
      }
      const collections = await db.listCollections().toArray()
      const collectionNames = collections.map(c => c.name)
      return {
        content: [{ type: "text", text: JSON.stringify(collectionNames, null, 2) }],
      }
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error listing collections: ${error.message}` }],
        isError: true,
      }
    }
  }
)

// Prompt: Generate MongoDB query
server.prompt(
  "generate_mongo_query",
  "Generate a MongoDB query based on natural language description",
  {
    description: z.string().describe("Natural language description of what to query"),
    collection: z.string().describe("Collection name"),
  },
  async ({ description, collection }) => ({
    messages: [
      {
        role: "assistant",
        content: {
          type: "text",
          text: "You are a MongoDB expert assistant. Generate MongoDB queries based on user descriptions.",
        },
      },
      {
        role: "user",
        content: {
          type: "text",
          text: `Generate a MongoDB query for the collection "${collection}" to: ${description}`,
        },
      },
    ],
  })
)

const transport = new StdioServerTransport()
await server.connect(transport)

// Cleanup on exit
process.on("SIGINT", async () => {
  if (client) {
    await client.close()
  }
  process.exit(0)
})