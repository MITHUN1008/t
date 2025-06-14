
import React from 'react';
import { Webhook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WebhookManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Webhook Management</h2>
        <p className="text-gray-400">Configure and manage webhook endpoints</p>
      </div>
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Webhook className="h-5 w-5 text-purple-400" />
            Webhook Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Webhook className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <p className="text-gray-400">Webhook management interface</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebhookManagement;
