export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ActivityItem {
  id: string;
  type: 'deploy' | 'commit' | 'ai' | 'alert' | 'billing';
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  project: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed' | 'info';
}

export interface TaskItem {
  id: string;
  title: string;
  category: 'Feature' | 'Bug' | 'Docs' | 'Ops';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  category: 'system' | 'ai' | 'team';
}

// Trusted Companies list
export const TRUSTED_COMPANIES = [
  { name: 'Vercel', logo: '▲' },
  { name: 'GitHub', logo: '⌘' },
  { name: 'Stripe', logo: '🝔' },
  { name: 'Linear', logo: '⧉' },
  { name: 'Retool', logo: '⎋' },
  { name: 'Supabase', logo: '⚡' },
];

// Product Features
export const FEATURES_GRID: Feature[] = [
  {
    id: 'f1',
    title: 'Instant Cloud Deploys',
    description: 'Deploy web apps, API endpoints, or Cron routines in seconds. Multi-region routing and smart edge caching built-in.',
    iconName: 'Zap',
  },
  {
    id: 'f2',
    title: 'Contextual AI Agent',
    description: 'An AI engineer in your workspace. Ask to debug runtime errors, refactor TypeScript files, or spin up Express middleware.',
    iconName: 'Sparkles',
  },
  {
    id: 'f3',
    title: 'Vibrant Telemetry Boards',
    description: 'Real-time charting, stream metrics, memory usage alerts, and active server trace analytics configured with no extra code.',
    iconName: 'BarChart3',
  },
  {
    id: 'f4',
    title: 'Team Pipelines',
    description: 'Connect your GitHub/GitLab repository. Staging pull previews are generated automatically for immediate testing.',
    iconName: 'GitBranch',
  },
  {
    id: 'f5',
    title: 'End-to-End Encryption',
    description: 'Variables, API tokens, and database secrets are protected by bank-grade security protocols and secure hardware enclaves.',
    iconName: 'Lock',
  },
  {
    id: 'f6',
    title: 'Global Ingress Routing',
    description: 'A global CDN with sub-millisecond route optimization, intelligent traffic shaping, and automatic DDoS mitigation.',
    iconName: 'Globe',
  },
];

// Statistics
export const STATS = [
  { value: '99.99%', label: 'Platform Uptime' },
  { value: '14.2ms', label: 'Average Edge Delay' },
  { value: '2.4M+', label: 'Deploys This Week' },
  { value: '180K+', label: 'Devs Worldwide' },
];

// Testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Lead Architect',
    company: 'ScribeFlow',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    content: 'DevSpace completely eliminated our DevOps pipeline complexity. We migrated 42 services from our legacy stack in just one afternoon. The absolute developer joy is unparalleled.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Marcus Chen',
    role: 'CTO & Co-Founder',
    company: 'Linearity AI',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    content: 'The integrated AI coder is incredible. It automatically maps stack traces back to git commits, and suggests one-click solutions inside our dashboard. A massive force multiplier.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Staff Platform Engineer',
    company: 'FintechCore',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    content: 'We had strict compliance concerns about secrets and environment variables. DevSpace\'s hardware-enclave secret key manager made our security audits pass in minutes.',
    rating: 5,
  },
];

// Pricing Plans
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'p1',
    name: 'Hobby',
    price: '$0',
    period: 'forever',
    description: 'Perfect for building personal hacks, experimental web apps, and portfolio sites.',
    features: [
      '3 active web projects',
      'Deploy on push (GitHub webhook)',
      'Basic AI autocomplete support',
      '1GB edge bandwidth quota',
      'Shared devspace.app subdomain',
    ],
    isPopular: false,
    ctaText: 'Start for Free',
  },
  {
    id: 'p2',
    name: 'Pro',
    price: '$29',
    period: 'user / month',
    description: 'Our most popular plan for professional builders, teams, and high-performance apps.',
    features: [
      'Unlimited web projects',
      'Custom domains with automated SSL',
      'Premium Contextual AI Agent (GPT-4 / Gemini Pro equivalent)',
      '100GB edge bandwidth quota',
      'Priority support chat channel (under 30 mins)',
      'Collaborative live workspaces',
    ],
    isPopular: true,
    ctaText: 'Upgrade to Pro',
  },
  {
    id: 'p3',
    name: 'Enterprise',
    price: '$149',
    period: 'team / month',
    description: 'For organizations demanding custom control, isolated networks, and tailored security controls.',
    features: [
      'Dedicated multi-region hosting nodes',
      'SAML SSO & OKTA integration',
      'Custom fine-tuned LLM coding agents',
      'Isolated VPC networks and static IP',
      '99.99% service level agreements (SLAs)',
      '24/7 designated solutions engineer',
    ],
    isPopular: false,
    ctaText: 'Contact Sales',
  },
];

