// Promise Examples - Real world scenarios

function orderPizza() {
    console.log("=== Pizza Ordering ===");
    document.getElementById("output").innerHTML = '<div class="pending">📞 Calling pizza shop...</div>';
    
    // Step 1: Call pizza shop
    function callPizzaShop() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                const available = Math.random() > 0.2;
                if (available) {
                    resolve("Pizza shop answered! They're open!");
                } else {
                    reject("Pizza shop is closed!");
                }
            }, 1000);
        });
    }
    
    // Step 2: Place order
    function placeOrder() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve("Order placed! Pizza #123 is being made!");
            }, 1500);
        });
    }
    
    // Step 3: Wait for delivery
    function waitForDelivery() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                const delivered = Math.random() > 0.1;
                if (delivered) {
                    resolve("🍕 Pizza delivered! Enjoy your meal!");
                } else {
                    reject("Sorry, delivery person got lost!");
                }
            }, 2000);
        });
    }
    
    // Chain all the steps together
    callPizzaShop()
        .then(function(result) {
            console.log(result);
            document.getElementById("output").innerHTML += '<div class="success">' + result + '</div>';
            return placeOrder();
        })
        .then(function(result) {
            console.log(result);
            document.getElementById("output").innerHTML += '<div class="success">' + result + '</div>';
            return waitForDelivery();
        })
        .then(function(result) {
            console.log(result);
            document.getElementById("output").innerHTML += '<div class="success">' + result + '</div>';
        })
        .catch(function(error) {
            console.log("Pizza error:", error);
            document.getElementById("output").innerHTML += '<div class="error">❌ ' + error + '</div>';
        });
}

function downloadFile() {
    console.log("=== File Download ===");
    document.getElementById("output").innerHTML = '<div class="pending">🌐 Starting download...</div>';
    
    function startDownload() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve("Connected to server!");
            }, 800);
        });
    }
    
    function downloadProgress() {
        return new Promise(function(resolve, reject) {
            let progress = 0;
            const interval = setInterval(function() {
                progress += 20;
                console.log("Download progress:", progress + "%");
                document.getElementById("output").innerHTML = '<div class="pending">📥 Downloading... ' + progress + '%</div>';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    resolve("Download completed!");
                }
            }, 300);
        });
    }
    
    startDownload()
        .then(function(result) {
            console.log(result);
            document.getElementById("output").innerHTML += '<div class="success">' + result + '</div>';
            return downloadProgress();
        })
        .then(function(result) {
            console.log(result);
            document.getElementById("output").innerHTML = '<div class="success">✅ ' + result + '</div>';
        })
        .catch(function(error) {
            console.log("Download error:", error);
            document.getElementById("output").innerHTML += '<div class="error">❌ Download failed: ' + error + '</div>';
        });
}

function getWeather() {
    console.log("=== Weather Check ===");
    document.getElementById("output").innerHTML = '<div class="pending">🌍 Getting your location...</div>';
    
    function getLocation() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve("New York City");
            }, 1000);
        });
    }
    
    function fetchWeatherData(city) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                const weathers = ["Sunny ☀️", "Cloudy ☁️", "Rainy 🌧️", "Snowy ❄️"];
                const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
                const temperature = Math.floor(Math.random() * 30) + 10;
                
                resolve({
                    city: city,
                    weather: randomWeather,
                    temperature: temperature + "°C"
                });
            }, 1500);
        });
    }
    
    getLocation()
        .then(function(city) {
            console.log("Location found:", city);
            document.getElementById("output").innerHTML += '<div class="success">📍 Location: ' + city + '</div>';
            return fetchWeatherData(city);
        })
        .then(function(weatherData) {
            console.log("Weather data:", weatherData);
            document.getElementById("output").innerHTML += '<div class="success">🌤️ Weather in ' + weatherData.city + ': ' + weatherData.weather + ' ' + weatherData.temperature + '</div>';
        })
        .catch(function(error) {
            console.log("Weather error:", error);
            document.getElementById("output").innerHTML += '<div class="error">❌ Could not get weather: ' + error + '</div>';
        });
}

function promiseChain() {
    console.log("=== Promise Chain Demo ===");
    document.getElementById("output").innerHTML = '<div class="pending">🔗 Starting promise chain...</div>';
    
    function step1() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve("Step 1: Gather ingredients 🥔🥕");
            }, 500);
        });
    }
    
    function step2(previousResult) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(previousResult + " → Step 2: Start cooking 🍳");
            }, 700);
        });
    }
    
    function step3(previousResult) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(previousResult + " → Step 3: Add spices 🧂");
            }, 600);
        });
    }
    
    function step4(previousResult) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(previousResult + " → Step 4: Serve the meal! 🍽️");
            }, 500);
        });
    }
    
    step1()
        .then(step2)
        .then(step3)
        .then(step4)
        .then(function(finalResult) {
            console.log("Chain complete:", finalResult);
            document.getElementById("output").innerHTML = '<div class="success">✅ Chain Complete!<br>' + finalResult.replace(/→/g, '<br>→') + '</div>';
        })
        .catch(function(error) {
            console.log("Chain error:", error);
            document.getElementById("output").innerHTML += '<div class="error">❌ Chain failed: ' + error + '</div>';
        });
}

function multiplePromises() {
    console.log("=== Multiple Promises ===");
    document.getElementById("output").innerHTML = '<div class="pending">🏃‍♂️ Starting multiple tasks at once...</div>';
    
    function makeBreakfast() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve("🍳 Breakfast is ready!");
            }, 2000);
        });
    }
    
    function checkEmail() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve("📧 You have 3 new emails!");
            }, 1500);
        });
    }
    
    function checkWeather() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve("🌤️ Today will be sunny!");
            }, 1000);
        });
    }
    
    // Promise.all waits for ALL promises to complete
    Promise.all([makeBreakfast(), checkEmail(), checkWeather()])
        .then(function(results) {
            console.log("All tasks done:", results);
            document.getElementById("output").innerHTML = '<div class="success">✅ All tasks completed!<br>';
            results.forEach(function(result) {
                document.getElementById("output").innerHTML += result + '<br>';
            });
            document.getElementById("output").innerHTML += '</div>';
        })
        .catch(function(error) {
            console.log("One task failed:", error);
            document.getElementById("output").innerHTML += '<div class="error">❌ One task failed: ' + error + '</div>';
        });
}

console.log("Promise Examples loaded!");
console.log("Try the different examples to see how promises work!");
console.log("Notice how much cleaner promises are compared to callbacks!");