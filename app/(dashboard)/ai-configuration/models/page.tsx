'use client';

import * as React from 'react';
import {
  Sliders,
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  Cpu,
  Zap,
  Sparkles,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import { mockAIModelConfig } from '@/lib/mock-data';
import { AIModelConfig } from '@/lib/types';

export default function ModelsPage() {
  const [config, setConfig] = React.useState<AIModelConfig>(mockAIModelConfig);
  const [apiKey, setApiKey] = React.useState('sk-proj-9012384918239018239481239');
  const [showApiKey, setShowApiKey] = React.useState(false);
  const [isTestingKey, setIsTestingKey] = React.useState(false);
  const [testResult, setTestResult] = React.useState<string | null>(null);

  const handleTestKey = () => {
    setIsTestingKey(true);
    setTestResult(null);

    setTimeout(() => {
      setIsTestingKey(false);
      setTestResult('API Key Verified Successfully! (Latency: 142ms, Model: GPT-4o)');
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Provider & Model Selection */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>LLM Provider & Engine Selection</span>
        </h2>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'OpenAI', label: 'OpenAI', desc: 'GPT-4o & GPT-4o-mini', icon: Sparkles },
            { id: 'Anthropic', label: 'Anthropic', desc: 'Claude 3.5 Sonnet & Haiku', icon: Zap },
            { id: 'Custom', label: 'Custom Endpoint', desc: 'Self-hosted vLLM or Ollama', icon: Cpu },
          ].map(provider => {
            const Icon = provider.icon;
            const isSelected = config.provider === provider.id;

            return (
              <div
                key={provider.id}
                onClick={() => setConfig({ ...config, provider: provider.id as AIModelConfig['provider'] })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500/60 ring-2 ring-indigo-500/20'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                </div>
                <div className="mt-3 font-bold text-sm text-slate-200">{provider.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{provider.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Model Select */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">Model Architecture</label>
          <select
            value={config.modelId}
            onChange={e => setConfig({ ...config, modelId: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="gpt-4o">OpenAI GPT-4o (Recommended for E-Commerce & Reasoning)</option>
            <option value="gpt-4o-mini">OpenAI GPT-4o-mini (Ultra Fast & Low Cost)</option>
            <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet (High Accuracy)</option>
            <option value="llama-3-70b">Meta Llama 3 70B (Custom Hosted)</option>
          </select>
        </div>
      </div>

      {/* API Key Input */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Key className="w-4 h-4 text-indigo-400" />
          <span>API Key Authentication</span>
        </h2>
        <p className="text-xs text-slate-400">Your API key is encrypted at rest using AES-256 and never logged.</p>

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={handleTestKey}
              disabled={isTestingKey}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 shrink-0 transition-all"
            >
              {isTestingKey ? <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" /> : <ShieldCheck className="w-4 h-4 text-emerald-400" />}
              <span>Test Key</span>
            </button>
          </div>

          {testResult && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-medium text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{testResult}</span>
            </div>
          )}
        </div>
      </div>

      {/* Model Hyperparameters */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <span>Model Parameters & Generation Control</span>
        </h2>

        {/* Temperature */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-slate-300">Temperature (Randomness vs Precision)</span>
            <span className="font-mono text-indigo-400 font-bold">{config.temperature}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={config.temperature}
            onChange={e => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>0.0 (Strict & Factual)</span>
            <span>0.5 (Balanced)</span>
            <span>1.0 (Creative)</span>
          </div>
        </div>

        {/* Max Tokens */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-slate-300">Max Tokens per Response</span>
            <span className="font-mono text-indigo-400 font-bold">{config.maxTokens} tokens</span>
          </div>
          <input
            type="range"
            min="256"
            max="4096"
            step="128"
            value={config.maxTokens}
            onChange={e => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>256 (Concise answers)</span>
            <span>4096 (Detailed responses)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
