import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, ArrowRight, Github, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboard') ||
                      location.pathname.startsWith('/profile') ||
                      location.pathname.startsWith('/settings');

  const links = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/75 backdrop-blur-md border-b border-gray-800/60" id="devspace-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:scale-105 transition-transform">
                <Terminal className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-400 font-sans tracking-tight">
                Dev<span className="text-indigo-400 font-extrabold">Space</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {!isDashboard && (
              <div className="flex items-center gap-6">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                Go to Console
              </Link>
              <Link
                to="/dashboard"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-xl group bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 group-hover:from-indigo-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-purple-800 mt-2"
              >
                <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-gray-950 rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-1.5 font-semibold">
                  Start Free <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-lg border-b border-gray-800 px-4 pt-2 pb-6 space-y-4">
          {!isDashboard && (
            <div className="space-y-1">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
          <div className="pt-2 border-t border-gray-800 space-y-3 px-3">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-gray-300 hover:text-white py-1"
            >
              Go to Console
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-semibold text-center transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)]"
            >
              Start Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
