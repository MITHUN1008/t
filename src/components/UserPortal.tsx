
import React, { useState } from 'react';
import { MessageCircle, Eye, Code, Settings, Monitor, Smartphone, User, BarChart3, Youtube, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const UserPortal = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [previewMode, setPreviewMode] = useState<'live' | 'code'>('live');
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hi! I\'m your AI assistant. Share your YouTube channel URL and describe your vision - I\'ll create an amazing website for you!' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Mock API status - would come from Supabase in real implementation
  const apiStatus = {
    youtube: true,
    openai: true,
    github: false
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, 
        { type: 'user', content: newMessage },
        { type: 'bot', content: 'Analyzing your channel and generating your website... This will take just a moment!' }
      ]);
      setNewMessage('');
    }
  };

  const handleBackToHome = () => {
    window.location.reload();
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'projects', label: 'My Projects', icon: Monitor },
    { id: 'youtube-builder', label: 'YouTube Builder', icon: Youtube },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderMainContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-white/5 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Monitor className="h-5 w-5 text-red-400" />
                    <span className="text-xs text-green-400">+12%</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">3</p>
                    <p className="text-xs text-gray-400">Active Projects</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="h-5 w-5 text-pink-400" />
                    <span className="text-xs text-green-400">+28%</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">1,247</p>
                    <p className="text-xs text-gray-400">Total Visitors</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Youtube className="h-5 w-5 text-red-500" />
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">Connected</p>
                    <p className="text-xs text-gray-400">YouTube Channel</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                    <span className="text-xs text-green-400">99.9%</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">Online</p>
                    <p className="text-xs text-gray-400">Website Status</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white"
                    onClick={() => setActiveTab('youtube-builder')}
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    Create New Website
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                    onClick={() => setActiveTab('projects')}
                  >
                    <Monitor className="w-4 h-4 mr-2" />
                    View Projects
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">Website deployed successfully</span>
                      <span className="text-xs text-gray-500 ml-auto">2h ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">YouTube channel connected</span>
                      <span className="text-xs text-gray-500 ml-auto">1d ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300">New website created</span>
                      <span className="text-xs text-gray-500 ml-auto">3d ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'youtube-builder':
        return (
          <div className="h-full flex">
            {/* Chat Panel */}
            <div className="w-1/2 border-r border-gray-800 flex flex-col">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                  <MessageCircle className="w-5 h-5 text-red-400" />
                  AI Website Builder
                </h2>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white' 
                        : 'bg-white/5 text-gray-200 border border-gray-800'
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
                    placeholder="Enter your YouTube channel URL or describe your website idea..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="bg-white/5 border-gray-700 text-white resize-none"
                    rows={2}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="w-1/2 flex flex-col">
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
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
                  <Card className="h-full bg-white/5 border-gray-700">
                    <CardContent className="p-8 h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Smartphone className="w-10 h-10 text-white" />
                        </div>
                        <p className="text-gray-400">Your website preview will appear here once you start chatting with the AI assistant.</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-full bg-black border-gray-700">
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
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
              <p className="text-gray-400">This feature is currently in development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-black/90 border-r border-gray-800 flex flex-col">
        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-800">
          <Button 
            variant="ghost" 
            onClick={handleBackToHome}
            className="w-full justify-start mb-4 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">Creator</p>
              <p className="text-xs text-gray-400">creator@example.com</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-red-600/20 to-pink-600/20 text-red-400 border border-red-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* API Status Indicators */}
        <div className="p-4 border-t border-gray-800">
          <p className="text-xs text-gray-400 mb-2">Service Status</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className={`w-2 h-2 rounded-full ${apiStatus.youtube ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-gray-400">YouTube API</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className={`w-2 h-2 rounded-full ${apiStatus.openai ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-gray-400">AI Services</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className={`w-2 h-2 rounded-full ${apiStatus.github ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-gray-400">GitHub</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Creator Workspace
              </h1>
              <p className="text-sm text-gray-400">Build amazing websites from your YouTube channel</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-red-600/20 to-pink-600/20 text-red-300 border-red-600/30">
                Creator Plan
              </Badge>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default UserPortal;
