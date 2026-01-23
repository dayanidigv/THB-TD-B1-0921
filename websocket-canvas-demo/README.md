# WebSocket Canvas Drawing 🎨

Real-time collaborative drawing canvas where multiple users can draw simultaneously and see each other's strokes instantly.

## Features

✅ **Real-time visual feedback** - See strokes as they happen  
✅ **Event streaming** - Mouse movements streamed to all clients  
✅ **Fan-out broadcasting** - Server broadcasts to all connected users  
✅ **No database** - Pure in-memory real-time sync  
✅ **No framework** - Vanilla JavaScript only

## How It Works

```
User draws (mouse move)
    ↓
Send {x, y} to server
    ↓
Server broadcasts to all other clients
    ↓
Other clients draw the point
```

**No DB. No auth. No framework.**

## Installation

```bash
npm install
```

## Running the Demo

### 1. Start the WebSocket Server

```bash
npm start
```

Server runs on `ws://localhost:8080`

### 2. Open Multiple Clients

Open `index.html` in multiple browser tabs/windows:

- Double-click `index.html` to open
- Or use: `open index.html` (macOS)

### 3. Start Drawing

1. Open 2-3 browser tabs with the canvas
2. Draw in one tab
3. Watch the drawing appear in all other tabs instantly! ✨

## Code Structure

```
websocket-canvas-demo/
├── server.js      # WebSocket server (broadcasts drawing data)
├── index.html     # Canvas client (sends/receives coordinates)
├── package.json   # Dependencies
└── README.md      # This file
```

## Key Concepts

### 1. Event Streaming
Every mouse move during drawing sends `{x, y}` coordinates to the server.

### 2. Fan-out Broadcasting
```javascript
wss.clients.forEach((client) => {
  if (client !== ws && client.readyState === 1) {
    client.send(msg.toString());
  }
});
```
Server broadcasts to all clients except the sender.

### 3. Real-time Visual Feedback
No delay between drawing and seeing it on all screens.

### 4. Minimal State
No persistence - drawing exists only in active sessions.

## Why This Example Is Good

- ✅ **Immediate visual feedback** - Visceral demonstration of real-time sync
- ✅ **Easy to reason about latency** - You see network delay visually
- ✅ **Shows event streaming** - Continuous data flow pattern
- ✅ **Demonstrates broadcasting** - One-to-many communication
- ✅ **Extendable without rewrite** - Can add colors, brushes, clear button, etc.

## Possible Extensions

Want to enhance this? Easy additions:

- **Color picker** - Send color with coordinates
- **Brush size** - Variable point sizes
- **Clear button** - Broadcast clear event
- **User colors** - Different color per user
- **Draw history** - Store recent strokes for new joiners
- **Touch support** - Add touch events for mobile

## Technologies

- **Backend**: Node.js + `ws` library (ES Modules)
- **Frontend**: HTML5 Canvas + WebSocket API
- **Protocol**: WebSocket (ws://)

## Performance Note

This demo streams every mouse move. For production, consider:
- Throttling/debouncing mouse events
- Batch multiple points
- Draw smooth curves instead of individual points

---

**Perfect for learning:** This demonstrates core WebSocket patterns without complexity!
