// setTimeout

// setTimeout lets you wait before doing something
// setTimeout(function, milliseconds)
// 1000 milliseconds = 1 second
// 1000 * 60 = 60000 milliseconds = 1 minute

function sayHelloLater() {
    console.log("Button clicked! Waiting 2 seconds...");
    
    setTimeout(function() {
        console.log("Hello! I waited 2 seconds!");
        document.getElementById("messages").innerHTML += "<p>Hello! I waited 2 seconds!</p>";
    }, 2000);
    
    console.log("This shows right away");
}

function countToThree() {
    console.log("Starting to count...");
    document.getElementById("messages").innerHTML = "<p>Starting to count...</p>";
    
    setTimeout(function() {
        console.log("1");
        document.getElementById("messages").innerHTML += "<p>1</p>";
    }, 1000);
    
    setTimeout(function() {
        console.log("2");
        document.getElementById("messages").innerHTML += "<p>2</p>";
    }, 2000);
    
    setTimeout(function() {
        console.log("3");
        document.getElementById("messages").innerHTML += "<p>3 - Done!</p>";
    }, 3000);
}

function showMessage() {
    console.log("Getting ready to show message...");
    document.getElementById("messages").innerHTML = "<p>Getting ready...</p>";
    
    // Wait half a second
    setTimeout(function() {
        document.getElementById("messages").innerHTML += "<p>Almost ready...</p>";
        
        // Wait another half second
        setTimeout(function() {
            document.getElementById("messages").innerHTML += "<p>Message: setTimeout is easy!</p>";
        }, 500);
    }, 500);
}

// setInterval - Does something over and over again
let clockInterval;
let countInterval;

function updateClock() {
    const now = new Date().toLocaleTimeString();
    console.log("Time:", now);
    document.getElementById("messages").innerHTML = "<p>⏰ Current time: " + now + "</p>";
}

function startClock() {
    console.log("Starting clock...");
    document.getElementById("messages").innerHTML = "<p>Clock started! Watch it tick...</p>";
    
    // setInterval repeats every 1 second
    clockInterval = setInterval(updateClock, 1000 * 2);

}

function stopClock() {
    console.log("Stopping clock...");
    clearInterval(clockInterval);
    document.getElementById("messages").innerHTML += "<p>⏹️ Clock stopped!</p>";
}

function startCounter() {
    console.log("Starting counter...");
    document.getElementById("messages").innerHTML = "<p>Counter started!</p>";
    
    let count = 0;
    
    // Count up every half second
    countInterval = setInterval(
        
        function() {
        count++;
        console.log("Count:", count);
        document.getElementById("messages").innerHTML = "<p>📊 Count: " + count + "</p>";

        // Stop at 10
        if (count >= 10) {
            clearInterval(countInterval);
            document.getElementById("messages").innerHTML += "<p>✅ Counter finished!</p>";
        }
    }

    , 1000);
}

function flashMessage() {
    console.log("Starting flash message...");
    let visible = true;
    let flashCount = 0;
    
    const flashInterval = setInterval(
        
        function() {
        if (visible) {
            document.getElementById("messages").innerHTML = "<p style='background: yellow;'>💡 FLASHING MESSAGE!</p>";
        } else {
            document.getElementById("messages").innerHTML = "<p style='background: white;'>💡 FLASHING MESSAGE!</p>";
        }
        
        visible = !visible;
        // visible = !visible; --- IGNORE ---
        flashCount++;
        
        // Stop flashing after 10 times
        if (flashCount >= 10) {
            clearInterval(flashInterval);
            document.getElementById("messages").innerHTML = "<p>✨ Flash complete!</p>";
        }
    }, 300);
}
// 1 -> 0.001 seconds
// 10 -> 0.01 seconds
// 500 -> 0.5 seconds
// 1000 -> 1 second

console.log("setTimeout and setInterval examples loaded!");
console.log("setTimeout = wait once, then do something");
console.log("setInterval = do something over and over again");
console.log("Click buttons to see delays and repeating actions!");