
import React, { useState, useEffect } from 'react';
import { Youtube, Plus, Edit, Trash2, Eye, EyeOff, Copy, Key } from 'lucide-react';
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

interface YouTubeApiKey {
  id: string;
  name: string;
  api_key: string;
  enabled: boolean;
  quota_used: number;
  quota_limit: number;
  created_at: string;
  updated_at: string;
}

const YouTubeApiSettings = () => {
  const [apiKeys, setApiKeys] = useState<YouTubeApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: '',
      api_key: '',
      quota_limit: 10000
    }
  });

  useEffect(() => {
    fetchApiKeys();

    const channel = supabase
      .channel('youtube-api-keys-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'youtube_api_keys'
        },
        (payload) => {
          console.log('YouTube API key changed:', payload);
          fetchApiKeys();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('youtube_api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching YouTube API keys:', error);
        return;
      }

      setApiKeys(data || []);
    } catch (error) {
      console.error('Error in fetchApiKeys:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: any) => {
    try {
      const { error } = await supabase
        .from('youtube_api_keys')
        .insert({
          name: values.name,
          api_key: values.api_key,
          quota_limit: values.quota_limit
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add YouTube API key",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "YouTube API key added successfully"
      });
      
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding API key:', error);
    }
  };

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "API key copied to clipboard"
    });
  };

  const toggleEnabled = async (id: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('youtube_api_keys')
        .update({ enabled })
        .eq('id', id);

      if (error) {
        console.error('Error updating API key:', error);
        return;
      }

      toast({
        title: "Success",
        description: `API key ${enabled ? 'enabled' : 'disabled'}`
      });
    } catch (error) {
      console.error('Error toggling API key:', error);
    }
  };

  const deleteApiKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('youtube_api_keys')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting API key:', error);
        return;
      }

      toast({
        title: "Success",
        description: "API key deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting API key:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">YouTube API Settings</h2>
          <p className="text-gray-400">Loading YouTube API configuration...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">YouTube API Settings</h2>
          <p className="text-gray-400">Manage YouTube Data API v3 keys for channel integration</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add YouTube API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Add YouTube API Key</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Key Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Production YouTube Key" {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="api_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">API Key</FormLabel>
                      <FormControl>
                        <Input placeholder="AIzaSy..." {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quota_limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Daily Quota Limit</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="10000" {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Add API Key
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {apiKeys.map((key) => (
          <Card key={key.id} className="bg-white/5 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <Youtube className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{key.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-red-600/20 text-red-300 border-red-500/30">
                        YouTube API v3
                      </Badge>
                      <span className="text-gray-400 text-sm">
                        {key.quota_used}/{key.quota_limit} quota used
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={key.enabled} 
                    onCheckedChange={(enabled) => toggleEnabled(key.id, enabled)}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleKeyVisibility(key.id)}
                    className="border-gray-700"
                  >
                    {visibleKeys.has(key.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(key.api_key)}
                    className="border-gray-700"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteApiKey(key.id)}
                    className="border-gray-700 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 p-3 bg-black/30 rounded-lg">
                <code className="text-gray-300 text-sm">
                  {visibleKeys.has(key.id) ? key.api_key : key.api_key.replace(/./g, '•')}
                </code>
              </div>
              <div className="mt-3 text-sm text-gray-400">
                Created: {new Date(key.created_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {apiKeys.length === 0 && (
          <Card className="bg-white/5 border-gray-800">
            <CardContent className="p-12 text-center">
              <Youtube className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <p className="text-gray-400">No YouTube API keys configured</p>
              <p className="text-gray-500 text-sm mt-2">Add your first YouTube Data API v3 key to get started</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default YouTubeApiSettings;
