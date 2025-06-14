
import React from 'react';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EmailConfiguration = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Email Configuration</h2>
        <p className="text-gray-400">Configure email services and templates</p>
      </div>
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-400" />
            Email Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <p className="text-gray-400">Email configuration interface</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfiguration;
