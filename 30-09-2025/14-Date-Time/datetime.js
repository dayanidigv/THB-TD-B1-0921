// Working with Dates and Time

// Show what day it is today
function showDate() {
    let today = new Date();
    let dateText = today.toDateString();
    
    console.log("Today's date:", dateText);
    document.getElementById("result").innerHTML = "Today: " + dateText;
}

// Show what time it is now
function showTime() {
    let now = new Date();
    let timeText = now.toTimeString();
    
    console.log("Current time:", timeText);
    document.getElementById("result").innerHTML = "Time: " + timeText;
}

// Find out how old someone is
function showAge() {
    let birthYear = prompt("What year were you born?");
    
    if (birthYear) {
        let currentYear = new Date().getFullYear();
        let age = currentYear - birthYear;
        
        console.log("Birth year:", birthYear);
        console.log("Current year:", currentYear);
        console.log("Age:", age);
        
        document.getElementById("result").innerHTML = "You are " + age + " years old!";
    }
}