
import React from 'react';
import { HardDrive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BackupManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Backup Management</h2>
        <p className="text-gray-400">Manage data backups and restoration</p>
      </div>
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-green-400" />
            Backup Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <HardDrive className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <p className="text-gray-400">Backup management interface</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupManagement;
