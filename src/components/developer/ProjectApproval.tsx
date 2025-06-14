
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Eye, MessageSquare, User, Calendar, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  channel_name: string;
  channel_url: string;
  website_url: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const ProjectApproval = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [reviewComment, setReviewComment] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();

    const channel = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        (payload) => {
          console.log('Project changed:', payload);
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Error in fetchProjects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProjectStatus = async (projectId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update project status",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: `Project ${newStatus} successfully`
      });
      
      setSelectedProject(null);
      setReviewComment('');
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600/20 text-green-300 border-green-500/30">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600/20 text-red-300 border-red-500/30">Rejected</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30">Draft</Badge>;
      case 'review':
        return <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">Under Review</Badge>;
      default:
        return <Badge className="bg-gray-600/20 text-gray-300 border-gray-500/30">Unknown</Badge>;
    }
  };

  const stats = {
    total: projects.length,
    pending: projects.filter(p => p.status === 'review' || p.status === 'draft').length,
    approved: projects.filter(p => p.status === 'approved').length,
    rejected: projects.filter(p => p.status === 'rejected').length
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Project Approval</h2>
          <p className="text-gray-400">Loading projects...</p>
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
        <h2 className="text-3xl font-bold text-white mb-2">Project Approval</h2>
        <p className="text-gray-400">Review and approve user projects</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Globe className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{stats.total}</p>
              <p className="text-xs text-gray-400">Total Projects</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{stats.pending}</p>
              <p className="text-xs text-gray-400">Pending Review</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{stats.approved}</p>
              <p className="text-xs text-gray-400">Approved</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{stats.rejected}</p>
              <p className="text-xs text-gray-400">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card className="bg-white/5 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Project Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-300">Project</TableHead>
                <TableHead className="text-gray-300">Channel</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Created</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="border-gray-800">
                  <TableCell>
                    <div>
                      <p className="text-white font-medium">{project.name}</p>
                      <p className="text-gray-400 text-sm">{project.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-white">{project.channel_name || 'N/A'}</p>
                      {project.channel_url && (
                        <a href={project.channel_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline">
                          View Channel
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(project.status)}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(project.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-gray-700"
                            onClick={() => setSelectedProject(project)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">Review Project: {project.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-white font-semibold mb-2">Project Details</h4>
                              <div className="space-y-2 text-sm">
                                <p className="text-gray-300"><span className="text-gray-400">Name:</span> {project.name}</p>
                                <p className="text-gray-300"><span className="text-gray-400">Description:</span> {project.description}</p>
                                <p className="text-gray-300"><span className="text-gray-400">Channel:</span> {project.channel_name}</p>
                                {project.channel_url && (
                                  <p className="text-gray-300">
                                    <span className="text-gray-400">Channel URL:</span> 
                                    <a href={project.channel_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 ml-1 hover:underline">
                                      {project.channel_url}
                                    </a>
                                  </p>
                                )}
                                {project.website_url && (
                                  <p className="text-gray-300">
                                    <span className="text-gray-400">Website:</span> 
                                    <a href={project.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 ml-1 hover:underline">
                                      {project.website_url}
                                    </a>
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-white font-semibold mb-2">Review Comments</h4>
                              <Textarea
                                placeholder="Add your review comments..."
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                                className="bg-white/5 border-gray-700 text-white"
                              />
                            </div>
                            
                            <div className="flex gap-3">
                              <Button 
                                onClick={() => updateProjectStatus(project.id, 'approved')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button 
                                onClick={() => updateProjectStatus(project.id, 'rejected')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No projects found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectApproval;
