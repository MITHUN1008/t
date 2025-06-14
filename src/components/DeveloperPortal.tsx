
import React, { useState } from 'react';
import { Key, BarChart3, Upload, Settings, Github, Youtube, Bot, Activity, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const DeveloperPortal = () => {
  const [apiKeys, setApiKeys] = useState({
    openrouter: '',
    youtube: '',
    github: ''
  });

  // Mock analytics data
  const analyticsData = {
    openrouter: { requests: 1247, status: 'active', usage: 78 },
    youtube: { requests: 892, status: 'active', usage: 45 },
    github: { requests: 234, status: 'inactive', usage: 12 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/20 border-b border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Developer Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-green-500 text-green-400">
              System Online
            </Badge>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-300">Total Requests</CardTitle>
              <Activity className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">2,373</div>
              <p className="text-xs text-gray-400">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-300">Active Users</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">156</div>
              <p className="text-xs text-gray-400">+8% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">Success Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">98.5%</div>
              <p className="text-xs text-gray-400">+0.3% from yesterday</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="api-keys" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
            <TabsTrigger value="api-keys" className="text-white data-[state=active]:bg-purple-600">
              API Keys
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-purple-600">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="upload" className="text-white data-[state=active]:bg-purple-600">
              Upload
            </TabsTrigger>
          </TabsList>

          {/* API Keys Tab */}
          <TabsContent value="api-keys" className="space-y-6">
            <div className="grid gap-6">
              {/* OpenRouter API */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-400" />
                    OpenRouter API Key
                    <Badge className={`ml-auto ${analyticsData.openrouter.status === 'active' ? 'bg-green-600' : 'bg-red-600'}`}>
                      {analyticsData.openrouter.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="openrouter-key">API Key</Label>
                    <Input
                      id="openrouter-key"
                      type="password"
                      placeholder="sk-or-..."
                      value={apiKeys.openrouter}
                      onChange={(e) => setApiKeys({...apiKeys, openrouter: e.target.value})}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Requests today: {analyticsData.openrouter.requests}
                    </span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Save Key
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* YouTube API */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Youtube className="w-5 h-5 text-red-400" />
                    YouTube API Key
                    <Badge className={`ml-auto ${analyticsData.youtube.status === 'active' ? 'bg-green-600' : 'bg-red-600'}`}>
                      {analyticsData.youtube.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="youtube-key">API Key</Label>
                    <Input
                      id="youtube-key"
                      type="password"
                      placeholder="AIza..."
                      value={apiKeys.youtube}
                      onChange={(e) => setApiKeys({...apiKeys, youtube: e.target.value})}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Requests today: {analyticsData.youtube.requests}
                    </span>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Save Key
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* GitHub Token */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-purple-400" />
                    GitHub Access Token
                    <Badge className={`ml-auto ${analyticsData.github.status === 'active' ? 'bg-green-600' : 'bg-red-600'}`}>
                      {analyticsData.github.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="github-token">Access Token</Label>
                    <Input
                      id="github-token"
                      type="password"
                      placeholder="ghp_..."
                      value={apiKeys.github}
                      onChange={(e) => setApiKeys({...apiKeys, github: e.target.value})}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Requests today: {analyticsData.github.requests}
                    </span>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Save Token
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle>API Usage Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-blue-400" />
                        OpenRouter
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{width: `${analyticsData.openrouter.usage}%`}} />
                        </div>
                        <span className="text-sm text-gray-400">{analyticsData.openrouter.usage}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Youtube className="w-4 h-4 text-red-400" />
                        YouTube
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div className="bg-red-400 h-2 rounded-full" style={{width: `${analyticsData.youtube.usage}%`}} />
                        </div>
                        <span className="text-sm text-gray-400">{analyticsData.youtube.usage}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Github className="w-4 h-4 text-purple-400" />
                        GitHub
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full" style={{width: `${analyticsData.github.usage}%`}} />
                        </div>
                        <span className="text-sm text-gray-400">{analyticsData.github.usage}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle>Real-time Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Activity className="w-8 h-8 text-green-400" />
                    </div>
                    <p className="text-gray-400">All systems operational</p>
                    <p className="text-sm text-green-400 mt-2">Last updated: Just now</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-green-400" />
                  File Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Drag and drop files here or click to browse</p>
                  <p className="text-sm text-gray-500">Supported formats: .json, .csv, .txt</p>
                  <Button className="mt-4 bg-green-600 hover:bg-green-700">
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DeveloperPortal;
