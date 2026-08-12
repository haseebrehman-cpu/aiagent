'use client';

import * as React from 'react';
import {
  Sparkles,
  PackageCheck,
  RotateCcw,
  XCircle,
  UserCheck,
  Languages,
  MessageSquarePlus,
  AlertTriangle,
  Settings,
  X,
  CheckCircle2
} from 'lucide-react';
import { mockFeatureToggles } from '@/lib/mock-data';
import { FeatureToggle } from '@/lib/types';

export default function FeaturesPage() {
  const [features, setFeatures] = React.useState<FeatureToggle[]>(mockFeatureToggles);
  const [selectedFeature, setSelectedFeature] = React.useState<FeatureToggle | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const toggleFeature = (id: string) => {
    setFeatures(prev =>
      prev.map(f => {
        if (f.id === id) {
          const next = !f.enabled;
          setToastMessage(`${f.title} ${next ? 'enabled' : 'disabled'}`);
          setTimeout(() => setToastMessage(null), 2500);
          return { ...f, enabled: next };
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
      case 'XCircle': return <XCircle className="w-5 h-5 text-rose-400" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-amber-400" />;
      case 'Languages': return <Languages className="w-5 h-5 text-blue-400" />;
      case 'MessageSquarePlus': return <MessageSquarePlus className="w-5 h-5 text-pink-400 text-teal-400" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-orange-400" />;
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

      {/* Grid of Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(feature => {
          return (
            <div
              key={feature.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                feature.enabled
                  ? 'bg-slate-900 border-indigo-500/40 ring-1 ring-indigo-500/20'
                  : 'bg-slate-900/60 border-slate-800 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    {getIcon(feature.iconName)}
                  </div>

                  <button
                    onClick={() => toggleFeature(feature.id)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      feature.enabled ? 'bg-indigo-600' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        feature.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 uppercase tracking-wider">
                    {feature.category}
                  </span>
                </div>

                <h3 className="mt-2 text-base font-bold text-slate-100">{feature.title}</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{feature.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className={feature.enabled ? 'text-indigo-300 font-medium' : 'text-slate-500'}>
                  {feature.enabled ? 'Active Tool' : 'Disabled'}
                </span>
                <button
                  onClick={() => setSelectedFeature(feature)}
                  className="text-slate-400 hover:text-slate-200 flex items-center gap-1 font-medium hover:underline"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Configure</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Configuration Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-100">{selectedFeature.title} Settings</h3>
              <button onClick={() => setSelectedFeature(null)} className="p-1 rounded text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-400">{selectedFeature.description}</p>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-300">Confidence Threshold</span>
                  <span className="font-mono text-indigo-400 font-bold">0.85</span>
                </div>
                <input type="range" min="0.5" max="0.99" step="0.05" defaultValue="0.85" className="w-full accent-indigo-500" />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedFeature(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
