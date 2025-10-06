// Callback Problems - Why callbacks can be hard

function showCallbackHell() {
    console.log("=== Callback Hell Demo ===");
    document.getElementById("output").innerHTML = '<div class="problem"><h3>The Problem: Callback Hell</h3><p>When you have many callbacks, code becomes hard to read:</p></div>';
    
    // This is what's called "Callback Hell" - too many nested callbacks
    function step1(callback) {
        setTimeout(function() {
            console.log("Step 1 done");
            document.getElementById("output").innerHTML += "<p>Step 1 done</p>";
            callback();
        }, 500);
    }
    
    function step2(callback) {
        setTimeout(function() {
            console.log("Step 2 done");
            document.getElementById("output").innerHTML += "<p>Step 2 done</p>";
            callback();
        }, 500);
    }
    
    function step3(callback) {
        setTimeout(function() {
            console.log("Step 3 done");
            document.getElementById("output").innerHTML += "<p>Step 3 done</p>";
            callback();
        }, 500);
    }
    
    function step4(callback) {
        setTimeout(function() {
            console.log("Step 4 done");
            document.getElementById("output").innerHTML += "<p>Step 4 done</p>";
            callback();
        }, 500);
    }
    
    // Look how nested this gets!
    step1(function() {
        step2(function() {
            step3(function() {
                step4(function() {
                    console.log("All steps done!");
                    document.getElementById("output").innerHTML += '<div class="problem"><p><strong>See how nested this code is? This is "Callback Hell"!</strong></p></div>';
                });
            });
        });
    });
}

function showErrorHandling() {
    console.log("=== Error Handling Problem ===");
    document.getElementById("output").innerHTML = '<div class="problem"><h3>The Problem: Error Handling</h3><p>With callbacks, handling errors is complicated:</p></div>';
    
    function riskyOperation(callback) {
        setTimeout(function() {
            // Simulate random success or failure
            const success = Math.random() > 0.5;
            
            if (success) {
                console.log("Operation succeeded");
                document.getElementById("output").innerHTML += "<p>✅ Operation succeeded</p>";
                callback(null, "Success data");
            } else {
                console.log("Operation failed");
                document.getElementById("output").innerHTML += "<p>❌ Operation failed</p>";
                callback("Something went wrong", null);
            }
        }, 1000);
    }
    
    // With callbacks, we need to check for errors in every callback
    riskyOperation(function(error, data) {
        if (error) {
            console.log("Error:", error);
            document.getElementById("output").innerHTML += '<div class="problem"><p>Error handling with callbacks requires checking every time!</p></div>';
            return;
        }
        
        console.log("Got data:", data);
        document.getElementById("output").innerHTML += "<p>Got data: " + data + "</p>";
        
        // If we had another operation, we'd need to check errors again...
        // This gets messy quickly!
    });
}

function showSolution() {
    console.log("=== Better Solution Preview ===");
    document.getElementById("output").innerHTML = '<div class="solution"><h3>The Solution: Promises and Async/Await</h3></div>';
    
    // This is a preview of what we'll learn next
    document.getElementById("output").innerHTML += '<div class="solution">';
    document.getElementById("output").innerHTML += '<p><strong>Instead of this callback mess:</strong></p>';
    document.getElementById("output").innerHTML += '<pre>doSomething(function(result1) {\n  doNext(result1, function(result2) {\n    doFinal(result2, function(result3) {\n      // Finally done!\n    });\n  });\n});</pre>';
    
    document.getElementById("output").innerHTML += '<p><strong>We can write clean code like this:</strong></p>';
    document.getElementById("output").innerHTML += '<pre>const result1 = await doSomething();\nconst result2 = await doNext(result1);\nconst result3 = await doFinal(result2);\n// Much cleaner!</pre>';
    
    document.getElementById("output").innerHTML += '<p>This is what we\'ll learn in the next lessons!</p>';
    document.getElementById("output").innerHTML += '</div>';
}

console.log("Callbacks are useful but can create problems:");
console.log("1. Callback Hell (too much nesting)");
console.log("2. Hard to handle errors");
console.log("3. Code becomes hard to read");
console.log("That's why we have Promises and Async/Await!");