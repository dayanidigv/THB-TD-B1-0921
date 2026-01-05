// ==========================================
// READING FILES IN NODE.JS
// ==========================================

const fs = require("fs");
const path = require("path");

var dir = __dirname
var file = __filename


console.log("Text File:", path.join(dir, "sample.txt"));

console.log("=== FILE READING ===\n");

// 1. Synchronous (Blocking)
try {
  const data = fs.readFileSync(path.join(dir, "sample.txt"), "utf8");
  console.log("Sync:", data);
} catch (err) {
  console.error("Error:", err.message);
}

// 2. Asynchronous (Callback)
fs.readFile("sample.txt", "utf8", (err, data) => {
  if (err) return console.error("Error:", err.message);
  console.log("\nAsync (Callback):", data);
});

// 3. Async/Await (Best Practice)
async function readFile() {
  try {
    const data = await fs.promises.readFile(path.join(dir, "data.json"), "utf8");
    console.log("\nAsync/Await:", data);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

setTimeout(() => readFile(), 100);

// 4. Check if file exists
setTimeout(() => {
  if (fs.existsSync(path.join(dir, "sample.txt"))) {
    console.log("\n✓ File exists");
    const stats = fs.statSync(path.join(dir, "sample.txt"));
    console.log("Size:", stats.size, "bytes");
  }
}, 200);

console.log("\n✅ Completed!");
