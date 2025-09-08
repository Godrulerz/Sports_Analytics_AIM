import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Brain, Loader2, MessageSquare, Target, Zap } from 'lucide-react';
import OpenWebUIClient from '@/lib/openwebui-client.js';

function AICoachingPanel({ metrics, attempts, sport, onInsightsUpdate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [practicePlan, setPracticePlan] = useState(null);
  const [patternAnalysis, setPatternAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [client] = useState(() => new OpenWebUIClient());

  const generateInsights = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Test connection first
      await client.getModels();
      
      const [insightsData, practiceData, patternData] = await Promise.all([
        client.generateCoachingInsights(metrics, sport),
        client.generatePracticePlan(metrics, sport, 30),
        client.analyzeShotPattern(attempts, sport)
      ]);

      setInsights(insightsData);
      setPracticePlan(practiceData);
      setPatternAnalysis(patternData);
      
      // Notify parent component
      if (onInsightsUpdate) {
        onInsightsUpdate({
          insights: insightsData,
          practicePlan: practiceData,
          patternAnalysis: patternData
        });
      }
    } catch (err) {
      console.error('AI insights error:', err);
      
      // Show helpful error message with setup instructions
      setError(
        'OpenAI API connection failed. Please either:\n\n' +
        '1. Check your API key in Settings\n' +
        '2. Verify your internet connection\n' +
        '3. Or use the demo mode below'
      );
      
      // Show demo insights instead
      setInsights({
        choices: [{
          message: {
            content: `Demo Coaching Insights for ${sport}:\n\n` +
                    `• Your accuracy of ${metrics.acc}% is ${metrics.acc > 70 ? 'good' : 'needs improvement'}\n` +
                    `• Mean error of ${metrics.mre}cm suggests ${metrics.mre < 8 ? 'good' : 'room for improvement'} in precision\n` +
                    `• Release angle of ${metrics.releaseAvg}° is ${Math.abs(52 - metrics.releaseAvg) < 2 ? 'optimal' : 'could be adjusted'}\n\n` +
                    `Note: This is a demo. Connect to OpenAI API for AI-powered insights.`
          }
        }]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatAIResponse = (response) => {
    if (response.choices && response.choices[0]) {
      return response.choices[0].message.content;
    }
    return response.content || 'No response generated';
  };

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">AI Coaching Assistant</h3>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Button 
            onClick={generateInsights} 
            disabled={isLoading}
            className="w-full gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
            {isLoading ? 'Generating Insights...' : 'Get AI Coaching Insights'}
          </Button>

          {insights && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-green-600" />
                <h4 className="font-medium text-green-800">Coaching Insights</h4>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                <div className="whitespace-pre-wrap">
                  {formatAIResponse(insights)}
                </div>
              </div>
            </div>
          )}

          {practicePlan && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <h4 className="font-medium text-blue-800">Practice Plan</h4>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                <div className="whitespace-pre-wrap">
                  {formatAIResponse(practicePlan)}
                </div>
              </div>
            </div>
          )}

          {patternAnalysis && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-600" />
                <h4 className="font-medium text-purple-800">Pattern Analysis</h4>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm">
                <div className="whitespace-pre-wrap">
                  {formatAIResponse(patternAnalysis)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Powered by OpenWebUI • AI insights are generated based on your performance data
        </div>
      </CardContent>
    </Card>
  );
}

export default AICoachingPanel;
