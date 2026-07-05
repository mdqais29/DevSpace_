import React, { useState } from 'react';
import { 
  User, 
  Terminal, 
  GitBranch, 
  Globe, 
  Layers, 
  ShieldAlert, 
  Check, 
  Smartphone, 
  Laptop,
  Cpu,
  Mail,
  Bookmark
} from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';

interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  isCurrent: boolean;
}

export default function Profile() {
  // Public metadata states
  const [name, setName] = useState('Qais Dev');
  const [role, setRole] = useState('Senior Full-Stack Engineer');
  const [bio, setBio] = useState('Crafting scalable cloud runtimes and multi-turn conversational agents. Focusing on performance-tuned, zero-latency micro-services at DevSpace.');
  const [githubHandle, setGithubHandle] = useState('qais-dev');
  const [primaryLang, setPrimaryLang] = useState('TypeScript');
  const [isSaved, setIsSaved] = useState(false);

  // Authenticated sessions state
  const [sessions, setSessions] = useState<ActiveSession[]>([
    { id: 's1', device: 'MacBook Pro 16"', browser: 'Chrome Desktop', ip: '142.110.42.23', location: 'Tokyo, JP', isCurrent: true },
    { id: 's2', device: 'iPhone 15 Pro Max', browser: 'Safari Mobile', ip: '110.23.49.121', location: 'Oregon, US', isCurrent: false },
    { id: 's3', device: 'Linux DevBox Workstation', browser: 'Firefox Developer Edition', ip: '82.201.42.5', location: 'London, UK', isCurrent: false },
  ]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const handleRevokeSession = (id: string) => {
    if (confirm('Revoke security credentials for this device? It will be logged out immediately.')) {
      setSessions(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="bg-[#030712] min-h-screen text-gray-100 flex font-sans" id="devspace-profile-page">
      {/* Sidebar Navigation */}
      <DashboardSidebar />

      {/* Main Panel */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen w-full">
        <DashboardHeader />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl w-full mx-auto">
          
          {/* Welcome header */}
          <div className="border-b border-gray-900 pb-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Developer Profile
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Configure public credentials, monitor open sessions, and configure developer telemetry tags.
            </p>
          </div>

          {/* Banner Hero */}
          <div className="relative rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-slate-900/60 border border-gray-900 p-6 sm:p-8 overflow-hidden flex flex-col sm:flex-row items-center gap-6 text-left">
            {/* Glowing orb */}
            <div className="absolute top-0 right-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-[40px] pointer-events-none" />

            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=180"
                alt="Profile Avatar"
                className="h-24 w-24 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-xl"
              />
              <span className="absolute -bottom-1.5 -right-1.5 bg-green-500 text-white p-1 rounded-lg border border-gray-950 text-[9px] font-mono font-bold uppercase animate-pulse">
                active
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-bold text-white">{name}</h2>
                <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full uppercase">
                  Staff Pro
                </span>
              </div>
              <p className="text-sm text-indigo-300 font-medium">{role}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> mdqais029@gmail.com</span>
                <span className="flex items-center gap-1"><Bookmark className="h-3.5 w-3.5 text-emerald-400" /> Primary: {primaryLang}</span>
              </div>
            </div>
          </div>

          {/* Split Form & Device Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Public details editor form */}
            <div className="lg:col-span-7 bg-gray-950 border border-gray-900 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-900 pb-3">
                <User className="h-4.5 w-4.5 text-indigo-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">Public Profile Settings</h3>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-4 text-left text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] font-mono">Full Handle Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#05070c] border border-gray-800 rounded-xl py-2 px-3 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] font-mono">Professional Designation</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-[#05070c] border border-gray-800 rounded-xl py-2 px-3 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] font-mono">GitHub Username</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-600 font-mono">github.com/</span>
                      <input
                        type="text"
                        value={githubHandle}
                        onChange={(e) => setGithubHandle(e.target.value)}
                        className="w-full bg-[#05070c] border border-gray-800 rounded-xl py-2 pl-24 pr-3 text-xs text-gray-200 focus:outline-none focus:border-indigo-500 font-mono"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] font-mono">Core Coding Dialect</label>
                    <input
                      type="text"
                      value={primaryLang}
                      onChange={(e) => setPrimaryLang(e.target.value)}
                      className="w-full bg-[#05070c] border border-gray-800 rounded-xl py-2 px-3 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] font-mono">Professional Bio Overview</label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-[#05070c] border border-gray-800 rounded-xl py-2 px-3 text-xs text-gray-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
                    required
                  />
                </div>

                <div className="pt-3 border-t border-gray-900 flex justify-between items-center">
                  <p className="text-[10px] text-gray-500 font-mono">
                    Profile updates apply to public team repositories and shared previews.
                  </p>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1"
                  >
                    {isSaved ? <Check className="h-4.5 w-4.5 text-green-300" /> : null}
                    <span>{isSaved ? 'Synchronized!' : 'Save Credentials'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Authenticated active devices panel */}
            <div className="lg:col-span-5 bg-gray-950 border border-gray-900 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-gray-900 pb-3">
                  <ShieldAlert className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="text-sm sm:text-base font-bold text-white">Active Device Traces</h3>
                </div>

                <p className="text-xs text-gray-500 text-left mt-2 leading-relaxed">
                  Traces of all desktop and mobile devices currently signed in to the DevSpace API and console. Unrecognized devices can be revoked immediately.
                </p>

                <div className="space-y-3 pt-4">
                  {sessions.map((session) => (
                    <div 
                      key={session.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#090d16]/60 border border-gray-900"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="h-8 w-8 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                          {session.device.includes('iPhone') ? (
                            <Smartphone className="h-4 w-4 text-indigo-400" />
                          ) : (
                            <Laptop className="h-4 w-4 text-purple-400" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">{session.device}</span>
                            {session.isCurrent && (
                              <span className="text-[8px] bg-emerald-500/10 text-emerald-400 font-mono px-1.5 py-0.5 rounded uppercase font-bold">
                                cur
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-none">
                            {session.browser} • {session.location}
                          </p>
                          <p className="text-[9px] text-gray-500 font-mono mt-1">{session.ip}</p>
                        </div>
                      </div>

                      {!session.isCurrent && (
                        <button
                          onClick={() => handleRevokeSession(session.id)}
                          className="text-[10px] font-mono text-gray-500 hover:text-red-400 hover:bg-red-950/20 px-2 py-1 rounded-lg transition-all"
                        >
                          revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dev credentials signature block */}
              <div className="pt-4 border-t border-gray-900 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span className="flex items-center gap-1">
                  <Terminal className="h-3.5 w-3.5 text-indigo-400" /> Keys: 4 active SSH
                </span>
                <span className="text-green-400 font-bold">SHA-256 Verified</span>
              </div>
            </div>

          </section>

          {/* Public Preview Card Simulation */}
          <section className="bg-gray-950 border border-gray-900 rounded-2xl p-6 text-left space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-900 pb-3">
              <Cpu className="h-4.5 w-4.5 text-indigo-400" />
              <h3 className="text-sm sm:text-base font-bold text-white">Your Infrastructure Footprint</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-left">
              <div className="p-4 rounded-xl bg-[#090d16]/40 border border-gray-900 space-y-1">
                <span className="text-gray-500 uppercase tracking-widest font-mono text-[9px]">Deployed Builds</span>
                <p className="text-xl font-bold text-white">402 pushes</p>
                <p className="text-gray-400 text-[10px]">Since creating account in June</p>
              </div>
              <div className="p-4 rounded-xl bg-[#090d16]/40 border border-gray-900 space-y-1">
                <span className="text-gray-500 uppercase tracking-widest font-mono text-[9px]">Subdomains Claimed</span>
                <p className="text-xl font-bold text-white">3 active</p>
                <p className="text-indigo-400 text-[10px] font-mono">devspace-dashboard-prod.app</p>
              </div>
              <div className="p-4 rounded-xl bg-[#090d16]/40 border border-gray-900 space-y-1">
                <span className="text-gray-500 uppercase tracking-widest font-mono text-[9px]">API Requests Logs</span>
                <p className="text-xl font-bold text-white">124,809 keys</p>
                <p className="text-emerald-400 text-[10px]">99.99% successful edge delivery</p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
