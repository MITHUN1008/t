
import React from 'react';
import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ConfigAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Config Analytics</h2>
        <p className="text-gray-400">System configuration monitoring and analysis</p>
      </div>
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Configuration Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <p className="text-gray-400">Configuration analytics dashboard</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigAnalytics;
