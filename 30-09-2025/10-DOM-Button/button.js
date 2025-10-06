// Making Buttons Work

function sayHello(isTrue=false) {
    console.log("Button clicked!");
    
    let message = document.getElementById("message");

    message.innerHTML = "Hello World!";

    let btn = document.getElementsByClassName("myButton");

    let h1 = document.getElementsByTagName('h1');

    if (isTrue) sayWorld();
    // sayWorld();
}

function sayWorld(isTrue=false) {

    console.log("Second button clicked!");

    if (isTrue) sayHello();
    // sayHello();
}