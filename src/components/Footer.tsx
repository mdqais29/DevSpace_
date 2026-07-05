import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Twitter, Disc, Heart, Shield, Cpu } from 'lucide-react';

export default function Footer() {
  const productLinks = [
    { name: 'Hosting Platform', href: '#' },
    { name: 'DevSpace AI Coder', href: '#' },
    { name: 'Analytics Telemetry', href: '#' },
    { name: 'Edge Storage CDN', href: '#' },
    { name: 'Pricing Plans', href: '#pricing' },
  ];

  const companyLinks = [
    { name: 'About DevSpace', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Customers', href: '#' },
    { name: 'Security Enclave', href: '#' },
    { name: 'Contact Sales', href: '#' },
  ];

  const resourceLinks = [
    { name: 'Developer Docs', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'System Status', href: '#' },
    { name: 'Changelog Feed', href: '#' },
    { name: 'Community Forum', href: '#' },
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-900 pt-16 pb-8 text-gray-400 font-sans" id="devspace-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-gray-900">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
                <Terminal className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Dev<span className="text-indigo-400">Space</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              The premium, AI-powered hosting and workspace platform for developers. Deploy high-performance web applications, automate monitoring telemetry, and co-author code with native context agents.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="p-2 rounded-lg bg-gray-900/60 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-900/60 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-900/60 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors" aria-label="Discord">
                <Disc className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors duration-150">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors duration-150">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors duration-150">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} DevSpace Inc.</span>
            <span className="text-gray-700">|</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="h-3.5 w-3.5 text-pink-500 fill-pink-500" /> for modern creators
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white flex items-center gap-1 transition-colors">
              <Shield className="h-3.5 w-3.5 text-green-500" /> Security Protocol
            </a>
            <a href="#" className="hover:text-white flex items-center gap-1 transition-colors">
              <Cpu className="h-3.5 w-3.5 text-indigo-400" /> System: <span className="text-green-400 font-semibold font-mono">100% Operational</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
