'use client';

import * as React from 'react';
import {
  Sparkles,
  PackageCheck,
  RotateCcw,
  AlertTriangle,
  Languages,
  MessageSquarePlus,
  Settings,
  X,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  GitBranch,
  Sliders,
  Cpu,
  Bot,
  Layers,
  Zap,
  HelpCircle
} from 'lucide-react';
import { mockFeatureToggles } from '@/lib/mock-data';
import { FeatureToggle, SubAgent } from '@/lib/types';

export default function FeaturesPage() {
  const [features, setFeatures] = React.useState<FeatureToggle[]>(mockFeatureToggles);
  const [expandedAgentId, setExpandedAgentId] = React.useState<string | null>('ft-1');
  const [selectedSubAgent, setSelectedSubAgent] = React.useState<{ masterTitle: string; sub: SubAgent } | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleMasterAgent = (id: string) => {
    setFeatures(prev =>
      prev.map(f => {
        if (f.id === id) {
          const next = !f.enabled;
          showToast(`${f.title} ${next ? 'enabled' : 'disabled'}`);
          return { ...f, enabled: next };
        }
        return f;
      })
    );
  };

  const toggleSubAgent = (masterId: string, subId: string) => {
    setFeatures(prev =>
      prev.map(f => {
        if (f.id === masterId && f.subAgents) {
          const updatedSubAgents = f.subAgents.map(sub => {
            if (sub.id === subId) {
              const next = !sub.enabled;
              showToast(`${sub.name} ${next ? 'enabled' : 'disabled'}`);
              return { ...sub, enabled: next };
            }
            return sub;
          });
          return { ...f, subAgents: updatedSubAgents };
        }
        return f;
      })
    );
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-indigo-400" />;
      case 'PackageCheck': return <PackageCheck className="w-5 h-5 text-emerald-400" />;
      case 'RotateCcw': return <RotateCcw className="w-5 h-5 text-purple-400" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case 'Languages': return <Languages className="w-5 h-5 text-blue-400" />;
      case 'MessageSquarePlus': return <MessageSquarePlus className="w-5 h-5 text-pink-400" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium text-xs shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Description */}
      <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-indigo-400" />
          <span>Select master AI agents and enable/disable specialized <strong>Sub-Agents</strong> for fine-grained task delegation.</span>
        </div>
        <span className="text-[11px] text-indigo-300 font-semibold bg-indigo-500/20 px-2.5 py-1 rounded-lg border border-indigo-500/30">
          Hierarchical Multi-Agent Architecture
        </span>
      </div>

      {/* Master Agents List with Sub-Agents */}
      <div className="space-y-4">
        {features.map(master => {
          const activeSubCount = master.subAgents?.filter(s => s.enabled).length || 0;
          const totalSubCount = master.subAgents?.length || 0;
          const isExpanded = expandedAgentId === master.id;

          return (
            <div
              key={master.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                master.enabled
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-slate-900/60 border-slate-800/60 opacity-80'
              }`}
            >
              {/* Master Agent Header Row */}
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                    {getIcon(master.iconName)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base font-bold text-slate-100">{master.title}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 uppercase tracking-wider">
                        {master.category}
                      </span>
                      {totalSubCount > 0 && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                          {activeSubCount} / {totalSubCount} Sub-Agents Active
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{master.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {totalSubCount > 0 && (
                    <button
                      onClick={() => setExpandedAgentId(isExpanded ? null : master.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors"
                    >
                      <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{isExpanded ? 'Hide Sub-Agents' : 'Manage Sub-Agents'}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  )}

                  <button
                    onClick={() => toggleMasterAgent(master.id)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      master.enabled ? 'bg-indigo-600' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        master.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Sub-Agents Selection Panel (Expandable) */}
              {isExpanded && master.subAgents && master.subAgents.length > 0 && (
                <div className="p-5 bg-slate-950/70 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-indigo-400" /> Specialized Sub-Agents for {master.title}
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">Toggle sub-agents on/off</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {master.subAgents.map(sub => {
                      return (
                        <div
                          key={sub.id}
                          className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                            sub.enabled && master.enabled
                              ? 'bg-slate-900 border-indigo-500/40 ring-1 ring-indigo-500/20'
                              : 'bg-slate-900/40 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-100">{sub.name}</span>
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-800 text-indigo-300 border border-slate-700">
                                {sub.role}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed">{sub.description}</p>
                            
                            <button
                              onClick={() => setSelectedSubAgent({ masterTitle: master.title, sub })}
                              className="mt-2 text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                            >
                              <Sliders className="w-3 h-3" />
                              <span>Sub-Agent Settings</span>
                            </button>
                          </div>

                          <button
                            onClick={() => toggleSubAgent(master.id, sub.id)}
                            disabled={!master.enabled}
                            className={`w-9 h-5 rounded-full transition-colors relative p-0.5 shrink-0 disabled:opacity-40 ${
                              sub.enabled && master.enabled ? 'bg-indigo-600' : 'bg-slate-800'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                                sub.enabled && master.enabled ? 'translate-x-4' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sub-Agent Config Modal */}
      {selectedSubAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{selectedSubAgent.masterTitle}</span>
                <h3 className="text-base font-bold text-slate-100">{selectedSubAgent.sub.name}</h3>
              </div>
              <button onClick={() => setSelectedSubAgent(null)} className="p-1 rounded text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-400">{selectedSubAgent.sub.description}</p>
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-300">Routing Priority</span>
                  <span className="font-mono text-indigo-400 font-bold">High (Level 1)</span>
                </div>
                <select className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none">
                  <option value="high">High Priority (Evaluate First)</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Fallback / Low Priority</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-300">Confidence Threshold</span>
                  <span className="font-mono text-indigo-400 font-bold">0.88</span>
                </div>
                <input type="range" min="0.5" max="0.99" step="0.02" defaultValue="0.88" className="w-full accent-indigo-500" />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  showToast(`Saved settings for ${selectedSubAgent.sub.name}`);
                  setSelectedSubAgent(null);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Save Sub-Agent Config
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