// FAQs
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'fq1',
    question: 'How does DevSpace compare to traditional PaaS tools like Heroku?',
    answer: 'DevSpace is built for the modern edge. Unlike old-school virtualization servers, we optimize assets instantly and route them to edge clusters. Plus, we feature native AI agents, real-time analytics, and collaborative staging environments without requiring extra SaaS add-ons.',
  },
  {
    id: 'fq2',
    question: 'How do you guarantee the security of our variables and secrets?',
    answer: 'All environment keys and third-party secrets are encrypted at rest with AES-GCM-256 and decrypted on-the-fly inside micro-VM sandboxes. Only your running app instances have temporary memory-bound access to these variables.',
  },
  {
    id: 'fq3',
    question: 'Does the AI agent have write-access to my GitHub codebase?',
    answer: 'The AI assistant operates within your specified guidelines. In the cloud dashboard, it can draft pull requests and suggest file refactoring edits. It will only commit or merge files after you explicitly review and approve them in your interface.',
  },
  {
    id: 'fq4',
    question: 'Is there a limit on bandwidth or request volume?',
    answer: 'Our free tier includes 1GB of edge-cached bandwidth per month, which easily covers small apps. The Pro tier expands this limit to 100GB with fair-use pricing thereafter. We never shut down your application; we notify you and scale bandwidth transparently.',
  },
];

// Recent Activities
export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act1',
    type: 'deploy',
    user: { name: 'You', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80' },
    action: 'deployed build #402',
    project: 'devspace-dashboard-prod',
    timestamp: '2 mins ago',
    status: 'success',
  },
  {
    id: 'act2',
    type: 'commit',
    user: { name: 'Sarah J.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80' },
    action: 'merged pull request #118 "fix: edge routing latency"',
    project: 'devspace-dashboard-prod',
    timestamp: '18 mins ago',
    status: 'success',
  },
  {
    id: 'act3',
    type: 'ai',
    user: { name: 'DevSpace AI', avatar: '' },
    action: 'optimized database index query in db/schema.ts',
    project: 'analytics-api-service',
    timestamp: '45 mins ago',
    status: 'info',
  },
  {
    id: 'act4',
    type: 'alert',
    user: { name: 'System Sentinel', avatar: '' },
    action: 'CPU usage spiked above 92% (auto-scaled +1 node)',
    project: 'ingress-gateway-service',
    timestamp: '1 hour ago',
    status: 'failed',
  },
  {
    id: 'act5',
    type: 'billing',
    user: { name: 'Fintech Bot', avatar: '' },
    action: 'Invoiced processed for July subscriptions',
    project: 'DevSpace Inc.',
    timestamp: '5 hours ago',
    status: 'success',
  },
];

// Tasks list
export const INITIAL_TASKS: TaskItem[] = [
  { id: 't1', title: 'Connect primary database to edge-cluster nodes', category: 'Ops', priority: 'high', completed: false },
  { id: 't2', title: 'Implement user profile avatar cropping widget', category: 'Feature', priority: 'medium', completed: true },
  { id: 't3', title: 'Audit server environment variable access logs', category: 'Ops', priority: 'high', completed: false },
  { id: 't4', title: 'Fix CSS layout layout breakage on viewport width < 360px', category: 'Bug', priority: 'low', completed: true },
  { id: 't5', title: 'Document the Gemini-based multi-turn function triggers', category: 'Docs', priority: 'medium', completed: false },
];

// System Notifications
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'not1',
    title: 'New Region Deployed',
    description: 'Tokyo (ap-northeast-1) edge location is now live for all accounts.',
    time: '10m ago',
    unread: true,
    category: 'system',
  },
  {
    id: 'not2',
    title: 'AI optimization complete',
    description: 'DevSpace AI successfully optimized 3 SQL endpoints, reducing load times by 12%.',
    time: '1h ago',
    unread: true,
    category: 'ai',
  },
  {
    id: 'not3',
    title: 'New Member Joined',
    description: 'Elena Rostova accepted your team invite to workspace DevSpace Inc.',
    time: '1d ago',
    unread: false,
    category: 'team',
  },
];

// Interactive replies for the AI assistant card
export const AI_REPLIES: Record<string, string> = {
  hello: `Hello! I'm your DevSpace Contextual AI Coder. I have full read access to your active services and configuration files. How can I assist you with your deployments or codebase today?`,
  help: `I can help you with:
- **Deploying services**: Ask how to deploy a Next.js or Vite project on DevSpace.
- **Diagnostics**: Paste an error log, and I will analyze the stack trace.
- **Secrets & Security**: Check if you have any exposed secret keys in your environment setup.
- **Optimization**: Analyze code performance or recommend caching strategies.`,
  deploy: `Deploying on DevSpace is straightforward! You can either:
1. Connect your **GitHub repo** in Settings. We will automatically deploy on every \`git push\`.
2. Use our global CLI: Run \`npm i -g @devspace/cli && devspace deploy\` in your terminal.
3. Configure our standard CI/CD pipeline template inside \`.github/workflows/devspace.yml\`.`,
  status: `All 3 of your core microservices are operating beautifully!
- **devspace-dashboard-prod** (Vite SPA) - **Healthy** (99.99% uptime, 12ms avg delay)
- **analytics-api-service** (Node/Express API) - **Healthy** (99.98% uptime)
- **ingress-gateway-service** (Rust Routing Node) - **Healthy** (100% uptime)`,
  database: `I detected a standard SQL relational schema. I recommend setting up an index on your \`userId\` and \`createdAt\` columns in your \`sessions\` table to decrease your dashboard query times by up to 45%. Would you like me to draft a migration PR?`,
};
