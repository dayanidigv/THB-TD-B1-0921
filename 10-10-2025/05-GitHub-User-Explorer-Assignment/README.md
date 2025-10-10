# GitHub User Explorer Assignment

## Assignment Overview
Build a **GitHub User Explorer** that searches users, displays their profiles, repositories, and followers. This assignment combines all topics covered in this module using only GitHub API.

## Learning Objectives
- Master **HTTP GET requests** for API communication
- Parse and manipulate **JSON** data from GitHub API
- Implement **Async/Await** patterns for asynchronous operations
- Handle **API errors** and **HTTP status codes** (404, 403, 500, etc.)
- Understand **REST API** concepts and endpoints
- Create responsive and interactive user interfaces

## Assignment Requirements

### Core Features (Required):
1. **HTTP GET Requests**: Implement multiple API calls using fetch()
2. **User Search**: Enter username to find GitHub users with proper error handling
3. **JSON Data Parsing**: Process and display API response data correctly
4. **User Profile**: Display avatar, name, bio, location, company from JSON response
5. **Repository List**: Show user's public repositories with detailed information
6. **Async/Await Implementation**: Use modern asynchronous patterns for all API calls
7. **Status Code Handling**: Handle 200, 404, 403, 429, 500 status codes appropriately
8. **Error Management**: Display user-friendly error messages for different scenarios
9. **Loading States**: Show loading indicators during API requests
10. **Data Validation**: Validate API responses and handle missing data gracefully

### Bonus Features (Optional):
1. **Advanced Error Handling**: Implement retry logic for failed requests
2. **Response Caching**: Cache API responses to reduce unnecessary requests
3. **Promise.all() Implementation**: Execute multiple API calls in parallel
4. **Request Headers**: Add custom headers for API optimization
5. **Rate Limiting Awareness**: Handle GitHub API rate limits gracefully
6. **Response Time Monitoring**: Track and display API response times
7. **Data Export**: Export user data as JSON with proper formatting
8. **Search History**: Store and manage previous searches using localStorage

## API Information and HTTP Methods
**GitHub REST API Endpoints** (HTTP GET requests only):

### Core API Endpoints:
- **User Information**: `GET https://api.github.com/users/{username}`
- **User Repositories**: `GET https://api.github.com/users/{username}/repos`
- **User Followers**: `GET https://api.github.com/users/{username}/followers`
- **User Following**: `GET https://api.github.com/users/{username}/following`
- **User Events**: `GET https://api.github.com/users/{username}/events/public`
- **User Organizations**: `GET https://api.github.com/users/{username}/orgs`

### Advanced API Endpoints:
- **Repository Details**: `GET https://api.github.com/repos/{owner}/{repo}`
- **Repository Languages**: `GET https://api.github.com/repos/{owner}/{repo}/languages`
- **Repository Contributors**: `GET https://api.github.com/repos/{owner}/{repo}/contributors`
- **Repository Issues**: `GET https://api.github.com/repos/{owner}/{repo}/issues`

### HTTP Status Codes to Handle:
- **200 OK**: Successful request with data
- **404 Not Found**: User or repository doesn't exist
- **403 Forbidden**: API rate limit exceeded or access denied
- **429 Too Many Requests**: Rate limit exceeded (specific header)
- **500 Internal Server Error**: GitHub server error
- **503 Service Unavailable**: GitHub service temporarily unavailable

### API Response Headers to Monitor:
- `X-RateLimit-Limit`: Total rate limit
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Rate limit reset time
- `Content-Type`: Should be `application/json`

## Technical Implementation Requirements
### Required Async/Await Patterns:
```javascript
// Basic async function structure
async function makeAPIRequest(url) {
    try {
        const response = await fetch(url);
        
        // Check HTTP status codes
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        // Parse JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
}

// Parallel API calls using Promise.all()
async function loadMultipleData(username) {
    try {
        const [user, repos, events] = await Promise.all([
            getGitHubUser(username),
            getUserRepositories(username),
            getUserEvents(username)
        ]);
        return { user, repos, events };
    } catch (error) {
        console.error('Failed to load data:', error);
        throw error;
    }
}
```

### JSON Data Processing Requirements:
```javascript
// Handle missing or null JSON properties
function safeDataAccess(apiResponse) {
    return {
        name: apiResponse.name || 'No name provided',
        bio: apiResponse.bio || 'No bio available',
        company: apiResponse.company || 'Not specified',
        location: apiResponse.location || 'Not specified',
        publicRepos: apiResponse.public_repos || 0,
        followers: apiResponse.followers || 0,
        following: apiResponse.following || 0
    };
}

// Validate JSON structure
function validateUserResponse(data) {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid JSON response structure');
    }
    
    if (!data.login) {
        throw new Error('Missing required user login field');
    }
    
    return true;
}
```

