import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Terminal, 
  Sparkles, 
  Zap, 
  BarChart3, 
  GitBranch, 
  Lock, 
  Globe, 
  Check, 
  ChevronDown, 
  Star,
  Play,
  RotateCcw,
  Cpu
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  TRUSTED_COMPANIES, 
  FEATURES_GRID, 
  STATS, 
  TESTIMONIALS, 
  PRICING_PLANS, 
  FAQ_ITEMS 
} from '../data/mockData';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  // Terminal Simulator states
  const [terminalState, setTerminalState] = useState<'idle' | 'running' | 'success'>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '// Ready to launch your next project.',
    '// Press "Simulate Deploy" to trigger the pipeline.'
  ]);

  const handleSimulateDeploy = async () => {
    if (terminalState === 'running') return;
    setTerminalState('running');
    setTerminalLogs(['$ devspace deploy --project webapp-v2']);
    
    const steps = [
      '⚏ Initializing sandbox runtime environment...',
      '✦ Pulling github.com/devspace/webapp-v2 (main)...',
      '✔ Cloned successfully: 42 files (14.2MB)',
      '⚏ Running production compiler (Vite v6.2.3)...',
      '✔ Bundle finished: dist/ (1.2MB, 400ms compile)',
      '✦ Uploading static bundle to DevSpace CDN Edge nodes...',
      '✔ Multi-region routing mapped in Tokyo, London, Oregon.',
      '🚀 Deployment finished! Uptime 100%. Url: https://webapp-v2.devspace.app'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 550));
      setTerminalLogs((prev) => [...prev, steps[i]]);
    }
    setTerminalState('success');
  };

  const handleResetTerminal = () => {
    setTerminalLogs([
      '// Ready to launch your next project.',
      '// Press "Simulate Deploy" to trigger the pipeline.'
    ]);
    setTerminalState('idle');
  };

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  // Helper mapping icon string to actual Lucide Icon
  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap': return <Zap className="h-5 w-5 text-yellow-400" />;
      case 'Sparkles': return <Sparkles className="h-5 w-5 text-purple-400" />;
      case 'BarChart3': return <BarChart3 className="h-5 w-5 text-blue-400" />;
      case 'GitBranch': return <GitBranch className="h-5 w-5 text-emerald-400" />;
      case 'Lock': return <Lock className="h-5 w-5 text-pink-400" />;
      case 'Globe': return <Globe className="h-5 w-5 text-teal-400" />;
      default: return <Terminal className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-[#030712] min-h-screen text-gray-100 selection:bg-indigo-500/30 selection:text-white" id="devspace-home-page">
      {/* Navbar Inclusion */}
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-gray-900/40">
        {/* Glow ambient backdrops */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-8">
          
          {/* Sparkle Banner */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-300 shadow-md">
            <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-spin-slow" />
            <span>Next-gen Developer Console is now general public</span>
            <ArrowRight className="h-3 w-3" />
          </div>

          {/* Master Headings */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] font-sans">
            Deploy your code to the edge. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Co-author with AI agents.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Eliminate complex DevOps overhead. DevSpace enables you to spin up high-performance full-stack web architectures, view stream telemetry, and debug code instantly.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 rounded-xl font-bold text-white text-center transition-all duration-200 shadow-[0_0_30px_rgba(139,92,246,0.35)] flex items-center justify-center gap-2"
            >
              Start Building Free <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white rounded-xl font-semibold border border-gray-800 text-center transition-colors duration-150"
            >
              View Pricing
            </a>
          </div>

          {/* Secondary stats link or note */}
          <p className="text-xs text-gray-500 font-mono">
            No credit card required. Includes full sandboxing with custom devspace.app subdomains.
          </p>
        </div>
      </section>

      {/* 2. Trusted Companies Marquee */}
      <section className="py-12 bg-gray-950/40 border-b border-gray-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest font-mono">
            Powering cloud operations for the next generation of builders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
            {TRUSTED_COMPANIES.map((company) => (
              <div key={company.name} className="flex items-center gap-2 text-white">
                <span className="text-2xl font-semibold font-mono">{company.logo}</span>
                <span className="font-sans font-bold tracking-tight text-sm md:text-base">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Preview / Interactive Terminal Simulator */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Cpu className="h-5 w-5" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              A high-performance pipeline <br />
              <span className="text-indigo-400">designed in the browser.</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Experience the instant speed of our compiler. Test a live pipeline simulator. Our edge system wraps React, Vite, Node, and Rust applications, and spins them up on worldwide edge routing servers in under 5 seconds.
            </p>
            
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <p className="text-sm text-gray-300">Fast cold-starts bypassing traditional VM container lag.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <p className="text-sm text-gray-300">Automated SSL generation and globally cached routing nodes.</p>
              </div>
            </div>
          </div>

          {/* Interactive Simulator Card Block */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-gray-950 border border-gray-800 overflow-hidden shadow-2xl shadow-indigo-950/20">
              {/* Header */}
              <div className="bg-gray-900 px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <div className="h-3 w-3 rounded-full bg-green-500/70" />
                  <span className="text-[11px] font-mono text-gray-400 ml-2">devspace-terminal-v1</span>
                </div>
                <div className="flex items-center gap-2">
                  {terminalState === 'success' && (
                    <button
                      onClick={handleResetTerminal}
                      className="p-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                      title="Reset terminal"
                    >
                      <RotateCcw className="h-3 w-3" />
                    </button>
                  )}
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>

              {/* Logs area */}
              <div className="p-5 font-mono text-xs text-left h-64 overflow-y-auto space-y-1.5 bg-gray-950/90 text-gray-300 leading-relaxed">
                {terminalLogs.map((log, index) => (
                  <p 
                    key={index} 
                    className={`${
                      log.startsWith('🚀') ? 'text-green-400 font-bold' : 
                      log.startsWith('✔') ? 'text-emerald-400' :
                      log.startsWith('⚏') ? 'text-indigo-400' :
                      log.startsWith('$') ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {log}
                  </p>
                ))}
              </div>

              {/* Console Trigger Bar */}
              <div className="bg-gray-900/60 px-4 py-4 border-t border-gray-800 flex items-center justify-between gap-4">
                <div className="text-xs text-gray-500">
                  Status: <span className="font-bold text-gray-300 capitalize">{terminalState}</span>
                </div>
                <button
                  onClick={handleSimulateDeploy}
                  disabled={terminalState === 'running'}
                  className={`px-4 py-2 rounded-lg text-xs font-bold text-white transition-all flex items-center gap-1.5 ${
                    terminalState === 'running' 
                      ? 'bg-gray-800 cursor-not-allowed opacity-50' 
                      : 'bg-indigo-600 hover:bg-indigo-500 shadow-md'
                  }`}
                >
                  <Play className="h-3 w-3 fill-white" /> Simulate Deploy
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Features Bento Grid */}
      <section className="py-24 border-t border-b border-gray-900 bg-gray-950/20" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono">
              Features Set
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
              Engineered for absolute performance.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              DevSpace wraps custom server components and caching layouts, giving your customers blazing fast speeds out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES_GRID.map((feat) => (
              <div 
                key={feat.id}
                className="group relative rounded-2xl bg-gray-950 border border-gray-900 hover:border-indigo-500/30 p-6 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/20"
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="h-10 w-10 rounded-xl bg-gray-900 border border-gray-800 group-hover:border-indigo-500/30 flex items-center justify-center mb-5 transition-colors">
                  {getIcon(feat.iconName)}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Statistics Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center p-6 bg-[#090d16]/40 border border-gray-900/60 rounded-2xl">
              <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 font-sans">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 font-mono mt-2 font-bold uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Testimonials Deck */}
      <section className="py-24 border-t border-gray-900 bg-gray-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono">
              User Satisfaction
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
              A choice trusted by world creators.
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              Read how Staff Engineers and fast-scaling startups rely on DevSpace to deploy their systems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id} 
                className="bg-gray-950/80 border border-gray-900 rounded-2xl p-6 text-left relative flex flex-col justify-between"
              >
                {/* Stars rating */}
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-gray-300 text-sm italic leading-relaxed mb-6">
                  "{test.content}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-900">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="h-10 w-10 rounded-full object-cover border border-gray-800"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{test.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">
                      {test.role}, <span className="text-indigo-400 font-semibold">{test.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Pricing Matrix Section */}
      <section className="py-24 border-t border-gray-900" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono">
              Flexible Tiers
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto">
              Fair, developer-first pricing.
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              Start building for free. Upgrade to Pro as your pipeline demand and active team collaboration grows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`relative rounded-3xl border text-left p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular 
                    ? 'bg-[#090d16] border-indigo-500 shadow-2xl shadow-indigo-950/30 md:-translate-y-2' 
                    : 'bg-gray-950/60 border-gray-900 hover:border-gray-800'
                }`}
              >
                {/* Popularity Badge */}
                {plan.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white font-mono font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Most Popular Choice
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1.5 py-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{plan.price}</span>
                    <span className="text-xs text-gray-500 font-mono">/ {plan.period}</span>
                  </div>

                  <div className="border-t border-gray-900 pt-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    to="/dashboard"
                    className={`block w-full text-center py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:opacity-95'
                        : 'bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-800'
                    }`}
                  >
                    {plan.ctaText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-24 border-t border-gray-900 bg-gray-950/10" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono">
              Knowledge base
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm">
              Everything you need to know about our microservices, API variables, and computing enclaves.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="rounded-xl border border-gray-900 bg-[#060810] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-sm sm:text-base font-semibold text-white hover:text-indigo-300 transition-colors text-left"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-250 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-gray-900/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Glowing CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Glow backdrop inside card */}
        <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative rounded-3xl bg-gradient-to-b from-[#0b0f19] to-gray-950 border border-gray-800 p-8 sm:p-16 text-center space-y-6 max-w-5xl mx-auto shadow-2xl shadow-indigo-950/35">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to experience <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              blazing fast deployments?
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Connect your Github repo or download our lightweight CLI package. Host your web platforms globally with DevSpace starting today.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-950"
            >
              Start Free Trial
            </Link>
            <a
              href="mailto:support@devspace.app"
              className="w-full sm:w-auto px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-xl text-sm font-bold border border-gray-800"
            >
              Talk to Platform Team
            </a>
          </div>

          <p className="text-[10px] text-gray-500 font-mono">
            Requires no setup fees. Up to 10 deploys per day on the free hobby cluster.
          </p>
        </div>
      </section>

      {/* Footer Inclusion */}
      <Footer />
    </div>
  );
}
