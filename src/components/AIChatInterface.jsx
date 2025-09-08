import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import OpenWebUIClient from '@/lib/openwebui-client.js';

function AIChatInterface({ metrics, attempts, sport }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [client] = useState(() => new OpenWebUIClient());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Test connection first
      await client.getModels();
      
      // Create context-aware system message
      const systemMessage = `You are an expert sports coach assistant. The user is working on ${sport} accuracy training.

Current Performance Context:
- Total Attempts: ${metrics.total}
- Accuracy: ${metrics.acc}%
- Mean Radial Error: ${metrics.mre} cm
- Release Angle: ${metrics.releaseAvg}° ± ${metrics.releaseSd}°

Provide helpful, specific coaching advice based on their questions and current performance data.`;

      const chatMessages = [
        { role: 'system', content: systemMessage },
        ...messages.map(msg => ({ role: msg.role, content: msg.content })),
        { role: 'user', content: inputMessage }
      ];

      const response = await client.sendChatCompletion(chatMessages, 'gpt-3.5-turbo');
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Show specific error message
      const errorMessage = error.message || 'Unknown error occurred';
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Error: ${errorMessage}\n\nFalling back to demo mode...\n\n` + getDemoResponse(inputMessage, metrics, sport),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo response generator
  const getDemoResponse = (message, metrics, sport) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('accuracy') || lowerMessage.includes('improve')) {
      return `Demo Response: To improve your ${sport} accuracy (currently ${metrics.acc}%), focus on:\n\n` +
             `• Consistent release technique\n` +
             `• Proper follow-through\n` +
             `• Mental focus and concentration\n` +
             `• Regular practice with feedback\n\n` +
             `Note: Connect to OpenAI API for personalized AI coaching.`;
    }
    
    if (lowerMessage.includes('technique') || lowerMessage.includes('form')) {
      return `Demo Response: Your current technique shows:\n\n` +
             `• Release angle: ${metrics.releaseAvg}° (target: ~52° for basketball)\n` +
             `• Consistency: ${100 - metrics.spread * 4}% (based on error spread)\n` +
             `• Mean error: ${metrics.mre}cm\n\n` +
             `Focus on maintaining consistent form throughout your shot.\n\n` +
             `Note: Connect to OpenAI API for detailed technique analysis.`;
    }
    
    if (lowerMessage.includes('practice') || lowerMessage.includes('training')) {
      return `Demo Response: Based on your performance:\n\n` +
             `• Practice 15-30 minutes daily\n` +
             `• Focus on form over quantity\n` +
             `• Record your sessions for analysis\n` +
             `• Work on consistency drills\n\n` +
             `Note: Connect to OpenAI API for customized practice plans.`;
    }
    
    return `Demo Response: I'd be happy to help with your ${sport} training! Your current stats:\n\n` +
           `• Accuracy: ${metrics.acc}%\n` +
           `• Mean Error: ${metrics.mre}cm\n` +
           `• Total Attempts: ${metrics.total}\n\n` +
           `Ask me about technique, practice, or improvement strategies.\n\n` +
           `Note: Connect to OpenAI API for AI-powered coaching.`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <Card className="rounded-2xl h-96 flex flex-col">
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">AI Coach Chat</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearChat}
            className="text-xs"
          >
            Clear
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 text-sm py-8">
              <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Ask me anything about your performance!</p>
              <p className="text-xs mt-1">Try: "How can I improve my accuracy?"</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask your AI coach anything..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={sendMessage} 
            disabled={!inputMessage.trim() || isLoading}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AIChatInterface;
