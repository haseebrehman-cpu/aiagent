'use client';

import * as React from 'react';
import {
  MessageSquare,
  Search,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Filter,
  Send,
  ShoppingBag,
  Clock,
  Tag,
  Download,
  User,
  Star,
  MapPin,
  DollarSign,
  Package,
  Sparkles,
  Check,
  ShieldAlert
} from 'lucide-react';
import { mockConversations } from '@/lib/mock-data';
import { Conversation, ConversationStatus, Message } from '@/lib/types';

export default function ConversationsInboxPage() {
  const [conversations, setConversations] = React.useState<Conversation[]>(mockConversations);
  const [selectedConvId, setSelectedConvId] = React.useState<string>(mockConversations[0].id);
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [replyText, setReplyText] = React.useState<string>('');
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const selectedConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  const filteredConversations = conversations.filter(c => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesQuery =
      c.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConv) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: 'agent',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === selectedConv.id) {
          return {
            ...c,
            lastMessage: replyText,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    setReplyText('');
    showToast('Agent message sent!');
  };

  const handleTakeOver = () => {
    setConversations(prev =>
      prev.map(c =>
        c.id === selectedConv.id
          ? { ...c, status: 'handed_over', assignedAgent: 'Sarah Lin (Human Agent)' }
          : c
      )
    );
    showToast('You took over this conversation!');
  };

  const handleResolve = () => {
    setConversations(prev =>
      prev.map(c => c.id === selectedConv.id ? { ...c, status: 'resolved' } : c)
    );
    showToast('Conversation marked as resolved');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-4 animate-in fade-in duration-300">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium text-xs shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Conversations Inbox
            </span>
            <span className="text-xs text-slate-400">{conversations.length} Active Threads</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-100 tracking-tight">Omnichannel Inbox</h1>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'all', label: 'All' },
            { id: 'active', label: 'Active AI' },
            { id: 'handed_over', label: 'Handed Over' },
            { id: 'resolved', label: 'Resolved' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter === f.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Pane Main Inbox Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* Pane 1: Conversations List (4 Cols) */}
        <div className="lg:col-span-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col min-h-0 overflow-hidden">
          {/* Search Box */}
          <div className="p-3 border-b border-slate-800">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by customer name or text..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {filteredConversations.map(conv => {
              const isSelected = conv.id === selectedConv.id;

              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`p-3.5 cursor-pointer transition-all ${isSelected
                      ? 'bg-indigo-950/40 border-l-4 border-l-indigo-500'
                      : 'hover:bg-slate-800/50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center text-xs border border-indigo-500/30">
                        {conv.customer.name[0]}
                      </div>
                      <span className="font-semibold text-xs text-slate-200">{conv.customer.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{conv.timestamp}</span>
                  </div>

                  <p className="mt-1.5 text-xs text-slate-400 line-clamp-1 font-mono">{conv.lastMessage}</p>

                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="capitalize px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-medium">
                      {conv.channel}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded-full font-semibold border ${conv.status === 'resolved'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : conv.status === 'handed_over'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                        }`}
                    >
                      {conv.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pane 2: Conversation Transcript & Actions (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col min-h-0 overflow-hidden">
          {/* Thread Header */}
          <div className="p-3.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-slate-100 flex items-center gap-2">
                <span>{selectedConv.customer.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">({selectedConv.customer.email})</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Assigned: <strong className="text-indigo-300">{selectedConv.assignedAgent || 'AI Assistant'}</strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedConv.status !== 'handed_over' && (
                <button
                  onClick={handleTakeOver}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 text-xs font-semibold transition-all flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Take Over</span>
                </button>
              )}

              {selectedConv.status !== 'resolved' && (
                <button
                  onClick={handleResolve}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Resolve</span>
                </button>
              )}
            </div>
          </div>

          {/* Transcript Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40">
            {selectedConv.messages.map(msg => {
              if (msg.sender === 'system') {
                return (
                  <div key={msg.id} className="p-2 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-[11px] text-indigo-300 font-mono text-center flex items-center justify-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{msg.text}</span>
                  </div>
                );
              }

              const isUser = msg.sender === 'user';

              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${isUser
                        ? 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                        : msg.sender === 'agent'
                          ? 'bg-purple-600 text-white rounded-br-none shadow-md'
                          : 'bg-indigo-600 text-white rounded-br-none shadow-md'
                      }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-white/70 mb-1">
                      <span className="font-semibold">{isUser ? selectedConv.customer.name : msg.sender === 'agent' ? 'Human Agent' : 'RDXBot'}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reply Form Input */}
          <form onSubmit={handleSendReply} className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type human reply to customer..."
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Reply</span>
            </button>
          </form>
        </div>

        {/* Pane 3: Customer Context Profile Sidebar (3 Cols) */}
        <div className="lg:col-span-3 rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-4 overflow-y-auto">
          <div className="text-center pb-4 border-b border-slate-800">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-lg flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
              {selectedConv.customer.name[0]}
            </div>
            <h3 className="mt-2 font-bold text-sm text-slate-100">{selectedConv.customer.name}</h3>
            <p className="text-[11px] text-slate-400">{selectedConv.customer.email}</p>
            <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300">
              <MapPin className="w-3 h-3 text-indigo-400" />
              <span>{selectedConv.customer.location}</span>
            </div>
          </div>

          {/* E-commerce Profile Metrics */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-300 text-[11px] uppercase tracking-wider">Customer Metrics</div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-indigo-400" /> Total Orders
              </span>
              <span className="font-bold text-slate-200">{selectedConv.customer.totalOrders} orders</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Lifetime Value
              </span>
              <span className="font-bold text-emerald-400">${selectedConv.customer.lifetimeValue}</span>
            </div>

            {selectedConv.customer.csatRating && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400" /> CSAT Rating
                </span>
                <span className="font-bold text-amber-400">{selectedConv.customer.csatRating} / 5.0 ⭐</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
