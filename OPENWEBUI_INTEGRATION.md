# OpenWebUI Integration Guide

## 🚀 Quick Start

### 1. Start OpenWebUI with Docker

```bash
# Start OpenWebUI and Ollama
docker-compose up -d

# Pull a model (optional)
docker exec -it ollama ollama pull llama3.2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
# Copy environment template
cp env.example .env

# Edit .env file
VITE_OPENWEBUI_BASE_URL=http://localhost:8080/api/v1
VITE_OPENWEBUI_API_KEY=your-api-key-here
VITE_DEFAULT_MODEL=llama3.2
```

### 4. Start Development Server

```bash
npm run dev
```

## 🎯 Features Added

### AI Coaching Panel
- **Performance Analysis**: AI analyzes your accuracy metrics
- **Practice Plans**: Generate customized training sessions
- **Pattern Recognition**: Identify shot patterns and trends
- **Real-time Insights**: Get instant coaching feedback

### Chat Interface
- **Interactive Coaching**: Chat with AI about your performance
- **Context-Aware**: AI knows your current metrics and sport
- **Session History**: Persistent chat history
- **Smart Recommendations**: Personalized advice based on data

### Enhanced Dashboard
- **AI Toggle**: Easy access to AI features
- **Integrated Workflow**: Seamless data flow between analysis and AI
- **Performance Tracking**: Enhanced metrics with AI insights

## 🔧 Configuration Options

### Model Selection
```javascript
// Available models
const models = [
  'llama3.2',    // Recommended for general use
  'llama3.1',    // Alternative option
  'mistral',     // Good for technical analysis
  'codellama',   // Code-focused responses
  'phi3',        // Lightweight option
  'gemma'        // Google's model
];
```

### Custom Prompts
```javascript
// Modify coaching prompts in AICoachingPanel.jsx
const systemPrompt = `You are an expert sports coach...`;
```

### API Configuration
```javascript
// Adjust API settings in config.js
const config = {
  openwebui: {
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 30000,
    retryAttempts: 3
  }
};
```

## 🛡️ Security & Authentication

### API Key Management
```javascript
// Store API key securely
authManager.setApiKey('your-api-key');

// Use in requests
const headers = {
  'Authorization': `Bearer ${authManager.getApiKey()}`
};
```

### Session Management
```javascript
// Create user session
const session = authManager.createSession({
  userId: 'user123',
  preferences: { sport: 'basketball' }
});

// Check session validity
if (authManager.isSessionValid()) {
  // Continue with authenticated user
}
```

## 📊 Data Flow

### 1. Performance Data → AI Analysis
```javascript
// Metrics are automatically passed to AI
const insights = await client.generateCoachingInsights(metrics, sport);
```

### 2. Chat Context
```javascript
// Chat includes current performance context
const systemMessage = `Current Performance: ${metrics.acc}% accuracy...`;
```

### 3. Pattern Analysis
```javascript
// AI analyzes shot patterns
const patterns = client.analyzePatterns(attempts);
const analysis = await client.analyzeShotPattern(attempts, sport);
```

## 🔄 API Integration Examples

### Basic Chat Completion
```javascript
const response = await client.sendChatCompletion([
  { role: 'system', content: 'You are a sports coach' },
  { role: 'user', content: 'How can I improve my accuracy?' }
]);
```

### Streaming Response
```javascript
const stream = await client.sendChatCompletion(messages, 'llama3.2', true);
for await (const chunk of stream) {
  console.log(chunk.choices[0].delta.content);
}
```

### Custom Analysis
```javascript
const customPrompt = `Analyze this specific aspect: ${userQuestion}`;
const analysis = await client.sendChatCompletion([
  { role: 'system', content: systemPrompt },
  { role: 'user', content: customPrompt }
]);
```

## 🚀 Production Deployment

### Environment Variables
```bash
# Production .env
VITE_OPENWEBUI_BASE_URL=https://your-openwebui-domain.com/api/v1
VITE_OPENWEBUI_API_KEY=your-production-api-key
VITE_APP_URL=https://your-dashboard-domain.com
```

### Docker Production
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  dashboard:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_OPENWEBUI_BASE_URL=https://openwebui.yourdomain.com/api/v1
```

### Build for Production
```bash
npm run build
# Deploy dist/ folder to your web server
```

## 🐛 Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check if OpenWebUI is running on correct port
   - Verify CORS settings
   - Check firewall rules

2. **API Key Issues**
   - Ensure API key is correctly set
   - Check OpenWebUI authentication settings
   - Verify key permissions

3. **Model Not Found**
   - Pull the model: `docker exec -it ollama ollama pull llama3.2`
   - Check model availability in OpenWebUI
   - Verify model name spelling

4. **Slow Responses**
   - Increase timeout in config.js
   - Check server resources
   - Consider using smaller models

### Debug Mode
```javascript
// Enable debug logging
localStorage.setItem('debug', 'true');

// Check API connectivity
const client = new OpenWebUIClient();
client.getModels().then(console.log);
```

## 📈 Performance Optimization

### Caching
```javascript
// Implement response caching
const cache = new Map();
const cachedResponse = cache.get(prompt);
if (cachedResponse) return cachedResponse;
```

### Debouncing
```javascript
// Debounce AI requests
const debouncedRequest = debounce(generateInsights, 500);
```

### Error Handling
```javascript
// Robust error handling
try {
  const response = await client.sendChatCompletion(messages);
} catch (error) {
  if (error.status === 429) {
    // Rate limited - retry later
  } else if (error.status === 401) {
    // Authentication error
  }
}
```

## 🔮 Future Enhancements

### Planned Features
- [ ] Voice coaching interface
- [ ] Video analysis integration
- [ ] Multi-user support
- [ ] Advanced analytics
- [ ] Mobile app integration
- [ ] Real-time collaboration

### Custom Integrations
- [ ] Custom model fine-tuning
- [ ] Sport-specific prompts
- [ ] Performance prediction
- [ ] Injury prevention insights

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review OpenWebUI documentation
3. Check GitHub issues
4. Contact support team

---

**Happy Training! 🎯🤖**
