// Promise Basics - A better way than callbacks!

function simplePromise() {
    console.log("=== Simple Promise ===");
    document.getElementById("output").innerHTML = '<div class="pending">Creating a simple promise...</div>';
    
    // Creating a basic promise
    const myPromise = new Promise(function(resolve, reject) {
        console.log("Promise is working...");
        
        setTimeout(function() {
            resolve("Promise completed!");
        }, 1000);
    });
    
    // Using the promise
    myPromise.then(function(result) {
        console.log("Promise result:", result);
        document.getElementById("output").innerHTML = '<div class="success">Promise result: ' + result + '</div>';
    });
}

function successPromise() {
    console.log("=== Success Promise ===");
    document.getElementById("output").innerHTML = '<div class="pending">Making a promise that will succeed...</div>';
    
    // Promise that always succeeds
    const successPromise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("Success! Task completed perfectly!");
        }, 1500);
    });
    
    successPromise
        .then(function(result) {
            console.log("Success:", result);
            document.getElementById("output").innerHTML = '<div class="success"><strong>✅ Success!</strong><br>' + result + '</div>';
        })
        .catch(function(error) {
            console.log("Error:", error);
            document.getElementById("output").innerHTML = '<div class="error">Error: ' + error + '</div>';
        });
}

function errorPromise() {
    console.log("=== Error Promise ===");
    document.getElementById("output").innerHTML = '<div class="pending">Making a promise that will fail...</div>';
    
    // Promise that always fails
    const errorPromise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject("Oh no! Something went wrong!");
        }, 1000);
    });
    
    errorPromise
        .then(function(result) {
            console.log("Success:", result);
            document.getElementById("output").innerHTML = '<div class="success">Success: ' + result + '</div>';
        })
        .catch(function(error) {
            console.log("Caught error:", error);
            document.getElementById("output").innerHTML = '<div class="error"><strong>❌ Error Caught!</strong><br>' + error + '</div>';
        });
}

function randomPromise() {
    console.log("=== Random Promise ===");
    document.getElementById("output").innerHTML = '<div class="pending">Making a random promise... Will it succeed or fail?</div>';
    
    // Promise that randomly succeeds or fails
    const randomPromise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            const success = Math.random() > 0.5;
            
            if (success) {
                resolve("Lucky! The random promise succeeded!");
            } else {
                reject("Unlucky! The random promise failed!");
            }
        }, 1200);
    });
    
    randomPromise
        .then(function(result) {
            console.log("Random success:", result);
            document.getElementById("output").innerHTML = '<div class="success"><strong>🍀 Lucky!</strong><br>' + result + '</div>';
        })
        .catch(function(error) {
            console.log("Random error:", error);
            document.getElementById("output").innerHTML = '<div class="error"><strong>💔 Unlucky!</strong><br>' + error + '</div>';
        });
}

// Real world example function
function orderPizza() {
    return new Promise(function(resolve, reject) {
        console.log("Pizza shop is making your pizza...");
        
        setTimeout(function() {
            const success = Math.random() > 0.3; // 70% chance of success
            
            if (success) {
                resolve("🍕 Your delicious pizza is ready!");
            } else {
                reject("😞 Sorry, we ran out of ingredients!");
            }
        }, 2000);
    });
}

console.log("Promise Basics loaded!");
console.log("Promises have 3 states:");
console.log("1. Pending - working on it");
console.log("2. Fulfilled - completed successfully");
console.log("3. Rejected - failed or error");
console.log("Click the buttons to see examples!");