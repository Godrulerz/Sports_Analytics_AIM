// Authentication and Session Management for OpenWebUI Integration

class AuthManager {
  constructor() {
    this.sessionKey = 'sports_dashboard_session';
    this.apiKeyKey = 'openwebui_api_key';
  }

  // Store API key securely
  setApiKey(apiKey) {
    localStorage.setItem(this.apiKeyKey, apiKey);
  }

  // Get stored API key
  getApiKey() {
    return localStorage.getItem(this.apiKeyKey);
  }

  // Clear API key
  clearApiKey() {
    localStorage.removeItem(this.apiKeyKey);
  }

  // Create user session
  createSession(userData) {
    const session = {
      id: Date.now().toString(),
      userData,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    
    localStorage.setItem(this.sessionKey, JSON.stringify(session));
    return session;
  }

  // Get current session
  getSession() {
    const sessionData = localStorage.getItem(this.sessionKey);
    if (!sessionData) return null;
    
    try {
      const session = JSON.parse(sessionData);
      // Update last activity
      session.lastActivity = new Date().toISOString();
      localStorage.setItem(this.sessionKey, JSON.stringify(session));
      return session;
    } catch (error) {
      console.error('Error parsing session data:', error);
      this.clearSession();
      return null;
    }
  }

  // Clear session
  clearSession() {
    localStorage.removeItem(this.sessionKey);
  }

  // Check if session is valid
  isSessionValid() {
    const session = this.getSession();
    if (!session) return false;
    
    // Check if session is older than 24 hours
    const lastActivity = new Date(session.lastActivity);
    const now = new Date();
    const hoursDiff = (now - lastActivity) / (1000 * 60 * 60);
    
    return hoursDiff < 24;
  }

  // Update session activity
  updateActivity() {
    const session = this.getSession();
    if (session) {
      session.lastActivity = new Date().toISOString();
      localStorage.setItem(this.sessionKey, JSON.stringify(session));
    }
  }
}

// Chat history management
class ChatHistoryManager {
  constructor() {
    this.historyKey = 'sports_dashboard_chat_history';
    this.maxHistory = 50; // Keep last 50 conversations
  }

  // Save chat message
  saveMessage(sessionId, message) {
    const history = this.getHistory(sessionId);
    history.push({
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    });
    
    // Keep only recent messages
    if (history.length > this.maxHistory) {
      history.splice(0, history.length - this.maxHistory);
    }
    
    localStorage.setItem(`${this.historyKey}_${sessionId}`, JSON.stringify(history));
  }

  // Get chat history for session
  getHistory(sessionId) {
    const historyData = localStorage.getItem(`${this.historyKey}_${sessionId}`);
    if (!historyData) return [];
    
    try {
      return JSON.parse(historyData);
    } catch (error) {
      console.error('Error parsing chat history:', error);
      return [];
    }
  }

  // Clear chat history for session
  clearHistory(sessionId) {
    localStorage.removeItem(`${this.historyKey}_${sessionId}`);
  }

  // Get all sessions
  getAllSessions() {
    const sessions = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.historyKey)) {
        const sessionId = key.replace(`${this.historyKey}_`, '');
        const history = this.getHistory(sessionId);
        if (history.length > 0) {
          sessions.push({
            sessionId,
            messageCount: history.length,
            lastMessage: history[history.length - 1]?.timestamp
          });
        }
      }
    }
    return sessions;
  }
}

// Performance data persistence
class PerformanceDataManager {
  constructor() {
    this.dataKey = 'sports_dashboard_performance_data';
  }

  // Save performance session
  saveSession(sessionData) {
    const sessions = this.getAllSessions();
    const session = {
      id: Date.now().toString(),
      ...sessionData,
      savedAt: new Date().toISOString()
    };
    
    sessions.push(session);
    localStorage.setItem(this.dataKey, JSON.stringify(sessions));
    return session;
  }

  // Get all performance sessions
  getAllSessions() {
    const data = localStorage.getItem(this.dataKey);
    if (!data) return [];
    
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing performance data:', error);
      return [];
    }
  }

  // Get session by ID
  getSession(sessionId) {
    const sessions = this.getAllSessions();
    return sessions.find(s => s.id === sessionId);
  }

  // Delete session
  deleteSession(sessionId) {
    const sessions = this.getAllSessions();
    const filtered = sessions.filter(s => s.id !== sessionId);
    localStorage.setItem(this.dataKey, JSON.stringify(filtered));
  }

  // Export data as JSON
  exportData() {
    const sessions = this.getAllSessions();
    const dataStr = JSON.stringify(sessions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sports-performance-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Import data from JSON
  importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (Array.isArray(data)) {
            localStorage.setItem(this.dataKey, JSON.stringify(data));
            resolve(data);
          } else {
            reject(new Error('Invalid data format'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
}

// Export managers
export const authManager = new AuthManager();
export const chatHistoryManager = new ChatHistoryManager();
export const performanceDataManager = new PerformanceDataManager();
