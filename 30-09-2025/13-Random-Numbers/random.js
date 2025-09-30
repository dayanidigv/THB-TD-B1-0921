// Making Random Choices

// Pick a random number
function randomNumber() {
    let random = Math.random();
    console.log("Random 0-1:", random);
    
    // Pick random number from 1 to 10
    let random10 = Math.floor(Math.random() * 10) + 1;
    console.log("Random 1-10:", random10);
    
    document.getElementById("result").innerHTML = "Random number: " + random10;
}

// Pick a random color
function randomColor() {
    let colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    let randomIndex = Math.floor(Math.random() * colors.length);
    let color = colors[randomIndex];
    
    console.log("Random color:", color);
    document.getElementById("result").innerHTML = "Random color: " + color;
    document.getElementById("result").style.color = color;
}

// Pick a random name
function randomName() {
    let names = ["John", "Sara", "Mike", "Anna", "Tom", "Lisa"];
    let randomIndex = Math.floor(Math.random() * names.length);
    let name = names[randomIndex];
    
    console.log("Random name:", name);
    document.getElementById("result").innerHTML = "Random name: " + name;
    document.getElementById("result").style.color = "black";
}