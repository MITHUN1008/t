
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, DollarSign, Clock, CheckCircle, AlertTriangle,
  Key, Database, Youtube, Globe, Settings, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const OverviewDashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 45672,
    activeUsers: 1234,
    revenueToday: 2850,
    avgResponseTime: 145,
    successRate: 99.8,
    errorRate: 0.2
  });

  // Simulate real-time updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 10),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
        revenueToday: prev.revenueToday + Math.floor(Math.random() * 50),
        avgResponseTime: prev.avgResponseTime + Math.floor(Math.random() * 20) - 10,
        successRate: Math.max(99, Math.min(100, prev.successRate + (Math.random() - 0.5) * 0.1)),
        errorRate: Math.max(0, Math.min(1, prev.errorRate + (Math.random() - 0.5) * 0.1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: 'Total API Requests',
      value: stats.totalRequests.toLocaleString(),
      change: '+18%',
      icon: BarChart3,
      color: 'text-purple-400',
      changeColor: 'text-green-400'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      change: '+12%',
      icon: Users,
      color: 'text-blue-400',
      changeColor: 'text-green-400'
    },
    {
      title: 'Revenue Today',
      value: `$${stats.revenueToday.toLocaleString()}`,
      change: '+25%',
      icon: DollarSign,
      color: 'text-green-400',
      changeColor: 'text-green-400'
    },
    {
      title: 'Avg Response Time',
      value: `${stats.avgResponseTime}ms`,
      change: '-8%',
      icon: Clock,
      color: 'text-cyan-400',
      changeColor: 'text-green-400'
    },
    {
      title: 'Success Rate',
      value: `${stats.successRate.toFixed(1)}%`,
      change: '+0.2%',
      icon: CheckCircle,
      color: 'text-emerald-400',
      changeColor: 'text-green-400'
    },
    {
      title: 'Error Rate',
      value: `${stats.errorRate.toFixed(1)}%`,
      change: '-0.1%',
      icon: AlertTriangle,
      color: 'text-red-400',
      changeColor: 'text-green-400'
    }
  ];

  const quickActions = [
    { title: 'Project Approval', icon: CheckCircle, color: 'text-green-400' },
    { title: 'API Keys', icon: Key, color: 'text-purple-400' },
    { title: 'Database', icon: Database, color: 'text-blue-400' },
    { title: 'YouTube API', icon: Youtube, color: 'text-red-400' },
    { title: 'Deployments', icon: Globe, color: 'text-cyan-400' },
    { title: 'Config Analytics', icon: Activity, color: 'text-yellow-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-gray-400">Monitor your system performance and key metrics</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white/5 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                  <span className={`text-xs ${stat.changeColor}`}>{stat.change}</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-16 flex flex-col gap-2 bg-white/5 border-gray-700 hover:bg-white/10"
                >
                  <Icon className={`h-5 w-5 ${action.color}`} />
                  <span className="text-xs text-gray-300">{action.title}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Real-time API Usage Analytics */}
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Real-time API Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-400">API Usage Chart Component</p>
              <p className="text-sm text-gray-500">Live analytics visualization would be here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Health Status */}
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">System Health Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">API Gateway</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Database</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">File Storage</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Auth Service</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewDashboard;
