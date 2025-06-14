
import React, { useState } from 'react';
import { 
  BarChart3, Users, CheckCircle, Key, Database, Terminal, Activity, 
  Youtube, Globe, Shield, Settings, Mail, CreditCard, Webhook, 
  HardDrive, FileText, Folder, User, LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import all page components
import OverviewDashboard from '@/components/developer/OverviewDashboard';
import UserManagement from '@/components/developer/UserManagement';
import ProjectApproval from '@/components/developer/ProjectApproval';
import ApiKeyManagement from '@/components/developer/ApiKeyManagement';
import DatabaseManagement from '@/components/developer/DatabaseManagement';
import QueryRunner from '@/components/developer/QueryRunner';
import Analytics from '@/components/developer/Analytics';
import ConfigAnalytics from '@/components/developer/ConfigAnalytics';
import YouTubeApiSettings from '@/components/developer/YouTubeApiSettings';
import Deployments from '@/components/developer/Deployments';
import SecuritySettings from '@/components/developer/SecuritySettings';
import SystemSettings from '@/components/developer/SystemSettings';
import EmailConfiguration from '@/components/developer/EmailConfiguration';
import PaymentSettings from '@/components/developer/PaymentSettings';
import WebhookManagement from '@/components/developer/WebhookManagement';
import DomainManagement from '@/components/developer/DomainManagement';
import SystemMonitoring from '@/components/developer/SystemMonitoring';
import BackupManagement from '@/components/developer/BackupManagement';
import AuditLogs from '@/components/developer/AuditLogs';
import FileManager from '@/components/developer/FileManager';

const menuItems = [
  { id: 'overview', label: 'Overview', icon: BarChart3, component: OverviewDashboard },
  { id: 'users', label: 'User Management', icon: Users, component: UserManagement },
  { id: 'projects', label: 'Project Approval', icon: CheckCircle, component: ProjectApproval },
  { id: 'api', label: 'API Keys', icon: Key, component: ApiKeyManagement },
  { id: 'database', label: 'Database', icon: Database, component: DatabaseManagement },
  { id: 'query', label: 'Query Runner', icon: Terminal, component: QueryRunner },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, component: Analytics },
  { id: 'config-analytics', label: 'Config Analytics', icon: Activity, component: ConfigAnalytics },
  { id: 'youtube', label: 'YouTube API', icon: Youtube, component: YouTubeApiSettings },
  { id: 'deployments', label: 'Deployments', icon: Globe, component: Deployments },
  { id: 'security', label: 'Security', icon: Shield, component: SecuritySettings },
  { id: 'system', label: 'System Settings', icon: Settings, component: SystemSettings },
  { id: 'email', label: 'Email Config', icon: Mail, component: EmailConfiguration },
  { id: 'payments', label: 'Payments', icon: CreditCard, component: PaymentSettings },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook, component: WebhookManagement },
  { id: 'domains', label: 'Domains', icon: Globe, component: DomainManagement },
  { id: 'monitoring', label: 'Monitoring', icon: HardDrive, component: SystemMonitoring },
  { id: 'backups', label: 'Backups', icon: HardDrive, component: BackupManagement },
  { id: 'audit', label: 'Audit Logs', icon: FileText, component: AuditLogs },
  { id: 'files', label: 'File Manager', icon: Folder, component: FileManager }
];

const DeveloperPortal = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const displayName = 'Admin User'; // This would come from auth context

  const ActiveComponent = menuItems.find(item => item.id === activeTab)?.component || OverviewDashboard;

  const handleLogout = () => {
    // Logout logic would go here
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-noise opacity-20 pointer-events-none z-0" />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-black/90 border-r border-gray-800 z-10">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white mb-1">AI Developer Portal</h2>
          <p className="text-sm text-gray-400">Enterprise Dashboard</p>
        </div>
        
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-100px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  isActive 
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm relative z-10">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">AI Developer Portal</h1>
              <p className="text-sm text-gray-400">Welcome back, {displayName}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                <Shield size={14} className="mr-1" />
                Developer
              </Badge>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 relative z-10">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
};

export default DeveloperPortal;
