// 🎨 COLOR CHANGER PROJECT - Interactive color changing application

console.log("=== COLOR CHANGER PROJECT ===");

// Get DOM elements
const colorBox = document.getElementById("colorBox");
const activityLog = document.getElementById("activityLog");
const colorName = document.getElementById("colorName");
const bgColor = document.getElementById("bgColor");
const textColor = document.getElementById("textColor");

let isDarkTheme = false;

// Function to log activities
function logActivity(message) {
    const time = new Date().toLocaleTimeString();
    const logEntry = `<div class="border-bottom pb-1 mb-1"><small>[${time}] ${message}</small></div>`;
    activityLog.innerHTML = logEntry + activityLog.innerHTML;
    console.log(`[${time}] ${message}`);
}

// Function to update color info display
function updateColorInfo(name, bg, text) {
    colorName.textContent = name;
    bgColor.textContent = bg;
    textColor.textContent = text;
}

// Main color change function
function changeColor(backgroundColor, textColorValue, colorNameValue) {
    // Change the color box
    colorBox.style.backgroundColor = backgroundColor;
    colorBox.style.color = textColorValue;
    colorBox.textContent = `I'm ${colorNameValue}! 🎨`;
    
    // Update info display
    updateColorInfo(colorNameValue, backgroundColor, textColorValue);
    
    // Add animation effect
    colorBox.style.transform = "scale(1.1)";
    setTimeout(() => {
        colorBox.style.transform = "scale(1)";
    }, 200);
    
    // Log the activity
    logActivity(`Color changed to ${colorNameValue} (${backgroundColor})`);
}

// Random color function
function randomColor() {
    const colors = [
        { bg: "#ff6b6b", text: "white", name: "Coral Red" },
        { bg: "#4ecdc4", text: "white", name: "Turquoise" },
        { bg: "#45b7d1", text: "white", name: "Sky Blue" },
        { bg: "#f9ca24", text: "black", name: "Golden Yellow" },
        { bg: "#6c5ce7", text: "white", name: "Purple Violet" },
        { bg: "#a29bfe", text: "white", name: "Lavender" },
        { bg: "#fd79a8", text: "white", name: "Pink Rose" },
        { bg: "#00b894", text: "white", name: "Mint Green" },
        { bg: "#e17055", text: "white", name: "Coral Orange" },
        { bg: "#2d3436", text: "white", name: "Dark Charcoal" }
    ];
    
    const randomIndex = Math.floor(Math.random() * colors.length);
    const selectedColor = colors[randomIndex];
    
    colorBox.style.backgroundColor = selectedColor.bg;
    colorBox.style.color = selectedColor.text;
    colorBox.textContent = `Random ${selectedColor.name}! ✨`;
    
    // Update info display
    updateColorInfo(selectedColor.name, selectedColor.bg, selectedColor.text);
    
    // Add special animation for random
    colorBox.style.transform = "rotate(360deg) scale(1.1)";
    setTimeout(() => {
        colorBox.style.transform = "rotate(0deg) scale(1)";
    }, 500);
    
    logActivity(`Random color selected: ${selectedColor.name} (${selectedColor.bg})`);
}

// Reset color function
function resetColor() {
    colorBox.style.backgroundColor = "white";
    colorBox.style.color = "black";
    colorBox.textContent = "🎨 Click buttons to change me!";
    
    // Update info display
    updateColorInfo("White", "white", "black");
    
    // Reset animation
    colorBox.style.transform = "scale(0.8)";
    setTimeout(() => {
        colorBox.style.transform = "scale(1)";
    }, 200);
    
    logActivity("Color reset to default (white)");
}

// Toggle theme function
function toggleTheme() {
    const body = document.body;
    const container = document.querySelector(".project-container");
    
    if (!isDarkTheme) {
        // Switch to dark theme
        body.style.background = "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)";
        container.style.background = "rgba(52, 73, 94, 0.95)";
        container.style.color = "white";
        
        isDarkTheme = true;
        logActivity("Switched to dark theme");
    } else {
        // Switch to light theme
        body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
        container.style.background = "rgba(255, 255, 255, 0.95)";
        container.style.color = "black";
        
        isDarkTheme = false;
        logActivity("Switched to light theme");
    }
}

// Clear log function
function clearLog() {
    activityLog.innerHTML = '<p class="text-muted">Color changes will be logged here...</p>';
    logActivity("Activity log cleared");
}

// Add click event to color box for fun interaction
colorBox.addEventListener("click", function() {
    const currentBg = colorBox.style.backgroundColor;
    if (currentBg === "white" || currentBg === "") {
        randomColor();
    } else {
        // Add a fun bounce effect
        colorBox.style.transform = "scale(1.2)";
        setTimeout(() => {
            colorBox.style.transform = "scale(1)";
        }, 150);
        logActivity("Color box clicked - bounce effect applied");
    }
});

// Keyboard shortcuts
document.addEventListener("keydown", function(event) {
    switch(event.key.toLowerCase()) {
        case "r":
            if (event.ctrlKey || event.metaKey) return; // Don't interfere with refresh
            changeColor("red", "white", "Red");
            break;
        case "b":
            changeColor("blue", "white", "Blue");
            break;
        case "g":
            changeColor("green", "white", "Green");
            break;
        case " ": // Spacebar
            event.preventDefault();
            randomColor();
            break;
        case "escape":
            resetColor();
            break;
        case "t":
            toggleTheme();
            break;
    }
});

// Initialize the application
function initColorChanger() {
    logActivity("🚀 Color Changer application loaded!");
    logActivity("💡 Tip: Press R/B/G for colors, Space for random, Esc to reset, T for theme");
    updateColorInfo("White", "white", "black");
}

// Start the application
initColorChanger();

// Make functions available globally for onclick handlers
window.changeColor = changeColor;
window.randomColor = randomColor;
window.resetColor = resetColor;
window.toggleTheme = toggleTheme;
window.clearLog = clearLog;