// ==========================================
// COMMONJS MODULE SYSTEM
// ==========================================

// In Node.js, each file is a separate module
// You can export values, functions, objects, etc.

console.log("=== EXPORTING WITH COMMONJS ===\n");

// ==========================================
// METHOD 1: Exporting Individual Items
// ==========================================

// Export a simple variable
exports.appName = "My Node.js App";
exports.version = "1.0.0";

// Export a function
exports.greet = function(name) {
  return `Hello, ${name}!`;
};

// Export an arrow function
exports.add = (a, b) => a + b;
exports.multiply = (a, b) => a * b;

// ==========================================
// METHOD 2: Exporting an Object
// ==========================================

// You can also export a single object with multiple properties
const config = {
  port: 3000,
  host: "localhost",
  database: {
    name: "mydb",
    user: "admin"
  }
};

exports.config = config;

// ==========================================
// METHOD 3: module.exports (Complete Override)
// ==========================================

// This is COMMENTED OUT because it would override everything above
// Uncomment ONE of these examples to see how it works:

// Example A: Export a single function
/*
module.exports = function(name) {
  return `Welcome, ${name}!`;
};
*/

// Example B: Export an object
/*
module.exports = {
  name: "Calculator",
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};
*/

// Example C: Export a class
/*
module.exports = class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  introduce() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  }
};
*/

// ==========================================
// UNDERSTANDING exports vs module.exports
// ==========================================

/*
KEY POINTS:
1. `exports` is a reference to `module.exports`
2. `module.exports` is what actually gets exported
3. You can use `exports.something` to add properties
4. If you use `module.exports = ...`, it replaces everything
5. NEVER do: exports = {...} (this breaks the reference!)

RULE OF THUMB:
- Use `exports.x` when exporting multiple things
- Use `module.exports` when exporting ONE thing (function, class, object)
*/

// ==========================================
// WHAT GETS EXPORTED?
// ==========================================

console.log("This module exports:");
console.log("- appName (string)");
console.log("- version (string)");
console.log("- greet (function)");
console.log("- add (function)");
console.log("- multiply (function)");
console.log("- config (object)");

console.log("\nTo use this module, import it in another file!");
console.log("Example: const math = require('./math-module');");
