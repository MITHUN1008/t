
import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import UserPortal from '@/components/UserPortal';
import DeveloperPortal from '@/components/DeveloperPortal';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'user' | 'developer'>('landing');

  const handlePortalSelection = (portal: 'user' | 'developer') => {
    setCurrentView(portal);
  };

  if (currentView === 'user') {
    return <UserPortal />;
  }

  if (currentView === 'developer') {
    return <DeveloperPortal />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-pink-600/20 px-4 py-2 rounded-full mb-6 border border-red-600/30">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
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
          <div className="text-center p-6 bg-white/5 rounded-lg border border-gray-800">
            <div className="text-3xl font-bold text-red-500 mb-2">10,000+</div>
            <div className="text-gray-400">Websites Created</div>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-lg border border-gray-800">
            <div className="text-3xl font-bold text-pink-500 mb-2">5,000+</div>
            <div className="text-gray-400">Happy Creators</div>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-lg border border-gray-800">
            <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
        </div>

        {/* Portal Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Creator Portal */}
          <div 
            onClick={() => handlePortalSelection('user')}
            className="bg-gradient-to-br from-red-600/10 to-pink-600/10 border border-red-600/30 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 rounded-lg p-8 text-center cursor-pointer group"
          >
            <div className="bg-gradient-to-r from-red-600/20 to-pink-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Creator Portal</h3>
            <p className="text-gray-300 mb-6">
              Transform your YouTube channel into a professional website. 
              AI-powered design generation with real-time preview and instant deployment.
            </p>
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-all group-hover:scale-105">
              Start Creating
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Developer Portal */}
          <div 
            onClick={() => handlePortalSelection('developer')}
            className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-700 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105 rounded-lg p-8 text-center cursor-pointer group"
          >
            <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Developer Portal</h3>
            <p className="text-gray-300 mb-6">
              Advanced system management, API configuration, real-time analytics, 
              and comprehensive admin tools for platform administration.
            </p>
            <div className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-all group-hover:scale-105">
              Admin Access
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2 text-white">Smart YouTube Integration</h4>
            <p className="text-gray-400">Automatically import your channel branding, colors, and content structure</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2 text-white">AI-Powered Design</h4>
            <p className="text-gray-400">Advanced AI creates websites perfectly matched to your brand and content</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-red-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2 text-white">Real-time Preview</h4>
            <p className="text-gray-400">Watch your website come to life with instant previews and live editing</p>
          </div>
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

export default Index;
