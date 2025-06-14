
import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import UserPortal from '@/components/UserPortal';
import DeveloperPortal from '@/components/DeveloperPortal';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'user' | 'developer'>('landing');

  // Add click handlers to the landing page buttons
  const handlePortalSelection = (portal: 'user' | 'developer') => {
    setCurrentView(portal);
  };

  if (currentView === 'user') {
    return <UserPortal />;
  }

  if (currentView === 'developer') {
    return <DeveloperPortal />;
  }

  // Enhanced landing page with navigation
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full mb-6 border border-purple-500/30">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
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
          <div 
            onClick={() => handlePortalSelection('user')}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 rounded-lg p-8 text-center cursor-pointer"
          >
            <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Creator Portal</h3>
            <p className="text-gray-300 mb-6">
              Build your website by entering your YouTube channel URL and describing your vision. 
              Watch as AI creates your perfect site in real-time.
            </p>
            <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors">
              Enter as Creator
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Developer Portal */}
          <div 
            onClick={() => handlePortalSelection('developer')}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 rounded-lg p-8 text-center cursor-pointer"
          >
            <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Developer Portal</h3>
            <p className="text-gray-300 mb-6">
              Manage API keys, monitor real-time analytics, and configure the AI systems 
              that power the website generation process.
            </p>
            <div className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors">
              Developer Access
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">YouTube Integration</h4>
            <p className="text-gray-400">Seamlessly connect your YouTube channel and import content</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">AI-Powered</h4>
            <p className="text-gray-400">Advanced AI creates websites based on your description</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
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

export default Index;
