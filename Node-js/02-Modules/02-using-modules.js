// ==========================================
// IMPORTING AND USING MODULES
// ==========================================

console.log("=== USING COMMONJS MODULES ===\n");

// ==========================================
// METHOD 1: Import Everything
// ==========================================

const math = require("./01-math-module");

console.log("1. Using imported module:");
console.log("   App Name:", math.appName);
console.log("   Version:", math.version);
console.log("   Greeting:", math.greet("Alice"));
console.log("   5 + 3 =", math.add(5, 3));
console.log("   5 × 3 =", math.multiply(5, 3));

// ==========================================
// METHOD 2: Destructuring Import
// ==========================================

const { greet, add, multiply, config } = require("./01-math-module");

console.log("\n2. Using destructured imports:");
console.log("   Greeting:", greet("Bob"));
console.log("   10 + 20 =", add(10, 20));
console.log("   10 × 20 =", multiply(10, 20));
console.log("   Config:", config);

// ==========================================
// IMPORTING BUILT-IN MODULES
// ==========================================

// Node.js comes with many built-in modules
// No need for npm install!

// 1. path module - working with file paths
const path = require("path");

console.log("\n3. Using 'path' module:");
console.log("   Filename:", path.basename(__filename));
console.log("   Extension:", path.extname(__filename));
console.log("   Directory:", path.dirname(__filename));

// Join paths correctly (handles OS differences)
const filePath = path.join(__dirname, "data", "users.json");
console.log("   Joined path:", filePath);

// 2. os module - operating system info
const os = require("os");

console.log("\n4. Using 'os' module:");
console.log("   Platform:", os.platform());
console.log("   CPU Architecture:", os.arch());
console.log("   Total Memory:", Math.round(os.totalmem() / 1024 / 1024 / 1024), "GB");
console.log("   Free Memory:", Math.round(os.freemem() / 1024 / 1024 / 1024), "GB");
console.log("   Home Directory:", os.homedir());

// 3. url module - working with URLs
const url = require("url");

console.log("\n5. Using 'url' module:");
const myUrl = new URL("https://example.com:8080/path?name=John&age=30");
console.log("   Protocol:", myUrl.protocol);
console.log("   Hostname:", myUrl.hostname);
console.log("   Port:", myUrl.port);
console.log("   Pathname:", myUrl.pathname);
console.log("   Search params:", myUrl.searchParams.get("name"));

// 4. util module - utility functions
const util = require("util");

console.log("\n6. Using 'util' module:");
const obj = { name: "Alice", age: 25, skills: ["JS", "Node.js"] };
console.log("   Formatted object:", util.inspect(obj, { colors: true }));

// ==========================================
// CACHING: Modules are cached!
// ==========================================

console.log("\n7. Module Caching:");
const math1 = require("./01-math-module");
const math2 = require("./01-math-module");
console.log("   Same module instance?", math1 === math2); // true
console.log("   (Modules are loaded once and cached)");

// ==========================================
// require.resolve() - Find module path
// ==========================================

console.log("\n8. Finding module paths:");
try {
  const modulePath = require.resolve("./01-math-module");
  console.log("   Math module path:", modulePath);
} catch (err) {
  console.log("   Error finding module:", err.message);
}

// ==========================================
// CIRCULAR DEPENDENCIES (Avoid if possible!)
// ==========================================

console.log("\n9. Module Resolution:");
console.log("   Node.js looks for modules in this order:");
console.log("   1. Core modules (fs, path, http, etc.)");
console.log("   2. File modules (./module.js, ../module.js)");
console.log("   3. Folder modules (./folder/index.js)");
console.log("   4. node_modules folder");

// ==========================================
// TRY IT YOURSELF!
// ==========================================

console.log("\n=== PRACTICE EXERCISES ===");

// TODO: Import the 'crypto' module and generate a random UUID
// TODO: Import the 'querystring' module and parse: "name=John&age=30"
// TODO: Create your own module with helper functions
// TODO: Use path.parse() to break down a file path

console.log("\n✅ Module usage demonstration completed!");
