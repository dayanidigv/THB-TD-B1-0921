# WebSocket Counter Demo 🌐

A minimal WebSocket example demonstrating real-time synchronization across multiple clients.

## Features

✅ **Persistent Connection**: WebSocket keeps connection alive  
✅ **Server → Client Push**: Server pushes updates to all clients  
✅ **Multi-Client Sync**: All connected users see updates instantly

## How It Works

1. **Client connects** → Server sends current counter value
2. **User clicks button** → Client sends increment request to server
3. **Server increments counter** → Broadcasts new value to ALL clients
4. **All clients update** → Counter displays updated in real-time

## Installation

```bash
# Install dependencies
npm install
```

## Running the Demo

### 1. Start the WebSocket Server

```bash
npm start
```

Server will run on `ws://localhost:8080`

### 2. Open the Client

Open `index.html` in multiple browser tabs/windows:

- **Option 1**: Double-click `index.html` (opens in default browser)
- **Option 2**: Use a local server:
  ```bash
  # If you have Python installed
  python3 -m http.server 3000
  # Then visit: http://localhost:3000
  ```

### 3. Test Multi-Client Sync

1. Open the page in 2-3 browser tabs
2. Click the button in any tab
3. Watch all tabs update instantly! 🎉

## Code Structure

```
websocket-counter-demo/
├── server.js       # WebSocket server with counter logic
├── index.html      # Client with UI and WebSocket connection
├── package.json    # Dependencies
└── README.md       # This file
```

## Key Concepts Demonstrated

### 1. Persistent Connection
```javascript
const ws = new WebSocket('ws://localhost:8080');
```
Unlike HTTP, WebSocket maintains an open connection.

### 2. Server → Client Push
```javascript
// Server broadcasts to all clients
clients.forEach((client) => {
  client.send(update);
});
```

### 3. Multi-Client Synchronization
- Server maintains single counter state
- All clients receive same updates
- Everyone stays in sync automatically

## Technologies Used

- **Backend**: Node.js + `ws` library
- **Frontend**: Vanilla JavaScript + HTML/CSS
- **Protocol**: WebSocket (ws://)

## Troubleshooting

**Connection Failed?**
- Ensure server is running (`npm start`)
- Check console for errors
- Verify port 8080 is available

**Counter not updating?**
- Check browser console
- Ensure WebSocket connection is established
- Try refreshing the page

## Learning Resources

- [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [ws Library Documentation](https://github.com/websockets/ws)

---

**Note**: This is a learning demo. For production, add:
- Error handling
- Authentication
- Rate limiting
- SSL/TLS (wss://)
