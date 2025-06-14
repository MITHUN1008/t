
import React, { useState } from 'react';
import { Terminal, Play, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const QueryRunner = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const executeQuery = async () => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a SQL query",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const { data, error } = await supabase.rpc('execute_sql', { sql_query: query });
      
      if (error) {
        setError(error.message);
        toast({
          title: "Query Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        // Check if the result contains an error
        if (data && typeof data === 'object' && 'error' in data) {
          setError(data.error);
          toast({
            title: "SQL Error",
            description: data.error,
            variant: "destructive"
          });
        } else {
          setResults(data);
          toast({
            title: "Success",
            description: "Query executed successfully"
          });
        }
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to execute query",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderResults = () => {
    if (!results) return null;

    if (Array.isArray(results) && results.length > 0) {
      const columns = Object.keys(results[0]);
      
      return (
        <div className="overflow-auto max-h-96">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column} className="text-gray-300">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column} className="text-gray-300">
                      {typeof row[column] === 'object' 
                        ? JSON.stringify(row[column]) 
                        : String(row[column] || '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    } else if (Array.isArray(results) && results.length === 0) {
      return (
        <div className="text-center py-8">
          <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <p className="text-gray-400">Query executed successfully - No rows returned</p>
        </div>
      );
    } else {
      return (
        <div className="text-center py-8">
          <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <p className="text-gray-400">Query executed successfully</p>
          <pre className="text-sm text-gray-300 mt-2">{JSON.stringify(results, null, 2)}</pre>
        </div>
      );
    }
  };

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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SELECT * FROM system_status;"
            className="bg-black/30 border-gray-700 text-white font-mono min-h-[200px]"
          />
          <Button 
            onClick={executeQuery}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="h-4 w-4 mr-2" />
            {isLoading ? 'Executing...' : 'Execute Query'}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Query Results</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="flex items-center gap-2 text-red-400 mb-4">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}
          
          {results ? renderResults() : (
            <div className="text-center py-12">
              <Terminal className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Execute a query to see results here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QueryRunner;
