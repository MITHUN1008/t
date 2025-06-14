
import React from 'react';
import { Database, Download, RefreshCw, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DatabaseManagement = () => {
  const tables = [
    { name: 'users', records: 1254, size: '2.4 MB', lastUpdated: '2024-03-20 14:30' },
    { name: 'projects', records: 856, size: '1.8 MB', lastUpdated: '2024-03-20 12:15' },
    { name: 'api_keys', records: 45, size: '120 KB', lastUpdated: '2024-03-19 16:45' },
    { name: 'deployments', records: 234, size: '890 KB', lastUpdated: '2024-03-20 09:20' },
    { name: 'api_usage_logs', records: 15623, size: '12.5 MB', lastUpdated: '2024-03-20 14:35' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Database Management</h2>
          <p className="text-gray-400">Monitor and manage database tables</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Table
        </Button>
      </div>

      <div className="grid gap-4">
        {tables.map((table, index) => (
          <Card key={index} className="bg-white/5 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Database className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{table.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{table.records.toLocaleString()} records</span>
                      <span>•</span>
                      <span>{table.size}</span>
                      <span>•</span>
                      <span>Updated: {table.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-gray-700">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DatabaseManagement;
