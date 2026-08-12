import {
  Workspace,
  Integration,
  KnowledgeSource,
  PromptVersion,
  AIModelConfig,
  FeatureToggle,
  WidgetCustomization,
  Conversation,
  TeamMember,
  Invoice
} from './types';

export const mockWorkspaces: Workspace[] = [
  { id: 'ws-1', name: 'RDX Storefront US', slug: 'RDX-us', plan: 'Enterprise', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80' },
  { id: 'ws-2', name: 'RDX Global Retail', slug: 'RDX-global', plan: 'Pro', logoUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100&auto=format&fit=crop&q=80' },
  { id: 'ws-3', name: 'Dev Sandbox', slug: 'dev-sandbox', plan: 'Starter' },
];

export const mockIntegrations: Integration[] = [
  {
    id: 'int-1',
    name: 'Shopify Storefront',
    type: 'shopify',
    description: 'Sync products, inventory, orders, customer details, and track shipments in real-time.',
    logo: 'ShoppingBag',
    status: 'Connected',
    lastSync: '2 minutes ago',
    entities: { products: true, orders: true, customers: true, returns: true },
    webhookUrl: 'https://api.RDX Assistant.io/v1/webhooks/shopify/wh_9023849182',
    webhookSecret: 'sh_sec_89f7a982f1b0a823c91e',
  },
  {
    id: 'int-2',
    name: 'Amazon Seller Central',
    type: 'amazon',
    description: 'Fetch FBA order updates, tracking IDs, and product catalog listings.',
    logo: 'Box',
    status: 'Connected',
    lastSync: '15 minutes ago',
    entities: { products: true, orders: true, customers: false, returns: true },
    webhookUrl: 'https://api.RDX Assistant.io/v1/webhooks/amazon/wh_4918293810',
    webhookSecret: 'amz_sec_78192a01f9812e',
  },
  {
    id: 'int-3',
    name: 'Walmart Marketplace',
    type: 'walmart',
    description: 'Automate customer support for Walmart marketplace orders and returns.',
    logo: 'Store',
    status: 'Not Connected',
    entities: { products: true, orders: true, customers: false, returns: false },
    webhookUrl: 'https://api.RDX Assistant.io/v1/webhooks/walmart/wh_pending',
    webhookSecret: 'wm_sec_pending',
  },
  {
    id: 'int-4',
    name: 'Custom Website Crawler',
    type: 'website',
    description: 'Recursively crawl website domain to extract FAQs, policies, and product documentation.',
    logo: 'Globe',
    status: 'Syncing',
    lastSync: 'Syncing now (84% complete)...',
    entities: { products: false, orders: false, customers: false, returns: false },
    webhookUrl: 'https://api.RDX Assistant.io/v1/webhooks/crawler/wh_781920',
    webhookSecret: 'web_sec_99182a',
  },
  {
    id: 'int-5',
    name: 'Zendesk Desk Sync',
    type: 'zendesk',
    description: 'Seamlessly hand over unresolved tickets to human agents on Zendesk.',
    logo: 'Headphones',
    status: 'Not Connected',
    entities: { products: false, orders: false, customers: true, returns: false },
    webhookUrl: 'https://api.RDX Assistant.io/v1/webhooks/zendesk/wh_disabled',
    webhookSecret: 'zen_sec_disabled',
  },
];

export const mockKnowledgeSources: KnowledgeSource[] = [
  { id: 'ks-1', name: 'Shopify Product Catalog (1,420 Items)', type: 'Catalog', vectorCount: 14200, status: 'Ready', enabled: true, lastUpdated: '10 mins ago' },
  { id: 'ks-2', name: 'Returns & Refund Policy 2026.pdf', type: 'Document', vectorCount: 850, status: 'Ready', enabled: true, lastUpdated: 'Yesterday', fileSize: '2.4 MB' },
  { id: 'ks-3', name: 'https://RDXstore.com/help-center/*', type: 'Website', vectorCount: 3200, status: 'Processing', enabled: true, lastUpdated: 'Just now' },
  { id: 'ks-4', name: 'Shipping & International Delivery FAQs', type: 'FAQ', vectorCount: 420, status: 'Ready', enabled: false, lastUpdated: '3 days ago' },
  { id: 'ks-5', name: 'Warranty Claim Guidelines.docx', type: 'Document', vectorCount: 0, status: 'Failed', enabled: false, lastUpdated: '5 days ago', fileSize: '1.1 MB' },
];

export const mockPromptVersions: PromptVersion[] = [
  {
    id: 'pv-3',
    version: 'v2.1 (Active)',
    content: `You are RDXBot, an expert AI shopping assistant for {{store_name}}.

Key Instructions:
1. Always maintain a warm, empathetic, and professional tone.
2. Check order statuses using {{order_status}} before answering delivery questions.
3. Recommend relevant products from {{product_catalog}} when customers ask for suggestions.
4. If a customer is dissatisfied or asks for a human, initiate {{human_handoff}}.
5. Adhere strictly to the {{refund_policy}} for return requests.`,
    active: true,
    createdAt: '2026-08-10 14:30',
    author: 'RDX Lin'
  },
  {
    id: 'pv-2',
    version: 'v2.0',
    content: `You are a helpful assistant for {{store_name}}. Help customers find products in {{product_catalog}} and check {{order_status}}.`,
    active: false,
    createdAt: '2026-08-01 09:15',
    author: 'Alex Chen'
  },
  {
    id: 'pv-1',
    version: 'v1.0',
    content: `Standard customer service prompt for general inquiries.`,
    active: false,
    createdAt: '2026-07-15 11:00',
    author: 'RDX Lin'
  }
];

export const mockAIModelConfig: AIModelConfig = {
  provider: 'OpenAI',
  modelId: 'gpt-4o',
  apiKeySet: true,
  temperature: 0.3,
  maxTokens: 1024,
  topP: 0.95,
};

export const mockFeatureToggles: FeatureToggle[] = [
  { id: 'ft-1', title: 'Product Recommendation Engine', description: 'Analyze intent and recommend products directly in chat cards with buy buttons.', category: 'E-commerce', enabled: true, iconName: 'Sparkles' },
  { id: 'ft-2', title: 'Real-time Order Tracking', description: 'Authenticate customers via email or order ID and fetch carrier tracking status.', category: 'E-commerce', enabled: true, iconName: 'PackageCheck' },
  { id: 'ft-3', title: 'Automated Returns & Refunds', description: 'Generate pre-paid return shipping labels based on your store refund policy.', category: 'E-commerce', enabled: true, iconName: 'RotateCcw' },
  { id: 'ft-4', title: 'Order Cancellation Flow', description: 'Allow customers to cancel unfulfilled orders within 1 hour of purchase.', category: 'E-commerce', enabled: false, iconName: 'XCircle' },
  { id: 'ft-5', title: 'Human Agent Handoff', description: 'Automatically transfer chat to a live team member when sentiment drops.', category: 'Customer Support', enabled: true, iconName: 'UserCheck' },
  { id: 'ft-6', title: 'Multi-Language Auto Translation', description: 'Detect customer language and translate responses in 40+ languages.', category: 'Customer Support', enabled: true, iconName: 'Languages' },
  { id: 'ft-7', title: 'Proactive Greeting Trigger', description: 'Pop up welcome messages when visitors linger on checkout or product pages.', category: 'Automation', enabled: false, iconName: 'MessageSquarePlus' },
  { id: 'ft-8', title: 'Damaged Product Claims', description: 'Collect photo uploads from users for damaged goods and open support claims.', category: 'Customer Support', enabled: true, iconName: 'AlertTriangle' },
];

export const mockWidgetCustomization: WidgetCustomization = {
  primaryColor: '#6366f1',
  accentColor: '#8b5cf6',
  botName: 'RDXBot',
  headerTitle: 'RDX Assistant ⚡',
  welcomeMessage: 'Hi there! 👋 How can I help you with your order or product questions today?',
  suggestedQuestions: [
    'Where is my order?',
    'What is your return policy?',
    'Can you recommend a wireless headset?'
  ],
  position: 'bottom-right',
  showBranding: true,
  avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
};

export const mockConversations: Conversation[] = [
  {
    id: 'conv-101',
    customer: {
      id: 'cust-1',
      name: 'Emma Watson',
      email: 'emma.w@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      location: 'New York, US',
      totalOrders: 6,
      lifetimeValue: 840,
      csatRating: 5
    },
    lastMessage: 'Thank you so much! Order tracking updated.',
    timestamp: '10:42 AM',
    status: 'resolved',
    sentiment: 'positive',
    channel: 'shopify',
    unread: false,
    assignedAgent: 'AI Assistant',
    messages: [
      { id: 'm1', sender: 'user', text: 'Hi! Can you tell me when my order #SH-9042 will arrive?', timestamp: '10:38 AM' },
      { id: 'm2', sender: 'bot', text: 'I would be happy to help! Let me look up order #SH-9042 for you.', timestamp: '10:38 AM' },
      { id: 'm3', sender: 'system', text: 'Fetched Shopify Order #SH-9042 (Status: Out for Delivery with FedEx)', timestamp: '10:39 AM' },
      { id: 'm4', sender: 'bot', text: 'Great news! Your order #SH-9042 is out for delivery today via FedEx. The estimated arrival is by 4:00 PM EST. Tracking number: 94001112023.', timestamp: '10:39 AM' },
      { id: 'm5', sender: 'user', text: 'Thank you so much! Order tracking updated.', timestamp: '10:42 AM' }
    ]
  },
  {
    id: 'conv-102',
    customer: {
      id: 'cust-2',
      name: 'Marcus Vance',
      email: 'marcus.v@techcorp.io',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      location: 'London, UK',
      totalOrders: 2,
      lifetimeValue: 310,
    },
    lastMessage: 'I need to speak to a human immediately regarding refund!',
    timestamp: '11:15 AM',
    status: 'handed_over',
    sentiment: 'negative',
    channel: 'shopify',
    unread: true,
    assignedAgent: 'RDX Lin',
    messages: [
      { id: 'm10', sender: 'user', text: 'My item arrived broken! Box was destroyed.', timestamp: '11:10 AM' },
      { id: 'm11', sender: 'bot', text: 'I am so sorry to hear that! You can submit a damaged item claim with a photo here.', timestamp: '11:11 AM' },
      { id: 'm12', sender: 'user', text: 'I need to speak to a human immediately regarding refund!', timestamp: '11:15 AM' },
      { id: 'm13', sender: 'system', text: 'Negative Sentiment Triggered -> Human Handoff Initiated (Assigned to RDX Lin)', timestamp: '11:15 AM' }
    ]
  },
  {
    id: 'conv-103',
    customer: {
      id: 'cust-3',
      name: 'Sophia Patel',
      email: 'sophia.p@designhub.co',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      location: 'San Francisco, CA',
      totalOrders: 14,
      lifetimeValue: 2450,
      csatRating: 5
    },
    lastMessage: 'Which wireless noise cancelling headphones do you recommend under $250?',
    timestamp: '11:20 AM',
    status: 'active',
    sentiment: 'neutral',
    channel: 'website',
    unread: true,
    messages: [
      { id: 'm20', sender: 'user', text: 'Which wireless noise cancelling headphones do you recommend under $250?', timestamp: '11:20 AM' },
      { id: 'm21', sender: 'bot', text: 'Based on your preferences, here are our top two wireless noise-cancelling models under $250:\n\n1. **RDX SoundPro ANC** - $199.99 (40h battery, active noise cancellation)\n2. **RDX Air Lite** - $149.99 (Ultra lightweight, 30h battery)\n\nWould you like me to send a 15% discount code for the SoundPro?', timestamp: '11:21 AM' }
    ]
  }
];

export const mockTeamMembers: TeamMember[] = [
  { id: 'tm-1', name: 'RDX Lin', email: 'RDX.lin@RDX Assistant.io', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', role: 'Owner', status: 'Active', lastActive: 'Now' },
  { id: 'tm-2', name: 'Alex Chen', email: 'alex.chen@RDX Assistant.io', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', role: 'Admin', status: 'Active', lastActive: '12 mins ago' },
  { id: 'tm-3', name: 'Jessica Miller', email: 'jessica.m@RDX Assistant.io', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', role: 'Agent', status: 'Active', lastActive: '1 hour ago' },
  { id: 'tm-4', name: 'David Kim', email: 'david.k@partner.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', role: 'Editor', status: 'Invited', lastActive: 'Never' },
];

export const mockInvoices: Invoice[] = [
  { id: 'INV-2026-008', date: 'Aug 1, 2026', amount: 299.00, status: 'Paid', pdfUrl: '#' },
  { id: 'INV-2026-007', date: 'Jul 1, 2026', amount: 299.00, status: 'Paid', pdfUrl: '#' },
  { id: 'INV-2026-006', date: 'Jun 1, 2026', amount: 299.00, status: 'Paid', pdfUrl: '#' },
  { id: 'INV-2026-005', date: 'May 1, 2026', amount: 199.00, status: 'Paid', pdfUrl: '#' },
];
