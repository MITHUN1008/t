
import React, { useState, useEffect } from 'react';
import { Globe, Plus, Trash2, Eye, EyeOff, Copy, ExternalLink, Activity } from 'lucide-react';
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

interface NetlifyApiKey {
  id: string;
  name: string;
  api_key: string;
  site_id?: string;
  site_name?: string;
  site_url?: string;
  enabled: boolean;
  deployments_count: number;
  last_deployment?: string;
  created_at: string;
}

const NetlifyDeployments = () => {
  const [apiKeys, setApiKeys] = useState<NetlifyApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: '',
      api_key: '',
      site_id: '',
      site_name: '',
      site_url: ''
    }
  });

  useEffect(() => {
    fetchApiKeys();

    const channel = supabase
      .channel('netlify-api-keys-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'netlify_api_keys'
        },
        (payload) => {
          console.log('Netlify API key changed:', payload);
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
        .from('netlify_api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching Netlify API keys:', error);
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
        .from('netlify_api_keys')
        .insert({
          name: values.name,
          api_key: values.api_key,
          site_id: values.site_id || null,
          site_name: values.site_name || null,
          site_url: values.site_url || null
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add Netlify API key",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Netlify API key added successfully"
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
        .from('netlify_api_keys')
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
        .from('netlify_api_keys')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting API key:', error);
        return;
      }

      toast({
        title: "Success",
        description: "Netlify API key deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting API key:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Netlify Deployments</h2>
          <p className="text-gray-400">Loading Netlify deployment configuration...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Netlify Deployments</h2>
          <p className="text-gray-400">Manage Netlify API keys and deployment settings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Netlify API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Add Netlify API Key</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Configuration Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Production Netlify" {...field} className="bg-white/5 border-gray-700 text-white" />
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
                      <FormLabel className="text-gray-300">Netlify API Key</FormLabel>
                      <FormControl>
                        <Input placeholder="nfp_..." {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="site_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Site ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="a1b2c3d4-e5f6-..." {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="site_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Site Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="my-awesome-site" {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="site_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Site URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://my-site.netlify.app" {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
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
                  <div className="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{key.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-cyan-600/20 text-cyan-300 border-cyan-500/30">
                        Netlify
                      </Badge>
                      {key.site_name && (
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {key.site_name}
                        </Badge>
                      )}
                      <span className="text-gray-400 text-sm">
                        {key.deployments_count} deployments
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={key.enabled} 
                    onCheckedChange={(enabled) => toggleEnabled(key.id, enabled)}
                  />
                  {key.site_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(key.site_url, '_blank')}
                      className="border-gray-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
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
              <div className="mt-3 flex justify-between text-sm text-gray-400">
                <span>Created: {new Date(key.created_at).toLocaleDateString()}</span>
                {key.last_deployment && (
                  <span>Last deployment: {new Date(key.last_deployment).toLocaleDateString()}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {apiKeys.length === 0 && (
          <Card className="bg-white/5 border-gray-800">
            <CardContent className="p-12 text-center">
              <Globe className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <p className="text-gray-400">No Netlify configurations found</p>
              <p className="text-gray-500 text-sm mt-2">Add your first Netlify API key to manage deployments</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NetlifyDeployments;
