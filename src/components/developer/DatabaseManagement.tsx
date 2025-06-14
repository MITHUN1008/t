
import React, { useState, useEffect } from 'react';
import { Database, Table as TableIcon, Columns, Key, Trash2, Plus, Edit, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DatabaseTable {
  table_name: string;
  table_schema: string;
  table_type: string;
}

interface TableColumn {
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string;
}

interface TableStats {
  table_name: string;
  row_count: number;
  size: string;
}

const DatabaseManagement = () => {
  const [tables, setTables] = useState<DatabaseTable[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [tableStats, setTableStats] = useState<TableStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTables();
    fetchTableStats();
  }, []);

  useEffect(() => {
    if (selectedTable) {
      fetchTableColumns(selectedTable);
    }
  }, [selectedTable]);

  const fetchTables = async () => {
    try {
      const { data, error } = await supabase.rpc('execute_sql', {
        sql_query: `
          SELECT table_name, table_schema, table_type 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          ORDER BY table_name
        `
      });

      if (error) {
        console.error('Error fetching tables:', error);
        return;
      }

      setTables(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error in fetchTables:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTableColumns = async (tableName: string) => {
    try {
      const { data, error } = await supabase.rpc('execute_sql', {
        sql_query: `
          SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns 
          WHERE table_schema = 'public' AND table_name = '${tableName}'
          ORDER BY ordinal_position
        `
      });

      if (error) {
        console.error('Error fetching columns:', error);
        return;
      }

      setColumns(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error in fetchTableColumns:', error);
    }
  };

  const fetchTableStats = async () => {
    try {
      const { data, error } = await supabase.rpc('execute_sql', {
        sql_query: `
          SELECT 
            schemaname as schema_name,
            tablename as table_name,
            n_tup_ins as inserts,
            n_tup_upd as updates,
            n_tup_del as deletes
          FROM pg_stat_user_tables 
          WHERE schemaname = 'public'
          ORDER BY tablename
        `
      });

      if (error) {
        console.error('Error fetching table stats:', error);
        return;
      }

      // Transform the data to match our interface
      const stats = Array.isArray(data) ? data.map(stat => ({
        table_name: stat.table_name,
        row_count: (stat.inserts || 0) + (stat.updates || 0) - (stat.deletes || 0),
        size: 'N/A'
      })) : [];

      setTableStats(stats);
    } catch (error) {
      console.error('Error in fetchTableStats:', error);
    }
  };

  const getDataTypeColor = (dataType: string) => {
    const colors = {
      'uuid': 'bg-purple-600/20 text-purple-300 border-purple-500/30',
      'text': 'bg-blue-600/20 text-blue-300 border-blue-500/30',
      'integer': 'bg-green-600/20 text-green-300 border-green-500/30',
      'boolean': 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30',
      'timestamp with time zone': 'bg-red-600/20 text-red-300 border-red-500/30',
      'jsonb': 'bg-cyan-600/20 text-cyan-300 border-cyan-500/30'
    };
    return colors[dataType as keyof typeof colors] || 'bg-gray-600/20 text-gray-300 border-gray-500/30';
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Database Management</h2>
          <p className="text-gray-400">Loading database information...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Database Management</h2>
        <p className="text-gray-400">Manage database tables, schemas, and structure</p>
      </div>

      {/* Database Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Database className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{tables.length}</p>
              <p className="text-xs text-gray-400">Total Tables</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Columns className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{columns.length}</p>
              <p className="text-xs text-gray-400">Columns in Selected</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Key className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{columns.filter(c => c.column_name.includes('id')).length}</p>
              <p className="text-xs text-gray-400">Primary Keys</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TableIcon className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{tableStats.reduce((sum, stat) => sum + stat.row_count, 0)}</p>
              <p className="text-xs text-gray-400">Total Rows</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tables" className="space-y-6">
        <TabsList className="bg-white/5 border-gray-800">
          <TabsTrigger value="tables" className="data-[state=active]:bg-white/10">Tables</TabsTrigger>
          <TabsTrigger value="schema" className="data-[state=active]:bg-white/10">Schema</TabsTrigger>
          <TabsTrigger value="stats" className="data-[state=active]:bg-white/10">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="tables">
          <Card className="bg-white/5 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TableIcon className="h-5 w-5" />
                Database Tables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-300">Table Name</TableHead>
                    <TableHead className="text-gray-300">Schema</TableHead>
                    <TableHead className="text-gray-300">Type</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.map((table) => (
                    <TableRow key={table.table_name} className="border-gray-800">
                      <TableCell className="text-white font-medium">{table.table_name}</TableCell>
                      <TableCell className="text-gray-300">{table.table_schema}</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                          {table.table_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700"
                            onClick={() => setSelectedTable(table.table_name)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schema">
          <Card className="bg-white/5 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Columns className="h-5 w-5" />
                Table Schema: {selectedTable || 'Select a table'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTable ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-300">Column Name</TableHead>
                      <TableHead className="text-gray-300">Data Type</TableHead>
                      <TableHead className="text-gray-300">Nullable</TableHead>
                      <TableHead className="text-gray-300">Default</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {columns.map((column) => (
                      <TableRow key={column.column_name} className="border-gray-800">
                        <TableCell className="text-white font-medium">
                          <div className="flex items-center gap-2">
                            {column.column_name.includes('id') && <Key className="h-4 w-4 text-yellow-400" />}
                            {column.column_name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getDataTypeColor(column.data_type)}>
                            {column.data_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {column.is_nullable === 'YES' ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {column.column_default || 'None'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <TableIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Select a table to view its schema</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card className="bg-white/5 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-5 w-5" />
                Table Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-300">Table Name</TableHead>
                    <TableHead className="text-gray-300">Row Count</TableHead>
                    <TableHead className="text-gray-300">Size</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableStats.map((stat) => (
                    <TableRow key={stat.table_name} className="border-gray-800">
                      <TableCell className="text-white font-medium">{stat.table_name}</TableCell>
                      <TableCell className="text-gray-300">{stat.row_count.toLocaleString()}</TableCell>
                      <TableCell className="text-gray-300">{stat.size}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseManagement;
