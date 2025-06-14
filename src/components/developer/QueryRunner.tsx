
import React from 'react';
import { Terminal, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const QueryRunner = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Query Runner</h2>
        <p className="text-gray-400">Execute SQL queries directly on the database</p>
      </div>

      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            SQL Query Editor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="SELECT * FROM users WHERE created_at > '2024-01-01';"
            className="bg-black/30 border-gray-700 text-white font-mono min-h-[200px]"
          />
          <Button className="bg-green-600 hover:bg-green-700">
            <Play className="h-4 w-4 mr-2" />
            Execute Query
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Query Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Terminal className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Execute a query to see results here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QueryRunner;
