// Weather App JavaScript - Mock Weather Data Demo

class WeatherApp {
    constructor() {
        this.currentCity = 'New York';
        this.recentSearches = [];
        this.weatherLog = [];
        this.initializeEventListeners();
        this.loadWeatherData(this.currentCity);
        this.startClock();
        this.initializeCitySuggestions();
    }

    // Mock weather data for different cities
    getMockWeatherData(city) {
        const weatherData = {
            'New York': {
                temperature: 22,
                condition: 'Sunny',
                icon: '☀️',
                feelsLike: 25,
                humidity: 65,
                windSpeed: 12,
                windDirection: 'NW',
                pressure: 1013,
                visibility: 10,
                uvIndex: 5,
                uvLabel: 'Moderate',
                forecast: [
                    { day: 'Today', high: 25, low: 18, condition: 'Sunny', icon: '☀️' },
                    { day: 'Tomorrow', high: 23, low: 16, condition: 'Partly Cloudy', icon: '⛅' },
                    { day: 'Thursday', high: 20, low: 14, condition: 'Rainy', icon: '🌧️' },
                    { day: 'Friday', high: 24, low: 17, condition: 'Cloudy', icon: '☁️' },
                    { day: 'Saturday', high: 26, low: 19, condition: 'Sunny', icon: '☀️' }
                ]
            },
            'London': {
                temperature: 16,
                condition: 'Cloudy',
                icon: '☁️',
                feelsLike: 14,
                humidity: 78,
                windSpeed: 15,
                windDirection: 'SW',
                pressure: 1008,
                visibility: 8,
                uvIndex: 3,
                uvLabel: 'Moderate',
                forecast: [
                    { day: 'Today', high: 18, low: 12, condition: 'Cloudy', icon: '☁️' },
                    { day: 'Tomorrow', high: 17, low: 11, condition: 'Rainy', icon: '🌧️' },
                    { day: 'Thursday', high: 19, low: 13, condition: 'Partly Cloudy', icon: '⛅' },
                    { day: 'Friday', high: 16, low: 10, condition: 'Rainy', icon: '🌧️' },
                    { day: 'Saturday', high: 20, low: 14, condition: 'Sunny', icon: '☀️' }
                ]
            },
            'Tokyo': {
                temperature: 28,
                condition: 'Hot',
                icon: '🌞',
                feelsLike: 32,
                humidity: 72,
                windSpeed: 8,
                windDirection: 'SE',
                pressure: 1020,
                visibility: 12,
                uvIndex: 8,
                uvLabel: 'Very High',
                forecast: [
                    { day: 'Today', high: 30, low: 24, condition: 'Hot', icon: '🌞' },
                    { day: 'Tomorrow', high: 29, low: 23, condition: 'Sunny', icon: '☀️' },
                    { day: 'Thursday', high: 27, low: 21, condition: 'Partly Cloudy', icon: '⛅' },
                    { day: 'Friday', high: 25, low: 19, condition: 'Rainy', icon: '🌧️' },
                    { day: 'Saturday', high: 28, low: 22, condition: 'Sunny', icon: '☀️' }
                ]
            },
            'Sydney': {
                temperature: 24,
                condition: 'Partly Cloudy',
                icon: '⛅',
                feelsLike: 26,
                humidity: 68,
                windSpeed: 18,
                windDirection: 'E',
                pressure: 1016,
                visibility: 15,
                uvIndex: 6,
                uvLabel: 'High',
                forecast: [
                    { day: 'Today', high: 26, low: 20, condition: 'Partly Cloudy', icon: '⛅' },
                    { day: 'Tomorrow', high: 28, low: 22, condition: 'Sunny', icon: '☀️' },
                    { day: 'Thursday', high: 25, low: 19, condition: 'Cloudy', icon: '☁️' },
                    { day: 'Friday', high: 23, low: 17, condition: 'Rainy', icon: '🌧️' },
                    { day: 'Saturday', high: 27, low: 21, condition: 'Sunny', icon: '☀️' }
                ]
            },
            'Paris': {
                temperature: 19,
                condition: 'Rainy',
                icon: '🌧️',
                feelsLike: 17,
                humidity: 82,
                windSpeed: 20,
                windDirection: 'W',
                pressure: 1005,
                visibility: 6,
                uvIndex: 2,
                uvLabel: 'Low',
                forecast: [
                    { day: 'Today', high: 21, low: 15, condition: 'Rainy', icon: '🌧️' },
                    { day: 'Tomorrow', high: 18, low: 12, condition: 'Stormy', icon: '⛈️' },
                    { day: 'Thursday', high: 22, low: 16, condition: 'Cloudy', icon: '☁️' },
                    { day: 'Friday', high: 24, low: 18, condition: 'Partly Cloudy', icon: '⛅' },
                    { day: 'Saturday', high: 26, low: 20, condition: 'Sunny', icon: '☀️' }
                ]
            }
        };

        // Generate random variations for unknown cities
        if (!weatherData[city]) {
            const conditions = [
                { condition: 'Sunny', icon: '☀️', temp: this.randomBetween(20, 30) },
                { condition: 'Cloudy', icon: '☁️', temp: this.randomBetween(15, 25) },
                { condition: 'Rainy', icon: '🌧️', temp: this.randomBetween(10, 20) },
                { condition: 'Partly Cloudy', icon: '⛅', temp: this.randomBetween(18, 28) }
            ];
            const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
            
            return {
                temperature: randomCondition.temp,
                condition: randomCondition.condition,
                icon: randomCondition.icon,
                feelsLike: randomCondition.temp + this.randomBetween(-3, 5),
                humidity: this.randomBetween(40, 90),
                windSpeed: this.randomBetween(5, 25),
                windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
                pressure: this.randomBetween(995, 1025),
                visibility: this.randomBetween(5, 20),
                uvIndex: this.randomBetween(1, 10),
                uvLabel: this.getUVLabel(this.randomBetween(1, 10)),
                forecast: this.generateRandomForecast()
            };
        }

        return weatherData[city];
    }

    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getUVLabel(index) {
        if (index <= 2) return 'Low';
        if (index <= 5) return 'Moderate';
        if (index <= 7) return 'High';
        if (index <= 10) return 'Very High';
        return 'Extreme';
    }

