// Simple Callbacks - Functions that run after other functions

// A callback is just a function that gets called later
// Think of it like: "Do this, then when done, do that"

function basicCallback() {
    console.log("=== Basic Callback Demo ===");
    document.getElementById("output").innerHTML = "<h3>Basic Callback:</h3>";
    
    // This function takes a callback
    function doSomething(callback) {
        console.log("Doing something...");
        document.getElementById("output").innerHTML += "<p>Step 1: Doing something...</p>";
        
        // After 1 second, call the callback
        setTimeout(function() {
            console.log("Done! Now calling callback...");
            document.getElementById("output").innerHTML += "<p>Step 2: Done! Now running callback...</p>";
            callback(); // Run the callback function
        }, 1000);
    }
    
    // This is our callback function
    function whenDone() {
        console.log("Callback function ran!");
        document.getElementById("output").innerHTML += "<p>Step 3: Callback function ran!</p>";
    }
    
    // Use it
    doSomething(whenDone);
}

function callbackWithData() {
    console.log("=== Callback with Data ===");
    document.getElementById("output").innerHTML = "<h3>Callback with Data:</h3>";
    
    function getData(callback) {
        console.log("Getting data...");
        document.getElementById("output").innerHTML += "<p>Getting data...</p>";
        
        setTimeout(function() {
                let callbackData = "Here is your data!";

                const result = fetch('https://api.github.com/zen');

                console.log("Data received!", result);
                result.then(response => response.text()).then(data => {
                    console.log("Got data:", data);
                    document.getElementById("output").innerHTML += "<p>Got data: " + data + "</p>";
                    callback(data); // Pass data to callback
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                     document.getElementById("output").innerHTML += "<p >callBack " + callbackData + "</p>";
                });
                result.catch(error => {
                    console.error("Error fetching data:", error);
                    document.getElementById("output").innerHTML += "<p >callBack " + callbackData + "</p>";
                });
                return; // Prevent callback(data) from running twice

            callback(data); // Pass data to callback
        }, 1500);
    }
    
    function useData(data) {
        console.log("Using data:", data);
        document.getElementById("output").innerHTML += "<p>Got data: " + data + "</p>";
    }
    
    getData(useData);
}

function multipleCallbacks() {
    console.log("=== Multiple Callbacks ===");
    document.getElementById("output").innerHTML = "<h3>Multiple Callbacks:</h3>";
    
    function step1(callback) {
        console.log("Step 1");
        document.getElementById("output").innerHTML += "<p>Step 1 running...</p>";
        setTimeout(function() {
            callback("Step 1 done");
        }, 500);
    }
    
    function step2(message, callback) {
        console.log("Step 2, got:", message);
        document.getElementById("output").innerHTML += "<p>Step 2: " + message + "</p>";
        setTimeout(function() {
            callback("Step 2 done");
        }, 500);
    }
    
    function step3(message) {
        console.log("Step 3, got:", message);
        document.getElementById("output").innerHTML += "<p>Step 3: " + message + "</p>";
        document.getElementById("output").innerHTML += "<p><strong>All steps complete!</strong></p>";
    }
    
    // Chain them together
    step1(
        
        function(result1) {

            step2(result1, 

                function(result2) {

                    step3(result2);

                }
            );

        }

);
}

console.log("Callbacks are like saying: 'When you're done, call me back!'");
console.log("Click buttons to see callbacks in action!");