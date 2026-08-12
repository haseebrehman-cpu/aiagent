'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  CheckCircle2,
  Smile,
  Layers,
  Cpu,
  ArrowUpRight,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Zap,
  ShoppingBag,
  Box,
  Globe,
  ExternalLink,
  RefreshCw,
  Plus
} from 'lucide-react';
import { mockIntegrations, mockConversations } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';

export default function OverviewPage() {
  const [loading, setLoading] = React.useState(false);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([1, 2, 3, 4]);

  const toggleStep = (stepNum: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepNum) ? prev.filter(s => s !== stepNum) : [...prev, stepNum]
    );
  };

  const steps = [
    { id: 1, title: 'Select or Create Tenant Workspace', desc: 'Active workspace: RDX Storefront US', link: '/settings' },
    { id: 2, title: 'Add Connector (E-commerce / App)', desc: 'Connected to Shopify Storefront (1.4k items)', link: '/integrations' },
    { id: 3, title: 'Add Knowledge Base (RAG)', desc: 'Uploaded Refund Policy & FAQs (18.2k vectors)', link: '/knowledge' },
    { id: 4, title: 'Connect AI Model (OpenAI GPT-4o)', desc: 'API Key active with 0.3 temperature setting', link: '/ai-configuration/models' },
    { id: 5, title: 'Customize Chatbot Appearance', desc: 'Set Indigo branding, bot avatar & welcome msg', link: '/widget' },
    { id: 6, title: 'Enable Features & System Prompt', desc: 'Order tracking & human handoff enabled', link: '/ai-configuration/features' },
    { id: 7, title: 'Get Embed Script & Install', desc: 'Copy 1-line script tag to your site body', link: '/widget' },
  ];

  const progressPercentage = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/60 border border-indigo-500/20 shadow-xl shadow-indigo-950/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Workspace Overview
            </span>
            <span className="text-xs text-slate-400">Synced 2 minutes ago</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-100 tracking-tight">
            Welcome back, RDX! 👋
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            RDXBot has resolved <strong className="text-indigo-300">2,840 inquiries</strong> today with an automated deflection rate of 94.2%.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/widget"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test Live Chatbot</span>
          </Link>
          <Link
            href="/integrations"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Integration</span>
          </Link>
        </div>
      </div>

      {/* Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Conversations Today</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-100">2,840</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs yesterday</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>AI Resolution Rate</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-100">94.2%</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+2.1% automated resolution</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>CSAT Score</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Smile className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-100">4.8 / 5.0</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
            <span>Based on 842 ratings</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Integrations</span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-100">3 Active</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
            <span>Shopify, Amazon, Crawler</span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Token Usage (Month)</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-100">1.4M / 2M</div>
          <div className="mt-1 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[70%]" />
          </div>
        </div>
      </div>

      {/* Grid: Onboarding Checklist & Integration Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Setup Checklist (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-100">Platform Setup Checklist</h2>
              <p className="text-xs text-slate-400">Follow the 7 steps to deploy your AI Chatbot to production.</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-indigo-400">{progressPercentage}% Complete</span>
              <div className="w-32 bg-slate-800 h-2 rounded-full mt-1 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {steps.map(step => {
              const isDone = completedSteps.includes(step.id);

              return (
                <div
                  key={step.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${isDone ? 'bg-slate-950/40 border-slate-800/60' : 'bg-indigo-950/20 border-indigo-500/30'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${isDone
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'border-slate-700 hover:border-indigo-400 text-transparent'
                        }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <div className={`text-xs font-semibold ${isDone ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                        {step.id}. {step.title}
                      </div>
                      <div className="text-[11px] text-slate-500">{step.desc}</div>
                    </div>
                  </div>

                  <Link
                    href={step.link}
                    className="flex items-center gap-1 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 py-1 px-2 rounded-md hover:bg-slate-800"
                  >
                    <span>Configure</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Integration Health Status */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100">Integration Status</h2>
            <Link href="/integrations" className="text-xs text-indigo-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {mockIntegrations.slice(0, 4).map(int => (
              <div key={int.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400">
                    {int.type === 'shopify' && <ShoppingBag className="w-4 h-4" />}
                    {int.type === 'amazon' && <Box className="w-4 h-4" />}
                    {int.type === 'website' && <Globe className="w-4 h-4" />}
                    {int.type === 'walmart' && <ShoppingBag className="w-4 h-4 text-amber-400" />}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{int.name}</div>
                    <div className="text-[10px] text-slate-500">{int.lastSync || 'Never synced'}</div>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${int.status === 'Connected'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : int.status === 'Syncing'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                >
                  {int.status}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300 flex items-center justify-between">
            <span>Webhook Server: Healthy</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>
      </div>

      {/* Recent Conversations Preview */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-100">Live Customer Conversations</h2>
            <p className="text-xs text-slate-400">Real-time transcripts from Shopify and Web channels.</p>
          </div>
          <Link
            href="/conversations"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold hover:bg-indigo-600/30 transition-colors"
          >
            <span>Open Inbox (2 Unread)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Last Message</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Sentiment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockConversations.map(conv => (
                <tr key={conv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center text-xs border border-indigo-500/30">
                        {conv.customer.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">{conv.customer.name}</div>
                        <div className="text-[10px] text-slate-500">{conv.customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate text-slate-300 font-mono text-[11px]">
                    &quot;{conv.lastMessage}&quot;
                  </td>
                  <td className="px-4 py-3">
                    <span className="capitalize px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      {conv.channel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${conv.sentiment === 'positive'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : conv.sentiment === 'negative'
                            ? 'bg-rose-500/10 text-rose-400'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                    >
                      {conv.sentiment}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${conv.status === 'resolved'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : conv.status === 'handed_over'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                        }`}
                    >
                      {conv.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href="/conversations"
                      className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 transition-all font-medium text-[11px]"
                    >
                      View Chat
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
