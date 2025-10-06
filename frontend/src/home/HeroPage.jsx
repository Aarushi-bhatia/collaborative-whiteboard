import React, { useState, useEffect } from 'react';
import { Pencil, Users, Zap, Shield, ArrowRight, Sparkles, Globe, MessageSquare, Video, Play } from 'lucide-react';
import SketchWidget from '../ui/sketchWidget';

const WhiteboardLanding = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: Zap, title: 'Real-time Collaboration', desc: 'Work together seamlessly with instant updates' },
    { icon: Users, title: 'Unlimited Team Members', desc: 'Invite your entire team without limits' },
    { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade encryption for your data' },
    { icon: Globe, title: 'Work From Anywhere', desc: 'Access your boards from any device' },
    { icon: MessageSquare, title: 'Built-in Chat', desc: 'Discuss ideas without leaving the board' },
    { icon: Video, title: 'Video Calls', desc: 'Face-to-face collaboration integrated' }
  ];

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      {/* <div className="fixed inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div> */}

      {/* Navigation */}
      {/* <nav className="relative z-50 px-6 py-4 flex items-center justify-between backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Pencil className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">CollabBoard</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#demo" className="hover:text-blue-400 transition-colors">Demo</a>
          <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
          <button className="px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
            Sign In
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            Get Started
          </button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="relative mt-20 z-10 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8 backdrop-blur-sm border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">Trusted by 50,000+ teams worldwide</span>
          </div> */}
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Collaborate in
            <br />Real-Time
          </h1>
          
          <p className="text-xl md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            The most intuitive whiteboard for remote teams. Draw, brainstorm, and create together, no matter where you are.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="group px-6 py-3  bg-blue-400  rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/10 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-lg font-semibold hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-5xl mx-auto mt-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              {/* Mock Whiteboard Interface */}
              <div className="bg-white rounded-xl h-96 relative overflow-hidden shadow-inner">
                {/* Mock toolbar */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg" />
                  ))}
                </div>
                
                {/* Animated drawing paths */}
                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d="M 50 200 Q 150 150, 250 200 T 450 200"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  <circle cx="350" cy="150" r="40" stroke="#10b981" strokeWidth="3" fill="none" />
                  <rect x="100" y="250" width="80" height="60" stroke="#f59e0b" strokeWidth="3" fill="none" rx="8" />
                </svg>

                {/* Animated cursors */}
                <div className="absolute top-1/3 left-1/3 animate-bounce">
                  <div className="w-4 h-4 bg-blue-500 rounded-full" />
                  <div className="mt-1 px-2 py-1 bg-blue-500 rounded text-xs whitespace-nowrap">Alex</div>
                </div>
                <div className="absolute top-1/2 right-1/3 animate-pulse">
                  <div className="w-4 h-4 bg-green-500 rounded-full" />
                  <div className="mt-1 px-2 py-1 bg-green-500 rounded text-xs whitespace-nowrap">Sam</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-300">Powerful features for seamless collaboration</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Pencil className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">CollabBoard</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
          </div>
          <div className="text-sm text-slate-400">
            © 2025 CollabBoard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WhiteboardLanding;