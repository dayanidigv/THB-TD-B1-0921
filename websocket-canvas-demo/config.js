// WebSocket Configuration
// Fetches WebSocket URL from server /config endpoint

async function getWebSocketUrl() {
  try {
    // Determine base URL
    const baseUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:8080'
      : 'https://websocket-canvas-demo.onrender.com';
    
    const response = await fetch(`${baseUrl}/config`);
    const config = await response.json();
    return config.wsUrl;
  } catch (error) {
    console.error('Failed to fetch config, using fallback:', error);
    // Fallback based on environment
    return window.location.hostname === 'localhost'
      ? 'ws://localhost:8080/ws'
      : 'wss://websocket-canvas-demo.onrender.com/ws';
  }
}
