// ==========================================
// EXPRESS.JS BASIC
// ==========================================

// Install: npm install express

const express = require("express");
const app = express();

function welcome(req, res) {
  console.log(`📨 ${req.method} ${req.url}`);
  console.log("Req headers:", req.headers);
  res.send("<h1>Welcome to Express!</h1>");
}

// 1. Routes
app.get("/", welcome);

app.post("/", (req, res) => {
  res.send("<h1>POST request received!</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
});

// 2. JSON API
app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  res.json({ success: true, users });
});

// 3. Route Parameters
app.get("/user/:id", (req, res) => {
  res.json({ userId: req.params.id });
});

// 4. Query Parameters
app.get("/search", (req, res) => {
  res.json({ query: req.query.q });
});

// 5. 404 Handler
app.use((req, res) => {
  res.status(404).send("<h1>404 - Not Found</h1>");
});

// Start server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`🚀 Express server at http://localhost:${PORT}/`);
});
