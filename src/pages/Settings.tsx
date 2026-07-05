import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Key, 
  Lock, 
  Terminal, 
  Plus, 
  Eye, 
  EyeOff, 
  Trash, 
  Check, 
  Bell, 
  Volume2, 
  CreditCard,
  CheckSquare
} from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';

interface EnvironmentSecret {
  id: string;
  key: string;
  value: string;
  isRevealed: boolean;
}

export default function Settings() {
  // Environment secret variables list state
  const [secrets, setSecrets] = useState<EnvironmentSecret[]>([
    { id: 'sec1', key: 'GEMINI_API_KEY', value: 'AIzaSyA4012_BvD87459p_DevSpaceAgentSecret', isRevealed: false },
    { id: 'sec2', key: 'DATABASE_URL', value: 'postgresql://qais:********@tokyo-db-node.devspace.app:5432/main', isRevealed: false },
    { id: 'sec3', key: 'STRIPE_WEBHOOK_SECRET', value: 'whsec_90832049182039840291', isRevealed: false },
  ]);

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  // SSH Key binding list
  const [sshKeys, setSshKeys] = useState<string[]>([
    'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDQzE6f3B9f... qais@workstation'
  ]);
  const [newSshKey, setNewSshKey] = useState('');

  // Checkbox settings parameters
  const [autoSave, setAutoSave] = useState(true);
  const [soundCues, setSoundCues] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  // Settings Save Confirmation
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddSecret = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim() || !newValue.trim()) return;
    
    // Constraint: format keys as uppercase alphanumeric + underscore
    const formattedKey = newKey.trim().toUpperCase().replace(/[^A-Z0-9_]/g, '_');
    
    const secretItem: EnvironmentSecret = {
      id: `sec-${Date.now()}`,
      key: formattedKey,
      value: newValue.trim(),
      isRevealed: false,
    };

    setSecrets(prev => [...prev, secretItem]);
    setNewKey('');
    setNewValue('');
    triggerToast(`Created variable enclaves for key: ${formattedKey}`);
  };

  const handleDeleteSecret = (id: string, keyName: string) => {
    if (confirm(`Delete environment secret: ${keyName}? This action is irreversible.`)) {
      setSecrets(prev => prev.filter(s => s.id !== id));
      triggerToast(`Deleted secret: ${keyName}`);
    }
  };

  const handleToggleRevealSecret = (id: string) => {
    setSecrets(prev => prev.map(s => s.id === id ? { ...s, isRevealed: !s.isRevealed } : s));
  };

  const handleAddSshKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSshKey.trim()) return;
    setSshKeys(prev => [...prev, newSshKey.trim()]);
    setNewSshKey('');
    triggerToast('SSH Public Key authorized successfully.');
  };

  return (
    <div className="bg-[#030712] min-h-screen text-gray-100 flex font-sans" id="devspace-settings-page">
      {/* Sidebar Navigation */}
      <DashboardSidebar />

      {/* Main Panel Content */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen w-full">
        <DashboardHeader />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl w-full mx-auto relative">
          
          {/* Reactive Toast popups */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-[#090d16] border border-indigo-500/30 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs text-white animate-bounce">
              <Check className="h-4.5 w-4.5 text-green-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Heading Title */}
          <div className="border-b border-gray-900 pb-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Platform Settings
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Secure cloud environments variables, configure API secrets, bind SSH keys, and manage billing profiles.
            </p>
          </div>

          {/* Grid Layout splits */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 1. Environment Secrets Enclave Panel */}
            <div className="lg:col-span-7 bg-gray-950 border border-gray-900 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-900 pb-3">
                <Lock className="h-4.5 w-4.5 text-indigo-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">Environment Secrets Manager</h3>
              </div>

              <p className="text-xs text-gray-500 text-left mt-2 leading-relaxed">
                Add environment keys and private database connections here. All secrets are encrypted using hardware AES-GCM-256 enclaves before being injected into your container memory instances.
              </p>

              {/* Secrets Form input */}
              <form onSubmit={handleAddSecret} className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3">
                <div className="sm:col-span-5 text-left space-y-1">
                  <label className="text-[10px] font-mono text-gray-500 font-bold uppercase">Secret Key</label>
                  <input
                    type="text"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    placeholder="E.g. GEMINI_API_KEY"
                    className="w-full bg-[#05070c] border border-gray-800 rounded-xl py-2 px-3 text-xs text-gray-200 focus:outline-none focus:border-indigo-500 font-mono"
                    required
                  />
                </div>
                <div className="sm:col-span-5 text-left space-y-1">
                  <label className="text-[10px] font-mono text-gray-500 font-bold uppercase">Secret Value</label>
                  <input
                    type="text"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="E.g. AIzaSyA40..."
                    className="w-full bg-[#05070c] border border-gray-800 rounded-xl py-2 px-3 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="sm:col-span-2 flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1 h-9"
                  >
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>
              </form>

              {/* Active Secrets list */}
              <div className="space-y-2.5 pt-4">
                {secrets.length === 0 ? (
                  <div className="py-6 text-center text-xs text-gray-500 font-sans">
                    No variables declared. Add some keys to securely configure your container environments.
                  </div>
                ) : (
                  secrets.map((secret) => (
                    <div 
                      key={secret.id}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-gray-900/40 border border-gray-900"
                    >
                      <div className="text-left space-y-1 min-w-0 flex-1">
                        <span className="text-xs font-mono font-bold text-indigo-400 break-words block">
                          {secret.key}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500 block truncate max-w-xs sm:max-w-md">
                          {secret.isRevealed ? secret.value : '••••••••••••••••••••••••••••••••••••'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <button
                          onClick={() => handleToggleRevealSecret(secret.id)}
                          className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                          title={secret.isRevealed ? 'Hide variable' : 'Reveal variable'}
                        >
                          {secret.isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          onClick={() => handleDeleteSecret(secret.id, secret.key)}
                          className="p-1.5 rounded-lg bg-gray-900 hover:bg-red-950/20 text-gray-500 hover:text-red-400 transition-colors"
                          title="Delete variable"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 2. Side Panel Configurations: Prefs & SSH Keys */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Billing Info Panel */}
              <div className="bg-gray-950 border border-gray-900 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg text-left">
                <div className="flex items-center gap-2 border-b border-gray-900 pb-3">
                  <CreditCard className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="text-sm sm:text-base font-bold text-white">Billing & Plan</h3>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/20 via-purple-950/20 to-slate-900/40 border border-indigo-500/20 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">Active Plan: Pro Developer</span>
                    <span className="text-[9px] bg-indigo-500 text-white font-mono font-bold px-2 py-0.5 rounded uppercase">
                      pro
                    </span>
                  </div>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    Billed $29.00 monthly. The next automated charge is scheduled for **August 1, 2026**.
                  </p>
                  <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[14.2%]" />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                    <span>14.2 GB edge bandwidth</span>
                    <span>100 GB quota remaining</span>
                  </div>
                </div>
              </div>

              {/* Preferences Checkbox Panel */}
              <div className="bg-gray-950 border border-gray-900 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg text-left">
                <div className="flex items-center gap-2 border-b border-gray-900 pb-3">
                  <Key className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="text-sm sm:text-base font-bold text-white">Console Preferences</h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <button 
                      onClick={() => {
                        setAutoSave(!autoSave);
                        triggerToast(`Autosave configuration: ${!autoSave ? 'Enabled' : 'Disabled'}`);
                      }}
                      className="mt-0.5 shrink-0"
                    >
                      <CheckSquare className={`h-4.5 w-4.5 transition-colors ${
                        autoSave ? 'text-indigo-500 fill-indigo-500/20' : 'text-gray-600'
                      }`} />
                    </button>
                    <div>
                      <p className="font-bold text-white">Auto-save deploy updates</p>
                      <p className="text-gray-500 text-[10px] mt-0.5 leading-normal">
                        Save local repository branch parameters automatically when deploying on git pushes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <button 
                      onClick={() => {
                        setSoundCues(!soundCues);
                        triggerToast(`Haptic sound effects: ${!soundCues ? 'Enabled' : 'Disabled'}`);
                      }}
                      className="mt-0.5 shrink-0"
                    >
                      <CheckSquare className={`h-4.5 w-4.5 transition-colors ${
                        soundCues ? 'text-indigo-500 fill-indigo-500/20' : 'text-gray-600'
                      }`} />
                    </button>
                    <div>
                      <p className="font-bold text-white">Haptic Sound cues & Effects</p>
                      <p className="text-gray-500 text-[10px] mt-0.5 leading-normal">
                        Play auditory ticks on completion of cloud compilations, deploy completions, or pipeline errors.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <button 
                      onClick={() => {
                        setEmailAlerts(!emailAlerts);
                        triggerToast(`Critical crash alert emails: ${!emailAlerts ? 'Enabled' : 'Disabled'}`);
                      }}
                      className="mt-0.5 shrink-0"
                    >
                      <CheckSquare className={`h-4.5 w-4.5 transition-colors ${
                        emailAlerts ? 'text-indigo-500 fill-indigo-500/20' : 'text-gray-600'
                      }`} />
                    </button>
                    <div>
                      <p className="font-bold text-white">Email deployment crash alerts</p>
                      <p className="text-gray-500 text-[10px] mt-0.5 leading-normal">
                        Receive instant diagnostics stack-traces inside your inbox if edge gateway routes trigger 5xx statuses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SSH Bindings Panel */}
              <div className="bg-gray-950 border border-gray-900 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg text-left">
                <div className="flex items-center gap-2 border-b border-gray-900 pb-3">
                  <Terminal className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="text-sm sm:text-base font-bold text-white">Authorized SSH Keys</h3>
                </div>

                <form onSubmit={handleAddSshKey} className="space-y-2">
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Authorize secure SSH public keys here to authenticate with our global git gateway endpoint for direct command-line deployments.
                  </p>
                  <textarea
                    rows={2}
                    value={newSshKey}
                    onChange={(e) => setNewSshKey(e.target.value)}
                    placeholder="ssh-rsa AAAAB3NzaC1yc2E..."
                    className="w-full bg-[#05070c] border border-gray-800 rounded-xl py-1.5 px-3 text-xs text-gray-200 placeholder-gray-700 font-mono focus:outline-none focus:border-indigo-500"
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-[11px] font-bold text-gray-300 hover:text-white transition-all shadow-md"
                    >
                      Register SSH Key
                    </button>
                  </div>
                </form>

                <div className="space-y-2 pt-2">
                  {sshKeys.map((key, i) => (
                    <div key={i} className="p-3 bg-[#05070c] rounded-xl border border-gray-900 flex justify-between items-center">
                      <p className="text-[10px] font-mono text-gray-400 truncate max-w-[200px] sm:max-w-xs">{key}</p>
                      <span className="text-[9px] uppercase font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 rounded-md font-semibold shrink-0 ml-2">
                        active
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </section>

        </main>
      </div>
    </div>
  );
}
