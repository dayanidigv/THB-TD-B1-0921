// Lists of Things

// Make a list of fruits

// [] -> it's an array

// apple is at index 0
// banana is at index 1
// orange is at index 2

let items = ["apple", "banana", "orange", 67, true];

// console.log("First item:", items[0]);
// console.log("Second item:", items[1]);
// console.log("Third item:", items[2]);
// console.log("Fourth item:", items[3]);
// console.log("Fifth item:", items[4]);
console.log("Original items:", items);

items.pop(); // removes the last item
items.pop(); // removes the last item
items.push("grape"); // adds an item to the end of the list


console.log("All items:", items);

// Make a list of numbers
let numbers = [1, 2, 10, 4, 5];

console.log("All numbers:", numbers);
console.log("First number:", numbers[0]);
console.log("Last number:", numbers[4]);

let max = numbers.filter(
    (number)=>{
        return number > 2
    }
);

console.log("Numbers greater than 2:", max);

numbers.map(
    (number)=>{
        console.log("Number:", number);
    }
);

let fruits = ["apple", "banana", "orange"];

// For array it's 0 , 1, 2
// For humans it's 1, 2, 3

// Show all fruits in the list
console.log("All fruits, total of", fruits.length, "fruits.");

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}