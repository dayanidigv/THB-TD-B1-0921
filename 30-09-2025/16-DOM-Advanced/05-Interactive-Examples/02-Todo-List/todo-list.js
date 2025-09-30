// 📝 TODO LIST PROJECT - Complete task management application

console.log("=== TODO LIST PROJECT ===");

// Global variables
let todos = [];
let todoIdCounter = 0;
let currentFilter = "all"; // all, active, completed

// DOM elements
const todoInput = document.getElementById("todoInput");
const todoContainer = document.getElementById("todoContainer");
const activityLog = document.getElementById("activityLog");
const charCount = document.getElementById("charCount");
const emptyState = document.getElementById("emptyState");

// Statistics elements
const totalTodos = document.getElementById("totalTodos");
const completedTodos = document.getElementById("completedTodos");
const pendingTodos = document.getElementById("pendingTodos");
const allCount = document.getElementById("allCount");
const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");

// Filter buttons
const showAll = document.getElementById("showAll");
const showActive = document.getElementById("showActive");
const showCompleted = document.getElementById("showCompleted");

// Activity logging function
function logActivity(message) {
    const time = new Date().toLocaleTimeString();
    const logEntry = `<div class="border-bottom pb-1 mb-1"><small>[${time}] ${message}</small></div>`;
    activityLog.innerHTML = logEntry + activityLog.innerHTML;
    console.log(`[${time}] ${message}`);
}

// Update statistics
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    
    totalTodos.textContent = total;
    completedTodos.textContent = completed;
    pendingTodos.textContent = pending;
    allCount.textContent = total;
    activeCount.textContent = pending;
    completedCount.textContent = completed;
}

// Create todo item HTML
function createTodoHTML(todo) {
    return `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <div class="todo-text" onclick="toggleTodo(${todo.id})">
                <span class="me-2">${todo.completed ? '✅' : '⬜'}</span>
                <span>${todo.text}</span>
            </div>
            <div class="todo-actions">
                <button class="btn btn-sm btn-outline-primary" onclick="editTodo(${todo.id})" title="Edit">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteTodo(${todo.id})" title="Delete">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `;
}

// Filter todos based on current filter
function getFilteredTodos() {
    switch (currentFilter) {
        case "active":
            return todos.filter(todo => !todo.completed);
        case "completed":
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

// Render todos
function renderTodos() {
    const filteredTodos = getFilteredTodos();
    
    if (filteredTodos.length === 0) {
        if (todos.length === 0) {
            emptyState.innerHTML = `
                <i class="bi bi-clipboard-check display-4"></i>
                <p class="mt-2">No tasks yet. Add one above to get started!</p>
            `;
        } else {
            let message = "";
            switch (currentFilter) {
                case "active":
                    message = "🎉 No pending tasks! Great job!";
                    break;
                case "completed":
                    message = "📝 No completed tasks yet. Start checking some off!";
                    break;
            }
            emptyState.innerHTML = `
                <i class="bi bi-info-circle display-4"></i>
                <p class="mt-2">${message}</p>
            `;
        }
        emptyState.style.display = "block";
        todoContainer.innerHTML = "";
        todoContainer.appendChild(emptyState);
    } else {
        emptyState.style.display = "none";
        todoContainer.innerHTML = filteredTodos.map(createTodoHTML).join("");
    }
    
    updateStats();
}

// Add new todo
function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === "") {
        logActivity("❌ Cannot add empty task");
        return;
    }
    
    const newTodo = {
        id: todoIdCounter++,
        text: text,
        completed: false,
        createdAt: new Date()
    };
    
    todos.push(newTodo);
    todoInput.value = "";
    charCount.textContent = "0";
    
    renderTodos();
    logActivity(`➕ Added task: "${text}"`);
}

// Toggle todo completion
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
        logActivity(`${todo.completed ? '✅' : '⬜'} ${todo.completed ? 'Completed' : 'Uncompleted'}: "${todo.text}"`);
    }
}

// Edit todo
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        const newText = prompt("Edit task:", todo.text);
        if (newText !== null && newText.trim() !== "") {
            const oldText = todo.text;
            todo.text = newText.trim();
            renderTodos();
            logActivity(`✏️ Edited task: "${oldText}" → "${newText.trim()}"`);
        }
    }
}

