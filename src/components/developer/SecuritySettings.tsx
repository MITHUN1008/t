
import React from 'react';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Security Settings</h2>
        <p className="text-gray-400">Configure security and access controls</p>
      </div>
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            Security Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <p className="text-gray-400">Security settings and policies</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
