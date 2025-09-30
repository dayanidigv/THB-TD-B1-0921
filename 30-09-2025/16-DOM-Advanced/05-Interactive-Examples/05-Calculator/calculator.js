// 🧮 ADVANCED CALCULATOR - Full-featured calculator with history and scientific functions

console.log("=== ADVANCED CALCULATOR ===");

// Calculator state
let currentInput = "0";
let previousInput = "";
let operator = "";
let shouldResetDisplay = false;
let calculationHistory = [];
let memory = 0;
let totalCalculations = 0;
let currentMode = "basic";

// DOM elements
const display = document.getElementById("display");
const previousOperation = document.getElementById("previousOperation");
const activityLog = document.getElementById("activityLog");
const historyPanel = document.getElementById("calculationHistory");
const totalCalcsDisplay = document.getElementById("totalCalculations");
const lastResultDisplay = document.getElementById("lastResult");
const memoryValueDisplay = document.getElementById("memoryValue");
const buttonGrid = document.getElementById("buttonGrid");

// Button configurations
const basicButtons = [
    { text: "C", class: "btn-clear", action: "clear" },
    { text: "±", class: "btn-operator", action: "negate" },
    { text: "%", class: "btn-operator", action: "percent" },
    { text: "÷", class: "btn-operator", action: "operator", value: "/" },
    
    { text: "7", class: "btn-number", action: "number", value: "7" },
    { text: "8", class: "btn-number", action: "number", value: "8" },
    { text: "9", class: "btn-number", action: "number", value: "9" },
    { text: "×", class: "btn-operator", action: "operator", value: "*" },
    
    { text: "4", class: "btn-number", action: "number", value: "4" },
    { text: "5", class: "btn-number", action: "number", value: "5" },
    { text: "6", class: "btn-number", action: "number", value: "6" },
    { text: "-", class: "btn-operator", action: "operator", value: "-" },
    
    { text: "1", class: "btn-number", action: "number", value: "1" },
    { text: "2", class: "btn-number", action: "number", value: "2" },
    { text: "3", class: "btn-number", action: "number", value: "3" },
    { text: "+", class: "btn-operator", action: "operator", value: "+" },
    
    { text: "0", class: "btn-number btn-zero", action: "number", value: "0" },
    { text: ".", class: "btn-number", action: "decimal" },
    { text: "=", class: "btn-equals", action: "equals" }
];

const scientificButtons = [
    { text: "C", class: "btn-clear", action: "clear" },
    { text: "sin", class: "btn-operator", action: "function", value: "sin" },
    { text: "cos", class: "btn-operator", action: "function", value: "cos" },
    { text: "tan", class: "btn-operator", action: "function", value: "tan" },
    
    { text: "7", class: "btn-number", action: "number", value: "7" },
    { text: "8", class: "btn-number", action: "number", value: "8" },
    { text: "9", class: "btn-number", action: "number", value: "9" },
    { text: "÷", class: "btn-operator", action: "operator", value: "/" },
    
    { text: "4", class: "btn-number", action: "number", value: "4" },
    { text: "5", class: "btn-number", action: "number", value: "5" },
    { text: "6", class: "btn-number", action: "number", value: "6" },
    { text: "×", class: "btn-operator", action: "operator", value: "*" },
    
    { text: "1", class: "btn-number", action: "number", value: "1" },
    { text: "2", class: "btn-number", action: "number", value: "2" },
    { text: "3", class: "btn-number", action: "number", value: "3" },
    { text: "-", class: "btn-operator", action: "operator", value: "-" },
    
    { text: "0", class: "btn-number", action: "number", value: "0" },
    { text: ".", class: "btn-number", action: "decimal" },
    { text: "π", class: "btn-number", action: "constant", value: "pi" },
    { text: "+", class: "btn-operator", action: "operator", value: "+" },
    
    { text: "x²", class: "btn-operator", action: "function", value: "square" },
    { text: "√", class: "btn-operator", action: "function", value: "sqrt" },
    { text: "log", class: "btn-operator", action: "function", value: "log" },
    { text: "=", class: "btn-equals", action: "equals" }
];

// Activity logging
function logActivity(message) {
    const time = new Date().toLocaleTimeString();
    const logEntry = `<div class="border-bottom pb-1 mb-1"><small>[${time}] ${message}</small></div>`;
    activityLog.innerHTML = logEntry + activityLog.innerHTML;
    console.log(`[${time}] ${message}`);
}

// Create calculator buttons
function createButtons() {
    const buttons = currentMode === "basic" ? basicButtons : scientificButtons;
    buttonGrid.innerHTML = "";
    
    // Adjust grid for scientific mode
    if (currentMode === "scientific") {
        buttonGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
    } else {
        buttonGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
    }
    
    buttons.forEach(buttonConfig => {
        const button = document.createElement("button");
        button.textContent = buttonConfig.text;
        button.className = `calc-btn ${buttonConfig.class}`;
        
        button.addEventListener("click", () => {
            handleButtonClick(buttonConfig);
        });
        
        buttonGrid.appendChild(button);
    });
}

