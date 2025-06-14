import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Copy, Plus, Edit, Trash2, Key, Shield, Star, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ApiKey {
  id: string;
  provider: string;
  name: string;
  display_name: string;
  api_key: string;
  model?: string;
  enabled: boolean;
  created_at: string;
  requests_used: number;
  requests_limit: number;
}

const ApiKeyManagement = () => {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      provider: '',
      display_name: '',
      api_key: '',
      model: ''
    }
  });

  const providers = [
    { name: 'together', displayName: 'Together AI', color: 'bg-purple-600/20 text-purple-300 border-purple-500/30' },
    { name: 'groq', displayName: 'Groq', color: 'bg-green-600/20 text-green-300 border-green-500/30' },
    { name: 'openrouter', displayName: 'OpenRouter', color: 'bg-blue-600/20 text-blue-300 border-blue-500/30' },
    { name: 'openai', displayName: 'OpenAI', color: 'bg-cyan-600/20 text-cyan-300 border-cyan-500/30' },
    { name: 'anthropic', displayName: 'Anthropic', color: 'bg-orange-600/20 text-orange-300 border-orange-500/30' },
    { name: 'google', displayName: 'Google', color: 'bg-red-600/20 text-red-300 border-red-500/30' }
  ];

  useEffect(() => {
    fetchApiKeys();

    const channel = supabase
      .channel('ai-api-keys-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ai_api_keys'
        },
        (payload) => {
          console.log('AI API key changed:', payload);
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
        .from('ai_api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching API keys:', error);
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
      const uniqueName = await generateUniqueName(values.provider);
      
      const { error } = await supabase
        .from('ai_api_keys')
        .insert({
          provider: values.provider,
          name: uniqueName,
          display_name: values.display_name,
          api_key: values.api_key,
          model: values.model || null
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add API key",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "API key added successfully"
      });
      
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding API key:', error);
    }
  };

  const generateUniqueName = async (provider: string) => {
    const { data } = await supabase.rpc('generate_unique_provider_name', { provider_type: provider });
    return data || provider;
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
        .from('ai_api_keys')
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
        .from('ai_api_keys')
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
          <h2 className="text-3xl font-bold text-white mb-2">API Key Management</h2>
          <p className="text-gray-400">Loading API keys...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">API Key Management</h2>
          <p className="text-gray-400">Manage API keys for various AI providers</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Add New API Key</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Provider</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full p-3 bg-white/5 border border-gray-700 rounded-lg text-white">
                          <option value="">Select Provider</option>
                          {providers.map(provider => (
                            <option key={provider.name} value={provider.name}>{provider.displayName}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="display_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Display Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Production Key" {...field} className="bg-white/5 border-gray-700 text-white" />
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
                        <Input placeholder="Paste your API key here" {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Model (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., gpt-4, llama-3-70b" {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  <Shield className="h-4 w-4 mr-2" />
                  Save API Key
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((key) => {
          const provider = providers.find(p => p.name === key.provider);
          return (
            <Card key={key.id} className="bg-white/5 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <Key className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{key.display_name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={provider?.color || 'bg-gray-600/20 text-gray-300 border-gray-500/30'}>
                          {provider?.displayName || key.provider}
                        </Badge>
                        {key.model && (
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {key.model}
                          </Badge>
                        )}
                        <span className="text-gray-400 text-sm">
                          {key.requests_used}/{key.requests_limit} requests
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
          );
        })}
        
        {apiKeys.length === 0 && (
          <Card className="bg-white/5 border-gray-800">
            <CardContent className="p-12 text-center">
              <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No API keys configured</p>
              <p className="text-gray-500 text-sm mt-2">Add your first API key to get started</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ApiKeyManagement;
