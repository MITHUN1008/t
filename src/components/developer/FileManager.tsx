
import React from 'react';
import { Folder } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FileManager = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">File Manager</h2>
        <p className="text-gray-400">Manage files and storage</p>
      </div>
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Folder className="h-5 w-5 text-orange-400" />
            File Storage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Folder className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <p className="text-gray-400">File management interface</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileManager;
