
import React, { useState, useEffect } from 'react';
import { Github, Plus, Trash2, Eye, EyeOff, Copy, ExternalLink, GitBranch } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GitHubToken {
  id: string;
  name: string;
  token: string;
  username?: string;
  repo_name?: string;
  repo_url?: string;
  enabled: boolean;
  commits_count: number;
  last_commit?: string;
  created_at: string;
}

const GitHubManagement = () => {
  const [tokens, setTokens] = useState<GitHubToken[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleTokens, setVisibleTokens] = useState<Set<string>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: '',
      token: '',
      username: '',
      repo_name: '',
      repo_url: ''
    }
  });

  useEffect(() => {
    fetchTokens();

    const channel = supabase
      .channel('github-tokens-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'github_tokens'
        },
        (payload) => {
          console.log('GitHub token changed:', payload);
          fetchTokens();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('github_tokens')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching GitHub tokens:', error);
        return;
      }

      setTokens(data || []);
    } catch (error) {
      console.error('Error in fetchTokens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: any) => {
    try {
      const { error } = await supabase
        .from('github_tokens')
        .insert({
          name: values.name,
          token: values.token,
          username: values.username || null,
          repo_name: values.repo_name || null,
          repo_url: values.repo_url || null
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add GitHub token",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "GitHub token added successfully"
      });
      
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding token:', error);
    }
  };

  const toggleTokenVisibility = (tokenId: string) => {
    const newVisible = new Set(visibleTokens);
    if (newVisible.has(tokenId)) {
      newVisible.delete(tokenId);
    } else {
      newVisible.add(tokenId);
    }
    setVisibleTokens(newVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Token copied to clipboard"
    });
  };

  const toggleEnabled = async (id: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('github_tokens')
        .update({ enabled })
        .eq('id', id);

      if (error) {
        console.error('Error updating token:', error);
        return;
      }

      toast({
        title: "Success",
        description: `Token ${enabled ? 'enabled' : 'disabled'}`
      });
    } catch (error) {
      console.error('Error toggling token:', error);
    }
  };

  const deleteToken = async (id: string) => {
    try {
      const { error } = await supabase
        .from('github_tokens')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting token:', error);
        return;
      }

      toast({
        title: "Success",
        description: "GitHub token deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">GitHub Management</h2>
          <p className="text-gray-400">Loading GitHub configuration...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">GitHub Management</h2>
          <p className="text-gray-400">Manage GitHub personal access tokens and repositories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gray-700 hover:bg-gray-600">
              <Plus className="h-4 w-4 mr-2" />
              Add GitHub Token
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Add GitHub Token</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Token Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Production Token" {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Personal Access Token</FormLabel>
                      <FormControl>
                        <Input placeholder="ghp_..." {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">GitHub Username (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="yourusername" {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="repo_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Repository Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="my-awesome-repo" {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="repo_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Repository URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/user/repo" {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-600">
                  Add Token
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {tokens.map((token) => (
          <Card key={token.id} className="bg-white/5 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center">
                    <Github className="h-6 w-6 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{token.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-gray-600/20 text-gray-300 border-gray-500/30">
                        GitHub PAT
                      </Badge>
                      {token.username && (
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          @{token.username}
                        </Badge>
                      )}
                      {token.repo_name && (
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          <GitBranch className="h-3 w-3 mr-1" />
                          {token.repo_name}
                        </Badge>
                      )}
                      <span className="text-gray-400 text-sm">
                        {token.commits_count} commits
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={token.enabled} 
                    onCheckedChange={(enabled) => toggleEnabled(token.id, enabled)}
                  />
                  {token.repo_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(token.repo_url, '_blank')}
                      className="border-gray-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleTokenVisibility(token.id)}
                    className="border-gray-700"
                  >
                    {visibleTokens.has(token.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(token.token)}
                    className="border-gray-700"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteToken(token.id)}
                    className="border-gray-700 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 p-3 bg-black/30 rounded-lg">
                <code className="text-gray-300 text-sm">
                  {visibleTokens.has(token.id) ? token.token : token.token.replace(/./g, '•')}
                </code>
              </div>
              <div className="mt-3 flex justify-between text-sm text-gray-400">
                <span>Created: {new Date(token.created_at).toLocaleDateString()}</span>
                {token.last_commit && (
                  <span>Last commit: {new Date(token.last_commit).toLocaleDateString()}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {tokens.length === 0 && (
          <Card className="bg-white/5 border-gray-800">
            <CardContent className="p-12 text-center">
              <Github className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No GitHub tokens configured</p>
              <p className="text-gray-500 text-sm mt-2">Add your first GitHub personal access token to get started</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GitHubManagement;