## File Structure
**Student Assignment Files:**
1. `index.html` - Main application interface (starter template provided)
2. `github-api.js` - API functions with guided TODO sections
3. `app.js` - Application logic with structured learning steps
4. `styles.css` - Complete styling (focus on JavaScript learning)

**Reference Solution Files:**
1. `solution.html` - Complete working demonstration
2. `github-api-solution.js` - Professional API implementation
3. `app-solution.js` - Advanced application logic with best practices

## Time Estimation and Learning Phases

### Phase 1: HTTP and JSON Fundamentals (2-3 hours)
- Understanding REST API concepts
- Basic fetch() implementation
- JSON parsing and data extraction
- Simple error handling with try/catch

### Phase 2: Async/Await Implementation (2-3 hours)
- Converting promises to async/await syntax
- Sequential vs parallel API calls
- Error propagation in async functions
- Loading state management

### Phase 3: Advanced Error Handling (1-2 hours)
- HTTP status code differentiation
- User-friendly error messages
- Retry logic for failed requests
- Rate limiting awareness

### Phase 4: Data Processing and Display (2-3 hours)
- JSON data validation and sanitization
- Dynamic DOM manipulation
- Responsive data presentation
- Performance optimization

**Total Estimated Time:**
- **Beginner**: 8-10 hours (focus on core concepts)
- **Intermediate**: 6-8 hours (all features with good practices)
- **Advanced**: 4-6 hours (optimized implementation with bonus features)

## Core Learning Concepts
### 1. HTTP GET Requests Mastery
**Students will learn:**
- Anatomy of HTTP requests and responses
- Request headers and their purposes
- URL construction and parameter handling
- CORS concepts and browser security

**Implementation Requirements:**
- Use native fetch() API exclusively
- Implement proper request headers
- Handle different response content types
- Monitor network activity in browser dev tools

### 2. JSON Data Processing
**Students will learn:**
- JSON syntax and structure validation
- Parsing nested JSON objects and arrays
- Handling null, undefined, and missing properties
- Data transformation and normalization

**Implementation Requirements:**
- Parse all API responses correctly
- Validate JSON structure before processing
- Handle malformed or incomplete responses
- Transform API data for UI consumption

### 3. Async/Await Patterns
**Students will learn:**
- Difference between callbacks, promises, and async/await
- Error handling in asynchronous code
- Sequential vs parallel execution patterns
- Promise chaining and composition

**Implementation Requirements:**
- Use async/await for all API calls
- Implement proper error boundaries
- Execute multiple API calls efficiently
- Handle timing and race conditions

### 4. HTTP Status Codes and Error Handling
**Students will learn:**
- Comprehensive HTTP status code meanings
- Error classification and appropriate responses
- User experience during error states
- Debugging and logging strategies

**Implementation Requirements:**
- Handle all major status code categories (2xx, 4xx, 5xx)
- Provide specific error messages for different scenarios
- Implement graceful degradation for failures
- Log errors appropriately for debugging

## Advanced Implementation Features
**For Advanced Students:**
- **Promise.all()** implementation for parallel API execution
- **Request/Response interceptors** for debugging and monitoring
- **Custom error classes** for different error types
- **Response caching strategies** to minimize API calls
- **Request timeout handling** for better user experience
- **Progressive data loading** for large datasets
- **API rate limit monitoring** with header inspection
- **Request retry logic** with exponential backoff

## Technical Skills Assessment

### HTTP GET Requests (25% of grade)
- Correct fetch() implementation
- Proper URL construction
- Appropriate request headers
- Response handling

### JSON Processing (25% of grade)
- Accurate data parsing
- Null/undefined handling
- Data validation
- Object manipulation

### Async/Await Implementation (25% of grade)
- Proper async function syntax
- Error handling in async code
- Promise chaining and composition
- Parallel execution patterns

### Error Handling & Status Codes (25% of grade)
- Comprehensive status code handling
- User-friendly error messages
- Graceful failure management
- Debugging and logging

## Assignment Success Criteria
### Minimum Requirements (Pass):
1. Successfully implement at least 3 different API endpoints
2. Use async/await syntax correctly in all API functions
3. Parse JSON responses and display data in the UI
4. Handle 404 (Not Found) and basic error scenarios
5. Show loading states during API requests

### Proficient Level (Good):
1. Implement all core API endpoints with proper error handling
2. Handle multiple HTTP status codes (200, 404, 403, 500)
3. Use Promise.all() for parallel API calls
4. Validate and sanitize JSON data before display
5. Provide meaningful error messages to users

