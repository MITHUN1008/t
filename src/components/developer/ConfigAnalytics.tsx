
import React, { useState, useEffect } from 'react';
import { Activity, Youtube, Bot, Globe, Github, TrendingUp, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface ApiStats {
  youtube_count: number;
  ai_apis_count: number;
  netlify_count: number;
  github_count: number;
}

interface UsageData {
  name: string;
  value: number;
  color: string;
}

const ConfigAnalytics = () => {
  const [apiStats, setApiStats] = useState<ApiStats>({
    youtube_count: 0,
    ai_apis_count: 0,
    netlify_count: 0,
    github_count: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApiStats();

    // Subscribe to real-time updates for all API tables
    const channels = [
      supabase.channel('youtube-stats').on('postgres_changes', { event: '*', schema: 'public', table: 'youtube_api_keys' }, fetchApiStats),
      supabase.channel('ai-stats').on('postgres_changes', { event: '*', schema: 'public', table: 'ai_api_keys' }, fetchApiStats),
      supabase.channel('netlify-stats').on('postgres_changes', { event: '*', schema: 'public', table: 'netlify_api_keys' }, fetchApiStats),
      supabase.channel('github-stats').on('postgres_changes', { event: '*', schema: 'public', table: 'github_tokens' }, fetchApiStats)
    ];

    channels.forEach(channel => channel.subscribe());

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, []);

  const fetchApiStats = async () => {
    try {
      const [youtubeRes, aiRes, netlifyRes, githubRes] = await Promise.all([
        supabase.from('youtube_api_keys').select('id', { count: 'exact' }),
        supabase.from('ai_api_keys').select('id', { count: 'exact' }),
        supabase.from('netlify_api_keys').select('id', { count: 'exact' }),
        supabase.from('github_tokens').select('id', { count: 'exact' })
      ]);

      setApiStats({
        youtube_count: youtubeRes.count || 0,
        ai_apis_count: aiRes.count || 0,
        netlify_count: netlifyRes.count || 0,
        github_count: githubRes.count || 0
      });
    } catch (error) {
      console.error('Error fetching API stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const pieData: UsageData[] = [
    { name: 'YouTube APIs', value: apiStats.youtube_count, color: '#ef4444' },
    { name: 'AI APIs', value: apiStats.ai_apis_count, color: '#8b5cf6' },
    { name: 'Netlify APIs', value: apiStats.netlify_count, color: '#06b6d4' },
    { name: 'GitHub Tokens', value: apiStats.github_count, color: '#6b7280' }
  ];

  const barData = [
    { name: 'YouTube', count: apiStats.youtube_count, color: '#ef4444' },
    { name: 'AI APIs', count: apiStats.ai_apis_count, color: '#8b5cf6' },
    { name: 'Netlify', count: apiStats.netlify_count, color: '#06b6d4' },
    { name: 'GitHub', count: apiStats.github_count, color: '#6b7280' }
  ];

  const mockTrendData = [
    { day: 'Mon', apis: 2, usage: 45 },
    { day: 'Tue', apis: 3, usage: 67 },
    { day: 'Wed', apis: 4, usage: 89 },
    { day: 'Thu', apis: 6, usage: 123 },
    { day: 'Fri', apis: 8, usage: 156 },
    { day: 'Sat', apis: 7, usage: 134 },
    { day: 'Sun', apis: 9, usage: 178 }
  ];

  const totalApis = apiStats.youtube_count + apiStats.ai_apis_count + apiStats.netlify_count + apiStats.github_count;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Config Analytics</h2>
          <p className="text-gray-400">Loading configuration analytics...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Config Analytics</h2>
        <p className="text-gray-400">Real-time API configuration monitoring and analysis</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Youtube className="h-5 w-5 text-red-400" />
              <span className="text-xs text-red-400">YouTube</span>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{apiStats.youtube_count}</p>
              <p className="text-xs text-gray-400">API Keys</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Bot className="h-5 w-5 text-purple-400" />
              <span className="text-xs text-purple-400">AI APIs</span>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{apiStats.ai_apis_count}</p>
              <p className="text-xs text-gray-400">Providers</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Globe className="h-5 w-5 text-cyan-400" />
              <span className="text-xs text-cyan-400">Netlify</span>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{apiStats.netlify_count}</p>
              <p className="text-xs text-gray-400">Deployments</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Github className="h-5 w-5 text-gray-400" />
              <span className="text-xs text-gray-400">GitHub</span>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{apiStats.github_count}</p>
              <p className="text-xs text-gray-400">Tokens</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* API Distribution Pie Chart */}
        <Card className="bg-white/5 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-400" />
              API Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {totalApis > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-gray-400">
                No API keys configured yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* API Count Bar Chart */}
        <Card className="bg-white/5 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              API Counts by Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Usage Trend Line Chart */}
        <Card className="bg-white/5 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              API Usage Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="usage" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Configuration Status */}
        <Card className="bg-white/5 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-yellow-400" />
              Configuration Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Youtube className="h-4 w-4 text-red-400" />
                  <span className="text-gray-300">YouTube Integration</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${apiStats.youtube_count > 0 ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              </div>
              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bot className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300">AI Services</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${apiStats.ai_apis_count > 0 ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              </div>
              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-cyan-400" />
                  <span className="text-gray-300">Deployment Ready</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${apiStats.netlify_count > 0 ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              </div>
              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Github className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">Version Control</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${apiStats.github_count > 0 ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfigAnalytics;
