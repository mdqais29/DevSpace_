import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Terminal, 
  Menu, 
  X, 
  Sparkles, 
  User, 
  Settings as SettingsIcon, 
  LogOut,
  LayoutDashboard,
  CheckCircle,
  Clock
} from 'lucide-react';
import { INITIAL_NOTIFICATIONS, NotificationItem } from '../data/mockData';

export default function DashboardHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Clock helper
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleClearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`System Query Triggered: Searching for "${searchQuery}" across Active Clusters & Logs.`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-md border-b border-gray-900 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 font-sans w-full" id="devspace-dashboard-header">
      {/* Search Input Block */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 md:hidden focus:outline-none"
        >
          {showMobileMenu ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
        </button>

        <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center max-w-md w-full relative">
          <Search className="h-4 w-4 text-gray-500 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, AI traces, logs, settings... (Enter)"
            className="w-full bg-gray-900/60 border border-gray-800 rounded-xl py-1.5 pl-10 pr-4 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
          />
        </form>
      </div>

      {/* Utilities Column */}
      <div className="flex items-center gap-4">
        {/* Live Clock Indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-gray-950 px-3 py-1 border border-gray-900 rounded-xl text-[11px] font-mono text-gray-400">
          <Clock className="h-3.5 w-3.5 text-indigo-400" />
          <span>UTC {currentTime || 'Clock'}</span>
        </div>

        {/* Notifications Icon with Badges */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-gray-900/60 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-900 transition-all focus:outline-none"
            aria-label="View notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-bold text-white shadow-md animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Window */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#090d16] border border-gray-800 shadow-2xl z-50 p-4 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="flex items-center justify-between border-b border-gray-900 pb-2.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-white">Console Alerts</h4>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-mono">
                    {unreadCount} news
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                  >
                    Clear badge
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gray-500 font-sans">
                    No notifications to display
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-xl border transition-all text-left ${
                        notif.unread 
                          ? 'bg-indigo-950/25 border-indigo-500/25' 
                          : 'bg-gray-900/40 border-gray-800/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-gray-100">{notif.title}</p>
                        <span className="text-[9px] font-mono text-gray-500 shrink-0">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 leading-normal">{notif.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className={`text-[9px] uppercase font-mono px-1.5 py-0.5 rounded-md ${
                          notif.category === 'system' 
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                            : notif.category === 'ai'
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {notif.category}
                        </span>
                        <button 
                          onClick={() => handleClearNotification(notif.id)}
                          className="text-[10px] text-gray-500 hover:text-gray-300 font-mono"
                        >
                          dismiss
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Static Header user avatar directing to profile view */}
        <Link to="/profile" className="flex items-center gap-2 group border border-gray-800 p-1 rounded-xl bg-gray-950 hover:border-gray-700 transition-all">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
            alt="User profile"
            className="h-7 w-7 rounded-lg object-cover"
          />
          <span className="hidden md:inline text-xs font-medium text-gray-300 group-hover:text-white pr-2.5 transition-colors">
            Qais
          </span>
        </Link>
      </div>

      {/* Mobile Drawer Menu Overlays */}
      {showMobileMenu && (
        <div className="fixed inset-0 top-16 bg-[#030712] z-50 md:hidden flex flex-col justify-between p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Search Input for Mobile */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="h-4 w-4 text-gray-500 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2 pl-10 pr-4 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
              />
            </form>

            {/* Navigation links for mobile screen */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                Console Directory
              </p>
              <Link
                to="/dashboard"
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center gap-3 p-3 rounded-xl text-sm font-semibold border ${
                  location.pathname === '/dashboard'
                    ? 'bg-indigo-950/20 border-indigo-500/20 text-indigo-400'
                    : 'bg-transparent border-transparent text-gray-400'
                }`}
              >
                <LayoutDashboard className="h-4.5 w-4.5" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/profile"
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center gap-3 p-3 rounded-xl text-sm font-semibold border ${
                  location.pathname === '/profile'
                    ? 'bg-indigo-950/20 border-indigo-500/20 text-indigo-400'
                    : 'bg-transparent border-transparent text-gray-400'
                }`}
              >
                <User className="h-4.5 w-4.5" />
                <span>Developer Profile</span>
              </Link>

              <Link
                to="/settings"
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center gap-3 p-3 rounded-xl text-sm font-semibold border ${
                  location.pathname === '/settings'
                    ? 'bg-indigo-950/20 border-indigo-500/20 text-indigo-400'
                    : 'bg-transparent border-transparent text-gray-400'
                }`}
              >
                <SettingsIcon className="h-4.5 w-4.5" />
                <span>Platform Settings</span>
              </Link>
            </div>

            {/* Direct Home trigger */}
            <div className="pt-4 border-t border-gray-900 space-y-2">
              <Link
                to="/"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 p-3 text-sm text-gray-400 hover:text-white"
              >
                <Terminal className="h-4.5 w-4.5 text-indigo-400" />
                <span>Back to Home Site</span>
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                alt="Avatar"
                className="h-9 w-9 rounded-full"
              />
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Qais Dev</p>
                <p className="text-[10px] text-gray-500">mdqais029@gmail.com</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                navigate('/');
              }}
              className="p-2 rounded-xl bg-gray-900 hover:bg-red-950/30 text-gray-400 hover:text-red-400 border border-gray-800 transition-colors"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
