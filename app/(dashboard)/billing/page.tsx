'use client';

import * as React from 'react';
import {
  CreditCard,
  Zap,
  CheckCircle2,
  Download,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { mockInvoices } from '@/lib/mock-data';

export default function BillingPage() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Subscription & Usage
            </span>
            <span className="text-xs text-slate-400">Renews Sept 1, 2026</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-100 tracking-tight">Billing & Token Consumption</h1>
          <p className="text-sm text-slate-400">Manage plan subscriptions, monitor AI token quotas, and download invoices.</p>
        </div>

        <button
          onClick={() => setIsUpgradeModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Upgrade Tier</span>
        </button>
      </div>

      {/* Current Plan & Usage Meters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan Summary Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/40 border border-indigo-500/30 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Current Plan</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
              Enterprise AI
            </span>
          </div>

          <div>
            <div className="text-3xl font-extrabold text-slate-100">$299 <span className="text-xs font-medium text-slate-400">/ month</span></div>
            <p className="text-xs text-slate-400 mt-1">Includes unlimited agent seats, priority OpenAI routing, and dedicated support.</p>
          </div>

          <div className="pt-2 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Unlimited Teammate Seats</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Custom RAG Vector Indexes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>99.9% Uptime SLA</span>
            </div>
          </div>
        </div>

        {/* Usage Meters (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>Monthly Usage Meters</span>
          </h2>

          {/* Meter 1 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Monthly Active Conversations</span>
              <span className="font-mono text-indigo-400 font-bold">8,420 / 10,000 (84%)</span>
            </div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-[84%]" />
            </div>
          </div>

          {/* Meter 2 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">AI Token Consumption (GPT-4o)</span>
              <span className="font-mono text-indigo-400 font-bold">1.4M / 2.0M tokens (70%)</span>
            </div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full w-[70%]" />
            </div>
          </div>

          {/* Meter 3 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Vector Knowledge Storage</span>
              <span className="font-mono text-indigo-400 font-bold">45 MB / 100 MB (45%)</span>
            </div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-indigo-500 to-amber-500 h-full w-[45%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method & Invoice Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-indigo-400" />
          <span>Payment Methods & Invoice History</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Invoice ID</th>
                <th className="px-4 py-3">Billing Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">PDF Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5 font-mono text-indigo-300 font-semibold">{inv.id}</td>
                  <td className="px-4 py-3.5 text-slate-400">{inv.date}</td>
                  <td className="px-4 py-3.5 font-bold text-slate-100">${inv.amount.toFixed(2)}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => showToast(`Downloaded invoice ${inv.id}!`)}
                      className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-[11px] inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3 text-indigo-400" />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Tier Modal */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-100">Select Subscription Tier</h3>
              <button onClick={() => setIsUpgradeModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: 'Starter', price: '$49', desc: 'For small stores getting started', conversations: '1,000' },
                { name: 'Pro', price: '$199', desc: 'For growing e-commerce brands', conversations: '5,000' },
                { name: 'Enterprise', price: '$299', desc: 'Full power & high volume', conversations: '10,000+' },
              ].map(tier => (
                <div key={tier.name} className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-100">{tier.name}</div>
                    <div className="text-xl font-bold text-indigo-400 mt-1">{tier.price} <span className="text-[10px] text-slate-500 font-normal">/mo</span></div>
                    <p className="text-[11px] text-slate-400 mt-2">{tier.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      showToast(`Selected ${tier.name} Plan!`);
                      setIsUpgradeModalOpen(false);
                    }}
                    className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all"
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
