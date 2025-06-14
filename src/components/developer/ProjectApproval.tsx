
import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProjectApproval = () => {
  const [projects] = useState([
    {
      id: 1,
      name: 'E-commerce Platform',
      user: 'John Doe',
      description: 'A modern e-commerce platform with AI recommendations',
      status: 'pending',
      submitted: '2024-03-20',
      category: 'E-commerce'
    },
    {
      id: 2,
      name: 'AI Blog Generator',
      user: 'Jane Smith',
      description: 'Automated blog content generation using AI',
      status: 'approved',
      submitted: '2024-03-19',
      category: 'Content'
    },
    {
      id: 3,
      name: 'Data Visualization Tool',
      user: 'Mike Johnson',
      description: 'Interactive dashboard for data visualization',
      status: 'rejected',
      submitted: '2024-03-18',
      category: 'Analytics'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-600/20 text-green-300 border-green-500/30"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600/20 text-red-300 border-red-500/30"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Project Approval</h2>
          <p className="text-gray-400">Review and approve user project submissions</p>
        </div>
        <Button variant="outline" className="border-gray-700">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-white/5 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-semibold text-lg">{project.name}</h3>
                    {getStatusBadge(project.status)}
                  </div>
                  <p className="text-gray-400 mb-3">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>By: {project.user}</span>
                    <span>•</span>
                    <span>Category: {project.category}</span>
                    <span>•</span>
                    <span>Submitted: {project.submitted}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" className="border-gray-700">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {project.status === 'pending' && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectApproval;
