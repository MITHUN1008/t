
import React from 'react';
import { ArrowRight, Code, Users, Zap, Github, Youtube, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full mb-6 border border-purple-500/30">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">AI-Powered Website Builder</span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            YouTube to Website
            <br />
            <span className="text-4xl">In Minutes</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your YouTube channel into a professional website using AI. 
            Enter your channel URL, describe your vision, and watch it come to life.
          </p>
        </div>

        {/* Portal Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* User Portal */}
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Creator Portal</h3>
              <p className="text-gray-300 mb-6">
                Build your website by entering your YouTube channel URL and describing your vision. 
                Watch as AI creates your perfect site in real-time.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Enter as Creator
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Developer Portal */}
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Developer Portal</h3>
              <p className="text-gray-300 mb-6">
                Manage API keys, monitor real-time analytics, and configure the AI systems 
                that power the website generation process.
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Developer Access
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Youtube className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="text-lg font-semibold mb-2">YouTube Integration</h4>
            <p className="text-gray-400">Seamlessly connect your YouTube channel and import content</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold mb-2">AI-Powered</h4>
            <p className="text-gray-400">Advanced AI creates websites based on your description</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Github className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Real-time Preview</h4>
            <p className="text-gray-400">See your website being built live with instant previews</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2024 YouTube Website Builder. Powered by AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
