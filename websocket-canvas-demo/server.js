import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

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
    if (client.readyState === 1) {
      client.send(message);
    }
  });
}

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (msg) => {
    const data = JSON.parse(msg.toString());
    
    if (data.type === "join") {
      // Assign color and store user info
      const color = getNextColor();
      users.set(ws, { name: data.name, color: color });
      console.log(`${data.name} joined with color ${color}. Total users: ${users.size}`);
      
      // Send color back to the user
      ws.send(JSON.stringify({ type: "color", color: color }));
      
      // Broadcast updated user list
      broadcastUserList();
    } else if (data.type === "draw") {
      // Broadcast drawing data to all clients except sender
      const drawMsg = JSON.stringify(data);
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === 1) {
          client.send(drawMsg);
        }
      });
    }
  });

  ws.on("close", () => {
    const user = users.get(ws);
    users.delete(ws);
    console.log(`${user?.name || "User"} disconnected. Total users: ${users.size}`);
    broadcastUserList();
  });
});

console.log("WebSocket server running on ws://localhost:8080");
