import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Settings, Save, TestTube, CheckCircle, XCircle } from 'lucide-react';
import { authManager } from '@/lib/auth.js';

function OpenWebUISettings({ onSettingsUpdate }) {
  const [settings, setSettings] = useState({
    baseURL: 'https://api.openai.com/v1',
      apiKey: '',
    model: 'gpt-3.5-turbo',
    maxTokens: 1000,
    temperature: 0.7
  });
  
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved settings on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('openwebui_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const testConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      const response = await fetch(`${settings.baseURL}/models`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(settings.apiKey && { 'Authorization': `Bearer ${settings.apiKey}` })
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTestResult({
          success: true,
          message: `Connection successful! Found ${data.data?.length || 0} models.`
        });
      } else {
        setTestResult({
          success: false,
          message: `Connection failed: ${response.status} ${response.statusText}`
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: `Connection error: ${error.message}`
      });
    } finally {
      setIsTesting(false);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('openwebui_settings', JSON.stringify(settings));
      
      // Save API key to auth manager
      if (settings.apiKey) {
        authManager.setApiKey(settings.apiKey);
      }
      
      // Notify parent component
      if (onSettingsUpdate) {
        onSettingsUpdate(settings);
      }
      
      setTestResult({
        success: true,
        message: 'Settings saved successfully!'
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: `Save error: ${error.message}`
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetToDefaults = () => {
    const defaults = {
      baseURL: 'http://localhost:8080/api/v1',
      apiKey: '',
      model: 'llama3.2',
      maxTokens: 1000,
      temperature: 0.7
    };
    setSettings(defaults);
    setTestResult(null);
  };

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">OpenWebUI Settings</h3>
        </div>

        <div className="space-y-4">
          {/* Base URL */}
          <div className="space-y-2">
            <Label htmlFor="baseURL">OpenWebUI Base URL</Label>
            <Input
              id="baseURL"
              value={settings.baseURL}
              onChange={(e) => handleInputChange('baseURL', e.target.value)}
              placeholder="http://localhost:8080/api/v1"
            />
            <p className="text-xs text-gray-500">
              OpenAI API URL (default: https://api.openai.com/v1)
            </p>
          </div>

          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key (Optional)</Label>
            <Input
              id="apiKey"
              type="password"
              value={settings.apiKey}
              onChange={(e) => handleInputChange('apiKey', e.target.value)}
              placeholder="Enter your OpenWebUI API key"
            />
            <p className="text-xs text-gray-500">
              Your OpenAI API key (required for OpenAI models)
            </p>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model">Default Model</Label>
            <Input
              id="model"
              value={settings.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              placeholder="llama3.2"
            />
            <p className="text-xs text-gray-500">
              OpenAI model to use (e.g., gpt-3.5-turbo, gpt-4, gpt-4-turbo)
            </p>
          </div>

          {/* Advanced Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxTokens">Max Tokens</Label>
              <Input
                id="maxTokens"
                type="number"
                value={settings.maxTokens}
                onChange={(e) => handleInputChange('maxTokens', parseInt(e.target.value))}
                min="100"
                max="4000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                value={settings.temperature}
                onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value))}
                min="0"
                max="2"
              />
            </div>
          </div>

          {/* Test Result */}
          {testResult && (
            <div className={`p-3 rounded-lg flex items-center gap-2 ${
              testResult.success 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {testResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <span className="text-sm">{testResult.message}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={testConnection} 
              disabled={isTesting}
              variant="outline"
              className="gap-2"
            >
              {isTesting ? (
                <TestTube className="h-4 w-4 animate-spin" />
              ) : (
                <TestTube className="h-4 w-4" />
              )}
              {isTesting ? 'Testing...' : 'Test Connection'}
            </Button>
            
            <Button 
              onClick={saveSettings} 
              disabled={isSaving}
              className="gap-2 flex-1"
            >
              {isSaving ? (
                <Save className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
            
            <Button 
              onClick={resetToDefaults} 
              variant="outline"
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p><strong>OpenAI Setup:</strong></p>
          <p>1. Get your API key from: <a href="https://platform.openai.com/api-keys" target="_blank" className="text-blue-600 underline">OpenAI Platform</a></p>
          <p>2. Enter your API key above</p>
          <p>3. Test connection to verify settings</p>
          <p>4. Save settings to apply changes</p>
          <p className="mt-2 text-blue-600"><strong>Note:</strong> The app works in demo mode without OpenAI API!</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default OpenWebUISettings;
