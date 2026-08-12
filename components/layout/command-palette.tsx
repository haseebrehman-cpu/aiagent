'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Search, Command, Zap, Layers, Database, Cpu, MessageSquare, BarChart3, Users, Settings, CreditCard, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const commands = [
  { id: 'overview', title: 'Go to Overview', category: 'Navigation', icon: Zap, url: '/' },
  { id: 'integrations', title: 'Manage Integrations & Webhooks', category: 'Navigation', icon: Layers, url: '/integrations' },
  { id: 'knowledge', title: 'Knowledge Base (RAG Sources)', category: 'Navigation', icon: Database, url: '/knowledge' },
  { id: 'prompt', title: 'AI Configuration: System Prompt', category: 'Navigation', icon: Cpu, url: '/ai-configuration/prompt' },
  { id: 'models', title: 'AI Configuration: LLM Models & Keys', category: 'Navigation', icon: Cpu, url: '/ai-configuration/models' },
  { id: 'features', title: 'AI Configuration: Capabilities & Tools', category: 'Navigation', icon: Sparkles, url: '/ai-configuration/features' },
  { id: 'widget', title: 'Channels & Chatbot Widget Customizer', category: 'Navigation', icon: MessageSquare, url: '/widget' },
  { id: 'conversations', title: 'Conversations Inbox & Live Handoff', category: 'Navigation', icon: MessageSquare, url: '/conversations' },
  { id: 'analytics', title: 'Analytics & CSAT Dashboard', category: 'Navigation', icon: BarChart3, url: '/analytics' },
  { id: 'team', title: 'Team Members & Permissions', category: 'Navigation', icon: Users, url: '/team' },
  { id: 'settings', title: 'Organization & Workspace Settings', category: 'Navigation', icon: Settings, url: '/settings' },
  { id: 'billing', title: 'Billing & Token Usage Meters', category: 'Navigation', icon: CreditCard, url: '/billing' },
];

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();

  const filteredCommands = React.useMemo(() => {
    if (!query) return commands;
    return commands.filter(cmd =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          router.push(filteredCommands[selectedIndex].url);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-2xl overflow-hidden rounded-xl bg-slate-900 border border-slate-800 shadow-2xl shadow-indigo-950/40"
        >
          {/* Header Input */}
          <div className="flex items-center px-4 border-b border-slate-800 bg-slate-900/90">
            <Search className="w-5 h-5 text-indigo-400 mr-3" />
            <input
              type="text"
              autoFocus
              placeholder="Search commands, pages, or integrations... (Cmd+K)"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full py-4 text-sm bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-1">
            {filteredCommands.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-500">
                No commands or pages found for &quot;{query}&quot;
              </div>
            ) : (
              filteredCommands.map((cmd, idx) => {
                const Icon = cmd.icon;
                const isSelected = idx === selectedIndex;

                return (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      router.push(cmd.url);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/30'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-1.5 rounded-md ${isSelected ? 'bg-indigo-700' : 'bg-slate-800 text-indigo-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{cmd.title}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${isSelected ? 'bg-indigo-700/80 text-indigo-100' : 'bg-slate-800 text-slate-400'}`}>
                      {cmd.category}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer controls */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950/60 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center space-x-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">↵</kbd>
                to select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">ESC</kbd>
              to close
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
