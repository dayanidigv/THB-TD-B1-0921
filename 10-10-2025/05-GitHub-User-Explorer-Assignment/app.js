// Main Application Logic for GitHub User Explorer
// Students need to complete the missing parts

// Global variables
let currentUser = null;
let currentRepositories = [];
let currentEvents = [];
let currentFollowers = [];
let currentFollowing = [];
let currentOrganizations = [];

// DOM Elements (already completed for students)
const usernameInput = document.getElementById('usernameInput');
const searchBtn = document.getElementById('searchBtn');
const loadingMessage = document.getElementById('loadingMessage');
const userProfileCard = document.getElementById('userProfileCard');
const repositoriesContainer = document.getElementById('repositoriesContainer');
const activityContainer = document.getElementById('activityContainer');
const followersContainer = document.getElementById('followersContainer');
const followingContainer = document.getElementById('followingContainer');
const organizationsContainer = document.getElementById('organizationsContainer');
const errorSection = document.getElementById('errorSection');
const errorText = document.getElementById('errorText');
const tryAgainBtn = document.getElementById('tryAgainBtn');

// Event Listeners (already set up for students)
searchBtn.addEventListener('click', handleSearch);
usernameInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
});
tryAgainBtn.addEventListener('click', hideError);

// TODO: Complete this function
async function handleSearch() {
    const username = usernameInput.value.trim();
    
    // Step 1: Input validation
    if (!username) {
        showError("Please enter a GitHub username!");
        return;
    }
    
    // Step 2: Validate username format (basic)
    if (username.length < 1 || username.length > 39) {
        showError("Username must be between 1 and 39 characters!");
        return;
    }
    
    console.log(`Starting search for user: ${username}`);
    showLoading();
    
    try {
        // Step 3: INTERMEDIATE APPROACH - Use Promise.all for parallel API calls
        console.log("Making parallel API calls...");
        
        // TODO: Replace these comments with actual API calls
        // const [user, repositories, events, following, organizations] = await Promise.all([
        //     getGitHubUser(username),
        //     getUserRepositories(username),
        //     getUserEvents(username),
        //     getUserFollowing(username),
        //     getUserOrganizations(username)
        // ]);
        
        // Step 4: Optional - Get followers (can be slow for users with many followers)
        // let followers = [];
        // try {
        //     followers = await getUserFollowers(username);
        // } catch (error) {
        //     console.log("Could not load followers:", error.message);
        // }
        
        console.log("All data loaded successfully!");
        
        // Step 5: Display all the retrieved data
        // displayUserProfile(user);
        // displayRepositories(repositories);
        // displayRecentActivity(events);
        // displayFollowers(followers);
        // displayFollowing(following);
        // displayOrganizations(organizations);
        
        hideLoading();
        
    } catch (error) {
        console.log("Search failed:", error.message);
        hideLoading();
        showError(error.message);
    }
}

// TODO: Complete this function
function displayUserProfile(user) {
    console.log("Displaying user profile...");
    // Step 1: Store user data globally
    currentUser = user;
    
    // Step 2: Update basic profile information
    document.getElementById('userAvatar').src = user.avatar_url;
    document.getElementById('userAvatar').alt = `${user.login}'s avatar`;
    document.getElementById('userName').textContent = user.name || 'No name provided';
    document.getElementById('userUsername').textContent = `@${user.login}`;
    document.getElementById('userBio').textContent = user.bio || 'No bio available';
    
    // Step 3: Update user details (TODO: Complete these assignments)
    // document.getElementById('userCompany').textContent = user.company || 'Not specified';
    // document.getElementById('userLocation').textContent = user.location || 'Not specified';
    // 
    // const blogElement = document.getElementById('userBlog');
    // if (user.blog) {
    //     blogElement.href = user.blog.startsWith('http') ? user.blog : `https://${user.blog}`;
    //     blogElement.textContent = user.blog;
    // } else {
    //     blogElement.textContent = 'No website';
    // }
    // 
    // document.getElementById('userJoined').textContent = formatDate(user.created_at);
    
    // Step 4: Update user statistics (TODO: Complete these assignments)
    // document.getElementById('repoCount').textContent = user.public_repos.toLocaleString();
    // document.getElementById('followerCount').textContent = user.followers.toLocaleString();
    // document.getElementById('followingCount').textContent = user.following.toLocaleString();
    
    // Step 5: Show the profile card with animation
    userProfileCard.classList.remove('hidden');
    console.log("User profile displayed successfully");
}

