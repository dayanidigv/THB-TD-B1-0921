// Showing Messages and Asking Questions

// Show a message box
function showAlert(e) {

    alert("Are you sure ?");

    console.log(e.target.innerHTML="Deleted!");
}
 
// Ask for a name
function askName() {
    let name = prompt("What is your name?");
    console.log(name);
    if (name) {
        alert("Hello " + name + "!");
        document.getElementById("result").innerHTML = "Hello " + name + "!";
    }else{
        alert("No name entered.");
        askName();
    }
    console.log("Name entered:", name);
}

// Ask a yes or no question
function askQuestion() {
    let answer = confirm("Do you like JavaScript?");

    console.log(answer);
    
    if (answer) {
        alert("Great! JavaScript is awesome!");
        document.getElementById("result").innerHTML = "You like JavaScript!";
    } else {
        alert("That's okay, keep learning!");
        document.getElementById("result").innerHTML = "Keep learning!";
    }
    
    console.log("Answer:", answer);
}