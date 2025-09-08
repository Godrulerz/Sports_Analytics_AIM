# 🔑 API Key Setup Guide

## Where to Add API Keys

### **Method 1: Environment Variables (Recommended)**

Create a `.env` file in your project root:

```bash
# Create .env file
touch .env

# Or on Windows
echo. > .env
```

Add your configuration:

```env
# OpenWebUI Configuration
VITE_OPENWEBUI_BASE_URL=http://localhost:8080/api/v1
VITE_OPENWEBUI_API_KEY=your-actual-api-key-here

# Optional: Custom model configuration
VITE_DEFAULT_MODEL=llama3.2
VITE_MAX_TOKENS=1000
VITE_TEMPERATURE=0.7
```

### **Method 2: UI Settings Panel (Easiest)**

1. Start your application: `npm run dev`
2. Click the **"Settings"** button in the top-right corner
3. Fill in the settings form:
   - **Base URL**: `http://localhost:8080/api/v1`
   - **API Key**: Your OpenWebUI API key (if required)
   - **Model**: `llama3.2` (or your preferred model)
4. Click **"Test Connection"** to verify
5. Click **"Save Settings"** to apply

### **Method 3: Direct Code Configuration**

Edit `src/lib/openwebui-client.js`:

```javascript
// Update the constructor with your values
const client = new OpenWebUIClient(
  'http://localhost:8080/api/v1',  // Your OpenWebUI URL
  'your-api-key-here'              // Your API key
);
```

## 🔧 Getting Your API Key

### **Option A: OpenWebUI with Authentication**

If your OpenWebUI instance requires authentication:

1. **Access OpenWebUI**: Go to `http://localhost:8080`
2. **Create Account**: Sign up or log in
3. **Get API Key**: 
   - Go to Settings → API Keys
   - Generate a new API key
   - Copy the key

### **Option B: OpenWebUI without Authentication**

If OpenWebUI doesn't require authentication:
- Leave the API key field empty
- The client will work without authentication

### **Option C: Custom OpenWebUI Setup**

For custom OpenWebUI installations:

1. **Check your OpenWebUI configuration**
2. **Look for API key settings in your config**
3. **Use the provided API key or generate one**

## 🚀 Quick Setup Steps

### **Step 1: Start OpenWebUI**

```bash
# Using Docker Compose
docker-compose up -d

# Check if it's running
docker ps
```

### **Step 2: Verify OpenWebUI is Running**

Open your browser and go to:
- `http://localhost:8080` (OpenWebUI interface)
- `http://localhost:8080/api/v1/models` (API endpoint)

### **Step 3: Configure Your Dashboard**

**Option A: Use the UI Settings**
1. Start your dashboard: `npm run dev`
2. Click "Settings" button
3. Enter your OpenWebUI URL
4. Test connection
5. Save settings

**Option B: Use Environment Variables**
1. Create `.env` file
2. Add your configuration
3. Restart the development server

### **Step 4: Test the Integration**

1. Click "AI Assistant" button
2. Try generating coaching insights
3. Test the chat interface

## 🔍 Troubleshooting

### **Common Issues**

#### **"Connection Failed" Error**
- ✅ Check if OpenWebUI is running: `docker ps`
- ✅ Verify the URL: `http://localhost:8080/api/v1`
- ✅ Check if the port is correct (default: 8080)

#### **"Authentication Failed" Error**
- ✅ Check if API key is correct
- ✅ Verify API key format (no extra spaces)
- ✅ Check if OpenWebUI requires authentication

#### **"Model Not Found" Error**
- ✅ Pull a model: `docker exec -it ollama ollama pull llama3.2`
- ✅ Check available models in OpenWebUI interface
- ✅ Verify model name spelling

#### **"CORS Error" Error**
- ✅ Check OpenWebUI CORS settings
- ✅ Ensure your dashboard URL is allowed
- ✅ Try accessing from the same domain

### **Debug Steps**

1. **Check OpenWebUI Status**:
   ```bash
   curl http://localhost:8080/api/v1/models
   ```

2. **Test with Browser**:
   - Go to `http://localhost:8080/api/v1/models`
   - Should return JSON with available models

3. **Check Browser Console**:
   - Open Developer Tools (F12)
   - Look for error messages in Console tab

4. **Verify Environment Variables**:
   ```javascript
   console.log(import.meta.env.VITE_OPENWEBUI_BASE_URL);
   console.log(import.meta.env.VITE_OPENWEBUI_API_KEY);
   ```

## 📝 Configuration Examples

### **Local Development**
```env
VITE_OPENWEBUI_BASE_URL=http://localhost:8080/api/v1
VITE_OPENWEBUI_API_KEY=
VITE_DEFAULT_MODEL=llama3.2
```

### **Production with Authentication**
```env
VITE_OPENWEBUI_BASE_URL=https://openwebui.yourdomain.com/api/v1
VITE_OPENWEBUI_API_KEY=sk-1234567890abcdef
VITE_DEFAULT_MODEL=llama3.2
```

### **Custom Model**
```env
VITE_OPENWEBUI_BASE_URL=http://localhost:8080/api/v1
VITE_OPENWEBUI_API_KEY=
VITE_DEFAULT_MODEL=mistral
VITE_MAX_TOKENS=2000
VITE_TEMPERATURE=0.5
```

## 🛡️ Security Best Practices

### **API Key Security**
- ✅ Never commit API keys to version control
- ✅ Use environment variables for sensitive data
- ✅ Rotate API keys regularly
- ✅ Use different keys for development/production

### **Environment Security**
- ✅ Keep `.env` file in `.gitignore`
- ✅ Use strong, unique API keys
- ✅ Limit API key permissions when possible

## 🎯 Next Steps

Once your API keys are configured:

1. **Test the AI features** in your dashboard
2. **Customize the prompts** for your specific sport
3. **Adjust model parameters** for better responses
4. **Set up monitoring** for API usage
5. **Configure backup models** for reliability

---

**Need Help?** Check the troubleshooting section or review the OpenWebUI documentation for advanced configuration options.
