// ==========================================
// HTTP SERVER WITH ROUTES
// ==========================================

const http = require("http");

const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  // Home page
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome Home!</h1>");
  }
  
  // About page
  else if (url === "/about" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About Us</h1>");
  }
  
  // API endpoint
  else if (url === "/api/users" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ users: ["Alice", "Bob"] }));
  }
  
  // 404 Not Found
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Not Found</h1>");
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server at http://localhost:${PORT}/`);
  console.log("Routes:");
  console.log("  /         - Home");
  console.log("  /about    - About");
  console.log("  /api/users - Users API\n");
});
