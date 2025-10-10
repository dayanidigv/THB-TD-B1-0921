// GitHub API - Get User Information
async function getGitHubUser(username) {
    try {
        console.log(`Getting GitHub user: ${username}`);
        
        const response = await fetch(`https://api.github.com/users/${username}`);

        console.log("Status:", response.status);
        
        if (response.ok) {
            const user = await response.json();
            return user;
        } else if (response.status === 404) {
            console.log("❌ User not found!");
            return null;
        } else {
            console.log("❌ Error getting user");
            return null;
        }
        
    } catch (error) {
        console.log("❌ Network error:", error.message);
        return null;
    }
}

// Example 2: Get User Repositories
async function getUserRepos(username) {
    try {
        console.log(`Getting repositories for: ${username}`);
        
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        console.log("Status:", response.status);
        
        if (response.ok) {
            const repos = await response.json(); 
            return repos;
        } else {
            console.log("❌ Could not get repositories");
            return [];
        }
        
    } catch (error) {
        console.log("❌ Error:", error.message);
        return [];
    }
}

// Example 3: Display User Card
async function createUserCard(username) {
    try {
        const user = await getGitHubUser(username);
        
        if (user) {
            console.log("Creating user card for:", user.name || user.login);
            
            const userCard = {
                name: user.name || user.login,
                username: user.login,
                bio: user.bio || "No bio available",
                stats: {
                    repos: user.public_repos,
                    followers: user.followers,
                    following: user.following
                },
                avatar: user.avatar_url,
                profile: user.html_url
            };
            
            console.log("User card created:", JSON.stringify(userCard, null, 2));
            return userCard;
        }
        
    } catch (error) {
        console.log("❌ Error creating user card:", error.message);
    }
}