// Delete todo
function deleteTodo(id) {
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex > -1) {
        const deletedTodo = todos.splice(todoIndex, 1)[0];
        renderTodos();
        logActivity(`🗑️ Deleted task: "${deletedTodo.text}"`);
    }
}

// Quick add function
function quickAdd(text) {
    todoInput.value = text;
    charCount.textContent = text.length.toString();
    addTodo();
}

// Bulk actions
function completeAllTodos() {
    const activeTodos = todos.filter(todo => !todo.completed);
    if (activeTodos.length === 0) {
        logActivity("ℹ️ No active tasks to complete");
        return;
    }
    
    todos.forEach(todo => todo.completed = true);
    renderTodos();
    logActivity(`✅ Completed all ${activeTodos.length} tasks`);
}

function clearCompletedTodos() {
    const completedCount = todos.filter(todo => todo.completed).length;
    if (completedCount === 0) {
        logActivity("ℹ️ No completed tasks to clear");
        return;
    }
    
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
    logActivity(`🧹 Cleared ${completedCount} completed tasks`);
}

function clearAllTodos() {
    if (todos.length === 0) {
        logActivity("ℹ️ No tasks to clear");
        return;
    }
    
    if (confirm("Are you sure you want to delete all tasks?")) {
        const count = todos.length;
        todos = [];
        renderTodos();
        logActivity(`🗑️ Cleared all ${count} tasks`);
    }
}

// Filter functions
function setFilter(filter) {
    currentFilter = filter;
    
    // Update button states
    [showAll, showActive, showCompleted].forEach(btn => btn.classList.remove("active"));
    
    switch (filter) {
        case "active":
            showActive.classList.add("active");
            break;
        case "completed":
            showCompleted.classList.add("active");
            break;
        default:
            showAll.classList.add("active");
    }
    
    renderTodos();
    logActivity(`🔍 Filter changed to: ${filter}`);
}

// Clear activity log
function clearLog() {
    activityLog.innerHTML = '<p class="text-muted">Todo activities will be logged here...</p>';
    logActivity("🧹 Activity log cleared");
}

// Event listeners
document.getElementById("addTodo").addEventListener("click", addTodo);

todoInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

todoInput.addEventListener("input", function() {
    charCount.textContent = this.value.length;
    if (this.value.length > 90) {
        charCount.style.color = "#dc3545";
    } else {
        charCount.style.color = "#6c757d";
    }
});

// Filter button events
showAll.addEventListener("click", () => setFilter("all"));
showActive.addEventListener("click", () => setFilter("active"));
showCompleted.addEventListener("click", () => setFilter("completed"));

// Bulk action events
document.getElementById("completeAll").addEventListener("click", completeAllTodos);
document.getElementById("clearCompleted").addEventListener("click", clearCompletedTodos);
document.getElementById("clearAll").addEventListener("click", clearAllTodos);

// Keyboard shortcuts
document.addEventListener("keydown", function(event) {
    // Don't trigger shortcuts when typing in input
    if (document.activeElement === todoInput) return;
    
    switch(event.key.toLowerCase()) {
        case "n":
            todoInput.focus();
            break;
        case "1":
            setFilter("all");
            break;
        case "2":
            setFilter("active");
            break;
        case "3":
            setFilter("completed");
            break;
        case "c":
            if (event.ctrlKey || event.metaKey) return;
            clearCompletedTodos();
            break;
    }
});

// Initialize the application
function initTodoApp() {
    renderTodos();
    logActivity("🚀 Todo List application loaded!");
    logActivity("💡 Tip: Press N to focus input, 1/2/3 to change filters, C to clear completed");
    
    // Add some sample todos for demonstration
    setTimeout(() => {
        if (todos.length === 0) {
            const sampleTodos = [
                "Welcome to your Todo List! 👋",
                "Click the checkbox to mark tasks as complete ✅",
                "Use the edit button to modify tasks ✏️"
            ];
            
            sampleTodos.forEach(text => {
                todos.push({
                    id: todoIdCounter++,
                    text: text,
                    completed: false,
                    createdAt: new Date()
                });
            });
            
            renderTodos();
            logActivity("📝 Added sample tasks to get you started");
        }
    }, 1000);
}

// Make functions available globally
window.toggleTodo = toggleTodo;
window.editTodo = editTodo;
window.deleteTodo = deleteTodo;
window.quickAdd = quickAdd;
window.clearLog = clearLog;

// Start the application
initTodoApp();