
import React from 'react';
import { ArrowRight, Code, Users, Zap, Github, Youtube, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-pink-600/20 px-4 py-2 rounded-full mb-6 border border-red-600/30">
            <Zap className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm">AI-Powered YouTube Website Builder</span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-pink-200 bg-clip-text text-transparent">
            Transform Your YouTube
            <br />
            <span className="text-4xl bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Into a Professional Website</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Enter your YouTube channel URL, describe your vision, and watch our AI create 
            a stunning website that matches your brand in minutes.
          </p>
        </div>

        {/* Statistics Showcase */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white/5 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">10,000+</div>
            <div className="text-gray-400">Websites Created</div>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">5,000+</div>
            <div className="text-gray-400">Happy Creators</div>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
        </div>

        {/* Portal Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Creator Portal */}
          <Card className="bg-gradient-to-br from-red-600/10 to-pink-600/10 border-red-600/30 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-r from-red-600/20 to-pink-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Youtube className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Creator Portal</h3>
              <p className="text-gray-300 mb-6">
                Transform your YouTube channel into a professional website. 
                AI-powered design generation with real-time preview and instant deployment.
              </p>
              <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white group-hover:scale-105 transition-transform">
                Start Creating
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Developer Portal */}
          <Card className="bg-gradient-to-br from-gray-800/50 to-black/50 border-gray-700 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
            <CardContent className="p-8 text-center">
              <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Developer Portal</h3>
              <p className="text-gray-300 mb-6">
                Advanced system management, API configuration, real-time analytics, 
                and comprehensive admin tools for platform administration.
              </p>
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white group-hover:scale-105 transition-transform">
                Admin Access
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Youtube className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="text-lg font-semibold mb-2 text-white">Smart YouTube Integration</h4>
            <p className="text-gray-400">Automatically import your channel branding, colors, and content structure</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold mb-2 text-white">AI-Powered Design</h4>
            <p className="text-gray-400">Advanced AI creates websites perfectly matched to your brand and content</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-red-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Github className="w-6 h-6 text-red-400" />
            </div>
            <h4 className="text-lg font-semibold mb-2 text-white">Real-time Preview</h4>
            <p className="text-gray-400">Watch your website come to life with instant previews and live editing</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-16 grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
            View Demo
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
            Pricing Plans
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
            Documentation
          </Button>
          <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white">
            Get Started
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2024 YouTube Website Builder. Transform your channel into a professional website.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