// TODO: Complete this function
function displayRepositories(repositories) {
    console.log("Displaying repositories...");
    // Step 1: Store repositories globally
    currentRepositories = repositories;
    
    // Step 2: Clear previous repositories
    repositoriesContainer.innerHTML = '';
    
    // Step 3: Check if user has repositories
    if (!repositories || repositories.length === 0) {
        repositoriesContainer.innerHTML = '<p class="no-data">No public repositories found.</p>';
        repositoriesContainer.classList.remove('hidden');
        return;
    }
    
    // Step 4: Show top 6 repositories (most recently updated)
    const reposToShow = repositories.slice(0, 6);
    
    reposToShow.forEach(repo => {
        // Step 5: Create repository card
        const repoCard = document.createElement('div');
        repoCard.className = 'repo-card';
        
        repoCard.innerHTML = `
            <h4><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h4>
            <p>${repo.description || 'No description available'}</p>
            <div class="repo-info">
                <span class="language">${repo.language || 'Unknown'}</span>
                <span class="stars">Stars: ${repo.stargazers_count.toLocaleString()}</span>
                <span class="forks">Forks: ${repo.forks_count.toLocaleString()}</span>
            </div>
        `;
    
        
        repositoriesContainer.appendChild(repoCard);
    });
    
    // Step 6: Add "show more" indicator if there are more repos
    if (repositories.length > 6) {
        const moreInfo = document.createElement('div');
        moreInfo.className = 'more-repos';
        moreInfo.innerHTML = `<p>... and ${repositories.length - 6} more repositories</p>`;
        repositoriesContainer.appendChild(moreInfo);
    }
    
    repositoriesContainer.classList.remove('hidden');
    console.log(`Displayed ${reposToShow.length} repositories successfully`);
}

// TODO: Complete this function
function displayRecentActivity(events) {
    // Step 1: Store events globally
    currentEvents = events;
    
    // Step 2: Clear previous activity
    activityContainer.innerHTML = '';
    
    // Step 3: Check if user has recent activity
    if (!events || events.length === 0) {
        activityContainer.innerHTML = '<p>No recent activity found.</p>';
        activityContainer.classList.remove('hidden');
        return;
    }
    
    // Step 4: Create activity cards (show first 5 events)
    const eventsToShow = events.slice(0, 5);
    
    eventsToShow.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'activity-card';
        
        // Format event based on type
        let eventDescription = '';
        const eventDate = new Date(event.created_at).toLocaleDateString();
        
        switch (event.type) {
            case 'PushEvent':
                eventDescription = `Pushed code to ${event.repo.name}`;
                break;
            case 'CreateEvent':
                eventDescription = `Created ${event.payload.ref_type} in ${event.repo.name}`;
                break;
            case 'ForkEvent':
                eventDescription = `Forked ${event.repo.name}`;
                break;
            case 'WatchEvent':
                eventDescription = `Starred ${event.repo.name}`;
                break;
            default:
                eventDescription = `${event.type} in ${event.repo.name}`;
        }
        
        eventCard.innerHTML = `
            <div class="activity-info">
                <span class="activity-type">${event.type.replace('Event', '')}</span>
                <span class="activity-date">${eventDate}</span>
            </div>
            <p>${eventDescription}</p>
        `;
        
        activityContainer.appendChild(eventCard);
    });
    
    // Step 5: Show activity container
    activityContainer.classList.remove('hidden');
}

// TODO: Complete this function
function displayFollowers(followers) {
    // Step 1: Store followers globally
    currentFollowers = followers;
    
    // Step 2: Clear previous followers
    followersContainer.innerHTML = '';
    
    // Step 3: Check if user has followers
    if (!followers || followers.length === 0) {
        followersContainer.innerHTML = '<p>No followers found.</p>';
        return;
    }
    
    // Step 4: Create follower cards (show first 12 followers)
    const followersToShow = followers.slice(0, 12);
    
    followersToShow.forEach(follower => {
        const followerCard = document.createElement('div');
        followerCard.className = 'user-mini-card';
        
        followerCard.innerHTML = `
            <img src="${follower.avatar_url}" alt="${follower.login}" class="mini-avatar">
            <a href="${follower.html_url}" target="_blank">@${follower.login}</a>
        `;
        
        followersContainer.appendChild(followerCard);
    });
}

