// 🎯 NUMBER GUESSING GAME - Interactive guessing game with multiple difficulty levels

console.log("=== NUMBER GUESSING GAME ===");

// Game state variables
let targetNumber;
let currentAttempts = 0;
let totalGamesWon = 0;
let bestScore = null;
let totalHintsUsed = 0;
let gameActive = true;
let currentDifficulty = "easy";
let guessHistory = [];

// Difficulty settings
const difficulties = {
    easy: { min: 1, max: 50, maxHints: 3 },
    medium: { min: 1, max: 100, maxHints: 2 },
    hard: { min: 1, max: 500, maxHints: 1 }
};

// DOM elements
const guessInput = document.getElementById("guessInput");
const resultDisplay = document.getElementById("resultDisplay");
const attemptsDisplay = document.getElementById("attempts");
const gamesWonDisplay = document.getElementById("gamesWon");
const bestScoreDisplay = document.getElementById("bestScore");
const hintsUsedDisplay = document.getElementById("hintsUsed");
const gameLog = document.getElementById("gameLog");
const guessHistoryDiv = document.getElementById("guessHistory");
const rangeDisplay = document.getElementById("rangeDisplay");
const hintsSection = document.getElementById("hintsSection");
const hintsList = document.getElementById("hintsList");

// Activity logging
function logActivity(message) {
    const time = new Date().toLocaleTimeString();
    const logEntry = `<div class="border-bottom pb-1 mb-1"><small>[${time}] ${message}</small></div>`;
    gameLog.innerHTML = logEntry + gameLog.innerHTML;
    console.log(`[${time}] ${message}`);
}

// Initialize new game
function newGame() {
    const range = difficulties[currentDifficulty];
    targetNumber = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    currentAttempts = 0;
    totalHintsUsed = 0;
    gameActive = true;
    guessHistory = [];
    
    // Update UI
    guessInput.value = "";
    guessInput.min = range.min;
    guessInput.max = range.max;
    rangeDisplay.textContent = `${range.min} and ${range.max}`;
    
    resultDisplay.innerHTML = `
        <p class="text-muted mb-0">
            <i class="bi bi-lightbulb display-4 d-block mb-2"></i>
            Make your first guess for ${currentDifficulty} mode!
        </p>
    `;
    resultDisplay.className = "result-card bg-light d-flex align-items-center justify-content-center";
    
    updateStats();
    updateGuessHistory();
    hideHints();
    
    logActivity(`🎮 New ${currentDifficulty} game started (range: ${range.min}-${range.max})`);
    
    // Enable input and focus
    guessInput.disabled = false;
    guessInput.focus();
}

