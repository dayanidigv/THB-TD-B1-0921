// Repeating Code with Loops

// Count from 1 to 5
console.log("Counting 1 to 5:");

// for is keyword to create a loop
// (start; end; step)
console.log('--------');

// ++ -> 5 + 1 = 6,
// -- -> 5 - 1 = 4

let a = 1;

console.log(a);
a++;
console.log(a);
a--;
console.log(a);

console.log('--------');


let start = 1;
let end = 20;
for (start; start <= end; start += 2) {
    console.log(start);
}

// Count backwards from 10 to 1
console.log("Counting 10 to 1:");

for (let i = 10; i >= 1; i--) {
    console.log(i);
}

// Say hello many times
console.log("Say hello 3 times:");

for (let i = 1; i <= 3; i++) {

    console.log("Hello " + i);

}

// Use while to repeat
console.log("While loop:");

let count = 1;

while (true) {
    console.log("Count is " + count);
    count++;

    if (count > 5) {
        break;
    }
}