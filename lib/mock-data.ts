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
  { id: 'ws-1', name: 'RDX Storefront US', slug: 'rdx-us', plan: 'Enterprise', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80' },
  { id: 'ws-2', name: 'RDX Global Retail', slug: 'rdx-global', plan: 'Pro', logoUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100&auto=format&fit=crop&q=80' },
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
    region: 'global',
    entities: { products: true, orders: true, customers: true, returns: true },
    webhookUrl: 'https://api.aetherchat.io/v1/webhooks/shopify/wh_9023849182',
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
    region: 'global',
    entities: { products: true, orders: true, customers: false, returns: true },
    webhookUrl: 'https://api.aetherchat.io/v1/webhooks/amazon/wh_4918293810',
    webhookSecret: 'amz_sec_78192a01f9812e',
  },
  {
    id: 'int-3',
    name: 'Linnworks Multichannel OMS',
    type: 'linnworks',
    description: 'Centralize inventory management, warehouse order dispatch, stock levels, and postal manifest sync.',
    logo: 'Cpu',
    status: 'Connected',
    lastSync: '5 mins ago',
    region: 'global',
    entities: { products: true, orders: true, customers: true, returns: true },
    webhookUrl: 'https://api.aetherchat.io/v1/webhooks/linnworks/wh_991823',
    webhookSecret: 'lw_sec_9910283',
  },
  {
    id: 'int-4',
    name: 'eDesk E-Commerce Helpdesk',
    type: 'edesk',
    description: 'Unified customer support desk for eBay, Amazon, Shopify, and marketplace ticket resolution.',
    logo: 'MessageSquare',
    status: 'Connected',
    lastSync: '10 mins ago',
    region: 'global',
    entities: { products: false, orders: true, customers: true, returns: true },
    webhookUrl: 'https://api.aetherchat.io/v1/webhooks/edesk/wh_771829',
    webhookSecret: 'ed_sec_881920',
  },
  {
    id: 'int-5',
    name: 'LiveChat Customer Engagement',
    type: 'livechat',
    description: 'Real-time agent chat handoff, visitor monitoring, and omnichannel messaging support.',
    logo: 'Headphones',
    status: 'Connected',
    lastSync: 'Just now',
    region: 'global',
    entities: { products: false, orders: false, customers: true, returns: false },
    webhookUrl: 'https://api.aetherchat.io/v1/webhooks/livechat/wh_441920',
    webhookSecret: 'lc_sec_771029',
  },
  {
    id: 'int-6',
    name: 'CTS Logistics & Transport API',
    type: 'cts',
    description: 'Custom Transport System API for freight tracking, settlement manifests, and courier dispatch.',
    logo: 'Truck',
    status: 'Connected',
    lastSync: '12 mins ago',
    region: 'uk',
    entities: { products: false, orders: true, customers: false, returns: true },
    webhookUrl: 'https://api.aetherchat.io/v1/webhooks/cts/wh_331920',
    webhookSecret: 'cts_sec_110293',
  },
  {
    id: 'int-7',
    name: 'Ship24 Universal Tracking API',
    type: 'ship24',
    description: 'Global multi-carrier tracking engine supporting 1,200+ postal & express couriers worldwide.',
    logo: 'Truck',
    status: 'Connected',
    lastSync: 'Just now',
    region: 'global',
    entities: { products: false, orders: true, customers: false, returns: true },
    webhookUrl: 'https://api.aetherchat.io/v1/webhooks/ship24/wh_881920',
    webhookSecret: 's24_sec_901238',
  },
  {
    id: 'int-8',
    name: 'Yodel Delivery UK',
    type: 'yodel',
    description: 'Direct integration for Yodel UK parcel tracking, door-stop delivery updates, and driver ETA.',
    logo: 'Navigation',
    status: 'Connected',
    lastSync: '1 hour ago',
    region: 'uk',
    entities: { products: false, orders: true, customers: false, returns: true },
    webhookUrl: 'https://api.aetherchat.io/v1/webhooks/yodel/wh_771239',
    webhookSecret: 'yod_sec_339182',
  },
];

