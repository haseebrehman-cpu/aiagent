'use client';

import * as React from 'react';
import {
  ShoppingBag,
  Box,
  Store,
  Globe,
  Headphones,
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
  ExternalLink
} from 'lucide-react';
import { mockIntegrations } from '@/lib/mock-data';
import { Integration } from '@/lib/types';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = React.useState<Integration[]>(mockIntegrations);
  const [selectedIntegration, setSelectedIntegration] = React.useState<Integration | null>(mockIntegrations[0]);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [copiedField, setCopiedField] = React.useState<string | null>(null);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

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
    }, 2500);
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
              Data Connectors
            </span>
            <span className="text-xs text-slate-400">5 Connectors Available</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-100 tracking-tight">Integrations & Webhooks</h1>
          <p className="text-sm text-slate-400">Connect your e-commerce platforms and apps to auto-sync products, orders, and customer data.</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Connect New Platform</span>
        </button>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map(int => {
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
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-indigo-400 shadow-inner">
                    {int.type === 'shopify' && <ShoppingBag className="w-6 h-6 text-emerald-400" />}
                    {int.type === 'amazon' && <Box className="w-6 h-6 text-amber-400" />}
                    {int.type === 'walmart' && <Store className="w-6 h-6 text-blue-400" />}
                    {int.type === 'website' && <Globe className="w-6 h-6 text-indigo-400" />}
                    {int.type === 'zendesk' && <Headphones className="w-6 h-6 text-purple-400" />}
                  </div>

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
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-indigo-400">
                {selectedIntegration.type === 'shopify' && <ShoppingBag className="w-7 h-7 text-emerald-400" />}
                {selectedIntegration.type === 'amazon' && <Box className="w-7 h-7 text-amber-400" />}
                {selectedIntegration.type === 'walmart' && <Store className="w-7 h-7 text-blue-400" />}
                {selectedIntegration.type === 'website' && <Globe className="w-7 h-7 text-indigo-400" />}
                {selectedIntegration.type === 'zendesk' && <Headphones className="w-7 h-7 text-purple-400" />}
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
                {selectedIntegration.status === 'Connected' ? 'Disconnect' : 'Connect Account'}
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
                <Shield className="w-4 h-4 text-indigo-400" /> Webhook Credentials
              </span>
              <span className="text-[11px] text-slate-400">Post event payloads to this URL</span>
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

      {/* Add Integration Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-100">Connect New Integration</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-400">Select an e-commerce platform or custom application to connect:</p>
              <div className="grid grid-cols-2 gap-3">
                {['Shopify', 'Amazon', 'Walmart', 'WooCommerce', 'BigCommerce', 'Custom API'].map(name => (
                  <button
                    key={name}
                    onClick={() => {
                      showToast(`Started OAuth flow for ${name}...`);
                      setIsAddModalOpen(false);
                    }}
                    className="p-3 rounded-xl border border-slate-800 bg-slate-950 hover:border-indigo-500/50 hover:bg-slate-800/60 text-left text-xs font-semibold text-slate-200 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-indigo-400" />
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
