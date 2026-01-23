const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 8080;
const WS_SERVER_URL = process.env.WS_SERVER_URL || `ws://localhost:${PORT}/ws`;

const wss = new WebSocket.Server({ server, path: '/ws' });

const users = new Map();
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#AED6F1'];
let colorIndex = 0;

function getNextColor() {
  const color = colors[colorIndex % colors.length];
  colorIndex++;
  return color;
}

function broadcastUserList() {
  const userList = Array.from(users.values());
  const message = JSON.stringify({
    type: "users",
    count: users.size,
    users: userList
  });
  
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Express routes
app.get('/', (req, res) => {
  res.send('WebSocket Canvas Server is running!');
});

app.get('/config', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ wsUrl: WS_SERVER_URL });
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    
    if (data.type === 'join') {
      // Assign color and store user info
      const color = getNextColor();
      users.set(ws, { name: data.name, color: color });
      console.log(`${data.name} joined with color ${color}. Total users: ${users.size}`);
      
      // Send color back to the user
      ws.send(JSON.stringify({ type: 'color', color: color }));
      
      // Broadcast updated user list
      broadcastUserList();
    } else if (data.type === 'draw') {
      // Broadcast drawing data to all clients except sender
      const drawMsg = JSON.stringify(data);
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(drawMsg);
        }
      });
    }
  });

  ws.on('close', () => {
    const user = users.get(ws);
    users.delete(ws);
    console.log(`${user ? user.name : 'User'} disconnected. Total users: ${users.size}`);
    broadcastUserList();
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

server.listen(PORT, () => {
  console.log(`HTTP server running on http://localhost:${PORT}`);
  console.log(`WebSocket server running on ${WS_SERVER_URL}`);
  console.log(`Config endpoint available at http://localhost:${PORT}/config`);
});
