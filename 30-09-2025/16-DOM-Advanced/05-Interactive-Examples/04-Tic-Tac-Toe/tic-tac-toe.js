// ❌⭕ TIC TAC TOE GAME - Classic 3x3 grid game with advanced features

console.log("=== TIC TAC TOE GAME ===");

// Game state variables
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let moveCount = 0;
let gameHistory = [];

// Statistics
let stats = {
    xWins: 0,
    oWins: 0,
    ties: 0
};

// Settings
let settings = {
    enableSounds: true,
    showMoveNumbers: true,
    highlightWinner: true
};

// DOM elements
const gameBoardElement = document.getElementById("gameBoard");
const gameStatus = document.getElementById("gameStatus");
const gameLog = document.getElementById("gameLog");
const moveHistory = document.getElementById("moveHistory");
const xWinsDisplay = document.getElementById("xWins");
const oWinsDisplay = document.getElementById("oWins");
const tiesDisplay = document.getElementById("ties");

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Activity logging
function logActivity(message) {
    const time = new Date().toLocaleTimeString();
    const logEntry = `<div class="border-bottom pb-1 mb-1"><small>[${time}] ${message}</small></div>`;
    gameLog.innerHTML = logEntry + gameLog.innerHTML;
    console.log(`[${time}] ${message}`);
}

// Create game board
function createBoard() {
    gameBoardElement.innerHTML = "";
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "game-cell";
        cell.dataset.index = i;
        cell.addEventListener("click", () => makeMove(i));
        gameBoardElement.appendChild(cell);
    }
}

// Update board display
function updateBoard() {
    const cells = gameBoardElement.children;
    
    for (let i = 0; i < 9; i++) {
        const cell = cells[i];
        const value = gameBoard[i];
        
        cell.textContent = value;
        cell.className = "game-cell";
        
        if (value === "X") {
            cell.classList.add("x");
        } else if (value === "O") {
            cell.classList.add("o");
        }
        
        if (value !== "" || !gameActive) {
            cell.classList.add("disabled");
        }
    }
}

// Update game status display
function updateStatus(message, isGameEnd = false) {
    const playerIndicator = currentPlayer === "X" ? 
        '<span class="player-indicator player-x">X</span>' : 
        '<span class="player-indicator player-o">O</span>';
    
    if (isGameEnd) {
        gameStatus.innerHTML = `
            <h4 class="mb-2">${message}</h4>
            <p class="mb-0">Click "New Game" to play again!</p>
        `;
    } else {
        gameStatus.innerHTML = `
            <h4 class="mb-2">
                ${playerIndicator}
                Player ${currentPlayer}'s Turn
            </h4>
            <p class="mb-0">Click any empty cell to make your move!</p>
        `;
    }
}

// Make a move
function makeMove(index) {
    if (!gameActive || gameBoard[index] !== "") {
        return;
    }
    
    // Make the move
    gameBoard[index] = currentPlayer;
    moveCount++;
    
    // Record move in history
    gameHistory.push({
        player: currentPlayer,
        position: index,
        move: moveCount,
        boardState: [...gameBoard]
    });
    
    // Update display
    updateBoard();
    updateMoveHistory();
    
    // Play sound effect
    if (settings.enableSounds) {
        playSound("move");
    }
    
    // Check for winner
    const winner = checkWinner();
    
    if (winner) {
        gameActive = false;
        stats[winner === "X" ? "xWins" : "oWins"]++;
        
        if (settings.highlightWinner) {
            highlightWinningLine();
        }
        
        updateStatus(`🎉 Player ${winner} Wins!`, true);
        updateStats();
        
        if (settings.enableSounds) {
            playSound("win");
        }
        
        logActivity(`🏆 Player ${winner} won the game in ${moveCount} moves!`);
        
    } else if (moveCount === 9) {
        // Tie game
        gameActive = false;
        stats.ties++;
        
        updateStatus(`🤝 It's a Tie!`, true);
        updateStats();
        
        if (settings.enableSounds) {
            playSound("tie");
        }
        
        logActivity(`🤝 Game ended in a tie after ${moveCount} moves`);
        
    } else {
        // Continue game
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();
        
        logActivity(`${currentPlayer === "X" ? "O" : "X"} played position ${index + 1}, now ${currentPlayer}'s turn`);
    }
}

// Check for winner
function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        
        if (gameBoard[a] && 
            gameBoard[a] === gameBoard[b] && 
            gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return null;
}

// Highlight winning line
function highlightWinningLine() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        
        if (gameBoard[a] && 
            gameBoard[a] === gameBoard[b] && 
            gameBoard[a] === gameBoard[c]) {
            
            const cells = gameBoardElement.children;
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            break;
        }
    }
}

