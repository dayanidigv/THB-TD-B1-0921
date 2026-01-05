// ==========================================
// HTTP REQUESTS
// ==========================================

// 1. Using fetch (Node 18+)
async function fetchUser() {
  try {
    const response = await fetch("https://api.github.com/users/github");
    const data = await response.json();
    console.log("User:", data.login, "-", data.name);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

fetchUser();

// 2. POST Request
async function createPost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Hello", body: "World", userId: 1 }),
    });
    const data = await response.json();
    console.log("\nCreated:", data);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

setTimeout(() => createPost(), 1000);

// 3. Error Handling
async function fetchWithError() {
  try {
    const response = await fetch("https://api.github.com/users/invalid-user-123");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("\nError handled:", err.message);
  }
}

setTimeout(() => fetchWithError(), 2000);

console.log("\n✅ Requests sent!");
