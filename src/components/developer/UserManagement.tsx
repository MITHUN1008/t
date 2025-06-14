
import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, User, Shield, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      avatar: 'JD',
      projects: 12,
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      avatar: 'JS',
      projects: 8,
      status: 'active',
      joinDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'user',
      avatar: 'MJ',
      projects: 5,
      status: 'inactive',
      joinDate: '2024-03-10'
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
      case 'user':
        return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600/20 text-green-300 border-green-500/30';
      case 'inactive':
        return 'bg-red-600/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">User Management</h2>
          <p className="text-gray-400">Manage user accounts and permissions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Full Name" className="bg-white/5 border-gray-700 text-white" />
              <Input placeholder="Email Address" className="bg-white/5 border-gray-700 text-white" />
              <Input placeholder="Role" className="bg-white/5 border-gray-700 text-white" />
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/5 border-gray-800">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-gray-700 text-white"
              />
            </div>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-white/5 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-300 font-semibold">{user.avatar}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{user.name}</h3>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:text-red-400">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Role:</span>
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.role === 'admin' ? <Shield className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                    {user.role}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Status:</span>
                  <Badge className={getStatusBadgeColor(user.status)}>
                    <UserCheck className="h-3 w-3 mr-1" />
                    {user.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Projects:</span>
                  <span className="text-white font-semibold">{user.projects}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Joined:</span>
                  <span className="text-gray-300 text-sm">{user.joinDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-white">{users.length}</p>
            <p className="text-gray-400 text-sm">Total Users</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{users.filter(u => u.status === 'active').length}</p>
            <p className="text-gray-400 text-sm">Active Users</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">{users.filter(u => u.role === 'admin').length}</p>
            <p className="text-gray-400 text-sm">Admins</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{users.reduce((acc, u) => acc + u.projects, 0)}</p>
            <p className="text-gray-400 text-sm">Total Projects</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
