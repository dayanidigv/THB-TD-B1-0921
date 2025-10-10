const obj = {
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false,
  functionProp: function() { return "I am a function"; },
undefinedProp: undefined,
symbolProp: Symbol("I am a symbol"),
    nested: { a: 1, b: 2 }

}
console.log("Object before JSON.stringify:", obj);

let jsonString = '{"name": "John", "age": 30, "city": "New York"}';
let plaintxt ="name: John, age: 30, city: New York"

let parsedObj = JSON.parse(jsonString);

console.log("Parsed object:", parsedObj.name); // Output: John
console.log("Parsed object:", parsedObj.age);  // Output: 30
console.log("Parsed object:", parsedObj.city); // Output: New York

