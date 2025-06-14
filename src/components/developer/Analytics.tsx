
import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Activity, Eye, Clock, Globe, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalApiCalls: 0,
    avgResponseTime: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for charts
  const usageData = [
    { name: 'Mon', users: 120, projects: 8, apiCalls: 450 },
    { name: 'Tue', users: 150, projects: 12, apiCalls: 580 },
    { name: 'Wed', users: 180, projects: 15, apiCalls: 720 },
    { name: 'Thu', users: 140, projects: 10, apiCalls: 520 },
    { name: 'Fri', users: 200, projects: 18, apiCalls: 850 },
    { name: 'Sat', users: 170, projects: 14, apiCalls: 680 },
    { name: 'Sun', users: 130, projects: 9, apiCalls: 420 }
  ];

  const deviceData = [
    { name: 'Desktop', value: 65, color: '#3b82f6' },
    { name: 'Mobile', value: 30, color: '#10b981' },
    { name: 'Tablet', value: 5, color: '#f59e0b' }
  ];

  const topProjects = [
    { name: 'Tech Channel Website', users: 1240, views: 15600 },
    { name: 'Gaming Hub', users: 980, views: 12300 },
    { name: 'Cooking Show Site', users: 750, views: 9800 },
    { name: 'Music Channel', users: 640, views: 8200 },
    { name: 'Travel Blog', users: 520, views: 6900 }
  ];

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch real data from Supabase
      const [usersResult, projectsResult, systemStatusResult] = await Promise.all([
        supabase.rpc('execute_sql', { sql_query: 'SELECT COUNT(*) as count FROM auth.users' }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('system_status').select('*')
      ]);

      const userCount = Array.isArray(usersResult.data) && usersResult.data[0]?.count || 0;
      const projectCount = projectsResult.count || 0;

      setAnalytics({
        totalUsers: userCount,
        totalProjects: projectCount,
        totalApiCalls: Math.floor(Math.random() * 10000) + 5000, // Mock for now
        avgResponseTime: Math.floor(Math.random() * 200) + 50 // Mock for now
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
          <p className="text-gray-400">Loading analytics data...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
        <p className="text-gray-400">Monitor platform usage and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-blue-400" />
              <Badge className="bg-green-600/20 text-green-300 border-green-500/30">+12%</Badge>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{analytics.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Total Users</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Globe className="h-5 w-5 text-green-400" />
              <Badge className="bg-green-600/20 text-green-300 border-green-500/30">+8%</Badge>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{analytics.totalProjects.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Total Projects</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-5 w-5 text-purple-400" />
              <Badge className="bg-green-600/20 text-green-300 border-green-500/30">+25%</Badge>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{analytics.totalApiCalls.toLocaleString()}</p>
              <p className="text-xs text-gray-400">API Calls</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <Badge className="bg-green-600/20 text-green-300 border-green-500/30">-5%</Badge>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{analytics.avgResponseTime}ms</p>
              <p className="text-xs text-gray-400">Avg Response Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Usage Trends */}
        <Card className="bg-white/5 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weekly Usage Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="projects" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Usage */}
        <Card className="bg-white/5 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Device Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {deviceData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-300 text-sm">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Usage Chart */}
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Daily API Calls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="apiCalls" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Projects */}
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Top Performing Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{project.name}</p>
                    <p className="text-gray-400 text-sm">{project.users} users</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{project.views.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">views</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
