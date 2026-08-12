'use client';

import * as React from 'react';
import {
  MessageSquare,
  Code,
  Sparkles,
  Send,
  Copy,
  Check,
  Palette,
  Bot,
  Plus,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Sliders,
  ExternalLink,
  ShoppingBag,
  Box,
  Store,
  Globe,
  Layers,
  ChevronRight
} from 'lucide-react';
import { mockWidgetCustomization, mockIntegrations } from '@/lib/mock-data';
import { WidgetCustomization, Message, Integration } from '@/lib/types';

export default function WidgetPage() {
  const [activeTab, setActiveTab] = React.useState<'customize' | 'embed'>('customize');
  const [widget, setWidget] = React.useState<WidgetCustomization>(mockWidgetCustomization);
  const [selectedConnector, setSelectedConnector] = React.useState<Integration>(mockIntegrations[0]);
  const [newQuestion, setNewQuestion] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState<Message[]>([
    { id: '1', sender: 'bot', text: widget.welcomeMessage, timestamp: '10:00 AM' }
  ]);
  const [inputMsg, setInputMsg] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Sync welcome message if changed
  React.useEffect(() => {
    setChatMessages(prev => [
      { id: '1', sender: 'bot', text: widget.welcomeMessage, timestamp: '10:00 AM' },
      ...prev.slice(1)
    ]);
  }, [widget.welcomeMessage]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userMsg: Message = { id: `m-${Date.now()}`, sender: 'user', text, timestamp: 'Just now' };
    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');

    setTimeout(() => {
      let replyText = `Thanks for your inquiry about "${text}". I have checked our live inventory and store policies. How else can I assist you today?`;
      if (text.toLowerCase().includes('order') || text.toLowerCase().includes('where')) {
        replyText = `Your order #SH-9042 is out for delivery with FedEx today! Tracking ID: 94001112023.`;
      } else if (text.toLowerCase().includes('compare') || text.toLowerCase().includes('headphones')) {
        replyText = `Comparing models:\n• **RDX SoundPro ANC**: $199.99 (40h battery, active noise cancellation)\n• **RDX Air Lite**: $149.99 (30h battery, lightweight)\nBoth include 1-year warranty!`;
      }
      const botMsg: Message = { id: `b-${Date.now()}`, sender: 'bot', text: replyText, timestamp: 'Just now' };
      setChatMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  const addSuggestedQuestion = () => {
    if (!newQuestion.trim()) return;
    setWidget(prev => ({
      ...prev,
      suggestedQuestions: [...prev.suggestedQuestions, newQuestion.trim()]
    }));
    setNewQuestion('');
  };

  const removeSuggestedQuestion = (index: number) => {
    setWidget(prev => ({
      ...prev,
      suggestedQuestions: prev.suggestedQuestions.filter((_, i) => i !== index)
    }));
  };

  // Generate Connector-specific script snippet
  const getConnectorSnippet = (connector: Integration) => {
    if (connector.type === 'shopify') {
      return `<!-- Shopify Theme Liquid (layout/theme.liquid) -->
{% comment %} RDXBot Shopify Chatbot Widget {% endcomment %}
<script
  src="https://cdn.aetherchat.io/shopify-widget.js"
  data-shopify-shop="{{ shop.permanent_domain }}"
  data-connector-id="${connector.id}"
  data-theme-color="${widget.primaryColor}"
  data-position="${widget.position}"
  async>
</script>`;
    } else if (connector.type === 'amazon') {
      return `// Amazon Seller Central Integration Script (AWS Lambda Hook)
const aether = require('@aetherchat/amazon-sdk');

exports.handler = async (event) => {
  return await aether.processAmazonOrderInquiry({
    connectorId: "${connector.id}",
    webhookSecret: "${connector.webhookSecret}",
    event: event
  });
};`;
    } else if (connector.type === 'website') {
      return `<!-- Vanilla HTML / Custom Web App Embed -->
<script
  src="https://cdn.aetherchat.io/widget.js"
  data-aether-key="${connector.webhookSecret}"
  data-connector-id="${connector.id}"
  data-theme-color="${widget.primaryColor}"
  data-position="${widget.position}"
  async>
</script>`;
    } else {
      return `// React / Next.js Component Import
import { AetherChatWidget } from '@aetherchat/react';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <AetherChatWidget
        connectorId="${connector.id}"
        themeColor="${widget.primaryColor}"
        position="${widget.position}"
      />
    </>
  );
}`;
    }
  };

  const currentSnippet = getConnectorSnippet(selectedConnector);

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setToastMessage(`Copied ${selectedConnector.name} embed script to clipboard!`);
    setTimeout(() => {
      setCopied(false);
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium text-xs shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Web Channel
            </span>
            <span className="text-xs text-slate-400">Live Preview & Customizer</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-100 tracking-tight">Channels & Chatbot Widget</h1>
          <p className="text-sm text-slate-400">Customize your chatbot look and feel, colors, welcome prompts, and copy connector-specific embed scripts.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('customize')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'customize' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Customize Widget</span>
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'embed' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Install & Embed</span>
          </button>
        </div>
      </div>

      {activeTab === 'customize' ? (
        /* Split View Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Branding & Theme Colors */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-400" />
                <span>Branding & Color Theme</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Primary Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={widget.primaryColor}
                      onChange={e => setWidget({ ...widget, primaryColor: e.target.value })}
                      className="w-9 h-9 rounded-lg border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={widget.primaryColor}
                      onChange={e => setWidget({ ...widget, primaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Color Presets</label>
                  <div className="flex gap-2 pt-1">
                    {['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'].map(color => (
                      <button
                        key={color}
                        onClick={() => setWidget({ ...widget, primaryColor: color })}
                        className="w-7 h-7 rounded-full border border-white/20 transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Names & Messages */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Bot className="w-4 h-4 text-indigo-400" />
                <span>Bot Identity & Welcome Copy</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Bot Display Name</label>
                  <input
                    type="text"
                    value={widget.botName}
                    onChange={e => setWidget({ ...widget, botName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Header Title Text</label>
                  <input
                    type="text"
                    value={widget.headerTitle}
                    onChange={e => setWidget({ ...widget, headerTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Welcome Greeting Message</label>
                <textarea
                  rows={3}
                  value={widget.welcomeMessage}
                  onChange={e => setWidget({ ...widget, welcomeMessage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Suggested Quick Questions */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Suggested Quick Starter Questions</span>
              </h2>

              <div className="space-y-2">
                {widget.suggestedQuestions.map((q, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
                    <span>{q}</span>
                    <button
                      onClick={() => removeSuggestedQuestion(idx)}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a new quick question prompt..."
                  value={newQuestion}
                  onChange={e => setNewQuestion(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                />
                <button
                  onClick={addSuggestedQuestion}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Prompt</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Live Interactive Chatbot Preview Frame (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="sticky top-24 w-full max-w-sm rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[560px]">
              {/* Widget Header */}
              <div
                className="p-4 flex items-center justify-between text-white shadow-md"
                style={{ backgroundColor: widget.primaryColor }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-sm">
                    ⚡
                  </div>
                  <div>
                    <div className="font-bold text-sm leading-tight">{widget.headerTitle}</div>
                    <div className="text-[10px] text-white/80 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Online • Replies instantly</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Widget Message Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-900/60">
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                          : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested Questions Pills */}
              <div className="p-2 bg-slate-950 border-t border-slate-800 flex flex-wrap gap-1.5">
                {widget.suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-indigo-300 text-[10px] font-medium transition-colors truncate max-w-full"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={inputMsg}
                  onChange={e => setInputMsg(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="p-2 rounded-xl text-white font-semibold shadow-md transition-all hover:scale-105"
                  style={{ backgroundColor: widget.primaryColor }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Widget Footer */}
              {widget.showBranding && (
                <div className="py-1 bg-slate-950 text-center text-[10px] text-slate-500 border-t border-slate-900">
                  Powered by <span className="font-semibold text-slate-400">AetherChat AI</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Connector-Specific Embed Code Tab */
        <div className="space-y-6 max-w-4xl">
          {/* Step 1: Select Integration Connector */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Step 1: Select Target Integration Connector</span>
              </h2>
              <span className="text-xs text-slate-400">Script generates based on connector choice</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {mockIntegrations.map(conn => {
                const isSelected = selectedConnector.id === conn.id;

                return (
                  <div
                    key={conn.id}
                    onClick={() => setSelectedConnector(conn)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500/60 ring-2 ring-indigo-500/20'
                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400">
                        {conn.type === 'shopify' && <ShoppingBag className="w-4 h-4 text-emerald-400" />}
                        {conn.type === 'amazon' && <Box className="w-4 h-4 text-amber-400" />}
                        {conn.type === 'website' && <Globe className="w-4 h-4 text-indigo-400" />}
                        {conn.type === 'walmart' && <Store className="w-4 h-4 text-blue-400" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">{conn.name}</div>
                        <div className="text-[10px] text-slate-400 capitalize">{conn.type}</div>
                      </div>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Custom Embed Code Generator */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Code className="w-4 h-4 text-indigo-400" />
                  <span>Step 2: Copy {selectedConnector.name} Installation Script</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Target Connector ID: <code className="text-indigo-300 font-mono">{selectedConnector.id}</code> ({selectedConnector.status})
                </p>
              </div>

              <button
                onClick={copyEmbedCode}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-indigo-200">
              <pre className="overflow-x-auto whitespace-pre-wrap">{currentSnippet}</pre>
            </div>

            <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex items-center justify-between">
              <span>Ready for deployment on {selectedConnector.name}</span>
              <span className="font-semibold text-indigo-300">Live Auto-Sync Enabled</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