### Advanced Level (Excellent):
1. Implement comprehensive error handling for all scenarios
2. Add request timeout and retry logic
3. Monitor and display API rate limit information
4. Implement response caching for performance
5. Add advanced features like data export or search history

## Submission Requirements

### Code Documentation:
1. Comment all async functions with their purpose
2. Document error handling strategies
3. Explain JSON data transformations
4. Include examples of HTTP status code handling
5. Provide README with API usage examples

### Testing Requirements:
1. Test with at least 5 different GitHub users
2. Test error scenarios (invalid usernames, network issues)
3. Verify all HTTP status codes are handled appropriately
4. Test API rate limiting behavior
5. Document any discovered issues or limitations

### Performance Considerations:
1. Minimize unnecessary API calls
2. Implement efficient data loading strategies
3. Handle large JSON responses appropriately
4. Optimize UI updates during data loading
5. Monitor and report API response times

## Learning Path Recommendations
### Week 1: HTTP and JSON Fundamentals
**Day 1-2: HTTP GET Requests**
- Study REST API principles and HTTP methods
- Practice with browser fetch() API
- Understand request/response cycle
- Learn to read network tab in developer tools

**Day 3-4: JSON Data Processing**
- Master JSON.parse() and JSON.stringify()
- Practice with nested object manipulation
- Learn data validation techniques
- Handle missing and null properties

**Day 5: Basic Error Handling**
- Implement try/catch blocks
- Understand different error types
- Create user-friendly error messages
- Practice debugging techniques

### Week 2: Async/Await Implementation
**Day 1-2: Async Function Fundamentals**
- Convert from callbacks to promises to async/await
- Understand function execution flow
- Practice error propagation
- Learn timing and sequence control

**Day 3-4: Advanced Async Patterns**
- Implement Promise.all() for parallel execution
- Handle mixed success/failure scenarios
- Create efficient data loading strategies
- Optimize user experience during loading

**Day 5: Status Code Mastery**
- Learn all HTTP status code categories
- Implement specific handling for each code
- Create appropriate user feedback
- Practice with rate limiting scenarios

### Week 3: Integration and Optimization
**Day 1-2: Complete Application Assembly**
- Integrate all API functions
- Connect data processing with UI updates
- Test comprehensive user workflows
- Refine error handling strategies

**Day 3-4: Performance and Best Practices**
- Optimize API call patterns
- Implement caching strategies
- Add monitoring and logging
- Study solution code for best practices

**Day 5: Advanced Features and Polish**
- Add bonus features based on interest
- Implement additional error recovery
- Create comprehensive documentation
- Prepare for code review and presentation

## Real-World Applications
### Professional Development Skills:
**API Integration Expertise:**
- RESTful API consumption patterns
- Authentication and authorization concepts
- Rate limiting and quota management
- API versioning and backward compatibility

**Enterprise Development Practices:**
- Error handling and logging strategies
- Performance monitoring and optimization
- Data validation and security considerations
- Code documentation and maintenance

**Career-Relevant Applications:**
- **Developer Portfolio Websites**: Showcase GitHub activity and projects
- **Recruitment Platforms**: HR teams evaluate developer profiles and contributions
- **Open Source Project Management**: Find contributors, track activity, analyze projects
- **Team Collaboration Tools**: Monitor team member productivity and contributions
- **Educational Platforms**: Discover learning resources and example code repositories
- **Code Review Systems**: Integrate with version control for enhanced workflows

### Industry Context:
This assignment mirrors real-world scenarios where developers:
- Integrate third-party APIs into applications
- Handle unreliable network conditions and service outages
- Process large volumes of JSON data efficiently
- Create responsive user interfaces with asynchronous data loading
- Implement robust error handling for production applications
- Optimize performance for mobile and low-bandwidth environments

## Getting Started Guide

### Prerequisites:
- Basic JavaScript knowledge (variables, functions, objects)
- Understanding of HTML and CSS
- Familiarity with browser developer tools
- Text editor or IDE (VS Code recommended)

### Setup Instructions:
1. Download and extract the assignment files
2. Open the project folder in your preferred editor
3. Start with the README.md for complete instructions
4. Open index.html in a web browser
5. Open browser developer tools (F12) for debugging
6. Begin with the github-api.js file and follow TODO comments

### Debugging Resources:
- Use console.log() for tracking data flow
- Monitor network requests in browser dev tools
- Test API endpoints directly in browser address bar
- Use JSON formatter extensions for readable responses
- Implement step-by-step console logging for complex functions

Success in this assignment will provide practical experience with modern web development patterns used in professional software development environments.