
import React, { useState, useEffect } from 'react';
import { MessageCircle, Eye, Code, Settings, Monitor, Smartphone, User, BarChart3, Youtube, Home, ArrowLeft, Menu, X, Github, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

interface ChannelInfo {
  name: string;
  logo: string;
  url: string;
}

const UserPortal = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [previewMode, setPreviewMode] = useState<'live' | 'code'>('live');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
  const [channelUrl, setChannelUrl] = useState('');
  const [isFirstChat, setIsFirstChat] = useState(true);
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hi! Please share your YouTube channel URL to get started with building your website.' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Real-time API status simulation
  const [apiStatus, setApiStatus] = useState({
    youtube: true,
    openai: true,
    github: false,
    supabase: true
  });

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setApiStatus(prev => ({
        ...prev,
        github: Math.random() > 0.3, // Simulate occasional GitHub issues
        youtube: Math.random() > 0.1,
        openai: Math.random() > 0.05,
        supabase: Math.random() > 0.02
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mock function to extract channel info from URL
  const extractChannelInfo = async (url: string): Promise<ChannelInfo | null> => {
    // This would normally call YouTube API
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return {
        name: 'Tech Creator Channel',
        logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=face',
        url: url
      };
    }
    return null;
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      if (isFirstChat && !channelInfo) {
        // First message should be a YouTube URL
        const info = await extractChannelInfo(newMessage);
        if (info) {
          setChannelInfo(info);
          setChannelUrl(newMessage);
          setMessages([...messages, 
            { type: 'user', content: newMessage },
            { type: 'bot', content: `Great! I found your channel "${info.name}". Now describe your vision for the website and I'll create it for you!` }
          ]);
          setIsFirstChat(false);
        } else {
          setMessages([...messages, 
            { type: 'user', content: newMessage },
            { type: 'bot', content: 'Please provide a valid YouTube channel URL to get started.' }
          ]);
        }
      } else {
        setMessages([...messages, 
          { type: 'user', content: newMessage },
          { type: 'bot', content: 'Analyzing your request and generating your website... This will take just a moment!' }
        ]);
      }
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

  const StatusIndicator = ({ status, label }: { status: boolean; label: string }) => (
    <div className="flex items-center gap-1" title={label}>
      <div className={`w-2 h-2 rounded-full ${status ? 'bg-green-400 animate-pulse-dot' : 'bg-red-400'}`} />
      <span className="text-xs text-gray-400 hidden md:block">{label}</span>
    </div>
  );

  const renderMainContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-white/5 border-gray-800 hover:border-gray-700 transition-colors">
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
              
              <Card className="bg-white/5 border-gray-800 hover:border-gray-700 transition-colors">
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

              <Card className="bg-white/5 border-gray-800 hover:border-gray-700 transition-colors">
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

              <Card className="bg-white/5 border-gray-800 hover:border-gray-700 transition-colors">
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
              <Card className="bg-white/5 border-gray-800 hover:border-gray-700 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white hover:scale-105 transition-transform"
                    onClick={() => setActiveTab('youtube-builder')}
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    Create New Website
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:scale-105 transition-transform"
                    onClick={() => setActiveTab('projects')}
                  >
                    <Monitor className="w-4 h-4 mr-2" />
                    View Projects
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-800 hover:border-gray-700 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-dot"></div>
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
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                    {channelInfo ? (
                      <>
                        <img src={channelInfo.logo} alt="Channel" className="w-6 h-6 rounded-full" />
                        {channelInfo.name}
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 text-red-400" />
                        AI Website Builder
                      </>
                    )}
                  </h2>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Preview:</span>
                    <div className="flex items-center gap-1">
                      <Monitor className="w-4 h-4 text-gray-400" />
                      <Switch
                        checked={previewMode === 'code'}
                        onCheckedChange={(checked) => setPreviewMode(checked ? 'code' : 'live')}
                      />
                      <Code className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
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
                  {isFirstChat && !channelInfo ? (
                    <Input
                      placeholder="Enter your YouTube channel URL (e.g., https://youtube.com/@yourchannel)"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="bg-white/5 border-gray-700 text-white"
                    />
                  ) : (
                    <Textarea
                      placeholder="Describe your website idea or request changes..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="bg-white/5 border-gray-700 text-white resize-none"
                      rows={2}
                    />
                  )}
                  <Button 
                    onClick={handleSendMessage} 
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 hover:scale-105 transition-transform"
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
                    {previewMode === 'live' ? 'Live Preview' : 'Code Preview'}
                  </h2>
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
                        <p className="text-gray-400">Your website preview will appear here once you start building.</p>
                        {channelInfo && (
                          <div className="mt-4 p-4 bg-white/10 rounded-lg">
                            <p className="text-sm text-gray-300">Channel: {channelInfo.name}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-full bg-black border-gray-700">
                    <CardContent className="p-4 h-full">
                      <pre className="text-green-400 font-mono text-sm overflow-auto">
{`// Your generated code will appear here
import React from 'react';

const YourWebsite = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-red-600 text-white p-4">
        <h1>${channelInfo?.name || 'Your YouTube Website'}</h1>
      </header>
      <main className="container mx-auto p-8">
        {/* AI-generated content based on your channel */}
      </main>
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
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-black/90 border-r border-gray-800 flex flex-col transition-all duration-300`}>
        {/* Sidebar Toggle */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {!sidebarCollapsed && (
            <Button 
              variant="ghost" 
              onClick={handleBackToHome}
              className="text-gray-400 hover:text-white text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-400 hover:text-white"
          >
            {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>

        {/* User Profile Section */}
        {!sidebarCollapsed && (
          <div className="p-6 border-b border-gray-800">
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
        )}

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
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
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
              {/* Service Status */}
              <div className="flex items-center gap-3 px-3 py-1 bg-white/5 rounded-full border border-gray-800">
                <StatusIndicator status={apiStatus.youtube} label="YouTube" />
                <StatusIndicator status={apiStatus.openai} label="AI" />
                <StatusIndicator status={apiStatus.github} label="GitHub" />
                <StatusIndicator status={apiStatus.supabase} label="DB" />
              </div>

              {/* GitHub Button */}
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:scale-105 transition-transform">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>

              <Badge className="bg-gradient-to-r from-red-600/20 to-pink-600/20 text-red-300 border-red-600/30">
                Creator Plan
              </Badge>
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
