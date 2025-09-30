// Making Your Own Commands

// Make a command that says hello

// function name() { ... }


function sayHello() {
    console.log("Hello!");
}

function sayHello1() {
    console.log("Hello!");
}

function sayHello2() {
    console.log("Hello!");
}

function sayHello3() {
    console.log("Hello!");
}

sayHello();

// Make a command that uses a name
function greet(name) {
    console.log("Hello " + name);
}

greet("John");
greet("Sara");
greet("Daya");

// Make a command that gives back an answer
function add(a, b) {
    return a + b;
}

let result = add(5, 3);

console.log("5 + 3 =", result);


// Make a command to check age
function checkAge(age) {
    if (age >= 18) {
        return "Adult";
    } else {
        return "Child";
    }
}

console.log("Age 20: " + checkAge(20));
console.log("Age 15:", checkAge(15));