// ==========================================
// SIMPLE TODO API
// ==========================================

const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 3000;
const TODOS_FILE = path.join(__dirname, "todos.json");

// Middleware
app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ==========================================
// HELPER FUNCTIONS
// ==========================================

async function loadTodos() {
  try {
    const data = await fs.readFile(TODOS_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist, create it
    if (err.code === "ENOENT") {
      await saveTodos([]);
      return [];
    }
    throw err;
  }
}

async function saveTodos(todos) {
  await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ==========================================
// ROUTES
// ==========================================

// Home - API Info
app.get("/", (req, res) => {
  res.json({
    name: "Simple Todo API",
    version: "1.0.0",
    endpoints: {
      "GET /api/todos": "Get all todos",
      "GET /api/todos/:id": "Get todo by ID",
      "POST /api/todos": "Create new todo",
      "PUT /api/todos/:id": "Update todo",
      "PATCH /api/todos/:id/toggle": "Toggle todo completion",
      "DELETE /api/todos/:id": "Delete todo",
    },
  });
});

// GET all todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await loadTodos();
    const { status } = req.query;
    
    let filtered = todos;
    if (status === "completed") {
      filtered = todos.filter((t) => t.completed);
    } else if (status === "pending") {
      filtered = todos.filter((t) => !t.completed);
    }
    
    res.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET todo by ID
app.get("/api/todos/:id", async (req, res) => {
  try {
    const todos = await loadTodos();
    const todo = todos.find((t) => t.id === req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }
    
    res.json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// CREATE todo
app.post("/api/todos", async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        error: "Title is required",
      });
    }
    
    const todos = await loadTodos();
    const newTodo = {
      id: generateId(),
      title,
      description: description || "",
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    todos.push(newTodo);
    await saveTodos(todos);
    
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE todo
app.put("/api/todos/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todos = await loadTodos();
    const index = todos.findIndex((t) => t.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }
    
    if (!title) {
      return res.status(400).json({
        success: false,
        error: "Title is required",
      });
    }
    
    todos[index] = {
      ...todos[index],
      title,
      description: description || "",
      completed: completed || false,
      updatedAt: new Date().toISOString(),
    };
    
    await saveTodos(todos);
    
    res.json({
      success: true,
      message: "Todo updated successfully",
      data: todos[index],
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// TOGGLE todo completion
app.patch("/api/todos/:id/toggle", async (req, res) => {
  try {
    const todos = await loadTodos();
    const todo = todos.find((t) => t.id === req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }
    
    todo.completed = !todo.completed;
    todo.updatedAt = new Date().toISOString();
    
    await saveTodos(todos);
    
    res.json({
      success: true,
      message: `Todo marked as ${todo.completed ? "completed" : "pending"}`,
      data: todo,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const todos = await loadTodos();
    const index = todos.findIndex((t) => t.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }
    
    const deleted = todos.splice(index, 1)[0];
    await saveTodos(todos);
    
    res.json({
      success: true,
      message: "Todo deleted successfully",
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// ERROR HANDLERS
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`\n🚀 Todo API running at http://localhost:${PORT}/`);
  console.log(`\n📚 Visit http://localhost:${PORT}/ for API documentation`);
  console.log(`\n📝 Test Commands:`);
  console.log(`\nCreate todo:`);
  console.log(`  curl -X POST http://localhost:${PORT}/api/todos \\`);
  console.log(`    -H "Content-Type: application/json" \\`);
  console.log(`    -d '{"title":"Learn Node.js","description":"Complete all tutorials"}'`);
  console.log(`\nGet all todos:`);
  console.log(`  curl http://localhost:${PORT}/api/todos`);
  console.log(`\nToggle completion (replace ID):`);
  console.log(`  curl -X PATCH http://localhost:${PORT}/api/todos/YOUR_TODO_ID/toggle`);
  console.log(`\n⏹️  Press Ctrl+C to stop\n`);
});
