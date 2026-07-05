import React, { useState } from 'react';
import { 
  Sparkles, 
  Cpu, 
  Activity, 
  Zap, 
  Database, 
  Layers, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Send,
  Trash,
  CheckCircle2,
  ListTodo
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import { 
  RECENT_ACTIVITIES, 
  INITIAL_TASKS, 
  TaskItem, 
  AI_REPLIES 
} from '../data/mockData';

// Chart dummy data
const TELEMETRY_CHART_DATA = [
  { hour: '00:00', requests: 120, latency: 14.2 },
  { hour: '04:00', requests: 180, latency: 13.8 },
  { hour: '08:00', requests: 450, latency: 15.1 },
  { hour: '12:00', requests: 890, latency: 18.4 },
  { hour: '16:00', requests: 720, latency: 16.2 },
  { hour: '20:00', requests: 510, latency: 14.5 },
  { hour: '24:00', requests: 310, latency: 13.9 },
];

export default function Dashboard() {
  // Tasks state
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');

  // AI assistant state
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    { 
      sender: 'ai', 
      text: "Hello Qais! I'm your DevSpace contextual assistant. Ask me about your deploy status, relational schemas, or performance.", 
      time: 'Just now' 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Stats cards
  const stats = [
    { label: 'Active Clusters', value: '3 / 3', desc: 'Tokyo, Oregon, London nodes live', icon: Layers, color: 'text-indigo-400 bg-indigo-500/10' },
    { label: 'Edge Bandwidth', value: '14.2 GB', desc: '14.2% of your Pro 100GB quota', icon: Zap, color: 'text-yellow-400 bg-yellow-500/10' },
    { label: 'Platform CPU Load', value: '38.4%', desc: 'Optimized via custom micro-VMs', icon: Cpu, color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Database Sync', value: 'Synced', desc: 'PostgreSQL cluster running healthy', icon: Database, color: 'text-purple-400 bg-purple-500/10' },
  ];

  // Task Handlers
  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: 'Feature',
      priority: newTaskPriority,
      completed: false
    };
    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // AI Handlers
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || userInput;
    if (!textToSend.trim() || isAiTyping) return;

    // Add user message
    const userMsg = { sender: 'user' as const, text: textToSend, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    if (!customText) setUserInput('');

    // Trigger Typing simulation
    setIsAiTyping(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Resolve reply
    const normText = textToSend.toLowerCase();
    let replyText = `I processed your request, but I couldn't find a direct matches. You can ask me "status", "deploy", or "database" for contextual answers.`;
    
    if (normText.includes('hello') || normText.includes('hi')) {
      replyText = AI_REPLIES.hello;
    } else if (normText.includes('deploy') || normText.includes('host') || normText.includes('publish')) {
      replyText = AI_REPLIES.deploy;
    } else if (normText.includes('status') || normText.includes('health') || normText.includes('live')) {
      replyText = AI_REPLIES.status;
    } else if (normText.includes('database') || normText.includes('sql') || normText.includes('schema')) {
      replyText = AI_REPLIES.database;
    } else if (normText.includes('help')) {
      replyText = AI_REPLIES.help;
    }

    const aiMsg = { sender: 'ai' as const, text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, aiMsg]);
    setIsAiTyping(false);
  };

  return (
    <div className="bg-[#030712] min-h-screen text-gray-100 flex font-sans" id="devspace-dashboard-page">
      {/* 1. Sidebar Navigation */}
      <DashboardSidebar />

      {/* 2. Primary Page Container */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen w-full">
        <DashboardHeader />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl w-full mx-auto">
          
          {/* Welcome Dashboard Heading Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-900 pb-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Console Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Workspace: <span className="text-indigo-400 font-semibold">DevSpace Inc.</span> | Cluster Zone: Tokyo-Oregon Edge Group
              </p>
            </div>
            <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-xl text-xs text-indigo-300">
              <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
              <span>DevSpace AI is active. 3 database optimizations proposed.</span>
            </div>
          </div>

          {/* 3. Analytics Cards Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={i}
                  className="bg-gray-950/80 border border-gray-900 rounded-2xl p-5 hover:border-gray-800 transition-all flex items-start gap-4"
                >
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <IconComponent className="h-5.5 w-5.5" />
                  </div>
                  <div className="text-left space-y-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</p>
                    <h3 className="text-xl font-bold text-white tracking-tight">{item.value}</h3>
                    <p className="text-[10px] text-gray-400 font-mono leading-tight">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </section>

          {/* 4. Chart & AI Assistant Split Layout */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Chart Area */}
            <div className="lg:col-span-7 bg-gray-950 border border-gray-900 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-lg">
              <div className="flex items-center justify-between border-b border-gray-900/60 pb-3">
                <div className="text-left">
                  <h3 className="text-sm sm:text-base font-bold text-white">Edge Load Telemetry</h3>
                  <p className="text-[11px] text-gray-500 font-mono">Live hourly queries processed globally</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 bg-gray-900/60 px-2.5 py-1 rounded-lg border border-gray-800">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  <span>Queries (K/hr)</span>
                </div>
              </div>

              {/* Chart Component container */}
              <div className="h-64 w-full text-xs" style={{ minWidth: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={TELEMETRY_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#111827" strokeDasharray="3 3" />
                    <XAxis dataKey="hour" stroke="#4b5563" fontSize={10} tickLine={false} />
                    <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#090d16', borderColor: '#1f2937', borderRadius: '12px' }}
                      labelStyle={{ color: '#9ca3af', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="requests" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRequests)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Custom micro benchmarks footnote */}
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-3 border-t border-gray-900/60">
                <span>Avg latency: <strong className="text-green-400">14.8ms</strong></span>
                <span>Max spike: <strong className="text-yellow-400">18.4ms (12:00)</strong></span>
                <span>Peak bandwidth: <strong className="text-indigo-400">1.2 Gbps</strong></span>
              </div>
            </div>

            {/* AI Assistant Card Column */}
            <div className="lg:col-span-5 bg-gray-950 border border-gray-900 rounded-2xl p-5 flex flex-col justify-between shadow-lg h-[410px]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-900/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Sparkles className="h-4 w-4 animate-spin-slow" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs sm:text-sm font-bold text-white">DevSpace AI Assistant</h3>
                    <p className="text-[10px] text-green-400 font-mono">Autonomous active context agent</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-gray-900 rounded-full border border-gray-800 text-purple-400">
                  Twin Node v2
                </span>
              </div>

              {/* Scroll Chat window */}
              <div className="flex-1 my-3 overflow-y-auto space-y-3 pr-1 text-xs text-left">
                {messages.map((msg, i) => (
                  <div 
                    key={i}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-gray-900 text-gray-200 border border-gray-800 rounded-tl-none font-sans'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-gray-500 font-mono mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
                {isAiTyping && (
                  <div className="flex items-center gap-1.5 p-2.5 bg-gray-900/40 rounded-xl max-w-[40%] text-[10px] text-gray-500 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.4s]" />
                    <span>Analyzing stack...</span>
                  </div>
                )}
              </div>

              {/* Quick Actions overlay */}
              <div className="flex flex-wrap items-center gap-1.5 pb-2 border-t border-gray-900 pt-2.5">
                <span className="text-[10px] text-gray-500 font-mono">Ask:</span>
                <button 
                  onClick={() => handleSendMessage('What is the cluster status?')}
                  className="text-[10px] font-mono bg-gray-900 hover:bg-gray-800 border border-gray-800 px-2 py-0.5 rounded-md text-gray-300"
                >
                  "status"
                </button>
                <button 
                  onClick={() => handleSendMessage('How do I deploy on DevSpace?')}
                  className="text-[10px] font-mono bg-gray-900 hover:bg-gray-800 border border-gray-800 px-2 py-0.5 rounded-md text-gray-300"
                >
                  "deploy"
                </button>
                <button 
                  onClick={() => handleSendMessage('Tell me about my database relational schema.')}
                  className="text-[10px] font-mono bg-gray-900 hover:bg-gray-800 border border-gray-800 px-2 py-0.5 rounded-md text-gray-300"
                >
                  "schema"
                </button>
              </div>

              {/* Text Input Row */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                  placeholder="Type questions to AI Assistant..."
                  className="flex-1 bg-[#05070c] border border-gray-800 rounded-xl py-2 px-3 text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="p-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-white transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          {/* 5. Split Row: Interactive Tasks & Recent Activity */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Interactive Tasks Board */}
            <div className="lg:col-span-6 bg-gray-950 border border-gray-900 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-900 pb-3">
                <div className="flex items-center gap-2">
                  <ListTodo className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="text-sm sm:text-base font-bold text-white">Interactive Team Sprint</h3>
                </div>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-mono">
                  {tasks.filter(t => !t.completed).length} open
                </span>
              </div>

              {/* Input for new tasks */}
              <form onSubmit={handleAddTask} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Create active task in sprint..."
                  className="flex-1 bg-gray-900/60 border border-gray-800 rounded-xl py-1.5 px-3.5 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
                />
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  className="bg-gray-900 border border-gray-800 text-[11px] text-gray-300 rounded-xl p-1.5 focus:outline-none"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button
                  type="submit"
                  className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </form>

              {/* Tasks mapping logs */}
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                {tasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-900/40 border border-gray-900 hover:border-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className="text-gray-500 hover:text-indigo-400 transition-colors"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                        ) : (
                          <span className="block h-4.5 w-4.5 rounded-full border border-gray-700 hover:border-indigo-400" />
                        )}
                      </button>
                      <div>
                        <p className={`text-xs font-medium ${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-100'
                        }`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-mono bg-gray-900 text-gray-500 px-1.5 rounded">
                            {task.category}
                          </span>
                          <span className={`text-[9px] font-mono px-1.5 rounded ${
                            task.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                            task.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                            'bg-blue-500/10 text-blue-400'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1 rounded text-gray-500 hover:text-red-400 hover:bg-gray-900/60 transition-colors"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity feed */}
            <div className="lg:col-span-6 bg-gray-950 border border-gray-900 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-900 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4.5 w-4.5 text-indigo-400 animate-pulse" />
                  <h3 className="text-sm sm:text-base font-bold text-white">Recent Activities</h3>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">Continuous Stream</span>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {RECENT_ACTIVITIES.map((act) => (
                  <div key={act.id} className="flex items-start gap-3.5 text-xs text-left">
                    {/* Visual indicators */}
                    <div className="mt-0.5 shrink-0">
                      {act.user.avatar ? (
                        <img src={act.user.avatar} alt="User" className="h-7 w-7 rounded-full border border-gray-800" />
                      ) : (
                        <div className="h-7 w-7 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-[10px] font-mono">
                          AI
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-gray-200 font-medium break-words leading-relaxed">
                        <strong className="text-white">{act.user.name || 'AI'}</strong> {act.action}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-indigo-400 font-mono truncate">{act.project}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-[9px] text-gray-500 font-mono shrink-0">{act.timestamp}</span>
                      </div>
                    </div>

                    {/* Status Dot */}
                    <span className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                      act.status === 'success' ? 'bg-green-500' :
                      act.status === 'failed' ? 'bg-red-500' :
                      act.status === 'info' ? 'bg-purple-500' : 'bg-blue-500'
                    }`} />
                  </div>
                ))}
              </div>
            </div>

          </section>

        </main>
      </div>
    </div>
  );
}