    generateRandomForecast() {
        const days = ['Today', 'Tomorrow', 'Thursday', 'Friday', 'Saturday'];
        const conditions = [
            { condition: 'Sunny', icon: '☀️' },
            { condition: 'Cloudy', icon: '☁️' },
            { condition: 'Rainy', icon: '🌧️' },
            { condition: 'Partly Cloudy', icon: '⛅' }
        ];

        return days.map(day => {
            const condition = conditions[Math.floor(Math.random() * conditions.length)];
            const high = this.randomBetween(15, 30);
            const low = high - this.randomBetween(5, 10);
            return {
                day,
                high,
                low,
                condition: condition.condition,
                icon: condition.icon
            };
        });
    }

    initializeEventListeners() {
        const searchBtn = document.getElementById('searchWeather');
        const cityInput = document.getElementById('cityInput');
        const locationBtn = document.getElementById('getCurrentLocation');

        searchBtn.addEventListener('click', () => this.searchWeather());
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });
        cityInput.addEventListener('input', () => this.showCitySuggestions());
        locationBtn.addEventListener('click', () => this.getCurrentLocation());

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.position-relative')) {
                this.hideCitySuggestions();
            }
        });
    }

    initializeCitySuggestions() {
        this.cities = [
            'New York', 'London', 'Tokyo', 'Sydney', 'Paris', 'Berlin', 'Rome', 'Madrid',
            'Amsterdam', 'Vienna', 'Prague', 'Budapest', 'Warsaw', 'Stockholm', 'Oslo',
            'Copenhagen', 'Helsinki', 'Dublin', 'Edinburgh', 'Barcelona', 'Lisbon',
            'Athens', 'Istanbul', 'Moscow', 'Cairo', 'Mumbai', 'Delhi', 'Bangkok',
            'Singapore', 'Seoul', 'Beijing', 'Shanghai', 'Hong Kong', 'Dubai', 'Riyadh'
        ];
    }

    showCitySuggestions() {
        const input = document.getElementById('cityInput');
        const suggestions = document.getElementById('citySuggestions');
        const query = input.value.toLowerCase().trim();

        if (query.length < 2) {
            this.hideCitySuggestions();
            return;
        }

        const filteredCities = this.cities.filter(city => 
            city.toLowerCase().includes(query)
        ).slice(0, 5);

        if (filteredCities.length > 0) {
            suggestions.innerHTML = filteredCities.map(city => 
                `<div class="suggestion-item" onclick="selectCity('${city}')">${city}</div>`
            ).join('');
            suggestions.style.display = 'block';
        } else {
            this.hideCitySuggestions();
        }
    }

    hideCitySuggestions() {
        document.getElementById('citySuggestions').style.display = 'none';
    }

    searchWeather() {
        const cityInput = document.getElementById('cityInput');
        const city = cityInput.value.trim();
        
        if (city) {
            this.loadWeatherData(city);
            this.addToRecentSearches(city);
            this.logActivity(`Searched weather for ${city}`);
            cityInput.value = '';
            this.hideCitySuggestions();
        }
    }

    loadWeatherData(city) {
        this.currentCity = city;
        const data = this.getMockWeatherData(city);
        
        // Update current weather
        document.getElementById('cityName').textContent = city;
        document.getElementById('temperature').textContent = `${data.temperature}°`;
        document.getElementById('weatherDescription').textContent = data.condition;
        document.getElementById('weatherIcon').textContent = data.icon;
        document.getElementById('feelsLike').textContent = `Feels like ${data.feelsLike}°C`;
        
        // Update weather details
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('windSpeed').textContent = `${data.windSpeed} km/h`;
        document.getElementById('windDirection').textContent = data.windDirection;
        document.getElementById('pressure').textContent = `${data.pressure} hPa`;
        document.getElementById('visibility').textContent = `${data.visibility} km`;
        document.getElementById('uvIndex').textContent = `${data.uvIndex} (${data.uvLabel})`;
        
        // Update forecast
        this.updateForecast(data.forecast);
        
        // Update weather tips
        this.updateWeatherTips(data);
        
        // Update background based on weather
        this.updateBackground(data.condition);
        
        this.logActivity(`Loaded weather data for ${city}: ${data.temperature}°C, ${data.condition}`);
    }

    updateForecast(forecast) {
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = forecast.map(day => `
            <div class="forecast-card">
                <h6 class="mb-2">${day.day}</h6>
                <div style="font-size: 2rem;">${day.icon}</div>
                <div class="mt-2">
                    <span class="fw-bold">${day.high}°</span> / 
                    <span class="text-muted">${day.low}°</span>
                </div>
                <small class="text-muted">${day.condition}</small>
            </div>
        `).join('');
    }

    updateWeatherTips(data) {
        const tips = {
            'Sunny': 'Perfect weather for outdoor activities! Don\'t forget sunscreen! ☀️',
            'Cloudy': 'Great weather for a walk in the park. Comfortable and mild! ☁️',
            'Rainy': 'Don\'t forget your umbrella! Good day for indoor activities. 🌧️',
            'Partly Cloudy': 'Mixed conditions today. Perfect for any activity! ⛅',
            'Hot': 'Stay hydrated and seek shade during peak hours! 🌞',
            'Stormy': 'Stay indoors and stay safe! Watch for weather alerts. ⛈️'
        };
        
        const tip = tips[data.condition] || 'Check the forecast and dress appropriately!';
        document.getElementById('currentTip').textContent = tip;
    }

    updateBackground(condition) {
        const body = document.body;
        const backgrounds = {
            'Sunny': 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
            'Cloudy': 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)',
            'Rainy': 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)',
            'Partly Cloudy': 'linear-gradient(135deg, #74b9ff 0%, #636e72 100%)',
            'Hot': 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
            'Stormy': 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)'
        };
        
        body.style.background = backgrounds[condition] || backgrounds['Sunny'];
    }

    addToRecentSearches(city) {
        if (!this.recentSearches.includes(city)) {
            this.recentSearches.unshift(city);
            if (this.recentSearches.length > 5) {
                this.recentSearches.pop();
            }
            this.updateRecentSearches();
        }
    }

    updateRecentSearches() {
        const container = document.getElementById('recentCitiesList');
        const recentSection = document.getElementById('recentSearches');
        
        if (this.recentSearches.length > 0) {
            container.innerHTML = this.recentSearches.map(city => 
                `<span class="recent-city" onclick="quickSearch('${city}')">${city}</span>`
            ).join('');
            recentSection.style.display = 'block';
        } else {
            recentSection.style.display = 'none';
        }
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            this.logActivity('Getting current location...');
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Mock location-based city (in real app, you'd use reverse geocoding)
                    const mockCities = ['Current Location', 'Nearby City', 'Your City'];
                    const city = mockCities[Math.floor(Math.random() * mockCities.length)];
                    this.loadWeatherData(city);
                    this.logActivity(`Found location: ${city}`);
                },
                (error) => {
                    this.logActivity('Location access denied. Showing default location.');
                    this.loadWeatherData('New York');
                }
            );
        } else {
            this.logActivity('Geolocation not supported. Showing default location.');
            this.loadWeatherData('New York');
        }
    }

    startClock() {
        const updateTime = () => {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true
            };
            document.getElementById('currentTime').textContent = now.toLocaleDateString('en-US', options);
        };
        
        updateTime();
        setInterval(updateTime, 60000); // Update every minute
    }

    logActivity(message) {
        const timestamp = new Date().toLocaleTimeString();
        this.weatherLog.unshift(`[${timestamp}] ${message}`);
        
        if (this.weatherLog.length > 50) {
            this.weatherLog.pop();
        }
        
        this.updateActivityLog();
    }

    updateActivityLog() {
        const logContainer = document.getElementById('weatherLog');
        if (this.weatherLog.length > 0) {
            logContainer.innerHTML = this.weatherLog.map(log => 
                `<p class="mb-1 small">${log}</p>`
            ).join('');
        }
    }

    clearLog() {
        this.weatherLog = [];
        document.getElementById('weatherLog').innerHTML = '<p class="text-muted">Weather searches will be logged here...</p>';
        this.logActivity('Activity log cleared');
    }
}

