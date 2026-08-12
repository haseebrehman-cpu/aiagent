'use client';

import * as React from 'react';
import {
  Settings,
  Building,
  Key,
  Shield,
  Trash2,
  CheckCircle2,
  Copy,
  Check,
  Globe,
  Lock,
  Download,
  AlertTriangle
} from 'lucide-react';

export default function SettingsPage() {
  const [orgName, setOrgName] = React.useState('RDX Global Retail');
  const [currency, setCurrency] = React.useState('USD ($)');
  const [retentionPeriod, setRetentionPeriod] = React.useState('90_days');
  const [anonymizePii, setAnonymizePii] = React.useState(true);
  const [apiKeys, setApiKeys] = React.useState([
    { id: '1', name: 'Production Live Key', key: 'ae_live_90812391203', created: '2026-08-01' },
    { id: '2', name: 'Development Sandbox', key: 'ae_test_49182390182', created: '2026-07-15' },
  ]);
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    showToast('Copied API Key to clipboard!');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateKey = () => {
    const newKey = {
      id: `key-${Date.now()}`,
      name: `New API Key #${apiKeys.length + 1}`,
      key: `ae_live_${Math.random().toString(36).substring(2, 12)}`,
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys([...apiKeys, newKey]);
    showToast('Generated new secret API Key!');
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
    showToast('Revoked API Key');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium text-xs shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Platform Settings
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold text-slate-100 tracking-tight">Organization & Workspace Settings</h1>
        <p className="text-sm text-slate-400">Configure organization profile, API keys, security settings, and GDPR data retention.</p>
      </div>

      {/* Organization Profile */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Building className="w-4 h-4 text-indigo-400" />
          <span>Organization Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Organization Name</label>
            <input
              type="text"
              value={orgName}
              onChange={e => setOrgName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Primary Currency</label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
            >
              <option value="USD ($)">USD ($)</option>
              <option value="EUR (€)">EUR (€)</option>
              <option value="GBP (£)">GBP (£)</option>
              <option value="CAD ($)">CAD ($)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => showToast('Saved profile changes!')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* API Keys */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-400" />
            <span>Developer API Keys</span>
          </h2>

          <button
            onClick={handleGenerateKey}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
          >
            Generate Secret Key
          </button>
        </div>

        <div className="space-y-3">
          {apiKeys.map(k => (
            <div key={k.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-200">{k.name}</div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">{k.key}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyKey(k.key)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs"
                >
                  {copiedKey === k.key ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleRevokeKey(k.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40"
                  title="Revoke Key"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security & GDPR */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-400" />
          <span>Security & GDPR Data Compliance</span>
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-slate-200">Customer PII Anonymization</div>
              <div className="text-[11px] text-slate-400">Mask email addresses and phone numbers in chat logs.</div>
            </div>
            <button
              onClick={() => {
                setAnonymizePii(!anonymizePii);
                showToast(`Anonymization ${!anonymizePii ? 'enabled' : 'disabled'}`);
              }}
              className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${anonymizePii ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${anonymizePii ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Chat History Retention Period</label>
            <select
              value={retentionPeriod}
              onChange={e => setRetentionPeriod(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
            >
              <option value="30_days">30 Days Retention</option>
              <option value="90_days">90 Days Retention (Recommended)</option>
              <option value="1_year">1 Year Retention</option>
              <option value="indefinite">Indefinite (Keep forever)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