// TODO: Complete this function
function displayFollowing(following) {
    // Similar to displayFollowers but for following list
    currentFollowing = following;
    
    followingContainer.innerHTML = '';
    
    if (!following || following.length === 0) {
        followingContainer.innerHTML = '<p>Not following anyone.</p>';
        return;
    }
    
    const followingToShow = following.slice(0, 12);
    
    followingToShow.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-mini-card';
        
        userCard.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" class="mini-avatar">
            <a href="${user.html_url}" target="_blank">@${user.login}</a>
        `;
        
        followingContainer.appendChild(userCard);
    });
}

// TODO: Complete this function
function displayOrganizations(organizations) {
    // Step 1: Store organizations globally
    currentOrganizations = organizations;
    
    // Step 2: Clear previous organizations
    organizationsContainer.innerHTML = '';
    
    // Step 3: Check if user belongs to organizations
    if (!organizations || organizations.length === 0) {
        organizationsContainer.innerHTML = '<p>No organizations found.</p>';
        organizationsContainer.classList.remove('hidden');
        return;
    }
    
    // Step 4: Create organization cards
    organizations.forEach(org => {
        const orgCard = document.createElement('div');
        orgCard.className = 'org-card';
        
        orgCard.innerHTML = `
            <img src="${org.avatar_url}" alt="${org.login}" class="org-avatar">
            <div class="org-info">
                <h4><a href="https://github.com/${org.login}" target="_blank">${org.login}</a></h4>
                <p>${org.description || 'No description available'}</p>
            </div>
        `;
        
        organizationsContainer.appendChild(orgCard);
    });
    
    // Step 5: Show organizations container
    organizationsContainer.classList.remove('hidden');
}

// Helper functions (already completed for students)
function showLoading() {
    loadingMessage.classList.remove('hidden');
    hideError();
    hideResults();
}

function hideLoading() {
    loadingMessage.classList.add('hidden');
}

function showError(message) {
    errorText.textContent = message;
    errorSection.classList.remove('hidden');
    hideResults();
}

function hideError() {
    errorSection.classList.add('hidden');
}

function hideResults() {
    userProfileCard.classList.add('hidden');
    repositoriesContainer.classList.add('hidden');
    activityContainer.classList.add('hidden');
    organizationsContainer.classList.add('hidden');
}

/* 
ASSIGNMENT COMPLETION CHECKLIST:

HTTP GET REQUESTS & API INTEGRATION:
□ Implement getGitHubUser() function with proper fetch() usage
□ Implement getUserRepositories() function with error handling
□ Implement getUserEvents() function with status code management
□ Implement getUserFollowing() function with JSON parsing
□ Implement getUserOrganizations() function with async/await patterns
□ Handle HTTP status codes: 200, 404, 403, 429, 500
□ Add appropriate request headers and URL construction
□ Test API endpoints individually before integration

JSON DATA PROCESSING:
□ Parse JSON responses correctly in all API functions
□ Handle null/undefined properties in JSON data
□ Validate JSON structure before processing
□ Transform API data for UI display
□ Implement safe property access patterns
□ Handle array and object data types appropriately

ASYNC/AWAIT IMPLEMENTATION:
□ Use async/await syntax in all API functions
□ Implement proper error handling with try/catch blocks
□ Complete handleSearch() function with sequential API calls
□ BONUS: Use Promise.all() for parallel API execution
□ Handle timing and race conditions appropriately
□ Understand and implement error propagation

APPLICATION LOGIC:
□ Complete displayUserProfile() function
□ Complete displayRepositories() function
□ Complete displayRecentActivity() function
□ Complete displayFollowing() function
□ Complete displayOrganizations() function
□ Implement loading states and user feedback
□ Connect all components for complete user experience

ERROR HANDLING & STATUS CODES:
□ Create user-friendly error messages for different scenarios
□ Handle network failures and timeout situations
□ Implement graceful degradation for missing data
□ Add debugging logs for development and testing
□ Test error scenarios: invalid users, rate limits, network issues
□ Provide clear feedback for all error conditions

BONUS FEATURES FOR ADVANCED LEARNING:
□ Complete getUserFollowers() function
□ Complete displayFollowers() function
□ Implement advanced error recovery strategies
□ Add request caching for performance optimization
□ Monitor and display API rate limit information
□ Implement request timeout and retry logic
□ Add data export functionality
□ Create comprehensive logging system
*/