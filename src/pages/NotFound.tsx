import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ArrowLeft, Home, Layers } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#030712] min-h-screen text-gray-100 flex flex-col justify-center items-center px-4 relative font-sans overflow-hidden" id="devspace-not-found-page">
      {/* Background ambient glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center max-w-lg space-y-8 relative z-10">
        {/* Brand Banner Logo */}
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <Terminal className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Dev<span className="text-indigo-400">Space</span>
            </span>
          </Link>
        </div>

        {/* Huge Status Code */}
        <div className="space-y-2">
          <p className="text-[120px] sm:text-[150px] font-extrabold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-indigo-400 via-purple-400 to-transparent select-none font-sans">
            404
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Route Lost in the Space-Void.</h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
            The endpoint you mapped does not exist on our active cloud routing CDN gateways. It may have been undeployed or deleted.
          </p>
        </div>

        {/* Mock Terminal Diagnostics */}
        <div className="p-4 rounded-xl bg-gray-950 border border-gray-900 text-left font-mono text-[11px] text-gray-400 space-y-1.5 max-w-sm mx-auto">
          <p className="text-indigo-400">$ devspace lookup --route path</p>
          <p className="text-red-400">✖ [ERROR] ROUTE_NOT_MAPPED_TO_CDN</p>
          <p className="text-gray-500">└ Host: Tokyo Edge, Ingress Node #402</p>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <Home className="h-4 w-4" /> Go to Home Site
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-xl text-xs font-bold border border-gray-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Layers className="h-4 w-4" /> Enter Console
          </Link>
        </div>
      </div>
    </div>
  );
}
