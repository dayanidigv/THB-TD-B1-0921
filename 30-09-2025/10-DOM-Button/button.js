// Making Buttons Work

function sayHello() {
    console.log("Button clicked!");
    
    let message = document.getElementById("message");
    message.innerHTML = "Hello! Button was clicked!";
}