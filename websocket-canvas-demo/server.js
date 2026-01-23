const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = createServer(app);

// Environment configuration
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;
const IS_PRODUCTION = NODE_ENV === 'production';

// WebSocket URL configuration
const WS_SERVER_URL = process.env.WS_SERVER_URL || 
  (IS_PRODUCTION 
    ? `wss://${process.env.RENDER_EXTERNAL_HOSTNAME || 'your-app.onrender.com'}/ws`
    : `ws://localhost:${PORT}/ws`);

// Constants
const HEARTBEAT_INTERVAL = 30000; // 30 seconds
const CONNECTION_TIMEOUT = 60000; // 60 seconds
const MAX_MESSAGE_SIZE = 1024; // 1KB max message size
const RATE_LIMIT_WINDOW = 1000; // 1 second
const MAX_MESSAGES_PER_WINDOW = 100; // Max messages per second per client

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', 
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#AED6F1'
];

// State management
const users = new Map();
const rateLimitMap = new Map();
let colorIndex = 0;

// Utility functions
function getNextColor() {
  const color = colors[colorIndex % colors.length];
  colorIndex++;
  return color;
}

function sanitizeUserName(name) {
  if (!name || typeof name !== 'string') return 'Anonymous';
  return name.trim().substring(0, 50).replace(/[<>]/g, '');
}

function isValidDrawData(data) {
  return (
    typeof data.x === 'number' &&
    typeof data.y === 'number' &&
    typeof data.color === 'string' &&
    data.x >= 0 && data.x <= 600 &&
    data.y >= 0 && data.y <= 400 &&
    /^#[0-9A-F]{6}$/i.test(data.color)
  );
}

function checkRateLimit(ws) {
  const now = Date.now();
  const clientData = rateLimitMap.get(ws);
  
  if (!clientData) {
    rateLimitMap.set(ws, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + RATE_LIMIT_WINDOW;
    return true;
  }
  
  if (clientData.count >= MAX_MESSAGES_PER_WINDOW) {
    return false;
  }
  
  clientData.count++;
  return true;
}

function broadcastUserList() {
  const userList = Array.from(users.values()).map(user => ({
    name: user.name,
    color: user.color
  }));
  
  const message = JSON.stringify({
    type: 'users',
    count: users.size,
    users: userList
  });
  
  broadcast(message);
}

function broadcast(message, exclude = null) {
  wss.clients.forEach((client) => {
    if (client !== exclude && client.readyState === WebSocket.OPEN) {
      try {
        client.send(message);
      } catch (error) {
        console.error('Error broadcasting to client:', error);
      }
    }
  });
}

// WebSocket Server setup
const wss = new WebSocket.Server({ 
  server, 
  path: '/ws',
  maxPayload: MAX_MESSAGE_SIZE,
  clientTracking: true
});

// Heartbeat mechanism
function heartbeat() {
  this.isAlive = true;
}

const heartbeatInterval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      const user = users.get(ws);
      console.log(`Terminating inactive connection: ${user?.name || 'Unknown'}`);
      users.delete(ws);
      rateLimitMap.delete(ws);
      return ws.terminate();
    }
    
    ws.isAlive = false;
    ws.ping();
  });
}, HEARTBEAT_INTERVAL);

wss.on('close', () => {
  clearInterval(heartbeatInterval);
});

// WebSocket connection handling
wss.on('connection', (ws, req) => {
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() || 
                   req.socket.remoteAddress;
  
  console.log(`New connection from ${clientIp}`);
  
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  
  // Connection timeout
  const connectionTimeout = setTimeout(() => {
    if (!users.has(ws)) {
      console.log('Connection timeout - no join message received');
      ws.close(1008, 'Connection timeout');
    }
  }, CONNECTION_TIMEOUT);

  ws.on('message', (message) => {
    // Rate limiting
    if (!checkRateLimit(ws)) {
      console.warn(`Rate limit exceeded for ${users.get(ws)?.name || 'unknown'}`);
      return;
    }

    let data;
    try {
      const msgString = message.toString();
      if (msgString.length > MAX_MESSAGE_SIZE) {
        console.warn('Message too large');
        return;
      }
      data = JSON.parse(msgString);
    } catch (error) {
      console.error('Invalid JSON received:', error);
      return;
    }
    
    if (data.type === 'join') {
      clearTimeout(connectionTimeout);
      
      const userName = sanitizeUserName(data.name);
      const color = getNextColor();
      
      users.set(ws, { name: userName, color, joinedAt: Date.now() });
      console.log(`${userName} joined with color ${color}. Total users: ${users.size}`);
      
      // Send color back to the user
      try {
        ws.send(JSON.stringify({ type: 'color', color }));
        broadcastUserList();
      } catch (error) {
        console.error('Error sending join response:', error);
      }
      
    } else if (data.type === 'draw') {
      if (!users.has(ws)) {
        console.warn('Draw message from non-joined client');
        return;
      }
      
      if (!isValidDrawData(data)) {
        console.warn('Invalid draw data received');
        return;
      }
      
      // Broadcast drawing data to all clients except sender
      const drawMsg = JSON.stringify({
        type: 'draw',
        x: data.x,
        y: data.y,
        color: data.color
      });
      
      broadcast(drawMsg, ws);
    }
  });

  ws.on('close', (code, reason) => {
    const user = users.get(ws);
    users.delete(ws);
    rateLimitMap.delete(ws);
    clearTimeout(connectionTimeout);
    
    console.log(`${user?.name || 'User'} disconnected (code: ${code}). Total users: ${users.size}`);
    
    if (users.size > 0) {
      broadcastUserList();
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error.message);
  });
});

// Express middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname), {
  maxAge: IS_PRODUCTION ? '1d' : 0,
  etag: true
}));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  if (IS_PRODUCTION) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/config', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  res.json({ 
    wsUrl: WS_SERVER_URL,
    environment: NODE_ENV
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    users: users.size,
    uptime: process.uptime(),
    environment: NODE_ENV
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({ 
    error: IS_PRODUCTION ? 'Internal server error' : err.message 
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully...');
  
  server.close(() => {
    console.log('HTTP server closed');
    
    wss.clients.forEach((ws) => {
      ws.close(1001, 'Server shutting down');
    });
    
    wss.close(() => {
      console.log('WebSocket server closed');
      process.exit(0);
    });
  });
  
  // Force close after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
});

// Start server
server.listen(PORT, () => {
  console.log(`Environment: ${NODE_ENV}`);
  console.log(`HTTP server running on http://localhost:${PORT}`);
  console.log(`WebSocket server running on ${WS_SERVER_URL}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});