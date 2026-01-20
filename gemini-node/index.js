import "dotenv/config";
import { MongoClient } from "mongodb";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// --------------------
// MongoDB setup
// --------------------
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db("ai_demo");
const users = db.collection("users");

// --------------------
// SAFE backend tools
// --------------------
async function getUserByEmail({ email }) {
  console.log(`Fetching user with email: ${email}`);
  return await users.findOne(
    { email },
    { projection: { _id: 0 } }
  );
}

async function getUsersByRole({ role }) {
  console.log(`Fetching users with role: ${role}`);
  return await users.find(
    { role },
    { projection: { _id: 0 } }
  ).toArray();
}

async function createUser({ name, email, role }) {
  console.log(`Creating user: ${name}, ${email}, ${role}`);
  const result = await users.insertOne({ name, email, role });
  return { success: true, insertedId: result.insertedId.toString() };
}

async function updateUserRole({ email, newRole }) {
  console.log(`Updating role for ${email} to ${newRole}`);
  const result = await users.updateOne(
    { email },
    { $set: { role: newRole } }
  );
  return { 
    success: result.modifiedCount > 0, 
    modifiedCount: result.modifiedCount 
  };
}

// --------------------
// Gemini model
// --------------------
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0
});

// --------------------
// Tool schemas (LLM sees only these)
// --------------------
const tools = [
  {
    type: "function",
    function: {
      name: "getUserByEmail",
      description: "Fetch a user by email address",
      parameters: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "User email"
          }
        },
        required: ["email"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getUsersByRole",
      description: "Fetch all users with a specific role",
      parameters: {
        type: "object",
        properties: {
          role: {
            type: "string",
            description: "User role (e.g., admin, user, superuser, superuser)"
          }
        },
        required: ["role"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "createUser",
      description: "Create a new user in the database",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "User's full name"
          },
          email: {
            type: "string",
            description: "User's email address"
          },
          role: {
            type: "string",
            description: "User's role (e.g., admin, user, moderator)"
          }
        },
        required: ["name", "email", "role"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "updateUserRole",
      description: "Update the role of an existing user",
      parameters: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "Email of the user to update"
          },
          newRole: {
            type: "string",
            description: "New role to assign to the user"
          }
        },
        required: ["email", "newRole"]
      }
    }
  }
];

// --------------------
// User question
// --------------------
const userQuestion = "Show me Alice details.";

// --------------------
// Step 1: Gemini decides what to do
// --------------------
const aiResponse = await model.invoke(
  [
    {
      role: "system",
      content:
        "You are an assistant that uses tools to fetch data. Never guess."
    },
    {
      role: "user",
      content: userQuestion
    }
  ],
  { tools }
);

// --------------------
// Step 2: Check tool call
// --------------------
const functionCall = aiResponse.content?.find(item => item.type === 'functionCall');
console.log("\nAI Response:", JSON.stringify(aiResponse.content, null, 2));

if (!functionCall) {
  console.log("AI:", aiResponse.content);
  process.exit();
}

// --------------------
// Step 3: Execute tool SAFELY
// --------------------
let toolResult;

if (functionCall.functionCall.name === "getUserByEmail") {
  const args = functionCall.functionCall.args;
  toolResult = await getUserByEmail(args);
} else if (functionCall.functionCall.name === "getUsersByRole") {
  const args = functionCall.functionCall.args;
  toolResult = await getUsersByRole(args);
} else if (functionCall.functionCall.name === "createUser") {
  const args = functionCall.functionCall.args;
  toolResult = await createUser(args);
} else if (functionCall.functionCall.name === "updateUserRole") {
  const args = functionCall.functionCall.args;
  toolResult = await updateUserRole(args);
}

console.log("\nTool Result:", toolResult);
// --------------------
// Step 4: Send result back to Gemini
// --------------------
const finalAnswer = await model.invoke([
  {
    role: "user",
    content: userQuestion
  },
  {
    role: "assistant",
    content: aiResponse.content
  },
  {
    role: "user",
    content: `Here is the result of calling ${functionCall.functionCall.name}: ${JSON.stringify(toolResult)}`
  }
]);

console.log("\nUser:", userQuestion);
console.log("\nFinal AI Answer:");
console.log(finalAnswer.content);

// --------------------
await client.close();
