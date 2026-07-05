import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Settings as SettingsIcon, 
  Home, 
  Terminal, 
  LogOut, 
  Sparkles, 
  Bell, 
  HelpCircle,
  Database
} from 'lucide-react';

export default function DashboardSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulated logout behavior
    if (confirm('Are you sure you want to sign out of the DevSpace Console?')) {
      navigate('/');
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-900 flex flex-col justify-between h-screen fixed left-0 top-0 pt-4 pb-6 z-30 shrink-0 font-sans hidden md:flex" id="devspace-dashboard-sidebar">
      <div className="space-y-6">
        {/* Brand Banner */}
        <div className="px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <Terminal className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              Dev<span className="text-indigo-400">Space</span>
            </span>
          </Link>
          <span className="text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full uppercase font-mono">
            v1.2
          </span>
        </div>

        {/* Console Navigation */}
        <div className="px-3 space-y-1">
          <p className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 font-mono">
            General
          </p>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-400'
                      : 'border border-transparent text-gray-400 hover:text-white hover:bg-gray-900/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <IconComponent className={`h-4.5 w-4.5 transition-colors ${
                      isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-gray-300'
                    }`} />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Shortcuts / Utilities */}
        <div className="px-3 space-y-1">
          <p className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 font-mono">
            Integrations
          </p>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium border border-transparent text-gray-400 hover:text-white hover:bg-gray-900/60 transition-all"
          >
            <div className="flex items-center gap-3">
              <Database className="h-4.5 w-4.5 text-gray-500" />
              <span>Databases</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-gray-900 border border-gray-800 rounded text-gray-400">
              Beta
            </span>
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium border border-transparent text-gray-400 hover:text-white hover:bg-gray-900/60 transition-all"
          >
            <Sparkles className="h-4.5 w-4.5 text-purple-400" />
            <span className="text-gray-300">AI Assistant</span>
          </a>
        </div>
      </div>

      {/* Account Control Section at Bottom */}
      <div className="px-4 space-y-4">
        {/* Quick Help Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-950/40 border border-indigo-500/10 space-y-2.5">
          <div className="flex items-center gap-1.5 text-indigo-400">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide">Developer Premium</span>
          </div>
          <p className="text-[11px] leading-relaxed text-gray-400">
            Enjoy full container traces, multi-region routing, and continuous AI co-authoring tools.
          </p>
          <Link
            to="/settings"
            className="block text-center text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 py-1.5 px-3 rounded-lg transition-colors shadow-lg shadow-indigo-950/50"
          >
            Manage Billing
          </Link>
        </div>

        {/* Logged-In User Quick Display */}
        <div className="pt-4 border-t border-gray-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
              alt="Avatar"
              className="h-9 w-9 rounded-full border border-gray-800"
            />
            <div className="text-left">
              <p className="text-xs font-semibold text-white">Qais Dev</p>
              <p className="text-[10px] text-gray-500 font-mono">mdqais029@gmail.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg bg-gray-900 hover:bg-red-950/30 text-gray-400 hover:text-red-400 border border-gray-800 hover:border-red-900/40 transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
