const WebSocket = require('ws');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

// Shared counter state
let counter = 0;

// Store all connected clients
const clients = new Set();

wss.on('connection', (ws) => {
  console.log('New client connected. Total clients:', clients.size + 1);
  
  // Add client to the set
  clients.add(ws);
  
  // Send current counter value to the newly connected client
  ws.send(JSON.stringify({ type: 'counter', value: counter }));
  
  // Handle incoming messages
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    if (data.type === 'increment') {
      // Increment the counter
      counter++;
      console.log(`Counter incremented to ${counter} by a client`);
      
      // Broadcast the new counter value to ALL connected clients
      const update = JSON.stringify({ type: 'counter', value: counter });
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(update);
        }
      });
    }
  });
  
  // Handle client disconnect
  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected. Total clients:', clients.size);
  });
  
  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
console.log('Waiting for connections...');
