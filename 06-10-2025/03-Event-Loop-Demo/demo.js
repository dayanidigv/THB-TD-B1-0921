// Event Loop Demo - Visual Example

function runCompleteDemo() {
    console.log("=== Complete Event Loop Demo ===");
    
    // Clear previous output
    document.getElementById("output").innerHTML = "";
    document.getElementById("explanation").innerHTML = "";
    
    // Add explanation
    addExplanation("Starting demo...");
    
    // Step 1: Immediate code
    console.log("Step 1: Immediate");
    addOutput("Step 1: This runs immediately", "immediate");
    addExplanation("✓ Ran Step 1 immediately");
    
    // Step 2: Delayed code (0 seconds - still goes to end!)
    setTimeout(function() {
        console.log("Step 4: Delayed (0ms)");
        addOutput("Step 4: This was delayed (even 0ms goes last!)", "delayed");
        addExplanation("✓ Ran Step 4 (was delayed, even 0ms)");
    }, 0);
    
    // Step 3: More immediate code
    console.log("Step 2: More immediate");
    addOutput("Step 2: This also runs immediately", "immediate");
    addExplanation("✓ Ran Step 2 immediately");
    
    // Step 4: Another delay
    setTimeout(function() {
        console.log("Step 5: Delayed (1000ms)");
        addOutput("Step 5: This waited 1 second", "delayed");
        addExplanation("✓ Ran Step 5 (waited 1 second)");
    }, 1000);
    
    // Step 5: Final immediate code
    console.log("Step 3: Final immediate");
    addOutput("Step 3: Last immediate code", "immediate");
    addExplanation("✓ Ran Step 3 immediately");
    
    addExplanation("Now waiting for delayed code...");
}

function addOutput(text, type) {
    const output = document.getElementById("output");
    const div = document.createElement("div");
    div.className = "step " + type;
    div.textContent = text;
    output.appendChild(div);
}

function addExplanation(text) {
    const explanation = document.getElementById("explanation");
    const p = document.createElement("p");

    // console.log("document.createElement ->:",document.createElement("br"));

    p.textContent = text;
    explanation.appendChild(p);
}

function clearOutput() {
    document.getElementById("output").innerHTML = "";
    document.getElementById("explanation").innerHTML = "<p>Ready for new demo</p>";
}

// document.

// document.addEventListener('Event Name', function);


// Show initial explanation
document.addEventListener("DOMContentLoaded", function() {

    addExplanation("Ready to demonstrate Event Loop!");
    addExplanation("JavaScript runs immediate code first, then delayed code");
    addExplanation("Click 'Run Complete Demo' to see this in action");


    // clearing the loading screen
    document.getElementById("loading").remove();

});

console.log("Event Loop demo loaded!");
console.log("Watch the order of execution!");