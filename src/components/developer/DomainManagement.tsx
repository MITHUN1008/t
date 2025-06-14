
import React from 'react';
import { Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DomainManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Domain Management</h2>
        <p className="text-gray-400">Manage custom domains and DNS settings</p>
      </div>
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-400" />
            Domain Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Globe className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <p className="text-gray-400">Domain management interface</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainManagement;
