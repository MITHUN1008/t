
import React, { useState, useEffect } from 'react';
import { Bot, Plus, Trash2, Eye, EyeOff, Copy, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AiApiKey {
  id: string;
  provider: string;
  name: string;
  display_name: string;
  api_key: string;
  model?: string;
  enabled: boolean;
  requests_used: number;
  requests_limit: number;
  created_at: string;
}

const aiProviders = [
  { value: 'openai', label: 'OpenAI', color: 'bg-green-600/20 text-green-300 border-green-500/30' },
  { value: 'groq', label: 'Groq', color: 'bg-orange-600/20 text-orange-300 border-orange-500/30' },
  { value: 'openrouter', label: 'OpenRouter', color: 'bg-blue-600/20 text-blue-300 border-blue-500/30' },
  { value: 'together', label: 'Together AI', color: 'bg-purple-600/20 text-purple-300 border-purple-500/30' },
  { value: 'anthropic', label: 'Anthropic', color: 'bg-red-600/20 text-red-300 border-red-500/30' },
  { value: 'cohere', label: 'Cohere', color: 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30' }
];

const AiApiManagement = () => {
  const [apiKeys, setApiKeys] = useState<AiApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      provider: '',
      display_name: '',
      api_key: '',
      model: '',
      requests_limit: 1000
    }
  });

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
        console.error('Error fetching AI API keys:', error);
        return;
      }

      setApiKeys(data || []);
    } catch (error) {
      console.error('Error in fetchApiKeys:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateUniqueName = async (provider: string) => {
    try {
      const { data, error } = await supabase
        .rpc('generate_unique_provider_name', { provider_type: provider });

      if (error) {
        console.error('Error generating unique name:', error);
        return provider;
      }

      return data;
    } catch (error) {
      console.error('Error in generateUniqueName:', error);
      return provider;
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
          model: values.model || null,
          requests_limit: values.requests_limit
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add AI API key",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "AI API key added successfully"
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
        description: "AI API key deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting API key:', error);
    }
  };

  const getProviderColor = (provider: string) => {
    return aiProviders.find(p => p.value === provider)?.color || 'bg-gray-600/20 text-gray-300 border-gray-500/30';
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">AI API Management</h2>
          <p className="text-gray-400">Loading AI API configuration...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">AI API Management</h2>
          <p className="text-gray-400">Manage AI provider API keys and models</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add AI API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Add AI API Key</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">AI Provider</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-gray-700 text-white">
                            <SelectValue placeholder="Select AI provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {aiProviders.map((provider) => (
                            <SelectItem key={provider.value} value={provider.value}>
                              {provider.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        <Input placeholder="e.g., Production GPT-4" {...field} className="bg-white/5 border-gray-700 text-white" />
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
                        <Input placeholder="sk-..." {...field} className="bg-white/5 border-gray-700 text-white" />
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
                        <Input placeholder="e.g., gpt-4, claude-3" {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="requests_limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Requests Limit</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1000" {...field} className="bg-white/5 border-gray-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
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
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <Bot className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{key.display_name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getProviderColor(key.provider)}>
                        {key.name}
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
        ))}
        
        {apiKeys.length === 0 && (
          <Card className="bg-white/5 border-gray-800">
            <CardContent className="p-12 text-center">
              <Bot className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-400">No AI API keys configured</p>
              <p className="text-gray-500 text-sm mt-2">Add your first AI provider API key to get started</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AiApiManagement;
