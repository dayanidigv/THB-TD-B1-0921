// Event Loop Basics - How JavaScript Runs Code

// JavaScript runs one thing at a time
// But it can wait for things and come back to them later

// 1000ms = 1 second
// 2000000ms = 2000 seconds = ~33 minutes

function print() {
console.log("3. This runs after waiting 1 second");
document.getElementById("output").innerHTML += "<p>Step 3: Waited 1 second!</p>";
}

function runDemo() {
    console.log("=== Event Loop Demo ===");
    
    // This runs first
    console.log("1. This runs first");

    // setTimeout(function, milliseconds)
    
    // This runs third (after waiting)
    setTimeout(print, 5000);

    // This runs second (right away)
    console.log("2. This runs second (right away)");
    document.getElementById("output").innerHTML = "<p>Step 1: Started</p><p>Step 2: Running right away</p>";
    
    // Even though setTimeout was in the middle,
    // JavaScript doesn't wait for it!
    // It keeps going and comes back later
}
