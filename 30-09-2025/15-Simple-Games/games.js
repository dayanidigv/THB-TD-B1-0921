// Fun Games to Play

// Guess the secret number
function guessNumber() {
    let secretNumber = Math.floor(Math.random() * 10) + 1;
    let guess = prompt("Guess a number between 1 and 10:");
    
    if (guess) {
        if (guess == secretNumber) {
            alert("Correct! You won!");
            document.getElementById("result").innerHTML = "You guessed " + secretNumber + " correctly!";
        } else {
            alert("Wrong! The number was " + secretNumber);
            document.getElementById("result").innerHTML = "Wrong! It was " + secretNumber + ", you guessed " + guess;
        }
    }
}

// Play Rock Paper Scissors
function rockPaperScissors() {
    let choices = ["rock", "paper", "scissors"];
    let computer = choices[Math.floor(Math.random() * 3)];
    let player = prompt("Choose: rock, paper, or scissors").toLowerCase();
    
    if (player) {
        console.log("Player:", player);
        console.log("Computer:", computer);
        
        if (player === computer) {
            alert("It's a tie!");
            document.getElementById("result").innerHTML = "Tie! Both chose " + player;
        } else if (
            (player === "rock" && computer === "scissors") ||
            (player === "paper" && computer === "rock") ||
            (player === "scissors" && computer === "paper")
        ) {
            alert("You win!");
            document.getElementById("result").innerHTML = "You win! " + player + " beats " + computer;
        } else {
            alert("Computer wins!");
            document.getElementById("result").innerHTML = "Computer wins! " + computer + " beats " + player;
        }
    }
}

// Flip a coin
function coinFlip() {
    let choice = prompt("Choose heads or tails").toLowerCase();
    let coins = ["heads", "tails"];
    let result = coins[Math.floor(Math.random() * 2)];
    
    if (choice) {
        console.log("Your choice:", choice);
        console.log("Coin result:", result);
        
        if (choice === result) {
            alert("You win! It was " + result);
            document.getElementById("result").innerHTML = "You win! The coin was " + result;
        } else {
            alert("You lose! It was " + result);
            document.getElementById("result").innerHTML = "You lose! The coin was " + result;
        }
    }
}