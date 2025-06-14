
import React from 'react';
import { HardDrive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SystemMonitoring = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">System Monitoring</h2>
        <p className="text-gray-400">Monitor system health and performance</p>
      </div>
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-cyan-400" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <HardDrive className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
            <p className="text-gray-400">System monitoring dashboard</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitoring;
