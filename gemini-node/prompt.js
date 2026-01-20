import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MongoClient } from "mongodb";
import readline from "readline";
import fs from "fs";
import path from "path";


// --------------------
// MongoDB setup
// --------------------
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db("ai_demo");
const users = db.collection("users");


async function getUsers() {
  return await users.find(
    {},
    { projection: { _id: 0 } }
  ).toArray();
}

// Initialize Gemini model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-3-flash-preview",
  apiKey: process.env.GOOGLE_API_KEY,
});

// Create readline interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to read pre-memory from text file
function loadPreMemory(filePath = "memory.txt") {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      console.log("✓ Pre-memory loaded from", filePath);
      return content;
    } else {
      console.log("ℹ No pre-memory file found. Using without context.");
      return "";
    }
  } catch (error) {
    console.error("Error loading pre-memory:", error.message);
    return "";
  }
}

// Function to get response from Gemini
async function getGeminiResponse(prompt, preMemory = "") {
  try {
    console.log("\n🤖 Gemini is thinking...\n");
    
    // Combine pre-memory with user prompt
    const fullPrompt = preMemory 
      ? `Context/Memory:\n${preMemory}\n\nUser Query:\n${prompt}`
      : prompt;
    
    const response = await model.invoke(fullPrompt);
    
    // Handle different response formats
    if (typeof response === 'string') {
      return response;
    } else if (response.content) {
      // If content is an array, join it
      if (Array.isArray(response.content)) {
        return response.content.map(item => 
          typeof item === 'string' ? item : item.text || JSON.stringify(item)
        ).join('\n');
      }
      return response.content;
    } else if (response.text) {
      return response.text;
    }
    
    return JSON.stringify(response);
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

// Main function
async function main() {
  // Load pre-memory from file
  const preMemorys = loadPreMemory("memory.txt");
  
  rl.question("Enter your prompt: ", async (prompt) => {
    if (!prompt.trim()) {
      console.log("Please enter a valid prompt.");
      rl.close();
      return;
    }

    var preMemory = "Our Users details : \n" + JSON.stringify(await getUsers()) + "\n Direct answer the prompt based on these details only. not other information.\n";

    console.log("Pre-Memory:", preMemory);

    const response = await getGeminiResponse(prompt, preMemory);
    
    if (response) {
      console.log("Response:", response);
    }
    
    rl.close();
  });
}

// Run the script
main();
