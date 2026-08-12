'use client';

import * as React from 'react';
import {
  ShoppingBag,
  Box,
  Store,
  Globe,
  Headphones,
  Truck,
  Mail,
  Navigation,
  CheckCircle2,
  RefreshCw,
  Plus,
  Zap,
  Shield,
  Copy,
  Check,
  AlertTriangle,
  Settings,
  X,
  Radio,
  ExternalLink,
  Key,
  MapPin,
  ShieldCheck,
  Cpu,
  MessageSquare,
  Layers,
  Server
} from 'lucide-react';
import { mockIntegrations } from '@/lib/mock-data';
import { Integration, IntegrationType, TrackingRegion } from '@/lib/types';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = React.useState<Integration[]>(mockIntegrations);
  const [selectedIntegration, setSelectedIntegration] = React.useState<Integration | null>(mockIntegrations[0]);
  const [activeCategory, setActiveCategory] = React.useState<'all' | 'storefronts' | 'oms' | 'couriers' | 'helpdesk'>('all');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [copiedField, setCopiedField] = React.useState<string | null>(null);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Modal Platform Form State
  const [platformType, setPlatformType] = React.useState<IntegrationType>('shopify');
  const [platformName, setPlatformName] = React.useState('Shopify Storefront');
  const [platformApiKey, setPlatformApiKey] = React.useState('sh_live_908123912038192');
  const [platformRegion, setPlatformRegion] = React.useState<TrackingRegion>('global');
  const [isTestingPlatform, setIsTestingPlatform] = React.useState(false);
  const [platformTestResult, setPlatformTestResult] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`Copied ${fieldName} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Category Configuration Options mapping
  const categoryConfig = React.useMemo(() => {
    switch (activeCategory) {
      case 'storefronts':
        return {
          buttonText: 'Connect E-Commerce Store',
          modalTitle: 'Connect E-Commerce Storefront',
          modalDesc: 'Select an e-commerce platform to sync catalog, inventory, and customer orders:',
          options: [
            { id: 'shopify' as IntegrationType, name: 'Shopify Storefront' },
            { id: 'amazon' as IntegrationType, name: 'Amazon Seller Central' },
            { id: 'walmart' as IntegrationType, name: 'Walmart Marketplace' },
            { id: 'custom_app' as IntegrationType, name: 'WooCommerce / Custom Store API' },
          ]
        };
      case 'oms':
        return {
          buttonText: 'Connect OMS Platform',
          modalTitle: 'Connect OMS & Inventory Platform',
          modalDesc: 'Select an Order Management System (OMS) or ERP to sync stock levels & warehouse routing:',
          options: [
            { id: 'linnworks' as IntegrationType, name: 'Linnworks Multichannel OMS' },
            { id: 'custom_app' as IntegrationType, name: 'TradeGecko / Custom ERP Webhook' },
          ]
        };
      case 'couriers':
        return {
          buttonText: 'Link Courier Provider',
          modalTitle: 'Link Courier & Logistics Provider',
          modalDesc: 'Select a shipping courier or tracking API to automate parcel tracking & ETA updates:',
          options: [
            { id: 'ship24' as IntegrationType, name: 'Ship24 Universal Tracking API' },
            { id: 'yodel' as IntegrationType, name: 'Yodel UK Direct Courier' },
            { id: 'cts' as IntegrationType, name: 'CTS Transport & Settlement API' },
            { id: 'dhl' as IntegrationType, name: 'DHL Express Global' },
            { id: 'royal_mail' as IntegrationType, name: 'Royal Mail UK Postal' },
          ]
        };
      case 'helpdesk':
        return {
          buttonText: 'Connect Helpdesk / Chat',
          modalTitle: 'Connect Helpdesk & Live Chat',
          modalDesc: 'Select a customer support desk or messaging app for human agent escalation:',
          options: [
            { id: 'edesk' as IntegrationType, name: 'eDesk E-Commerce Helpdesk' },
            { id: 'livechat' as IntegrationType, name: 'LiveChat Customer Engagement' },
            { id: 'zendesk' as IntegrationType, name: 'Zendesk Desk Sync' },
          ]
        };
      default:
        return {
          buttonText: 'Connect Platform / API',
          modalTitle: 'Connect Integration Platform',
          modalDesc: 'Select an e-commerce, OMS, logistics courier, or helpdesk platform to connect:',
          options: [
            { id: 'shopify' as IntegrationType, name: 'Shopify Storefront' },
            { id: 'amazon' as IntegrationType, name: 'Amazon Seller Central' },
            { id: 'linnworks' as IntegrationType, name: 'Linnworks Multichannel OMS' },
            { id: 'ship24' as IntegrationType, name: 'Ship24 Universal API' },
            { id: 'yodel' as IntegrationType, name: 'Yodel UK Direct Courier' },
            { id: 'cts' as IntegrationType, name: 'CTS Transport & Settlement API' },
            { id: 'edesk' as IntegrationType, name: 'eDesk E-Commerce Helpdesk' },
            { id: 'livechat' as IntegrationType, name: 'LiveChat Engagement' },
          ]
        };
    }
  }, [activeCategory]);

  const handleOpenModal = () => {
    const firstOption = categoryConfig.options[0];
    setPlatformType(firstOption.id);
    setPlatformName(firstOption.name);
    setPlatformTestResult(null);
    setIsModalOpen(true);
  };

  const filteredIntegrations = integrations.filter(int => {
    if (activeCategory === 'storefronts') {
      return ['shopify', 'amazon', 'walmart', 'custom_app'].includes(int.type);
    }
    if (activeCategory === 'oms') {
      return ['linnworks'].includes(int.type);
    }
    if (activeCategory === 'couriers') {
      return ['ship24', 'yodel', 'dhl', 'royal_mail', 'cts'].includes(int.type);
    }
    if (activeCategory === 'helpdesk') {
      return ['edesk', 'livechat', 'zendesk'].includes(int.type);
    }
    return true;
  });

  const toggleEntity = (integrationId: string, entityKey: keyof Integration['entities']) => {
    setIntegrations(prev =>
      prev.map(item => {
        if (item.id === integrationId) {
          const updatedEntities = {
            ...item.entities,
            [entityKey]: !item.entities[entityKey],
          };
          const updatedItem = { ...item, entities: updatedEntities };
          if (selectedIntegration?.id === integrationId) {
            setSelectedIntegration(updatedItem);
          }
          return updatedItem;
        }
        return item;
      })
    );
    showToast('Entity configuration updated');
  };

  const triggerForceSync = (integrationId: string) => {
    setIsSyncing(true);
    setIntegrations(prev =>
      prev.map(item => item.id === integrationId ? { ...item, status: 'Syncing', lastSync: 'Syncing now...' } : item)
    );
    showToast('Triggered background sync...');

    setTimeout(() => {
      setIsSyncing(false);
      setIntegrations(prev =>
        prev.map(item =>
          item.id === integrationId
            ? { ...item, status: 'Connected', lastSync: 'Just now' }
            : item
        )
      );
      if (selectedIntegration?.id === integrationId) {
        setSelectedIntegration(prev => prev ? { ...prev, status: 'Connected', lastSync: 'Just now' } : null);
      }
      showToast('Sync completed successfully!');
    }, 2000);
  };

  const toggleConnection = (integrationId: string) => {
    setIntegrations(prev =>
      prev.map(item => {
        if (item.id === integrationId) {
          const newStatus = item.status === 'Connected' ? 'Not Connected' : 'Connected';
          const updated = {
            ...item,
            status: newStatus as Integration['status'],
            lastSync: newStatus === 'Connected' ? 'Just now' : undefined,
          };
          if (selectedIntegration?.id === integrationId) {
            setSelectedIntegration(updated);
          }
          return updated;
        }
        return item;
      })
    );
    showToast(`Integration status changed.`);
  };

  const handleTestPlatformConnection = () => {
    setIsTestingPlatform(true);
    setPlatformTestResult(null);

    setTimeout(() => {
      setIsTestingPlatform(false);
      setPlatformTestResult(`Connection Verified! (Ping: 34ms to ${platformName} API endpoint)`);
    }, 1200);
  };

  const handleLinkPlatform = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlatform: Integration = {
      id: `int-${Date.now()}`,
      name: platformName,
      type: platformType,
      description: `Direct integration link with ${platformName} for order, ticket, and stock synchronization.`,
      logo: 'Cpu',
      status: 'Connected',
      lastSync: 'Just now',
      region: platformRegion,
      entities: { products: true, orders: true, customers: true, returns: true },
      webhookUrl: `https://api.aetherchat.io/v1/webhooks/${platformType}/wh_${Date.now().toString().slice(-6)}`,
      webhookSecret: `sec_${Math.random().toString(36).substring(2, 10)}`,
    };

    setIntegrations([newPlatform, ...integrations]);
    setSelectedIntegration(newPlatform);
    setIsModalOpen(false);
    showToast(`Successfully linked ${platformName}!`);
  };

  const getIntegrationIcon = (type: IntegrationType) => {
    switch (type) {
      case 'shopify': return <ShoppingBag className="w-6 h-6 text-emerald-400" />;
      case 'amazon': return <Box className="w-6 h-6 text-amber-400" />;
      case 'walmart': return <Store className="w-6 h-6 text-blue-400" />;
      case 'linnworks': return <Cpu className="w-6 h-6 text-indigo-400" />;
      case 'edesk': return <MessageSquare className="w-6 h-6 text-purple-400" />;
      case 'livechat': return <Headphones className="w-6 h-6 text-emerald-400" />;
      case 'cts': return <Truck className="w-6 h-6 text-blue-400" />;
      case 'ship24': return <Truck className="w-6 h-6 text-indigo-400" />;
      case 'yodel': return <Navigation className="w-6 h-6 text-purple-400" />;
      case 'dhl': return <Globe className="w-6 h-6 text-amber-500" />;
      case 'royal_mail': return <Mail className="w-6 h-6 text-rose-400" />;
      case 'zendesk': return <Headphones className="w-6 h-6 text-teal-400" />;
      default: return <Globe className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Integrations Hub
            </span>
            <span className="text-xs text-slate-400">{filteredIntegrations.length} Connectors Shown</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-100 tracking-tight">Integrations & Connected Platforms</h1>
          <p className="text-sm text-slate-400">Connect storefronts, OMS (Linnworks), Helpdesks (eDesk/LiveChat), and Couriers (CTS/Ship24/Yodel/DHL).</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>{categoryConfig.buttonText}</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'all', label: 'All Connectors' },
          { id: 'storefronts', label: 'E-Commerce Stores (Shopify/Amazon)' },
          { id: 'oms', label: 'OMS & Inventory (Linnworks)' },
          { id: 'couriers', label: 'Logistics & Couriers (CTS/Ship24/Yodel)' },
          { id: 'helpdesk', label: 'Helpdesk & Chat (eDesk/LiveChat/Zendesk)' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map(int => {
          const isSelected = selectedIntegration?.id === int.id;

          return (
            <div
              key={int.id}
              onClick={() => setSelectedIntegration(int)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500/60 ring-2 ring-indigo-500/20 shadow-xl shadow-indigo-950/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
                    {getIntegrationIcon(int.type)}
                  </div>

                  <div className="flex items-center gap-2">
                    {int.region && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-indigo-300 uppercase tracking-wider border border-slate-700">
                        {int.region}
                      </span>
                    )}

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        int.status === 'Connected'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : int.status === 'Syncing'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {int.status}
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-100">{int.name}</h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">{int.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>{int.lastSync ? `Synced ${int.lastSync}` : 'Not configured'}</span>
                <span className="text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Configure <Settings className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Integration Detail View */}
      {selectedIntegration && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                {getIntegrationIcon(selectedIntegration.type)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-100">{selectedIntegration.name} Configuration</h2>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      selectedIntegration.status === 'Connected'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : selectedIntegration.status === 'Syncing'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {selectedIntegration.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{selectedIntegration.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => triggerForceSync(selectedIntegration.id)}
                disabled={isSyncing || selectedIntegration.status !== 'Connected'}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Force Sync Now</span>
              </button>

              <button
                onClick={() => toggleConnection(selectedIntegration.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedIntegration.status === 'Connected'
                    ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500'
                }`}
              >
                {selectedIntegration.status === 'Connected' ? 'Disconnect Provider' : 'Connect Account'}
              </button>
            </div>
          </div>

          {/* Sync Entities Toggles */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200">Data Entities to Sync</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(Object.keys(selectedIntegration.entities) as Array<keyof Integration['entities']>).map(entity => {
                const isEnabled = selectedIntegration.entities[entity];

                return (
                  <div
                    key={entity}
                    onClick={() => toggleEntity(selectedIntegration.id, entity)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isEnabled
                        ? 'bg-indigo-950/30 border-indigo-500/40 text-slate-100'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="capitalize font-semibold text-xs">{entity}</div>
                    <div
                      className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                        isEnabled ? 'bg-indigo-600' : 'bg-slate-800'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          isEnabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Webhook & Secret Details */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" /> Webhook Credentials & API Endpoint
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Status: Live Auto-Sync Active</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Webhook Endpoint URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={selectedIntegration.webhookUrl}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy(selectedIntegration.webhookUrl, 'Webhook URL')}
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5"
                  >
                    {copiedField === 'Webhook URL' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Webhook Signing Secret</label>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    readOnly
                    value={selectedIntegration.webhookSecret}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy(selectedIntegration.webhookSecret, 'Webhook Secret')}
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5"
                  >
                    {copiedField === 'Webhook Secret' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category-Filtered Connect Platform Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleLinkPlatform} className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-slate-100">{categoryConfig.modalTitle}</h3>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-400">{categoryConfig.modalDesc}</p>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Select Integration Platform</label>
                <select
                  value={platformType}
                  onChange={e => {
                    const type = e.target.value as IntegrationType;
                    setPlatformType(type);
                    const match = categoryConfig.options.find(o => o.id === type);
                    if (match) setPlatformName(match.name);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  {categoryConfig.options.map(opt => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Connection Display Name</label>
                <input
                  type="text"
                  required
                  value={platformName}
                  onChange={e => setPlatformName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Operations Region</label>
                  <select
                    value={platformRegion}
                    onChange={e => setPlatformRegion(e.target.value as TrackingRegion)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="global">Global (Worldwide)</option>
                    <option value="uk">United Kingdom (UK)</option>
                    <option value="us">United States (US/NA)</option>
                    <option value="eu">European Union (EU)</option>
                    <option value="apac">Asia-Pacific (APAC)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">API Token / Secret Key</label>
                  <input
                    type="password"
                    required
                    value={platformApiKey}
                    onChange={e => setPlatformApiKey(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Test Connection Button */}
              <div>
                <button
                  type="button"
                  onClick={handleTestPlatformConnection}
                  disabled={isTestingPlatform}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-all"
                >
                  {isTestingPlatform ? <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" /> : <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                  <span>Test API Connection</span>
                </button>

                {platformTestResult && (
                  <div className="mt-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-medium text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{platformTestResult}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
              >
                Connect {platformName}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
