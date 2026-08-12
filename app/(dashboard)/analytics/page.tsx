'use client';

import * as React from 'react';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Smile,
  Zap,
  DollarSign,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const volumeData = [
  { day: 'Mon', ai: 2400, human: 180 },
  { day: 'Tue', ai: 2800, human: 140 },
  { day: 'Wed', ai: 3100, human: 160 },
  { day: 'Thu', ai: 2950, human: 130 },
  { day: 'Fri', ai: 3400, human: 210 },
  { day: 'Sat', ai: 1900, human: 90 },
  { day: 'Sun', ai: 1840, human: 80 },
];

const categoryData = [
  { name: 'Where is my order?', count: 4200 },
  { name: 'Return / Refund', count: 2800 },
  { name: 'Product Recommendation', count: 1950 },
  { name: 'Shipping Costs', count: 1400 },
  { name: 'Warranty Claim', count: 850 },
];

const csatTrend = [
  { week: 'Wk 1', csat: 4.6 },
  { week: 'Wk 2', csat: 4.7 },
  { week: 'Wk 3', csat: 4.8 },
  { week: 'Wk 4', csat: 4.9 },
];

const channelShare = [
  { name: 'Shopify Store', value: 55, color: '#10b981' },
  { name: 'Amazon Central', value: 30, color: '#f59e0b' },
  { name: 'Direct Web Widget', value: 15, color: '#6366f1' },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = React.useState('7d');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Analytics & Insights
            </span>
            <span className="text-xs text-slate-400">Updated Hourly</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-100 tracking-tight">Performance & CSAT Report</h1>
          <p className="text-sm text-slate-400">Monitor conversation trends, AI deflection rates, top customer questions, and ROI.</p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
          <Calendar className="w-4 h-4 text-indigo-400 ml-2" />
          {['7d', '30d', '90d'].map(range => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                dateRange === range ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Last {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Total Inquiries</span>
            <MessageSquare className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-100">18,390</div>
          <div className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> +24% vs last period
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>AI Deflection Rate</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-100">94.2%</div>
          <div className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> +1.8% resolution without humans
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Avg CSAT Feedback</span>
            <Smile className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-100">4.85 / 5.0</div>
          <div className="mt-1 text-[11px] text-slate-400">98% positive reviews</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Est. Support Cost Saved</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 text-2xl font-bold text-emerald-400">$14,250</div>
          <div className="mt-1 text-[11px] text-slate-400">Saved ~380 agent support hours</div>
        </div>
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Volume Over Time */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-100">Daily Conversation Volume</h3>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="text-indigo-400 flex items-center gap-1">● AI Automated</span>
              <span className="text-amber-400 flex items-center gap-1">● Human Handoff</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="ai" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="human" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Top Question Categories */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-100">Top Customer Inquiry Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={130} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
