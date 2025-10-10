// GitHub API Functions for Assignment
// Students will learn: HTTP GET requests, JSON parsing, Async/Await, and Error handling

// TODO: Complete this function
async function getGitHubUser(username) {
    try {
        // Step 1: Add console.log to show what user we're searching for
        console.log(`Making HTTP GET request for user: ${username}`);
        
        // Step 2: Make API call to GitHub users endpoint
        // API URL: https://api.github.com/users/{username}
        // Use fetch() to make HTTP GET request
        
        // Step 3: Check if response is ok (status 200)
        // Handle HTTP status codes: 200, 404, 403, 500
        
        // Step 4: Parse JSON response
        // Use response.json() to parse the API response
        
        // Step 5: Return user data
        // Return the parsed JSON object
        
    } catch (error) {
        // Step 6: Handle any errors (network, parsing, etc.)
        console.log("Error getting user:", error.message);
        throw error;
    }
}

// TODO: Complete this function
async function getUserRepositories(username) {
    try {
        // Step 1: Make HTTP GET request to get user's repositories
        // API URL: https://api.github.com/users/{username}/repos
        console.log(`Fetching repositories for user: ${username}`);
        
        // Step 2: Check HTTP response status
        // Handle status codes: 200 (success), 404 (user not found), 403 (rate limit)
        
        // Step 3: Parse JSON response
        // The response will be an array of repository objects
        
        // Step 4: Return repositories array
        // Each repository object contains: name, description, language, stars, forks
        
    } catch (error) {
        console.log("Error getting repositories:", error.message);
        throw error;
    }
}

// BONUS: Complete this function for extra credit
async function getUserFollowers(username) {
    try {
        // HTTP GET request to: https://api.github.com/users/{username}/followers
        // This endpoint returns an array of user objects who follow the specified user
        // Practice: async/await, JSON parsing, error handling
        console.log(`Fetching followers for user: ${username}`);
        
    } catch (error) {
        console.log("Error getting followers:", error.message);
        throw error;
    }
}

// TODO: Complete this function
async function getUserFollowing(username) {
    try {
        // Step 1: Make HTTP GET request to get users that this user follows
        // API URL: https://api.github.com/users/{username}/following
        console.log(`Fetching following list for user: ${username}`);
        
        // Step 2: Check HTTP response status codes
        // 200: Success, 404: User not found, 403: Rate limit exceeded
        
        // Step 3: Parse JSON response
        // Response is an array of user objects
        
        // Step 4: Return following array
        // Each user object contains: login, avatar_url, html_url
        
    } catch (error) {
        console.log("Error getting following:", error.message);
        throw error;
    }
}

// TODO: Complete this function
async function getUserEvents(username) {
    try {
        // Step 1: Make HTTP GET request to get user's recent public events
        // API URL: https://api.github.com/users/{username}/events/public
        console.log(`Fetching recent events for user: ${username}`);
        
        // Step 2: Check HTTP response status
        // Handle various HTTP status codes appropriately
        
        // Step 3: Parse JSON response
        // Response contains an array of event objects with activity data
        
        // Step 4: Return events array (limit to first 10)
        // Each event has: type, created_at, repo, payload properties
        
    } catch (error) {
        console.log("Error getting events:", error.message);
        throw error;
    }
}

// TODO: Complete this function
async function getUserOrganizations(username) {
    try {
        // Step 1: Make HTTP GET request to get user's organizations
        // API URL: https://api.github.com/users/{username}/orgs
        console.log(`Fetching organizations for user: ${username}`);
        
        // Step 2: Check HTTP response status
        // Important: Handle different status codes and their meanings
        
        // Step 3: Parse JSON response
        // Response is an array of organization objects
        
        // Step 4: Return organizations array
        // Each org has: login, avatar_url, description properties
        
    } catch (error) {
        console.log("Error getting organizations:", error.message);
        throw error;
    }
}

// BONUS: Repository details function
async function getRepositoryDetails(owner, repo) {
    try {
        // API URL: https://api.github.com/repos/{owner}/{repo}
        
    } catch (error) {
        console.log("❌ Error getting repository details:", error.message);
        throw error;
    }
}

// BONUS: Repository languages function
async function getRepositoryLanguages(owner, repo) {
    try {
        // API URL: https://api.github.com/repos/{owner}/{repo}/languages
        
    } catch (error) {
        console.log("❌ Error getting repository languages:", error.message);
        throw error;
    }
}

// BONUS: Repository contributors function
async function getRepositoryContributors(owner, repo) {
    try {
        // API URL: https://api.github.com/repos/{owner}/{repo}/contributors
        
    } catch (error) {
        console.log("❌ Error getting repository contributors:", error.message);
        throw error;
    }
}

// Helper function for students (already completed)
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Helper function to handle API errors (already completed)
function handleAPIError(response) {
    if (response.status === 404) {
        throw new Error("User not found! Please check the username.");
    } else if (response.status === 403) {
        throw new Error("API rate limit exceeded. Please try again later.");
    } else if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
}

/* 
ASSIGNMENT HINTS:

1. Use fetch() to make API calls
2. Always use async/await pattern
3. Check response.ok before parsing JSON
4. Use try/catch for error handling
5. Console.log useful information for debugging
6. Use Promise.all() for multiple parallel API calls

Example API Response (User):
{
  "login": "dayanidigv",
  "name": "Dayanidi Gv",
  "bio": "CTO at innak, passionate coder...",
  "company": "Nile",
  "location": "India",
  "blog": "https://dayanidiportfolio.github.io/",
  "public_repos": 46,
  "followers": 7,
  "following": 5,
  "avatar_url": "https://avatars.githubusercontent.com/u/93707264?v=4",
  "html_url": "https://github.com/dayanidigv",
  "created_at": "2021-11-04T09:19:51Z"
}

Example API Response (Event):
{
  "type": "PushEvent",
  "created_at": "2025-10-10T10:30:00Z",
  "repo": {
    "name": "dayanidigv/portfolio"
  },
  "payload": {
    "commits": [...]
  }
}

Example API Response (Organization):
{
  "login": "octocat-org",
  "avatar_url": "https://avatars.githubusercontent.com/u/123456?v=4",
  "description": "Organization description"
}

MULTIPLE API CALLS EXAMPLE:
async function loadAllUserData(username) {
  try {
    // Parallel API calls
    const [user, repos, events, orgs] = await Promise.all([
      getGitHubUser(username),
      getUserRepositories(username),
      getUserEvents(username),
      getUserOrganizations(username)
    ]);
    
    return { user, repos, events, orgs };
  } catch (error) {
    console.log("Error loading user data:", error);
    throw error;
  }
}
*/