// Document addEventListener examples

console.log("=== DOCUMENT ADDEVENTLISTENER EXAMPLES ===");

// Example 1: Wait for page to load
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded!");
    addToOutput("Page finished loading!");
});

function callbtn(){
    console.log("Button was clicked!");
    addToOutput("🖱️ You clicked the button!");
}

// Example 2: Listen for clicks on button
// document.addEventListener("DOMContentLoaded", function() {

//     const clickButton = document.getElementById("clickBtn");
    
//     clickButton.addEventListener("click", callbtn);
// });

// Example 3: Listen for mouse hover
document.addEventListener("DOMContentLoaded", function() {
    const hoverButton = document.getElementById("hoverBtn");
    
    hoverButton.addEventListener("mouseover", function() {
        // console.log("Mouse over button!");
        console.clear();
        addToOutput("👆 Mouse is over the button!");
    });
    
    hoverButton.addEventListener("mouseout", function() {
        console.log("Mouse left button!");
        addToOutput("👋 Mouse left the button!");
    });
});

// Example 4: Listen for keyboard presses
document.addEventListener("keydown", function(event) {
    // console.log("Key pressed:", event.key);
    addToOutput("⌨️ You pressed: " + event.key);
});

// Helper function to add text to output
function addToOutput(text) {
    const output = document.getElementById("output");
    const time = new Date().toLocaleTimeString();
    output.innerHTML += "<p>[" + time + "] " + text + "</p>";
}


// Helper function to clear output
function clearOutput() {
    document.getElementById("output").innerHTML = "Output cleared!<br>";

    let div = document.createElement("div");
    
    div.textContent = "Output cleared!";

    console.log(div);
    console.log(typeof div);

    document.getElementById("output").appendChild(div);
}



document.addEventListener("DOMContentLoaded", function() {

    let div = document.createElement("div");

    div.textContent = "This div was created and added to the document when DOMContentLoaded fired.";
    
    document.body.appendChild(div);
});