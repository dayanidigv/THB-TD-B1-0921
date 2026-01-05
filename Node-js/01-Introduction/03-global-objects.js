// ==========================================
// NODE.JS GLOBAL OBJECTS
// ==========================================

console.log("=== GLOBAL OBJECTS ===\n");

// 1. __dirname & __filename
console.log("Directory:", __dirname);
console.log("File:", __filename);

// 2. process
console.log("\nNode Version:", process.version);
console.log("Platform:", process.platform);

// ==========================================
// 4. process.env - Environment Variables
// ==========================================

console.log("\n4. Environment Variables:");
console.log("User:", process.env.USER || process.env.USERNAME);
console.log("Home Directory:", process.env.HOME || process.env.USERPROFILE);

// You can set custom environment variables
process.env.MY_CUSTOM_VAR = "Hello from Node.js";
console.log("Custom Variable:", process.env.MY_CUSTOM_VAR);

// ==========================================
// 5. process.argv - Command Line Arguments
// ==========================================

console.log("\n5. Command Line Arguments:");
console.log("All arguments:", process.argv);


// 3. Command Line Arguments
console.log("\nArguments:", process.argv);
if (process.argv.length > 2) {
  console.log("You passed:", process.argv.slice(2));
}

// 4. Timers
setTimeout(() => {
  console.log("\n⏰ After 1 second");
}, 1000);

// 5. Buffer
const buffer = Buffer.from("Hello");
console.log("\nBuffer:", buffer.toString());
