'use client';

import * as React from 'react';
import {
  Terminal,
  Save,
  CheckCircle2,
  History,
  Tag,
  Plus,
  Sparkles,
  RotateCcw,
  Check
} from 'lucide-react';
import { mockPromptVersions } from '@/lib/mock-data';
import { PromptVersion } from '@/lib/types';

export default function SystemPromptPage() {
  const [versions, setVersions] = React.useState<PromptVersion[]>(mockPromptVersions);
  const activeVersion = versions.find(v => v.active) || versions[0];
  const [promptText, setPromptText] = React.useState(activeVersion.content);
  const [selectedVersionId, setSelectedVersionId] = React.useState(activeVersion.id);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const variables = [
    { label: '{{store_name}}', desc: 'Active storefront name' },
    { label: '{{product_catalog}}', desc: 'Shopify / Amazon RAG catalog' },
    { label: '{{order_status}}', desc: 'Live carrier tracking API' },
    { label: '{{refund_policy}}', desc: 'Store return terms PDF' },
    { label: '{{human_handoff}}', desc: 'Zendesk agent trigger' },
    { label: '{{customer_name}}', desc: 'Authenticated user profile' },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const insertVariable = (varName: string) => {
    setPromptText(prev => prev + ' ' + varName);
    showToast(`Inserted ${varName} chip`);
  };

  const handleSaveNewVersion = () => {
    const nextVerNumber = (versions.length + 1).toFixed(1);
    const newVer: PromptVersion = {
      id: `pv-${Date.now()}`,
      version: `v${nextVerNumber}`,
      content: promptText,
      active: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      author: 'RDX'
    };

    setVersions([newVer, ...versions]);
    setSelectedVersionId(newVer.id);
    showToast(`Saved new draft version v${nextVerNumber}!`);
  };

  const handleSetActiveVersion = (id: string) => {
    setVersions(prev =>
      prev.map(v => ({
        ...v,
        active: v.id === id,
        version: v.id === id ? v.version.replace(' (Active)', '') + ' (Active)' : v.version.replace(' (Active)', '')
      }))
    );
    showToast('Updated active production prompt!');
  };

  const handleSelectVersion = (version: PromptVersion) => {
    setSelectedVersionId(version.id);
    setPromptText(version.content);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium text-xs shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Prompt Editor (2 Columns) */}
      <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>System Prompt Editor</span>
            </h2>
            <p className="text-xs text-slate-400">Define how RDXBot introduces itself, follows policies, and recommends products.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveNewVersion}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              <Save className="w-3.5 h-3.5 text-indigo-400" />
              <span>Save Version</span>
            </button>

            <button
              onClick={() => handleSetActiveVersion(selectedVersionId)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Set as Active</span>
            </button>
          </div>
        </div>

        {/* Variable Chips Insertion Toolbar */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Insert Dynamic Context Chips
          </label>
          <div className="flex flex-wrap gap-2">
            {variables.map(v => (
              <button
                key={v.label}
                onClick={() => insertVariable(v.label)}
                className="px-2.5 py-1 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-medium transition-all flex items-center gap-1.5 hover:scale-105"
                title={v.desc}
              >
                <Plus className="w-3 h-3 text-indigo-400" />
                <span>{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Code Textarea Editor */}
        <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 leading-relaxed focus-within:border-indigo-500 transition-colors">
          <textarea
            rows={14}
            value={promptText}
            onChange={e => setPromptText(e.target.value)}
            className="w-full bg-transparent resize-none focus:outline-none text-indigo-100 placeholder-slate-600"
            placeholder="Type your system instructions here..."
          />
        </div>
      </div>

      {/* Version History Sidebar */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-400" />
            <span>Version History</span>
          </h2>
          <span className="text-xs text-slate-400">{versions.length} versions</span>
        </div>

        <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
          {versions.map(ver => {
            const isSelected = ver.id === selectedVersionId;

            return (
              <div
                key={ver.id}
                onClick={() => handleSelectVersion(ver)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${isSelected
                    ? 'bg-indigo-950/40 border-indigo-500/60 ring-1 ring-indigo-500/30'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-indigo-400" />
                    {ver.version}
                  </span>
                  {ver.active && (
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Active
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[11px] text-slate-400 line-clamp-2 font-mono">{ver.content}</p>
                <div className="mt-3 text-[10px] text-slate-500 flex justify-between border-t border-slate-800/60 pt-2">
                  <span>Author: {ver.author}</span>
                  <span>{ver.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