export const mockKnowledgeSources: KnowledgeSource[] = [
  { id: 'ks-1', name: 'Shopify Product Catalog (1,420 Items)', type: 'Catalog', vectorCount: 14200, status: 'Ready', enabled: true, lastUpdated: '10 mins ago' },
  { id: 'ks-2', name: 'Returns & Refund Policy 2026.pdf', type: 'Document', vectorCount: 850, status: 'Ready', enabled: true, lastUpdated: 'Yesterday', fileSize: '2.4 MB' },
  { id: 'ks-3', name: 'https://rdxstore.com/help-center/*', type: 'Website', vectorCount: 3200, status: 'Processing', enabled: true, lastUpdated: 'Just now' },
  { id: 'ks-4', name: 'Shipping & International Delivery FAQs', type: 'FAQ', vectorCount: 420, status: 'Ready', enabled: false, lastUpdated: '3 days ago' },
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
    author: 'RDX'
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
  {
    id: 'ft-1',
    title: 'Product Consultant Agent',
    description: 'Master agent for product discovery, comparisons, specifications, and fit advice.',
    category: 'E-commerce',
    enabled: true,
    iconName: 'Sparkles',
    subAgents: [
      { id: 'sa-1', name: 'Product Comparison Sub-Agent', description: 'Compares specs, prices, and features across multiple catalog items side-by-side.', enabled: true, role: 'Comparison Specialist' },
      { id: 'sa-2', name: 'Product Information & Specs Sub-Agent', description: 'Answers technical specs, dimensions, compatibility, and user manual questions.', enabled: true, role: 'Specs Specialist' },
      { id: 'sa-3', name: 'Personalized Fit & Sizing Sub-Agent', description: 'Recommends exact clothing/footwear sizes based on customer measurements.', enabled: true, role: 'Fit Advisor' },
      { id: 'sa-4', name: 'Cross-Sell & Discount Sub-Agent', description: 'Suggests matching accessories and applies eligible store discount codes.', enabled: false, role: 'Upsell Advisor' }
    ]
  },
  {
    id: 'ft-2',
    title: 'Real-time Order Tracking Agent',
    description: 'Master agent for global order status lookup, multi-region carrier tracking, and courier updates.',
    category: 'E-commerce',
    enabled: true,
    iconName: 'PackageCheck',
    subAgents: [
      { id: 'sa-5', name: 'Ship24 Multi-Carrier Engine', description: 'Universal tracking engine for 1,200+ international postal & express couriers.', enabled: true, role: 'Global Universal API', carrierProvider: 'ship24', region: 'global' },
      { id: 'sa-6', name: 'Yodel UK Direct Courier Sub-Agent', description: 'UK regional parcel tracking, driver ETA, and doorstep delivery confirmation.', enabled: true, role: 'UK Regional Courier', carrierProvider: 'yodel', region: 'uk' },
      { id: 'sa-7', name: 'CTS Transport & Settlement Sub-Agent', description: 'Custom Transport System freight tracking and settlement manifest updates.', enabled: true, role: 'CTS Transport Specialist', carrierProvider: 'cts', region: 'uk' },
      { id: 'sa-8', name: 'FedEx & UPS North America Sub-Agent', description: 'US & North America express ground & air shipment status updates.', enabled: true, role: 'US Carrier Specialist', carrierProvider: 'fedex', region: 'us' },
      { id: 'sa-9', name: 'DHL Express Customs & Transit Sub-Agent', description: 'Cross-border international customs events and clearance status updates.', enabled: true, role: 'International Customs', carrierProvider: 'dhl', region: 'global' }
    ]
  },
  {
    id: 'ft-3',
    title: 'Automated Returns & Refunds Agent',
    description: 'Master agent handling return eligibility, prepaid label creation, and exchanges.',
    category: 'E-commerce',
    enabled: true,
    iconName: 'RotateCcw',
    subAgents: [
      { id: 'sa-10', name: 'Return Eligibility Evaluator', description: 'Verifies 30-day return window, order status, and policy terms.', enabled: true, role: 'Policy Verifier' },
      { id: 'sa-11', name: 'Prepaid Return Label Generator', description: 'Generates downloadable shipping return labels in chat.', enabled: true, role: 'Label Issuer' },
      { id: 'sa-12', name: 'Store Credit Exchange Incentive', description: 'Offers 15% bonus store credit if customer chooses exchange over cash refund.', enabled: true, role: 'Incentive Specialist' }
    ]
  },
  {
    id: 'ft-4',
    title: 'Customer Claims & Support Agent',
    description: 'Master agent for damaged item photo analysis, warranty checks, and human escalation.',
    category: 'Customer Support',
    enabled: true,
    iconName: 'AlertTriangle',
    subAgents: [
      { id: 'sa-13', name: 'Damaged Product Vision AI Sub-Agent', description: 'Analyzes uploaded photos of broken or damaged goods using Vision LLM.', enabled: true, role: 'Vision Inspector' },
      { id: 'sa-14', name: 'Warranty & Serial Verifier', description: 'Validates manufacturer warranty coverage and registration dates.', enabled: true, role: 'Warranty Verifier' },
      { id: 'sa-15', name: 'Human Agent Escalation Sub-Agent', description: 'Transfers chat thread to live agent when sentiment drops below threshold.', enabled: true, role: 'Escalation Router' }
    ]
  }
];

export const mockWidgetCustomization: WidgetCustomization = {
  primaryColor: '#6366f1',
  accentColor: '#8b5cf6',
  botName: 'RDXBot',
  headerTitle: 'RDX Assistant ⚡',
  welcomeMessage: 'Hi there! 👋 How can I help you with your order or product questions today?',
  suggestedQuestions: [
    'Where is my order?',
    'Track my Yodel UK package',
    'What is your return policy?'
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
      location: 'London, UK',
      totalOrders: 6,
      lifetimeValue: 840,
      csatRating: 5
    },
    lastMessage: 'Thank you! Yodel parcel tracking updated.',
    timestamp: '10:42 AM',
    status: 'resolved',
    sentiment: 'positive',
    channel: 'shopify',
    unread: false,
    assignedAgent: 'AI Assistant',
    messages: [
      { id: 'm1', sender: 'user', text: 'Can you check my UK Yodel delivery status for order #YD-8812?', timestamp: '10:38 AM' },
      { id: 'm2', sender: 'bot', text: 'I am checking with Yodel UK direct courier integration...', timestamp: '10:38 AM' },
      { id: 'm3', sender: 'system', text: 'Fetched Yodel UK API (Parcel #YD-8812: Out for delivery by driver Dave)', timestamp: '10:39 AM' },
      { id: 'm4', sender: 'bot', text: 'Your Yodel UK parcel #YD-8812 is currently with courier Dave for delivery today between 1:30 PM and 3:30 PM GMT.', timestamp: '10:39 AM' },
      { id: 'm5', sender: 'user', text: 'Thank you! Yodel parcel tracking updated.', timestamp: '10:42 AM' }
    ]
  }
];

export const mockTeamMembers: TeamMember[] = [
  { id: 'tm-1', name: 'RDX', email: 'rdx@aetherchat.io', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', role: 'Owner', status: 'Active', lastActive: 'Now' }
];

export const mockInvoices: Invoice[] = [
  { id: 'INV-2026-008', date: 'Aug 1, 2026', amount: 299.00, status: 'Paid', pdfUrl: '#' }
];
