// Real World Callback Examples

function cookingExample() {
    console.log("=== Cooking Example ===");
    document.getElementById("output").innerHTML = "<h3>Cooking with Callbacks:</h3>";
    
    function boilWater(callback) {
        console.log("Putting pot on stove...");
        document.getElementById("output").innerHTML += "<p>🔥 Putting pot on stove...</p>";
        
        setTimeout(function() {
            console.log("Water is boiling!");
            document.getElementById("output").innerHTML += "<p>💧 Water is boiling!</p>";
            callback();
        }, 2000);
    }
    
    function addPasta() {
        console.log("Adding pasta to boiling water");
        document.getElementById("output").innerHTML += "<p>🍝 Adding pasta to boiling water</p>";
        
        setTimeout(function() {
            console.log("Pasta is ready!");
            document.getElementById("output").innerHTML += "<p>✅ Pasta is ready to eat!</p>";
        }, 1500);
    }
    
    // Cook pasta: first boil water, then add pasta
    boilWater(addPasta);
}

function orderPizza() {
    console.log("=== Pizza Order ===");
    document.getElementById("output").innerHTML = "<h3>Ordering Pizza:</h3>";
    
    function callPizzaPlace(callback) {
        console.log("Calling pizza place...");
        document.getElementById("output").innerHTML += "<p>📞 Calling pizza place...</p>";
        
        setTimeout(function() {
            console.log("Pizza ordered! They said 30 minutes");
            document.getElementById("output").innerHTML += "<p>🍕 Pizza ordered! 30 minutes wait</p>";
            callback();
        }, 1000);
    }
    
    function waitForDelivery(callback) {
        console.log("Waiting for pizza delivery...");
        document.getElementById("output").innerHTML += "<p>⏰ Waiting for delivery...</p>";
        
        setTimeout(function() {
            console.log("Pizza arrived!");
            callback("Delicious pizza!");
        }, 3000);
    }
    
    function eatPizza(pizzaType) {
        console.log("Eating:", pizzaType);
        document.getElementById("output").innerHTML += "<p>😋 Eating: " + pizzaType + "</p>";
    }
    
    // Order process: call place, wait for delivery, eat pizza
    // callPizzaPlace(function() {
    //     waitForDelivery(eatPizza);
    // });

    callPizzaPlace(
        waitForDelivery(
            eatPizza
        )
    );
}

function downloadFile() {
    console.log("=== File Download ===");
    document.getElementById("output").innerHTML = "<h3>Downloading File:</h3>";
    
    function startDownload(fileName, callback) {
        console.log("Starting download:", fileName);
        document.getElementById("output").innerHTML += "<p>📥 Starting download: " + fileName + "</p>";
        
        // Simulate download progress
        let progress = 0;
        const interval = setInterval(function() {
            progress += 20;
            console.log("Download progress:", progress + "%");
            document.getElementById("output").innerHTML += "<p>Progress: " + progress + "%</p>";
            
            if (progress >= 100) {
                clearInterval(interval);
                console.log("Download complete!");
                callback(fileName);
            }
        }, 500);
    }
    
    function openFile(fileName) {
        console.log("Opening file:", fileName);
        document.getElementById("output").innerHTML += "<p>📂 Opening file: " + fileName + "</p>";
        document.getElementById("output").innerHTML += "<p>✅ File opened successfully!</p>";
    }
    
    // Download then open file
    startDownload("MyDocument.pdf", openFile);
}

console.log("Real world callbacks help us handle things that take time!");
console.log("Like cooking, ordering food, or downloading files!");