
import React from 'react';
import { BarChart3, TrendingUp, Users, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
        <p className="text-gray-400">Monitor usage metrics and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              <span className="text-xs text-green-400">+12%</span>
            </div>
            <div>
              <p className="text-lg font-bold text-white">15,234</p>
              <p className="text-xs text-gray-400">Total Requests</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-purple-400" />
              <span className="text-xs text-green-400">+8%</span>
            </div>
            <div>
              <p className="text-lg font-bold text-white">2,156</p>
              <p className="text-xs text-gray-400">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <span className="text-xs text-green-400">+25%</span>
            </div>
            <div>
              <p className="text-lg font-bold text-white">98.5%</p>
              <p className="text-xs text-gray-400">Success Rate</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              <span className="text-xs text-green-400">-5ms</span>
            </div>
            <div>
              <p className="text-lg font-bold text-white">142ms</p>
              <p className="text-xs text-gray-400">Avg Response</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-400">Analytics Chart Component</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
