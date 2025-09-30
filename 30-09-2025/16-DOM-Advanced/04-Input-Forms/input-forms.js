// 📝 INPUT & FORMS - Learn how to handle user input and form events

console.log("=== INPUT & FORMS DEMO ===");

// Get logging element
const inputLog = document.getElementById("inputLog");

// Function to log input events
function logInput(message) {
    const time = new Date().toLocaleTimeString();
    const logEntry = `<div class="border-bottom pb-1 mb-1">[${time}] ${message}</div>`;
    inputLog.innerHTML = logEntry + inputLog.innerHTML;
    console.log(`[${time}] ${message}`);
}

// 1. Text input with real-time feedback
const nameInput = document.getElementById("nameInput");
const nameDisplay = document.getElementById("nameDisplay");
const charCount = document.getElementById("charCount");

nameInput.addEventListener("input", function() {
    const name = nameInput.value;
    const length = name.length;
    
    // Update character count
    charCount.textContent = length;
    charCount.style.color = length > 20 ? "#dc3545" : "#6c757d";
    
    // Update greeting display
    if (name.trim()) {
        nameDisplay.innerHTML = `
            <h5 class="text-success">Hello, ${name}! 👋</h5>
            <p>Nice to meet you! Your name has ${length} characters.</p>
            ${length > 20 ? '<small class="text-warning">⚠️ That\'s a long name!</small>' : ''}
        `;
        nameInput.parentElement.parentElement.classList.add("input-feedback");
    } else {
        nameDisplay.innerHTML = '<p class="text-muted">Your greeting will appear here as you type...</p>';
        nameInput.parentElement.parentElement.classList.remove("input-feedback");
    }
    
    logInput(`Name input changed: "${name}" (${length} characters)`);
});

// 2. Form validation
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const emailFeedback = document.getElementById("emailFeedback");
const passwordFeedback = document.getElementById("passwordFeedback");

function validateEmail() {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        emailInput.classList.add("is-invalid");
        emailFeedback.textContent = "Please enter a valid email address";
        return false;
    } else {
        emailInput.classList.remove("is-invalid");
        if (email) emailInput.classList.add("is-valid");
        return true;
    }
}

function validatePassword() {
    const password = passwordInput.value;
    
    if (password && password.length < 6) {
        passwordInput.classList.add("is-invalid");
        passwordFeedback.textContent = "Password must be at least 6 characters";
        return false;
    } else {
        passwordInput.classList.remove("is-invalid");
        if (password) passwordInput.classList.add("is-valid");
        return true;
    }
}

function updateSubmitButton() {
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const hasEmail = emailInput.value.trim() !== "";
    const hasPassword = passwordInput.value.trim() !== "";
    
    if (emailValid && passwordValid && hasEmail && hasPassword) {
        submitBtn.disabled = false;
        submitBtn.className = "btn btn-success";
        submitBtn.textContent = "✅ Ready to Submit";
    } else {
        submitBtn.disabled = true;
        submitBtn.className = "btn btn-primary";
        submitBtn.textContent = "Submit Form";
    }
}

emailInput.addEventListener("input", function() {
    validateEmail();
    updateSubmitButton();
    logInput(`Email validation: ${emailInput.value ? "checking..." : "cleared"}`);
});

passwordInput.addEventListener("input", function() {
    validatePassword();
    updateSubmitButton();
    logInput(`Password validation: ${passwordInput.value.length} characters entered`);
});

// Handle form submission
document.getElementById("validationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent actual form submission
    
    if (!submitBtn.disabled) {
        alert(`Form submitted successfully!\nEmail: ${emailInput.value}\nPassword: ${"*".repeat(passwordInput.value.length)}`);
        logInput(`✅ Form submitted successfully with email: ${emailInput.value}`);
    }
});

// 3. Dropdown and checkboxes
const favoriteColor = document.getElementById("favoriteColor");
const hobbyChecks = document.querySelectorAll(".hobby-check");
const preferencesDisplay = document.getElementById("preferencesDisplay");

function updatePreferences() {
    const color = favoriteColor.value;
    const selectedHobbies = Array.from(hobbyChecks)
        .filter(check => check.checked)
        .map(check => check.value);
    
    let html = "<h6>Your Preferences:</h6>";
    
    if (color) {
        html += `<p><strong>Favorite Color:</strong> <span style="color: ${color};">${color.charAt(0).toUpperCase() + color.slice(1)} ❤️</span></p>`;
    }
    
    if (selectedHobbies.length > 0) {
        html += `<p><strong>Hobbies:</strong> ${selectedHobbies.map(h => h.charAt(0).toUpperCase() + h.slice(1)).join(", ")} 🎯</p>`;
    }
    
    if (!color && selectedHobbies.length === 0) {
        html = '<p class="text-muted">Your preferences will be shown here...</p>';
    }
    
    preferencesDisplay.innerHTML = html;
}

favoriteColor.addEventListener("change", function() {
    updatePreferences();
    logInput(`Favorite color selected: ${favoriteColor.value || "none"}`);
});

hobbyChecks.forEach(checkbox => {
    checkbox.addEventListener("change", function() {
        updatePreferences();
        logInput(`Hobby ${this.checked ? "selected" : "unselected"}: ${this.value}`);
    });
});

// 4. Calculator demo
const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const operationSelect = document.getElementById("operation");
const calcResult = document.getElementById("calcResult");

function calculate() {
    const num1 = parseFloat(num1Input.value) || 0;
    const num2 = parseFloat(num2Input.value) || 0;
    const operation = operationSelect.value;
    
    let result;
    
    switch (operation) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero!";
            break;
        default:
            result = 0;
    }
    
    calcResult.textContent = typeof result === "number" ? result.toFixed(2) : result;
    calcResult.style.color = typeof result === "number" ? "#007bff" : "#dc3545";
    
    return result;
}

// Auto-calculate when inputs change
[num1Input, num2Input, operationSelect].forEach(element => {
    element.addEventListener("input", function() {
        const result = calculate();
        logInput(`Calculator: ${num1Input.value || 0} ${operationSelect.value} ${num2Input.value || 0} = ${result}`);
    });
    
    element.addEventListener("change", function() {
        const result = calculate();
        logInput(`Calculator: ${num1Input.value || 0} ${operationSelect.value} ${num2Input.value || 0} = ${result}`);
    });
});

// Manual calculate button
document.getElementById("calculateBtn").addEventListener("click", function() {
    const result = calculate();
    logInput(`🧮 Manual calculation triggered: Result = ${result}`);
});

// Clear calculator
document.getElementById("clearCalc").addEventListener("click", function() {
    num1Input.value = "";
    num2Input.value = "";
    calcResult.textContent = "0";
    calcResult.style.color = "#007bff";
    logInput("🧹 Calculator cleared");
});

// 5. Clear log
document.getElementById("clearInputLog").addEventListener("click", function() {
    inputLog.innerHTML = '<p class="text-muted">Input events will be logged here...</p>';
    logInput("🧹 Input event log cleared");
});

// Initial setup
logInput("🚀 Input & Forms demo loaded! Start typing and interacting with forms!");