
import React, { useState, useEffect } from 'react';
import { HardDrive, Activity, Zap, Database, Wifi, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';

interface SystemStatus {
  service: string;
  status: boolean;
  last_checked: string;
  error_message?: string;
  response_time?: number;
}

const SystemMonitoring = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSystemStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('system_status')
          .select('*')
          .order('service');

        if (error) {
          console.error('Error fetching system status:', error);
          return;
        }

        setSystemStatus(data || []);
      } catch (error) {
        console.error('Error in fetchSystemStatus:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSystemStatus();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('system-monitoring-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'system_status'
        },
        (payload) => {
          console.log('System status changed:', payload);
          fetchSystemStatus(); // Refresh the entire list
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getServiceIcon = (service: string) => {
    switch (service.toLowerCase()) {
      case 'youtube':
        return '🎥';
      case 'openai':
        return '🤖';
      case 'github':
        return '📦';
      case 'supabase':
        return '⚡';
      default:
        return '🔧';
    }
  };

  const getServiceColor = (status: boolean) => {
    return status ? 'text-green-400' : 'text-red-400';
  };

  const getServiceBadge = (status: boolean) => {
    return status ? (
      <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
        <CheckCircle className="h-3 w-3 mr-1" />
        Online
      </Badge>
    ) : (
      <Badge className="bg-red-600/20 text-red-300 border-red-500/30">
        <AlertCircle className="h-3 w-3 mr-1" />
        Offline
      </Badge>
    );
  };

  const calculateUptime = () => {
    const onlineServices = systemStatus.filter(s => s.status).length;
    const totalServices = systemStatus.length;
    return totalServices > 0 ? (onlineServices / totalServices) * 100 : 0;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">System Monitoring</h2>
          <p className="text-gray-400">Loading system health and performance data...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">System Monitoring</h2>
        <p className="text-gray-400">Monitor system health and performance in real-time</p>
      </div>

      {/* Overall System Health */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-8 w-8 text-cyan-400" />
              <Badge className="bg-cyan-600/20 text-cyan-300 border-cyan-500/30">
                Real-time
              </Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{calculateUptime().toFixed(1)}%</p>
              <p className="text-gray-400">System Uptime</p>
              <Progress value={calculateUptime()} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="h-8 w-8 text-yellow-400" />
              <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30">
                Active
              </Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{systemStatus.filter(s => s.status).length}/{systemStatus.length}</p>
              <p className="text-gray-400">Services Online</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Database className="h-8 w-8 text-purple-400" />
              <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                Connected
              </Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {systemStatus.find(s => s.service === 'supabase')?.response_time || '<1'}ms
              </p>
              <p className="text-gray-400">Database Latency</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Status Grid */}
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-cyan-400" />
            Service Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {systemStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{getServiceIcon(service.service)}</div>
                  <div>
                    <h4 className="text-white font-semibold capitalize">{service.service}</h4>
                    <p className="text-gray-400 text-sm">
                      Last checked: {new Date(service.last_checked).toLocaleTimeString()}
                    </p>
                    {service.error_message && (
                      <p className="text-red-400 text-xs mt-1">{service.error_message}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {service.response_time && (
                    <span className="text-gray-400 text-sm">{service.response_time}ms</span>
                  )}
                  {getServiceBadge(service.status)}
                  <div className={`w-3 h-3 rounded-full ${service.status ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional System Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Network Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">API Gateway</span>
                </div>
                <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">CDN</span>
                </div>
                <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">Load Balancer</span>
                </div>
                <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                  Operational
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">All systems operational</span>
                <span className="text-xs text-gray-500 ml-auto">Now</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Database maintenance completed</span>
                <span className="text-xs text-gray-500 ml-auto">2h ago</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">API rate limits updated</span>
                <span className="text-xs text-gray-500 ml-auto">6h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemMonitoring;