// Update move history
function updateMoveHistory() {
    if (gameHistory.length === 0) {
        moveHistory.innerHTML = '<p class="text-muted text-center py-3">No moves yet</p>';
        return;
    }
    
    moveHistory.innerHTML = gameHistory.map((move, index) => `
        <div class="move-item">
            <strong>Move ${move.move}:</strong> 
            <span class="${move.player === 'X' ? 'text-danger' : 'text-primary'}">
                Player ${move.player}
            </span> 
            → Position ${move.position + 1}
            ${index === gameHistory.length - 1 ? ' <small class="text-muted">(Latest)</small>' : ''}
        </div>
    `).join("");
}

// Update statistics display
function updateStats() {
    xWinsDisplay.textContent = stats.xWins;
    oWinsDisplay.textContent = stats.oWins;
    tiesDisplay.textContent = stats.ties;
}

// Reset game
function resetGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    moveCount = 0;
    gameHistory = [];
    
    updateBoard();
    updateStatus();
    updateMoveHistory();
    
    logActivity("🔄 New game started");
}

// Undo last move
function undoMove() {
    if (gameHistory.length === 0) {
        logActivity("❌ No moves to undo");
        return;
    }
    
    if (!gameActive && gameHistory.length > 0) {
        // Game ended, reactivate it
        gameActive = true;
    }
    
    // Remove last move
    const lastMove = gameHistory.pop();
    const previousPlayer = lastMove.player;
    
    // Restore board state
    if (gameHistory.length > 0) {
        const previousState = gameHistory[gameHistory.length - 1].boardState;
        gameBoard = [...previousState];
        moveCount = gameHistory.length;
        currentPlayer = previousPlayer === "X" ? "O" : "X";
    } else {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        moveCount = 0;
        currentPlayer = "X";
    }
    
    updateBoard();
    updateStatus();
    updateMoveHistory();
    
    logActivity(`↶ Undid move: Player ${previousPlayer} from position ${lastMove.position + 1}`);
}

// Play sound effects (placeholder - would need actual audio files)
function playSound(type) {
    if (!settings.enableSounds) return;
    
    // In a real implementation, you would play actual sound files
    console.log(`🔊 Playing ${type} sound`);
    
    // Visual feedback instead of actual sound
    if (type === "win") {
        document.body.style.animation = "none";
        setTimeout(() => {
            document.body.style.animation = "pulse 0.5s ease-in-out";
        }, 10);
    }
}

// Clear functions
function clearHistory() {
    gameHistory = [];
    updateMoveHistory();
    logActivity("🧹 Move history cleared");
}

function clearStats() {
    if (confirm("Are you sure you want to clear all statistics?")) {
        stats = { xWins: 0, oWins: 0, ties: 0 };
        updateStats();
        logActivity("📊 Statistics cleared");
    }
}

function clearLog() {
    gameLog.innerHTML = '<p class="text-muted">Game activities will be logged here...</p>';
    logActivity("🧹 Game log cleared");
}

// Settings event listeners
document.getElementById("enableSounds").addEventListener("change", function() {
    settings.enableSounds = this.checked;
    logActivity(`🔊 Sound effects ${this.checked ? 'enabled' : 'disabled'}`);
});

document.getElementById("showMoveNumbers").addEventListener("change", function() {
    settings.showMoveNumbers = this.checked;
    updateMoveHistory();
    logActivity(`📝 Move numbers ${this.checked ? 'enabled' : 'disabled'}`);
});

document.getElementById("highlightWinner").addEventListener("change", function() {
    settings.highlightWinner = this.checked;
    logActivity(`🎯 Winner highlighting ${this.checked ? 'enabled' : 'disabled'}`);
});

// Game control event listeners
document.getElementById("resetGame").addEventListener("click", resetGame);
document.getElementById("undoMove").addEventListener("click", undoMove);
document.getElementById("clearStats").addEventListener("click", clearStats);

// Keyboard shortcuts
document.addEventListener("keydown", function(event) {
    const key = event.key.toLowerCase();
    
    // Number keys 1-9 for quick moves
    if (key >= "1" && key <= "9") {
        const index = parseInt(key) - 1;
        makeMove(index);
    }
    
    switch(key) {
        case "r":
            resetGame();
            break;
        case "u":
            undoMove();
            break;
        case "escape":
            if (confirm("Are you sure you want to quit the current game?")) {
                resetGame();
            }
            break;
    }
});

// Make functions available globally
window.clearHistory = clearHistory;
window.clearLog = clearLog;

// Initialize the game
function initGame() {
    createBoard();
    updateBoard();
    updateStatus();
    updateStats();
    updateMoveHistory();
    
    logActivity("🚀 Tic Tac Toe game loaded!");
    logActivity("💡 Tip: Use number keys 1-9 for quick moves, R to reset, U to undo");
}

// Start the game
initGame();