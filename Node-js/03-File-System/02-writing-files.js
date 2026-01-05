// ==========================================
// WRITING FILES IN NODE.JS
// ==========================================

const fs = require("fs");

console.log("=== FILE WRITING ===\n");
 
// 1. Synchronous
try {
  fs.writeFileSync("output.txt", "Hello Node.js!\n");
  console.log("✓ Sync write completed");
} catch (err) {
  console.error("Error:", err.message);
}

// 2. Asynchronous (Callback)
fs.writeFile("async-output.txt", "Hello Async!\n", (err) => {
  if (err) return console.error("Error:", err.message);
  console.log("✓ Async write completed");
});

// 3. Async/Await (Best Practice)
async function writeFiles() {
  try {
    await fs.promises.writeFile("file.txt", "Hello!\n");
    await fs.promises.writeFile("file.txt", "Hello!\n");
    await fs.promises.writeFile("file.txt", "Hello!\n");
    await fs.promises.writeFile("file.txt", "Hello!\n");
    console.log("\n✓ Async/Await write completed");
    
    // Append to file
    await fs.promises.appendFile("file1.txt", "Appended line\n");
    await fs.promises.appendFile("file.txt", "Appended line\n");
    await fs.promises.appendFile("file1.txt", "Appended line\n");
    await fs.promises.appendFile("file.txt", "Appended line\n");
    await fs.promises.appendFile("file.txt", "Appended line\n");
    await fs.promises.appendFile("file.txt", "Appended line\n");
    await fs.promises.appendFile("file.txt", "Appended line\n");
    await fs.promises.appendFile("file.txt", "Appended line\n");
    await fs.promises.appendFile("file.txt", "Appended line\n");
    console.log("✓ Appended to file");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

setTimeout(() => writeFiles(), 100);

// 4. Writing JSON
setTimeout(async () => {
  const user = { name: "John", age: 30, email: "john@example.com" };
  try {
    await fs.promises.writeFile("user.json", JSON.stringify(user, null, 2));
    console.log("\n✓ JSON file created");
  } catch (err) {
    console.error("Error:", err.message);
  }
}, 200);

console.log("\n✅ Completed!");
