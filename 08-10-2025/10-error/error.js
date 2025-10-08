// Simple Try, Catch, Finally Examples

console.log("=== Example 1: Basic Try-Catch ===");

// Basic try-catch
try {
    console.log("This code will work fine");
    console.log(undefinedVariable); // This will cause an error
} catch (error) {
    console.log("Error caught:", error.message);
}

console.log("\n=== Example 2: Try-Catch-Finally ===");

// Try-catch-finally
try {
    console.log("Running some code...");
    throw new Error("Something went wrong!");
} catch (error) {
    console.log("Error:", error.message);
} finally {
    console.log("This always runs!");
}

console.log("\n=== Example 3: Division by Zero ===");

// Safe division
function safeDivision(a, b) {
    try {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        let result = a / b;
        console.log("Result:", result);
        return result;
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    } finally {
        console.log("Division attempt completed");
    }
}

safeDivision(10, 2);  // Works fine
safeDivision(10, 0);  // Throws error

console.log("\n=== Example 4: JSON Parsing ===");

// Safe JSON parsing
function parseJSON(jsonString) {
    try {
        let data = JSON.parse(jsonString);
        console.log("Parsed successfully:", data);
    } catch (error) {
        console.log("Invalid JSON:", error.message);
    } finally {
        console.log("JSON parsing done");
    }
}

parseJSON('{"name": "John"}');  // Valid JSON
parseJSON('invalid json');      // Invalid JSON

console.log("\n=== All Examples Done ===");
