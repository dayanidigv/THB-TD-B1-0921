// JSON - Store and Send Data

console.log("=== What is JSON? ===");
console.log("JSON = JavaScript Object Notation");
console.log("It's like a text message that looks like an object");
console.log("Used to send data between computers");

// Example 1: JavaScript Object vs JSON
console.log("\n=== Example 1: Object vs JSON ===");

// This is a JavaScript object
const person = {
    name: "John",
    age: 25,
    city: "New York"
};

// This is JSON (just text)
const jsonText = '{"name": "John", "age": 25, "city": "New York"}';

console.log("JavaScript Object:", person);
console.log("JSON Text:", jsonText);

// Example 2: Object to JSON
console.log("\n=== Example 2: Make JSON ===");

const student = {
    name: "Alice",
    age: 20,
    hobbies: ["reading", "music"]
};

const studentJSON = JSON.stringify(student);

console.log("Original:", student);
console.log("As JSON:", studentJSON);

// Example 3: JSON to Object
console.log("\n=== Example 3: Read JSON ===");

const jsonData = '{"name": "Bob", "age": 28, "city": "London"}';
const objectData = JSON.parse(jsonData);

console.log("JSON text:", jsonData);
console.log("As object:", objectData);
console.log("Name is:", objectData.name);

// Example 4: Real Example
console.log("\n=== Example 4: Real Example ===");

const userInfo = {
    id: 123,
    username: "johndoe",
    email: "john@email.com",
    isActive: true,
    friends: ["alice", "bob"]
};

console.log("User info:");
console.log(JSON.stringify(userInfo, null, 2));

// Example 5: Handle Errors
console.log("\n=== Example 5: Handle Errors ===");

function safeParseJSON(text) {
    try {
        const result = JSON.parse(text);
        console.log("Worked:", result);
        return result;
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}

// Test good and bad JSON
safeParseJSON('{"name": "Good"}');     // Good
safeParseJSON('{"name": "Bad"');       // Bad - missing }

// Simple Rules
console.log("\n=== Simple Rules ===");
console.log("1. JSON.stringify() = object to text");
console.log("2. JSON.parse() = text to object");
console.log("3. Always use try/catch with JSON.parse()");
console.log("4. JSON uses double quotes only");
console.log("5. JSON is everywhere - APIs, files, storage!");