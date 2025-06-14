
import React from 'react';
import { Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Deployments = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Deployments</h2>
        <p className="text-gray-400">Manage deployments and hosting</p>
      </div>
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="h-5 w-5 text-cyan-400" />
            Deployment Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Globe className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
            <p className="text-gray-400">Deployment tracking and management</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deployments;