// Handle button clicks
function handleButtonClick(buttonConfig) {
    switch (buttonConfig.action) {
        case "number":
            inputNumber(buttonConfig.value);
            break;
        case "operator":
            inputOperator(buttonConfig.value);
            break;
        case "decimal":
            inputDecimal();
            break;
        case "equals":
            calculate();
            break;
        case "clear":
            clearCalculator();
            break;
        case "negate":
            negate();
            break;
        case "percent":
            percent();
            break;
        case "function":
            applyFunction(buttonConfig.value);
            break;
        case "constant":
            inputConstant(buttonConfig.value);
            break;
    }
    
    updateDisplay();
}

// Input number
function inputNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput = currentInput === "0" ? num : currentInput + num;
    }
    
    logActivity(`Input: ${num}`);
}

// Input operator
function inputOperator(op) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }
    
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
    
    const operatorSymbol = { "+": "+", "-": "-", "*": "×", "/": "÷" }[op] || op;
    previousOperation.textContent = `${currentInput} ${operatorSymbol}`;
    
    logActivity(`Operator: ${operatorSymbol}`);
}

// Input decimal point
function inputDecimal() {
    if (shouldResetDisplay) {
        currentInput = "0.";
        shouldResetDisplay = false;
    } else if (currentInput.indexOf(".") === -1) {
        currentInput += ".";
    }
    
    logActivity("Input: decimal point");
}