// Global functions for onclick events
function selectCity(city) {
    document.getElementById('cityInput').value = city;
    weatherApp.hideCitySuggestions();
    weatherApp.searchWeather();
}

function quickSearch(city) {
    weatherApp.loadWeatherData(city);
    weatherApp.addToRecentSearches(city);
    weatherApp.logActivity(`Quick search for ${city}`);
}

function clearLog() {
    weatherApp.clearLog();
}

// Initialize the weather app
let weatherApp;
document.addEventListener('DOMContentLoaded', () => {
    weatherApp = new WeatherApp();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'f':
                e.preventDefault();
                document.getElementById('cityInput').focus();
                weatherApp.logActivity('Focused search with keyboard shortcut');
                break;
            case 'l':
                e.preventDefault();
                weatherApp.getCurrentLocation();
                break;
            case 'r':
                e.preventDefault();
                weatherApp.loadWeatherData(weatherApp.currentCity);
                weatherApp.logActivity(`Refreshed weather for ${weatherApp.currentCity}`);
                break;
        }
    }
    
    if (e.key === 'Escape') {
        weatherApp.hideCitySuggestions();
        document.getElementById('cityInput').blur();
    }
});

// Add some nice animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate weather cards on hover
    const forecastCards = document.querySelectorAll('.forecast-card');
    forecastCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

console.log('Weather App loaded! 🌤️');
console.log('Keyboard shortcuts:');
console.log('- Ctrl/Cmd + F: Focus search');
console.log('- Ctrl/Cmd + L: Get current location');
console.log('- Ctrl/Cmd + R: Refresh current weather');
console.log('- Escape: Close suggestions');