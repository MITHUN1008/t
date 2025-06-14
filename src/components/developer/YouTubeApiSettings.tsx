
import React from 'react';
import { Youtube } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const YouTubeApiSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">YouTube API Settings</h2>
        <p className="text-gray-400">Manage YouTube API integration and quotas</p>
      </div>
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Youtube className="h-5 w-5 text-red-400" />
            YouTube API Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Youtube className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-gray-400">YouTube API management interface</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeApiSettings;
