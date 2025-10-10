// APIs - Talk to Other Computers

console.log("=== What is an API? ===");
console.log("API = Application Programming Interface");
console.log("Like ordering food at a restaurant:");
console.log("- You (app) tell waiter (API) what you want");
console.log("- Waiter goes to kitchen (server) and brings food (data)");

// Example 1: Request Methods
console.log("\n=== Example 1: Request Methods ===");

console.log("GET = Get/Read data (like reading a book)");
console.log("POST = Create new data (like writing a new book)");
console.log("PUT = Update data (like editing a book)");
console.log("DELETE = Remove data (like throwing book away)");

// Example 2: Status Codes
console.log("\n=== Example 2: Status Codes ===");

console.log("200 = OK, everything worked!");
console.log("201 = Created new data successfully");
console.log("400 = Bad request (you made a mistake)");
console.log("401 = Need to login first");
console.log("404 = Data not found");
console.log("500 = Server is broken");

// Example 3: Simple GET Request
console.log("\n=== Example 3: Get Data ===");

async function getData() {
    try {
        console.log("Getting user data...");
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        console.log("Status:", response.status);
        
        if (response.ok) {
            const user = await response.json();
            console.log("User name:", user.name);
            console.log("User email:", user.email);
        } else {
            console.log("Failed to get data");
        }
        
    } catch (error) {
        console.log("Error:", error.message);
    }
}

// Example 4: Create New Data (POST)
console.log("\n=== Example 4: Create Data ===");

async function createPost() {
    try {
        console.log("Creating new post...");
        
        const newPost = {
            title: "My New Post",
            body: "This is my post content",
            userId: 1
        };
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost)
        });
        
        console.log("Status:", response.status);
        
        if (response.ok) {
            const result = await response.json();
            console.log("Created post ID:", result.id);
            console.log("Title:", result.title);
        }
        
    } catch (error) {
        console.log("Error:", error.message);
    }
}

// Example 5: Handle Different Results
console.log("\n=== Example 5: Handle Results ===");

async function checkStatus(url) {
    try {
        const response = await fetch(url);
        
        console.log("URL:", url);
        console.log("Status:", response.status);
        
        if (response.status === 200) {
            console.log("✅ Success!");
        } else if (response.status === 404) {
            console.log("❌ Not found!");
        } else if (response.status >= 500) {
            console.log("❌ Server problem!");
        } else {
            console.log("❌ Something went wrong!");
        }
        
    } catch (error) {
        console.log("❌ Network error:", error.message);
    }
}