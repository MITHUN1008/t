
import React, { useState } from 'react';
import { MessageCircle, Eye, Code, Settings, Monitor, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const UserPortal = () => {
  const [previewMode, setPreviewMode] = useState<'live' | 'code'>('live');
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hi! I\'m ready to help you build your website. What\'s your YouTube channel URL?' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Mock API status - in real app this would come from Supabase
  const apiStatus = {
    youtube: true,
    openai: true,
    github: false
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, 
        { type: 'user', content: newMessage },
        { type: 'bot', content: 'Great! I\'m analyzing your channel and building your website...' }
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/20 border-b border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Creator Workspace
            </h1>
            
            {/* API Status Indicators */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${apiStatus.youtube ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-xs text-gray-400">YouTube</span>
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${apiStatus.openai ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-xs text-gray-400">AI</span>
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${apiStatus.github ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-xs text-gray-400">GitHub</span>
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex h-[calc(100vh-100px)]">
        {/* Chat Panel */}
        <div className="w-1/2 border-r border-gray-800 flex flex-col">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              AI Assistant
            </h2>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-200'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="p-6 border-t border-gray-800">
            <div className="flex gap-4">
              <Textarea
                placeholder="Describe your website idea or paste your YouTube channel URL..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white resize-none"
                rows={2}
              />
              <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                Send
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 flex flex-col">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-400" />
                Live Preview
              </h2>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={previewMode === 'live' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('live')}
                  className={previewMode === 'live' ? 'bg-green-600' : 'border-gray-600'}
                >
                  <Monitor className="w-4 h-4 mr-1" />
                  Live
                </Button>
                <Button
                  variant={previewMode === 'code' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('code')}
                  className={previewMode === 'code' ? 'bg-purple-600' : 'border-gray-600'}
                >
                  <Code className="w-4 h-4 mr-1" />
                  Code
                </Button>
              </div>
            </div>
          </div>
          
          {/* Preview Content */}
          <div className="flex-1 p-6">
            {previewMode === 'live' ? (
              <Card className="h-full bg-gray-900 border-gray-700">
                <CardContent className="p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-gray-400">Your website preview will appear here once you start chatting with the AI assistant.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full bg-gray-900 border-gray-700">
                <CardContent className="p-4 h-full">
                  <pre className="text-green-400 font-mono text-sm">
{`// Your generated code will appear here
import React from 'react';

const YourWebsite = () => {
  return (
    <div className="min-h-screen bg-white">
      <h1>Your YouTube Website</h1>
      {/* AI-generated content */}
    </div>
  );
};

export default YourWebsite;`}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPortal;
