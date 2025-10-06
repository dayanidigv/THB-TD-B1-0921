//var, let, const

const name = "John";        // Cannot change
let age = 25;              // Can change
var old = "Don't use";     // Old way

console.log("const name:", name);
console.log("let age:", age);
console.log("var old:", old);

age = 26; // This works
console.log("age changed to:", age);

// FUNCTION EXAMPLE
function testScope() {
    var a = "var in function - ";
    let b = "let in function - ";
    const c = "const in function - ";
    
    console.log("Inside function:", a, b, c);
    console.log(name, age, old);
}

testScope();

// console.log(a, b, c);

// BLOCK EXAMPLE
if (true) {
    var x = "var in block - ";
    let y = "let in block - ";
    const z = "const in block - ";

    console.log("Inside block:", x, y, z);
}

console.log("var x:", x);
// console.log("let y:", y);  // Error! let stays in block
// console.log("const z:", z); // Error! const stays in block

// var vs let
console.log("-------------------------");

var m = 2;

console.log("var m before block:", m);

if (true) { 
    var m = 'Output';
}

console.log( 5 + m );

if(typeof m === 'number') { 
    console.log( 5 + m );
}

console.log("-------------------------");

let n = 2;
console.log("let n before block:", n);

// let n = 5;
// console.log("Inside block:", n);


// var -> value changeable, redeclarable, function scoped
// let -> value changeable, not redeclarable, block scoped
// const -> value not changeable, not redeclarable, block scoped