// Set difficulty level
function setDifficulty(level) {
    currentDifficulty = level;
    const range = difficulties[level];
    
    // Update difficulty button states
    document.querySelectorAll(".difficulty-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    event.target.classList.add("active");
    
    // Update input constraints
    guessInput.min = range.min;
    guessInput.max = range.max;
    rangeDisplay.textContent = `${range.min} and ${range.max}`;
    
    logActivity(`⚙️ Difficulty changed to ${level} (1-${range.max})`);
    
    // Start new game with new difficulty
    newGame();
}

// Update statistics display
function updateStats() {
    attemptsDisplay.textContent = currentAttempts;
    gamesWonDisplay.textContent = totalGamesWon;
    bestScoreDisplay.textContent = bestScore || "-";
    hintsUsedDisplay.textContent = totalHintsUsed;
}

// Update guess history display
function updateGuessHistory() {
    if (guessHistory.length === 0) {
        guessHistoryDiv.innerHTML = '<p class="text-muted text-center py-3">No guesses yet</p>';
        return;
    }
    
    guessHistoryDiv.innerHTML = guessHistory.map((guess, index) => `
        <div class="history-item">
            <span><strong>#${index + 1}:</strong> ${guess.number}</span>
            <span class="${guess.result === 'correct' ? 'text-success' : guess.result === 'high' ? 'text-danger' : 'text-warning'}">
                ${guess.result === 'correct' ? '🎯' : guess.result === 'high' ? '📉' : '📈'}
            </span>
        </div>
    `).join("");
}

// Submit guess
function submitGuess() {
    if (!gameActive) return;
    
    const guess = parseInt(guessInput.value);
    const range = difficulties[currentDifficulty];
    
    // Validate input
    if (isNaN(guess)) {
        showResult("⚠️ Please enter a valid number!", "warning");
        return;
    }
    
    if (guess < range.min || guess > range.max) {
        showResult(`⚠️ Please enter a number between ${range.min} and ${range.max}!`, "warning");
        return;
    }
    
    // Check if guess was already made
    if (guessHistory.some(h => h.number === guess)) {
        showResult("🔄 You already guessed that number! Try a different one.", "info");
        return;
    }
    
    currentAttempts++;
    
    // Process guess
    if (guess === targetNumber) {
        // Correct guess!
        const result = { number: guess, result: "correct" };
        guessHistory.push(result);
        
        totalGamesWon++;
        if (!bestScore || currentAttempts < bestScore) {
            bestScore = currentAttempts;
        }
        
        showResult(`🎉 Congratulations! You guessed it in ${currentAttempts} attempts!`, "success", true);
        gameActive = false;
        guessInput.disabled = true;
        
        logActivity(`🏆 Game won in ${currentAttempts} attempts! Number was ${targetNumber}`);
        
        // Celebration effect
        resultDisplay.classList.add("celebration");
        setTimeout(() => resultDisplay.classList.remove("celebration"), 600);
        
    } else if (guess < targetNumber) {
        // Too low
        const result = { number: guess, result: "low" };
        guessHistory.push(result);
        showResult(`📈 Too low! Try a higher number.`, "info");
        logActivity(`📈 Guess ${guess} was too low (attempt ${currentAttempts})`);
        
    } else {
        // Too high
        const result = { number: guess, result: "high" };
        guessHistory.push(result);
        showResult(`📉 Too high! Try a lower number.`, "danger");
        logActivity(`📉 Guess ${guess} was too high (attempt ${currentAttempts})`);
    }
    
    updateStats();
    updateGuessHistory();
    guessInput.value = "";
    
    // Auto-focus for next guess
    if (gameActive) {
        guessInput.focus();
    }
}

// Show result with styling
function showResult(message, type, isWin = false) {
    const bgClass = {
        success: "bg-success text-white",
        danger: "bg-danger text-white", 
        warning: "bg-warning text-dark",
        info: "bg-info text-white"
    }[type] || "bg-light";
    
    const icon = {
        success: "bi-trophy",
        danger: "bi-arrow-down",
        warning: "bi-exclamation-triangle",
        info: "bi-arrow-up"
    }[type] || "bi-info-circle";
    
    resultDisplay.className = `result-card ${bgClass} d-flex align-items-center justify-content-center`;
    resultDisplay.innerHTML = `
        <div class="text-center">
            <i class="${icon} display-4 d-block mb-2"></i>
            <h5 class="mb-0">${message}</h5>
            ${isWin ? `<small class="d-block mt-2">🎯 Target was: ${targetNumber}</small>` : ''}
        </div>
    `;
}

// Give hint
function giveHint() {
    if (!gameActive) return;
    
    const maxHints = difficulties[currentDifficulty].maxHints;
    if (totalHintsUsed >= maxHints) {
        logActivity(`❌ Maximum hints (${maxHints}) already used for ${currentDifficulty} mode`);
        return;
    }
    
    totalHintsUsed++;
    const range = difficulties[currentDifficulty];
    
    let hintText = "";
    
    // Generate different types of hints
    if (totalHintsUsed === 1) {
        const isEven = targetNumber % 2 === 0;
        hintText = `The number is ${isEven ? 'even' : 'odd'}.`;
    } else if (totalHintsUsed === 2) {
        const midpoint = Math.floor((range.min + range.max) / 2);
        const isHigher = targetNumber > midpoint;
        hintText = `The number is ${isHigher ? 'higher' : 'lower'} than ${midpoint}.`;
    } else {
        const firstDigit = Math.floor(targetNumber / Math.pow(10, Math.floor(Math.log10(targetNumber))));
        hintText = `The first digit is ${firstDigit}.`;
    }
    
    // Add hint to hints section
    showHints();
    const hintElement = document.createElement("div");
    hintElement.className = "hint-card";
    hintElement.innerHTML = `<strong>Hint ${totalHintsUsed}:</strong> ${hintText}`;
    hintsList.appendChild(hintElement);
    
    updateStats();
    logActivity(`💡 Hint ${totalHintsUsed} used: ${hintText}`);
}

// Show/hide hints section
function showHints() {
    hintsSection.style.display = "block";
}

function hideHints() {
    hintsSection.style.display = "none";
    hintsList.innerHTML = "";
}

// Give up function
function giveUp() {
    if (!gameActive) return;
    
    if (confirm("Are you sure you want to give up?")) {
        gameActive = false;
        guessInput.disabled = true;
        
        showResult(`😔 You gave up! The number was ${targetNumber}.`, "warning");
        logActivity(`🏳️ Game ended - gave up after ${currentAttempts} attempts. Number was ${targetNumber}`);
    }
}

// Clear functions
function clearHistory() {
    guessHistory = [];
    updateGuessHistory();
    logActivity("🧹 Guess history cleared");
}

function clearLog() {
    gameLog.innerHTML = '<p class="text-muted">Game activities will be logged here...</p>';
    logActivity("🧹 Game log cleared");
}

// Event listeners
document.getElementById("submitGuess").addEventListener("click", submitGuess);
document.getElementById("newGame").addEventListener("click", newGame);
document.getElementById("giveHint").addEventListener("click", giveHint);
document.getElementById("giveUp").addEventListener("click", giveUp);

guessInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        submitGuess();
    }
});

// Keyboard shortcuts
document.addEventListener("keydown", function(event) {
    if (document.activeElement === guessInput) return;
    
    switch(event.key.toLowerCase()) {
        case "n":
            newGame();
            break;
        case "h":
            giveHint();
            break;
        case "g":
            guessInput.focus();
            break;
        case "escape":
            giveUp();
            break;
    }
});

// Make functions available globally
window.setDifficulty = setDifficulty;
window.clearHistory = clearHistory;
window.clearLog = clearLog;

// Initialize the game
function initGame() {
    newGame();
    logActivity("🚀 Number Guessing Game loaded!");
    logActivity("💡 Tip: Press N for new game, H for hint, G to focus input, Esc to give up");
}

// Start the game
initGame();