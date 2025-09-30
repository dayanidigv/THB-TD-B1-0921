// 🎯 BUTTON EVENTS - Learn how to handle button clicks and interactions

console.log("=== BUTTON EVENTS DEMO ===");

// Get elements for logging
const eventLog = document.getElementById("event-log");

// Function to log events
function logEvent(message) {
    const time = new Date().toLocaleTimeString();
    const logEntry = `<div class="border-bottom pb-1 mb-1">[${time}] ${message}</div>`;
    eventLog.innerHTML = logEntry + eventLog.innerHTML;
    console.log(`[${time}] ${message}`);
}

// 1. Simple button clicks
document.getElementById("simple-btn").addEventListener("click", function() {
    const result = document.getElementById("click-result");
    result.innerHTML = `
        <div class="alert alert-success">
            <strong>🎉 Button clicked!</strong><br>
            You successfully clicked the simple button!
        </div>
    `;
    logEvent("Simple button was clicked");
});

document.getElementById("alert-btn").addEventListener("click", function() {
    alert("Hello! This is a JavaScript alert! 👋");
    logEvent("Alert button clicked - showed alert popup");
});

document.getElementById("change-btn").addEventListener("click", function() {
    const button = document.getElementById("change-btn");
    const colors = ["info", "warning", "danger", "success", "primary"];
    const currentClass = button.className;
    
    // Find current color and change to next one
    let currentIndex = colors.findIndex(color => currentClass.includes(color));
    currentIndex = (currentIndex + 1) % colors.length;
    
    button.className = `btn btn-${colors[currentIndex]}`;
    button.textContent = `Now I'm ${colors[currentIndex]}!`;
    
    logEvent(`Color changed to ${colors[currentIndex]}`);
});

// 2. Counter example
let count = 0;
const counterDisplay = document.getElementById("counter");

function updateCounter() {
    counterDisplay.textContent = count;
    counterDisplay.style.color = count > 0 ? "#28a745" : count < 0 ? "#dc3545" : "#007bff";
}

document.getElementById("increase").addEventListener("click", function() {
    count++;
    updateCounter();
    logEvent(`Counter increased to ${count}`);
});

document.getElementById("decrease").addEventListener("click", function() {
    count--;
    updateCounter();
    logEvent(`Counter decreased to ${count}`);
});

document.getElementById("reset").addEventListener("click", function() {
    count = 0;
    updateCounter();
    logEvent("Counter reset to 0");
});

// 3. Button state changes
let isToggled = false;
const toggleBtn = document.getElementById("toggle-btn");
const stateInfo = document.getElementById("state-info");

toggleBtn.addEventListener("click", function() {
    isToggled = !isToggled;
    
    if (isToggled) {
        toggleBtn.className = "btn btn-primary mb-2 w-100";
        toggleBtn.textContent = "Currently ON - Click to Turn OFF";
        stateInfo.innerHTML = '<span class="text-success">✅ State: ON</span>';
    } else {
        toggleBtn.className = "btn btn-outline-primary mb-2 w-100";
        toggleBtn.textContent = "Currently OFF - Click to Turn ON";
        stateInfo.innerHTML = '<span class="text-danger">❌ State: OFF</span>';
    }
    
    logEvent(`Toggle state changed to: ${isToggled ? "ON" : "OFF"}`);
});

// Disable/Enable button example
const disableBtn = document.getElementById("disable-btn");
const enableBtn = document.getElementById("enable-btn");

disableBtn.addEventListener("click", function() {
    disableBtn.disabled = true;
    disableBtn.textContent = "I'm Disabled!";
    disableBtn.className = "btn btn-secondary me-2";
    
    enableBtn.disabled = false;
    enableBtn.className = "btn btn-success";
    
    stateInfo.innerHTML += '<br><span class="text-warning">⚠️ First button disabled, second button enabled</span>';
    logEvent("Disable button clicked - button disabled, enable button activated");
});

enableBtn.addEventListener("click", function() {
    disableBtn.disabled = false;
    disableBtn.textContent = "Disable Me";
    disableBtn.className = "btn btn-secondary me-2";
    
    enableBtn.disabled = true;
    enableBtn.className = "btn btn-success";
    
    stateInfo.innerHTML += '<br><span class="text-info">🔄 Buttons reset to original state</span>';
    logEvent("Enable button clicked - first button re-enabled");
});

// 4. Multiple buttons with same handler
const colorButtons = document.querySelectorAll(".color-btn");
const colorDisplay = document.getElementById("color-display");

colorButtons.forEach(button => {
    button.addEventListener("click", function() {
        // Get the color from the data attribute
        const color = this.dataset.color;
        
        // Change the display background
        colorDisplay.style.backgroundColor = color;
        colorDisplay.style.color = color === "yellow" ? "black" : "white";
        colorDisplay.textContent = `Background changed to ${color}! 🎨`;
        
        // Update button states
        colorButtons.forEach(btn => {
            btn.classList.remove("active");
            btn.classList.add("btn-outline-" + btn.dataset.color);
        });
        
        this.classList.add("active");
        this.classList.remove("btn-outline-" + color);
        this.classList.add("btn-" + color);
        
        logEvent(`Color changed to ${color} using data attribute`);
    });
});

// 5. Clear log button
document.getElementById("clear-log").addEventListener("click", function() {
    eventLog.innerHTML = '<p class="text-muted">Button clicks will be logged here...</p>';
    logEvent("🧹 Event log cleared");
});

// Initial setup
logEvent("🚀 Button events demo loaded! Start clicking buttons to see events in action!");
updateCounter();