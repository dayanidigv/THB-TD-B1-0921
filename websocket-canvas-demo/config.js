// WebSocket Configuration
// Fetches WebSocket URL from server /config endpoint

async function getWebSocketUrl() {
  try {
    // Determine base URL
    const baseUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:8080'
      : window.location.origin;
    
    const response = await fetch(`${baseUrl}/config`);
    const config = await response.json();
    return config.wsUrl;
  } catch (error) {
    console.error('Failed to fetch config, using fallback:', error);
    // Fallback to local if config fetch fails
    return 'ws://localhost:8080';
  }
}
