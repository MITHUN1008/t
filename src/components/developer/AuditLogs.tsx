
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AuditLogs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Audit Logs</h2>
        <p className="text-gray-400">Track system activity and security events</p>
      </div>
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-yellow-400" />
            Activity Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-gray-400">Audit log tracking interface</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
