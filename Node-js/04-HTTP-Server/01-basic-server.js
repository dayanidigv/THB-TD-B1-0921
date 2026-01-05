// ==========================================
// BASIC HTTP SERVER
// ==========================================

const http = require("http");


// Create server
const server = http.createServer((req, res) => {
  console.log(`📨 ${req.method} ${req.url}`);

  if (req.url === "/favicon.ico") {
    res.writeHead(204);
    res.end();
    return;
  }

  else if (req.url === "/error") {
    // Simulate a server error
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error\n");
    return;
  }
  
  else if (req.url === "/" && req.method === "GET") {
    // Simulate a redirect
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Hello from Node.js!\n ${req.method} ${req.url}\n`);
    return;
  }
  
  else{
    // Handle 404 Not Found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found\n");
    return;
  }
});

// Start server
const PORT = 3004;
server.listen(PORT, () => {
  console.log(`🚀 Server at http://localhost:${PORT}/`);
  console.log("Press Ctrl+C to stop\n");
});

// Handle errors
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} already in use!`);
  } else {
    console.error("❌ Error:", err.message);
  }
});
