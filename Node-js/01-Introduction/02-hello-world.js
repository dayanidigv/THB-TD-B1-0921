// ==========================================
// YOUR FIRST NODE.JS PROGRAM
// ==========================================

// Run with: node 02-hello-world.js

console.log("Hello, World!");
console.log("Welcome to Node.js!");

// Variables
const name = "Student";
const age = 25;

console.log(`\nHello ${name}! You are ${age} years old.`);

// Array
const languages = ["JavaScript", "Python", "Java"];
languages.forEach((lang, index) => {
  console.log(`${index + 1}. ${lang}`);
});

// Object
const student = {
  name: "Alex",
  course: "Node.js",
};
console.log(`\n${student.name} is learning ${student.course}`);

// Function
function greet(personName) {
  return `Hello, ${personName}!`;
}
console.log(greet("John"));

// Arrow function
const add = (a, b) => a + b;
console.log("5 + 3 =", add(5, 3));

console.log("\n✅ Completed!");
