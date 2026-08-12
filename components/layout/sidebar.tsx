'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  Database,
  Cpu,
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Sliders,
  Terminal,
  MessageCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Integrations', href: '/integrations', icon: Layers, badge: '5' },
  { name: 'Knowledge Base', href: '/knowledge', icon: Database, badge: '4' },
  {
    name: 'AI Configuration',
    href: '/ai-configuration/prompt',
    icon: Cpu,
    submenu: [
      { name: 'System Prompt', href: '/ai-configuration/prompt', icon: Terminal },
      { name: 'Models', href: '/ai-configuration/models', icon: Sliders },
      { name: 'Features & Tools', href: '/ai-configuration/features', icon: Sparkles },
    ]
  },
  { name: 'Channels / Widget', href: '/widget', icon: MessageSquare },
  { name: 'Conversations', href: '/conversations', icon: MessageCircle, badge: '2', highlight: true },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Billing', href: '/billing', icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isAiConfigOpen, setIsAiConfigOpen] = React.useState(pathname.startsWith('/ai-configuration'));

  React.useEffect(() => {
    if (pathname.startsWith('/ai-configuration')) {
      setIsAiConfigOpen(true);
    }
  }, [pathname]);

  return (
    <aside
      className={cn(
        'relative h-screen sticky top-0 z-40 bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out select-none',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 ring-1 ring-white/20 shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-sm text-slate-100 tracking-tight flex items-center gap-1.5">
                  RDX Assistant <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">v2.4</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">AI Chatbot Platform</span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            if (item.submenu) {
              const isChildActive = pathname.startsWith('/ai-configuration');

              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => {
                      if (isCollapsed) setIsCollapsed(false);
                      setIsAiConfigOpen(!isAiConfigOpen);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group',
                      isChildActive
                        ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/25'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn("w-4 h-4 shrink-0 transition-colors", isChildActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200")} />
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <ChevronRight
                        className={cn('w-3.5 h-3.5 text-slate-500 transition-transform duration-200', isAiConfigOpen && 'rotate-90')}
                      />
                    )}
                  </button>

                  {!isCollapsed && isAiConfigOpen && (
                    <div className="pl-4 space-y-1 border-l border-slate-800 ml-5 py-1">
                      {item.submenu.map(sub => {
                        const SubIcon = sub.icon;
                        const isSubActive = pathname === sub.href;

                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={cn(
                              'flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs transition-colors',
                              isSubActive
                                ? 'bg-indigo-600 text-white font-medium shadow-sm shadow-indigo-600/30'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                            )}
                          >
                            <SubIcon className="w-3.5 h-3.5" />
                            <span>{sub.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group relative',
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn('w-4 h-4 shrink-0 transition-colors', isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200')} />
                  {!isCollapsed && <span>{item.name}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span
                    className={cn(
                      'px-1.5 py-0.2 rounded-full text-[10px] font-semibold',
                      item.highlight
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                        : isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Support Section */}
      {!isCollapsed && (
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/30 border border-indigo-500/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Need help integrating?</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
              Read docs or chat live with our support team.
            </p>
            <a
              href="https://docs.RDX Assistant.io"
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center justify-between text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>Developer Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </aside>
  );
}
