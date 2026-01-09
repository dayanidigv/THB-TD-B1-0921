const $name = "daya"

let obj = {
    $name: "thb",
    $age: 30
}

console.log($name)
console.log(obj);


// MongoDB 
Object.entries(obj).forEach(([key, value]) => {
    console.log(key, value);
    if (key === '$gt') {
        console.log("Found $gt operator");
    }
});