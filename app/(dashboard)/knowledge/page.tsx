'use client';

import * as React from 'react';
import {
  Database,
  FileText,
  Globe,
  HelpCircle,
  Upload,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Trash2,
  Plus,
  Sparkles,
  X,
  FileUp,
  Layers,
  ArrowRight
} from 'lucide-react';
import { mockKnowledgeSources } from '@/lib/mock-data';
import { KnowledgeSource } from '@/lib/types';

export default function KnowledgePage() {
  const [sources, setSources] = React.useState<KnowledgeSource[]>(mockKnowledgeSources);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [isCrawlModalOpen, setIsCrawlModalOpen] = React.useState(false);
  const [testRagQuery, setTestRagQuery] = React.useState('');
  const [ragResult, setRagResult] = React.useState<string | null>(null);
  const [isSimulatingRag, setIsSimulatingRag] = React.useState(false);
  const [newCrawlUrl, setNewCrawlUrl] = React.useState('');

  const filteredSources = sources.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSourceEnabled = (id: string) => {
    setSources(prev =>
      prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s)
    );
  };

  const deleteSource = (id: string) => {
    setSources(prev => prev.filter(s => s.id !== id));
  };

  const handleTestRag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testRagQuery.trim()) return;

    setIsSimulatingRag(true);
    setRagResult(null);

    setTimeout(() => {
      setIsSimulatingRag(false);
      setRagResult(
        `Top Matching Vector Chunks (Similarity Score: 0.94):\n` +
        `1. Chunk #842 (from Returns & Refund Policy 2026.pdf):\n` +
        `"Customers may request return labels within 30 days of shipment date. Store credit or original payment method refunds are processed within 3-5 business days of receiving the item."\n\n` +
        `2. Chunk #120 (from Shopify Product Catalog):\n` +
        `"Warranty Coverage: All RDX audio products include a 1-year limited warranty against hardware defects."`
      );
    }, 1200);
  };

  const handleAddWebsiteCrawl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrawlUrl) return;

    const newSource: KnowledgeSource = {
      id: `ks-${Date.now()}`,
      name: newCrawlUrl,
      type: 'Website',
      vectorCount: 0,
      status: 'Processing',
      enabled: true,
      lastUpdated: 'Just now',
    };

    setSources([newSource, ...sources]);
    setNewCrawlUrl('');
    setIsCrawlModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              RAG Vector Index
            </span>
            <span className="text-xs text-slate-400">18,670 Total Embeddings</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-100 tracking-tight">Knowledge Base & Context</h1>
          <p className="text-sm text-slate-400">Upload PDF documents, connect product catalogs, or crawl your website for RAG context retrieval.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCrawlModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>Crawl Website URL</span>
          </button>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* RAG Search Vector Simulator */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/20 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Interactive Vector Search Simulator</span>
        </div>
        <p className="text-xs text-slate-400">Test how the AI retrieves relevant knowledge chunks for customer questions in real-time.</p>

        <form onSubmit={handleTestRag} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Type a test query (e.g., 'What is the warranty policy for headphones?')"
              value={testRagQuery}
              onChange={e => setTestRagQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSimulatingRag}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shrink-0 transition-all"
          >
            {isSimulatingRag ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Search Vectors</span>
          </button>
        </form>

        {ragResult && (
          <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs font-mono text-indigo-200 whitespace-pre-wrap animate-in fade-in duration-200">
            {ragResult}
          </div>
        )}
      </div>

      {/* Knowledge Sources Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base font-bold text-slate-100">Knowledge Sources ({sources.length})</h2>
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search sources..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Source Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Vector Count</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Enabled</th>
                <th className="px-4 py-3">Last Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredSources.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    No knowledge sources found matching &quot;{searchQuery}&quot;
                  </td>
                </tr>
              ) : (
                filteredSources.map(s => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5 font-semibold text-slate-200">
                        {s.type === 'Catalog' && <Database className="w-4 h-4 text-emerald-400" />}
                        {s.type === 'Document' && <FileText className="w-4 h-4 text-indigo-400" />}
                        {s.type === 'Website' && <Globe className="w-4 h-4 text-purple-400" />}
                        {s.type === 'FAQ' && <HelpCircle className="w-4 h-4 text-amber-400" />}
                        <span className="truncate max-w-xs">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium text-[11px]">
                        {s.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-indigo-300">
                      {s.vectorCount.toLocaleString()} vectors
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${s.status === 'Ready'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : s.status === 'Processing'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => toggleSourceEnabled(s.id)}
                        className={`w-8 h-4 rounded-full transition-colors relative p-0.5 ${s.enabled ? 'bg-indigo-600' : 'bg-slate-800'
                          }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full bg-white transition-transform ${s.enabled ? 'translate-x-4' : 'translate-x-0'
                            }`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                      {s.lastUpdated}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => deleteSource(s.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                        title="Delete Source"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-100">Upload Knowledge Document</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-8 text-center bg-slate-950/50 cursor-pointer transition-colors space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto">
                <FileUp className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold text-slate-200">
                Click to browse or drag & drop files here
              </div>
              <div className="text-[11px] text-slate-500">Supports PDF, DOCX, TXT, CSV (Max 25MB)</div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium">
                Cancel
              </button>
              <button
                onClick={() => {
                  const newDoc: KnowledgeSource = {
                    id: `ks-${Date.now()}`,
                    name: 'New Document Upload.pdf',
                    type: 'Document',
                    vectorCount: 1200,
                    status: 'Ready',
                    enabled: true,
                    lastUpdated: 'Just now',
                    fileSize: '3.1 MB'
                  };
                  setSources([newDoc, ...sources]);
                  setIsUploadModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium"
              >
                Upload & Process
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Website Crawl Modal */}
      {isCrawlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form onSubmit={handleAddWebsiteCrawl} className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-100">Crawl Website Domain</h3>
              <button type="button" onClick={() => setIsCrawlModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 block">Website URL / Domain</label>
              <input
                type="url"
                required
                placeholder="https://yourstore.com/help-center"
                value={newCrawlUrl}
                onChange={e => setNewCrawlUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-slate-500">Our crawler will extract all publicly accessible subpages and FAQs automatically.</p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button type="button" onClick={() => setIsCrawlModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium">
                Start Crawler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
