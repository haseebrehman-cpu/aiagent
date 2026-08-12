export type Role = 'Owner' | 'Admin' | 'Editor' | 'Agent' | 'Viewer';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
}

export type IntegrationType = 'shopify' | 'amazon' | 'walmart' | 'website' | 'custom_app' | 'zendesk';
export type IntegrationStatus = 'Connected' | 'Not Connected' | 'Syncing' | 'Error';

export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  description: string;
  logo: string;
  status: IntegrationStatus;
  lastSync?: string;
  entities: {
    products: boolean;
    orders: boolean;
    customers: boolean;
    returns: boolean;
  };
  webhookUrl: string;
  webhookSecret: string;
}

export type KnowledgeType = 'Catalog' | 'Document' | 'Website' | 'FAQ';
export type KnowledgeStatus = 'Ready' | 'Processing' | 'Failed';

export interface KnowledgeSource {
  id: string;
  name: string;
  type: KnowledgeType;
  vectorCount: number;
  status: KnowledgeStatus;
  enabled: boolean;
  lastUpdated: string;
  fileSize?: string;
  sourceUrl?: string;
}

export interface PromptVersion {
  id: string;
  version: string;
  content: string;
  active: boolean;
  createdAt: string;
  author: string;
}

export interface AIModelConfig {
  provider: 'OpenAI' | 'Anthropic' | 'Custom';
  modelId: string;
  apiKeySet: boolean;
  temperature: number;
  maxTokens: number;
  topP: number;
}

export interface FeatureToggle {
  id: string;
  title: string;
  description: string;
  category: 'E-commerce' | 'Customer Support' | 'Automation';
  enabled: boolean;
  iconName: string;
  configSchema?: Record<string, any>;
}

export interface WidgetCustomization {
  primaryColor: string;
  accentColor: string;
  botName: string;
  headerTitle: string;
  welcomeMessage: string;
  suggestedQuestions: string[];
  position: 'bottom-right' | 'bottom-left';
  showBranding: boolean;
  avatarUrl: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  totalOrders: number;
  lifetimeValue: number;
  csatRating?: number;
}

export interface Message {
  id: string;
  sender: 'user' | 'bot' | 'agent' | 'system';
  text: string;
  timestamp: string;
  actions?: { label: string; action: string }[];
}

export type ConversationStatus = 'active' | 'handed_over' | 'resolved' | 'unassigned';
export type SentimentType = 'positive' | 'neutral' | 'negative';

export interface Conversation {
  id: string;
  customer: CustomerProfile;
  lastMessage: string;
  timestamp: string;
  status: ConversationStatus;
  sentiment: SentimentType;
  channel: IntegrationType;
  unread: boolean;
  messages: Message[];
  assignedAgent?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  status: 'Active' | 'Invited';
  lastActive: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending';
  pdfUrl: string;
}