// Calculate result
function calculate() {
    if (!operator || !previousInput) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            if (current === 0) {
                alert("Cannot divide by zero!");
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Format result
    result = parseFloat(result.toFixed(10));
    
    // Add to history
    const operatorSymbol = { "+": "+", "-": "-", "*": "×", "/": "÷" }[operator];
    const calculation = `${previousInput} ${operatorSymbol} ${currentInput} = ${result}`;
    addToHistory(calculation);
    
    // Update state
    currentInput = result.toString();
    operator = "";
    previousInput = "";
    shouldResetDisplay = true;
    totalCalculations++;
    
    previousOperation.textContent = "";
    updateStats();
    
    logActivity(`Calculation: ${calculation}`);
}

// Apply scientific functions
function applyFunction(func) {
    const current = parseFloat(currentInput);
    let result;
    
    switch (func) {
        case "sin":
            result = Math.sin(current * Math.PI / 180); // Convert to radians
            break;
        case "cos":
            result = Math.cos(current * Math.PI / 180);
            break;
        case "tan":
            result = Math.tan(current * Math.PI / 180);
            break;
        case "square":
            result = current * current;
            break;
        case "sqrt":
            if (current < 0) {
                alert("Cannot calculate square root of negative number!");
                return;
            }
            result = Math.sqrt(current);
            break;
        case "log":
            if (current <= 0) {
                alert("Cannot calculate logarithm of non-positive number!");
                return;
            }
            result = Math.log10(current);
            break;
        default:
            return;
    }
    
    result = parseFloat(result.toFixed(10));
    
    const calculation = `${func}(${currentInput}) = ${result}`;
    addToHistory(calculation);
    
    currentInput = result.toString();
    shouldResetDisplay = true;
    totalCalculations++;
    
    updateStats();
    logActivity(`Function: ${calculation}`);
}

// Input constants
function inputConstant(constant) {
    switch (constant) {
        case "pi":
            currentInput = Math.PI.toString();
            break;
    }
    
    shouldResetDisplay = true;
    logActivity(`Constant: ${constant} = ${currentInput}`);
}

// Clear calculator
function clearCalculator() {
    currentInput = "0";
    previousInput = "";
    operator = "";
    shouldResetDisplay = false;
    previousOperation.textContent = "";
    
    logActivity("Calculator cleared");
}

// Negate current input
function negate() {
    if (currentInput !== "0") {
        currentInput = currentInput.startsWith("-") ? 
            currentInput.substring(1) : 
            "-" + currentInput;
    }
    
    logActivity(`Negated: ${currentInput}`);
}

// Convert to percentage
function percent() {
    const current = parseFloat(currentInput);
    const result = current / 100;
    
    const calculation = `${currentInput}% = ${result}`;
    addToHistory(calculation);
    
    currentInput = result.toString();
    shouldResetDisplay = true;
    totalCalculations++;
    
    updateStats();
    logActivity(`Percentage: ${calculation}`);
}

// Quick operations
function quickOperation(operation) {
    const current = parseFloat(currentInput);
    let result;
    let calculation;
    
    switch (operation) {
        case "square":
            result = current * current;
            calculation = `${current}² = ${result}`;
            break;
        case "sqrt":
            if (current < 0) {
                alert("Cannot calculate square root of negative number!");
                return;
            }
            result = Math.sqrt(current);
            calculation = `√${current} = ${result}`;
            break;
        case "percent":
            result = current / 100;
            calculation = `${current}% = ${result}`;
            break;
        case "inverse":
            if (current === 0) {
                alert("Cannot calculate inverse of zero!");
                return;
            }
            result = 1 / current;
            calculation = `1/${current} = ${result}`;
            break;
    }
    
    result = parseFloat(result.toFixed(10));
    
    addToHistory(calculation);
    currentInput = result.toString();
    shouldResetDisplay = true;
    totalCalculations++;
    
    updateDisplay();
    updateStats();
    logActivity(`Quick operation: ${calculation}`);
}

// Memory functions
document.getElementById("memoryStore").addEventListener("click", function() {
    memory = parseFloat(currentInput);
    updateMemoryDisplay();
    logActivity(`Memory stored: ${memory}`);
});

document.getElementById("memoryRecall").addEventListener("click", function() {
    currentInput = memory.toString();
    shouldResetDisplay = true;
    updateDisplay();
    logActivity(`Memory recalled: ${memory}`);
});

document.getElementById("memoryAdd").addEventListener("click", function() {
    memory += parseFloat(currentInput);
    updateMemoryDisplay();
    logActivity(`Memory added: ${currentInput}, new total: ${memory}`);
});

document.getElementById("memoryClear").addEventListener("click", function() {
    memory = 0;
    updateMemoryDisplay();
    logActivity("Memory cleared");
});

// Update display
function updateDisplay() {
    // Format large numbers
    let displayValue = currentInput;
    if (Math.abs(parseFloat(displayValue)) > 999999999) {
        displayValue = parseFloat(displayValue).toExponential(6);
    }
    
    display.value = displayValue;
}

// Update statistics
function updateStats() {
    totalCalcsDisplay.textContent = totalCalculations;
    lastResultDisplay.textContent = parseFloat(currentInput).toFixed(2);
}

// Update memory display
function updateMemoryDisplay() {
    memoryValueDisplay.textContent = memory.toFixed(2);
}

// Add calculation to history
function addToHistory(calculation) {
    calculationHistory.unshift({
        calculation: calculation,
        timestamp: new Date().toLocaleTimeString()
    });
    
    // Keep only last 50 calculations
    if (calculationHistory.length > 50) {
        calculationHistory = calculationHistory.slice(0, 50);
    }
    
    updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
    if (calculationHistory.length === 0) {
        historyPanel.innerHTML = '<p class="text-muted text-center py-3">No calculations yet</p>';
        return;
    }
    
    historyPanel.innerHTML = calculationHistory.map((item, index) => `
        <div class="history-item" onclick="recallCalculation('${item.calculation.split(' = ')[1]}')">
            <div class="d-flex justify-content-between align-items-center">
                <span>${item.calculation}</span>
                <small class="text-muted">${item.timestamp}</small>
            </div>
        </div>
    `).join("");
}

// Recall calculation result
function recallCalculation(result) {
    currentInput = result;
    shouldResetDisplay = true;
    updateDisplay();
    logActivity(`Recalled from history: ${result}`);
}

// Mode switching
document.getElementById("basicMode").addEventListener("click", function() {
    currentMode = "basic";
    document.querySelectorAll(".mode-btn").forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
    createButtons();
    logActivity("Switched to basic mode");
});

document.getElementById("scientificMode").addEventListener("click", function() {
    currentMode = "scientific";
    document.querySelectorAll(".mode-btn").forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
    createButtons();
    logActivity("Switched to scientific mode");
});

// Clear functions
function clearHistory() {
    calculationHistory = [];
    updateHistoryDisplay();
    logActivity("🧹 Calculation history cleared");
}

function clearLog() {
    activityLog.innerHTML = '<p class="text-muted">Calculator activities will be logged here...</p>';
    logActivity("🧹 Activity log cleared");
}

// Keyboard support
document.addEventListener("keydown", function(event) {
    const key = event.key;
    
    if (key >= "0" && key <= "9") {
        inputNumber(key);
        updateDisplay();
    } else if (["+", "-", "*", "/"].includes(key)) {
        inputOperator(key);
        updateDisplay();
    } else if (key === "Enter" || key === "=") {
        calculate();
        updateDisplay();
    } else if (key === "." || key === ",") {
        inputDecimal();
        updateDisplay();
    } else if (key === "Escape" || key === "c" || key === "C") {
        clearCalculator();
        updateDisplay();
    } else if (key === "Backspace") {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = "0";
        }
        updateDisplay();
    }
});

// Make functions available globally
window.quickOperation = quickOperation;
window.recallCalculation = recallCalculation;
window.clearHistory = clearHistory;
window.clearLog = clearLog;

// Initialize calculator
function initCalculator() {
    createButtons();
    updateDisplay();
    updateStats();
    updateMemoryDisplay();
    updateHistoryDisplay();
    
    logActivity("🚀 Advanced Calculator loaded!");
    logActivity("💡 Tip: Use keyboard for input, Esc to clear, Backspace to delete");
}

// Start the calculator
initCalculator();