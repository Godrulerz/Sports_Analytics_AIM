// OpenWebUI API Client for Sports Accuracy Dashboard
class OpenWebUIClient {
  constructor(baseURL = null, apiKey = null) {
    // Use environment variables or fallback to defaults
    this.baseURL = baseURL || import.meta.env.VITE_OPENWEBUI_BASE_URL || 'https://api.openai.com/v1';
    this.apiKey = apiKey || import.meta.env.VITE_OPENWEBUI_API_KEY || '';
    
    this.headers = {
      'Content-Type': 'application/json',
    };
    
    // Add Authorization header for OpenAI API
    if (this.apiKey) {
      this.headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
  }

  // Method to update API key at runtime
  setApiKey(apiKey) {
    this.apiKey = apiKey;
    if (apiKey) {
      this.headers['Authorization'] = `Bearer ${apiKey}`;
    } else {
      delete this.headers['Authorization'];
    }
  }

  // Method to update base URL at runtime
  setBaseURL(baseURL) {
    this.baseURL = baseURL;
  }

  // Get available models
  async getModels() {
    try {
      const response = await fetch(`${this.baseURL}/models`, {
        headers: this.headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }

  // Send chat completion request
  async sendChatCompletion(messages, model = 'gpt-3.5-turbo', stream = false) {
    const payload = {
      model,
      messages,
      stream,
      temperature: 0.7,
      max_tokens: 1000,
    };

    try {
      console.log('Sending request to:', `${this.baseURL}/chat/completions`);
      console.log('Using API key:', this.apiKey ? `${this.apiKey.substring(0, 10)}...` : 'No API key');
      
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        throw new Error(`API Error ${response.status}: ${errorData.error?.message || response.statusText}`);
      }

      if (stream) {
        return this.handleStreamResponse(response);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error sending chat completion:', error);
      throw error;
    }
  }

  // Handle streaming response
  async* handleStreamResponse(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;
            
            try {
              const parsed = JSON.parse(data);
              yield parsed;
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  // Generate coaching insights based on performance data
  async generateCoachingInsights(metrics, sport = 'basketball') {
    const systemPrompt = `You are an expert sports coach specializing in ${sport}. 
    Analyze the following performance metrics and provide specific, actionable coaching advice.
    
    Focus on:
    - Technical improvements
    - Mental preparation
    - Practice recommendations
    - Common mistakes to avoid
    - Progress tracking suggestions
    
    Keep responses concise, practical, and encouraging.`;

    const userPrompt = `Performance Analysis Request:
    
    Sport: ${sport}
    Total Attempts: ${metrics.total}
    Accuracy: ${metrics.acc}%
    Makes: ${metrics.makes}
    Mean Radial Error: ${metrics.mre} cm
    Spread: ${metrics.spread} cm
    Release Angle: ${metrics.releaseAvg}° ± ${metrics.releaseSd}°
    
    Please provide specific coaching insights and recommendations.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    return await this.sendChatCompletion(messages, 'gpt-3.5-turbo');
  }

  // Generate practice plan based on performance
  async generatePracticePlan(metrics, sport = 'basketball', timeAvailable = 30) {
    const systemPrompt = `You are a professional sports coach. Create a detailed practice plan based on the performance data.
    
    Requirements:
    - Duration: ${timeAvailable} minutes
    - Sport: ${sport}
    - Focus on areas needing improvement
    - Include warm-up, main exercises, and cool-down
    - Provide specific drills and techniques
    - Include progress tracking methods`;

    const userPrompt = `Create a practice plan for:
    
    Current Performance:
    - Accuracy: ${metrics.acc}%
    - Mean Error: ${metrics.mre} cm
    - Consistency: ${100 - metrics.spread * 4}%
    - Release Angle: ${metrics.releaseAvg}°
    
    Focus on improving the weakest areas.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    return await this.sendChatCompletion(messages, 'gpt-3.5-turbo');
  }

  // Analyze shot pattern and provide feedback
  async analyzeShotPattern(attempts, sport = 'basketball') {
    const pattern = this.analyzePatterns(attempts);
    
    const systemPrompt = `You are a sports analyst. Analyze shot patterns and provide technical feedback.
    
    Focus on:
    - Consistency patterns
    - Common error directions
    - Fatigue indicators
    - Technique suggestions
    - Mental approach recommendations`;

    const userPrompt = `Shot Pattern Analysis:
    
    Total Shots: ${attempts.length}
    Hit Rate: ${(attempts.filter(a => a.hit).length / attempts.length * 100).toFixed(1)}%
    Average Error: ${(attempts.reduce((sum, a) => sum + a.err, 0) / attempts.length).toFixed(2)} cm
    
    Pattern Analysis:
    - Left/Right Bias: ${pattern.lrBias > 0 ? 'Right' : 'Left'} (${Math.abs(pattern.lrBias).toFixed(1)} cm)
    - High/Low Bias: ${pattern.udBias > 0 ? 'High' : 'Low'} (${Math.abs(pattern.udBias).toFixed(1)} cm)
    - Consistency Trend: ${pattern.trend}
    - Fatigue Pattern: ${pattern.fatigue}
    
    Provide specific technical recommendations.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    return await this.sendChatCompletion(messages, 'gpt-3.5-turbo');
  }

  // Helper method to analyze shot patterns
  analyzePatterns(attempts) {
    const xValues = attempts.map(a => a.x);
    const yValues = attempts.map(a => a.y);
    
    const lrBias = xValues.reduce((sum, x) => sum + x, 0) / xValues.length;
    const udBias = yValues.reduce((sum, y) => sum + y, 0) / yValues.length;
    
    // Analyze trend over time
    const firstHalf = attempts.slice(0, Math.floor(attempts.length / 2));
    const secondHalf = attempts.slice(Math.floor(attempts.length / 2));
    
    const firstHalfAcc = firstHalf.filter(a => a.hit).length / firstHalf.length;
    const secondHalfAcc = secondHalf.filter(a => a.hit).length / secondHalf.length;
    
    const trend = secondHalfAcc > firstHalfAcc ? 'Improving' : 
                 secondHalfAcc < firstHalfAcc ? 'Declining' : 'Stable';
    
    // Check for fatigue pattern
    const last10 = attempts.slice(-10);
    const last10Acc = last10.filter(a => a.hit).length / last10.length;
    const fatigue = last10Acc < 0.7 ? 'Yes' : 'No';
    
    return { lrBias, udBias, trend, fatigue };
  }
}

export default OpenWebUIClient;
