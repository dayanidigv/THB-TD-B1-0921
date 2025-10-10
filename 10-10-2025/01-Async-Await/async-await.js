// Async/Await - Wait for Things to Finish

console.log("=== What is Async/Await? ===");
console.log("Async/Await helps us wait for things to finish");
console.log("Like waiting for food to cook");

// Example 1: Simple Timer
console.log("\n=== Example 1: Simple Timer ===");

function wait(seconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Done waiting!");
        }, seconds * 1000);
    });
}

async function timerExample() {
    console.log("Starting timer...");
    
    const result = await wait(2);
    console.log(result);
    
    console.log("Timer finished!");
}

// Example 2: Get Data from Internet
console.log("\n=== Example 2: Get Data ===");

async function getData() {
    try {
        console.log("Getting data...");
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        
        console.log("Got title:", data.title);
        
    } catch (error) {
        console.log("Error:", error.message);
    }
}

// Example 3: Multiple Steps
console.log("\n=== Example 3: Multiple Steps ===");

async function multipleSteps() {
    try {
        console.log("Step 1: Starting...");
        await wait(1);
        console.log("Step 1: Done!");
        
        console.log("Step 2: Starting...");
        await wait(1);
        console.log("Step 2: Done!");
        
        console.log("All steps completed!");
        
    } catch (error) {
        console.log("Error:", error.message);
    }
}

// How to use
console.log("\n=== How to Run ===");
console.log("Uncomment these to test:");
console.log("// timerExample();");
console.log("// getData();");
console.log("// multipleSteps();");

// Simple Rules
console.log("\n=== Simple Rules ===");
console.log("1. async = function that waits");
console.log("2. await = wait for this to finish");
console.log("3. try/catch = handle errors");
console.log("4. Much easier than promises!");