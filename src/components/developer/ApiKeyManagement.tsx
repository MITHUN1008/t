
import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Plus, Edit, Trash2, Key, Shield, Star, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const ApiKeyManagement = () => {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  
  const [apiKeys] = useState([
    {
      id: 'together-1',
      provider: 'Together AI',
      name: 'Production Key',
      key: 'together_xxxxxxxxxxxxxxxxxxxxx',
      enabled: true,
      created: '2024-01-15',
      lastUsed: '2024-03-20'
    },
    {
      id: 'openai-1',
      provider: 'OpenAI',
      name: 'GPT-4 Access',
      key: 'sk-xxxxxxxxxxxxxxxxxxxxx',
      enabled: true,
      created: '2024-02-10',
      lastUsed: '2024-03-19'
    },
    {
      id: 'groq-1',
      provider: 'Groq',
      name: 'Fast Inference',
      key: 'gsk_xxxxxxxxxxxxxxxxxxxxx',
      enabled: false,
      created: '2024-03-01',
      lastUsed: '2024-03-15'
    }
  ]);

  const providers = [
    { name: 'Together AI', color: 'bg-purple-600/20 text-purple-300 border-purple-500/30' },
    { name: 'Groq', color: 'bg-green-600/20 text-green-300 border-green-500/30' },
    { name: 'OpenRouter', color: 'bg-blue-600/20 text-blue-300 border-blue-500/30' },
    { name: 'OpenAI', color: 'bg-cyan-600/20 text-cyan-300 border-cyan-500/30' },
    { name: 'Anthropic', color: 'bg-orange-600/20 text-orange-300 border-orange-500/30' },
    { name: 'Google', color: 'bg-red-600/20 text-red-300 border-red-500/30' }
  ];

  const togetherModels = [
    { name: 'Llama-3-70B-Instruct', tier: 'free', description: 'High-quality large model' },
    { name: 'Llama-3-8B-Instruct', tier: 'free', description: 'Fast and efficient' },
    { name: 'Mixtral-8x7B-Instruct', tier: 'pro', description: 'Advanced reasoning' },
    { name: 'Code-Llama-70B', tier: 'pro-plus', description: 'Code generation specialist' }
  ];

  const groqModels = [
    { name: 'Llama-3-70B-8192', tier: 'free', description: 'Lightning fast inference' },
    { name: 'Mixtral-8x7B-32768', tier: 'pro', description: 'Extended context window' },
    { name: 'Gemma-7B-IT', tier: 'free', description: 'Google\'s open model' }
  ];

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'free':
        return <span className="text-green-400">🆓</span>;
      case 'pro':
        return <Star className="h-3 w-3 text-yellow-400" />;
      case 'pro-plus':
        return <Crown className="h-3 w-3 text-purple-400" />;
      default:
        return null;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Toast notification would go here
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">API Key Management</h2>
          <p className="text-gray-400">Manage API keys for various AI providers</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add API Key
        </Button>
      </div>

      <Tabs defaultValue="manage" className="space-y-6">
        <TabsList className="bg-white/5 border-gray-800">
          <TabsTrigger value="manage" className="data-[state=active]:bg-purple-600/20">Manage Keys</TabsTrigger>
          <TabsTrigger value="add" className="data-[state=active]:bg-purple-600/20">Add New</TabsTrigger>
          <TabsTrigger value="together" className="data-[state=active]:bg-purple-600/20">Together AI</TabsTrigger>
          <TabsTrigger value="groq" className="data-[state=active]:bg-purple-600/20">Groq Models</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-6">
          {/* API Keys List */}
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <Card key={key.id} className="bg-white/5 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                        <Key className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{key.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={providers.find(p => p.name === key.provider)?.color}>
                            {key.provider}
                          </Badge>
                          <span className="text-gray-400 text-sm">Created: {key.created}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={key.enabled} />
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
                        onClick={() => copyToClipboard(key.key)}
                        className="border-gray-700"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-700">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-700 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-black/30 rounded-lg">
                    <code className="text-gray-300 text-sm">
                      {visibleKeys.has(key.id) ? key.key : key.key.replace(/./g, '•')}
                    </code>
                  </div>
                  <div className="mt-3 text-sm text-gray-400">
                    Last used: {key.lastUsed}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add" className="space-y-6">
          <Card className="bg-white/5 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Add New API Key</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Provider</label>
                <select className="w-full p-3 bg-white/5 border border-gray-700 rounded-lg text-white">
                  <option value="">Select Provider</option>
                  {providers.map(provider => (
                    <option key={provider.name} value={provider.name}>{provider.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Key Name</label>
                <Input placeholder="e.g., Production Key" className="bg-white/5 border-gray-700 text-white" />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">API Key</label>
                <Input placeholder="Paste your API key here" className="bg-white/5 border-gray-700 text-white" />
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Shield className="h-4 w-4 mr-2" />
                Save API Key
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="together" className="space-y-6">
          <Card className="bg-white/5 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Together AI Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {togetherModels.map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTierIcon(model.tier)}
                      <div>
                        <h4 className="text-white font-semibold">{model.name}</h4>
                        <p className="text-gray-400 text-sm">{model.description}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-gray-700">
                      Select
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groq" className="space-y-6">
          <Card className="bg-white/5 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Groq Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {groqModels.map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTierIcon(model.tier)}
                      <div>
                        <h4 className="text-white font-semibold">{model.name}</h4>
                        <p className="text-gray-400 text-sm">{model.description}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-gray-700">
                      Select
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiKeyManagement;
