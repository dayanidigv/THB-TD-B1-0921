// Showing Messages and Asking Questions

// Show a message box
function showAlert() {
    alert("Hello! This is an alert!");
    console.log("Alert was shown");
}

// Ask for a name
function askName() {
    let name = prompt("What is your name?");
    
    if (name) {
        alert("Hello " + name + "!");
        document.getElementById("result").innerHTML = "Hello " + name + "!";
    }
    
    console.log("Name entered:", name);
}

// Ask a yes or no question
function askQuestion() {
    let answer = confirm("Do you like JavaScript?");
    
    if (answer) {
        alert("Great! JavaScript is awesome!");
        document.getElementById("result").innerHTML = "You like JavaScript!";
    } else {
        alert("That's okay, keep learning!");
        document.getElementById("result").innerHTML = "Keep learning!";
    }
    
    console.log("Answer:", answer);
}