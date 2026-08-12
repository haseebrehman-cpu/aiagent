'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Sliders, Sparkles, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { name: 'System Prompt', href: '/ai-configuration/prompt', icon: Terminal },
  { name: 'Models & API Keys', href: '/ai-configuration/models', icon: Sliders },
  { name: 'Features & Tools', href: '/ai-configuration/features', icon: Sparkles },
];

export default function AiConfigurationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Tabs */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            LLM Orchestration
          </span>
          <span className="text-xs text-slate-400">OpenAI GPT-4o Active</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold text-slate-100 tracking-tight">AI Configuration & Behavior</h1>
        <p className="text-sm text-slate-400">Customize bot personality, write system prompts, adjust model parameters, and toggle capabilities.</p>

        {/* Tab Switcher */}
        <div className="mt-6 flex items-center gap-2 border-b border-slate-800 pb-px">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2',
                  isActive
                    ? 'border-indigo-500 text-indigo-400 bg-slate-900/80 shadow-sm'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {children}
    </div>
  );
}
