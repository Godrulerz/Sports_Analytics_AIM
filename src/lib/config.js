// Production-ready configuration for OpenWebUI integration

const config = {
  // OpenWebUI API Configuration
  openwebui: {
    baseURL: import.meta.env.VITE_OPENWEBUI_BASE_URL || 'http://localhost:8080/api/v1',
    apiKey: import.meta.env.VITE_OPENWEBUI_API_KEY || '',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },

  // Model Configuration
  models: {
    default: import.meta.env.VITE_DEFAULT_MODEL || 'llama3.2',
    maxTokens: parseInt(import.meta.env.VITE_MAX_TOKENS) || 1000,
    temperature: parseFloat(import.meta.env.VITE_TEMPERATURE) || 0.7,
    available: [
      'llama3.2',
      'llama3.1',
      'mistral',
      'codellama',
      'phi3',
      'gemma'
    ]
  },

  // Feature Flags
  features: {
    aiCoaching: true,
    chatInterface: true,
    patternAnalysis: true,
    practicePlans: true,
    dataExport: true,
    sessionManagement: true
  },

  // UI Configuration
  ui: {
    theme: 'light', // 'light' | 'dark' | 'auto'
    animations: true,
    compactMode: false,
    showAdvancedMetrics: false
  },

  // Performance Settings
  performance: {
    maxAttempts: 1000,
    chartUpdateInterval: 1000, // ms
    aiRequestDebounce: 500, // ms
    cacheSize: 100 // number of cached responses
  },

  // Security Settings
  security: {
    enableCORS: true,
    allowedOrigins: ['http://localhost:3000', 'http://localhost:5173'],
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours in ms
    maxApiRequests: 100 // per hour
  }
};

// Environment-specific overrides
if (import.meta.env.PROD) {
  // Production overrides
  config.openwebui.baseURL = import.meta.env.VITE_OPENWEBUI_BASE_URL || 'https://your-domain.com/api/v1';
  config.security.allowedOrigins = [import.meta.env.VITE_APP_URL || 'https://your-domain.com'];
  config.performance.maxAttempts = 5000;
}

// Development overrides
if (import.meta.env.DEV) {
  config.openwebui.timeout = 60000; // Longer timeout for development
  config.performance.chartUpdateInterval = 500;
}

// Validation functions
export const validateConfig = () => {
  const errors = [];

  if (!config.openwebui.baseURL) {
    errors.push('OpenWebUI base URL is required');
  }

  if (config.models.maxTokens < 100 || config.models.maxTokens > 4000) {
    errors.push('Max tokens must be between 100 and 4000');
  }

  if (config.models.temperature < 0 || config.models.temperature > 2) {
    errors.push('Temperature must be between 0 and 2');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Configuration helpers
export const getModelConfig = (modelName = config.models.default) => {
  return {
    model: modelName,
    max_tokens: config.models.maxTokens,
    temperature: config.models.temperature,
    stream: false
  };
};

export const getApiHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (config.openwebui.apiKey) {
    headers['Authorization'] = `Bearer ${config.openwebui.apiKey}`;
  }

  return headers;
};

export const isFeatureEnabled = (featureName) => {
  return config.features[featureName] === true;
};

export const getPerformanceConfig = () => {
  return config.performance;
};

export const getSecurityConfig = () => {
  return config.security;
};

export default config;
