
import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, MoreHorizontal, Shield, Mail, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  email_confirmed_at: string;
  role: string;
  user_metadata: any;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.auth.admin.listUsers();
      
      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      setUsers(data.users || []);
    } catch (error) {
      console.error('Error in fetchUsers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: string) => {
    try {
      let result;
      
      switch (action) {
        case 'delete':
          result = await supabase.auth.admin.deleteUser(userId);
          break;
        case 'invite':
          // Implementation for invite user
          break;
        default:
          return;
      }

      if (result?.error) {
        toast({
          title: "Error",
          description: `Failed to ${action} user`,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: `User ${action}d successfully`
      });
      
      fetchUsers();
    } catch (error) {
      console.error(`Error ${action} user:`, error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserStatus = (user: User) => {
    if (user.email_confirmed_at) {
      return { label: 'Active', color: 'bg-green-600/20 text-green-300 border-green-500/30' };
    }
    return { label: 'Pending', color: 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30' };
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">User Management</h2>
          <p className="text-gray-400">Loading users...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">User Management</h2>
          <p className="text-gray-400">Manage system users and their permissions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Mail className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{users.length}</p>
              <p className="text-xs text-gray-400">Total Users</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Shield className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{users.filter(u => u.email_confirmed_at).length}</p>
              <p className="text-xs text-gray-400">Active Users</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{users.filter(u => !u.email_confirmed_at).length}</p>
              <p className="text-xs text-gray-400">Pending Users</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{users.filter(u => {
                const lastSignIn = new Date(u.last_sign_in_at || 0);
                const today = new Date();
                const diffTime = Math.abs(today.getTime() - lastSignIn.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 7;
              }).length}</p>
              <p className="text-xs text-gray-400">Active This Week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/5 border-gray-800">
        <CardContent className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search users by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border-gray-700 text-white"
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <Button variant="outline" className="border-gray-700">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Users Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-300">User</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Created</TableHead>
                <TableHead className="text-gray-300">Last Sign In</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const status = getUserStatus(user);
                return (
                  <TableRow key={user.id} className="border-gray-800">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.email}</p>
                          <p className="text-gray-400 text-sm">{user.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={status.color}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-900 border-gray-800">
                          <DropdownMenuItem 
                            onClick={() => handleUserAction(user.id, 'delete')}
                            className="text-red-400 hover:text-red-300"
                          >
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No users found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
