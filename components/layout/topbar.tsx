'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import {
  Search,
  Bell,
  Check,
  ChevronDown,
  Plus,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  Sparkles,
  Store,
  Layers,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { mockWorkspaces } from '@/lib/mock-data';
import { Workspace } from '@/lib/types';
import { Breadcrumbs } from './breadcrumbs';
import { CommandPalette } from './command-palette';

interface TopbarProps {
  onOpenCommandPalette: () => void;
}

export function Topbar({ onOpenCommandPalette }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const [currentWorkspace, setCurrentWorkspace] = React.useState<Workspace>(mockWorkspaces[0]);
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState([
    { id: 1, title: 'Shopify Store Synced', desc: '1,420 catalog items updated automatically.', time: '2m ago', read: false },
    { id: 2, title: 'Human Handoff Requested', desc: 'Marcus Vance asked for human agent assistance.', time: '15m ago', read: false },
    { id: 3, title: 'Token Limit Warning', desc: '84% of monthly token quota consumed.', time: '1h ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6">
      {/* Left Area: Breadcrumbs & Mobile Title */}
      <div className="flex items-center gap-4">
        <Breadcrumbs />
      </div>

      {/* Right Area: Controls & User */}
      <div className="flex items-center gap-3">
        {/* Workspace Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/90 hover:bg-slate-800/80 hover:border-slate-700 transition-all text-xs font-medium text-slate-200"
          >
            <div className="w-5 h-5 rounded bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-semibold text-[10px]">
              {currentWorkspace.name[0]}
            </div>
            <span className="hidden sm:inline max-w-[120px] truncate">{currentWorkspace.name}</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded bg-indigo-500/20 text-indigo-300 font-normal border border-indigo-500/30">
              {currentWorkspace.plan}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isWorkspaceMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Workspaces / Tenants
              </div>
              {mockWorkspaces.map(ws => (
                <button
                  key={ws.id}
                  onClick={() => {
                    setCurrentWorkspace(ws);
                    setIsWorkspaceMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${ws.id === currentWorkspace.id
                    ? 'bg-indigo-600/20 text-indigo-300 font-medium border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-indigo-400" />
                    <span>{ws.name}</span>
                  </div>
                  {ws.id === currentWorkspace.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              ))}
              <div className="my-1 border-t border-slate-800" />
              <button
                onClick={() => {
                  alert('Create Workspace modal triggered');
                  setIsWorkspaceMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-indigo-400 hover:bg-indigo-950/40 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Workspace</span>
              </button>
            </div>
          )}
        </div>

        {/* Search trigger (Cmd+K) */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800/70 hover:border-slate-700 transition-all text-xs text-slate-400"
        >
          <Search className="w-3.5 h-3.5 text-indigo-400" />
          <span>Search or jump to...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Theme Switcher */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800/70 text-slate-400 hover:text-slate-200 transition-colors"
          title="Toggle Theme"
        >
          {mounted && theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800/70 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-slate-950 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-200">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-[11px] text-indigo-400 hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="py-2 space-y-2 max-h-64 overflow-y-auto">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg border text-xs transition-colors ${n.read ? 'bg-slate-950/40 border-slate-800/60 text-slate-400' : 'bg-indigo-950/30 border-indigo-500/30 text-slate-200'
                      }`}
                  >
                    <div className="flex items-center justify-between font-medium">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-500/50 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-indigo-600/30 ring-1 ring-white/20">
              SL
            </div>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-800">
                <div className="text-xs font-semibold text-slate-100">RDX Lin</div>
                <div className="text-[11px] text-slate-400">RDX.lin@RDX Assistant.io</div>
              </div>
              <div className="py-1 space-y-0.5">
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-slate-300 hover:bg-slate-800/70 hover:text-slate-100"
                >
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-slate-300 hover:bg-slate-800/70 hover:text-slate-100"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>API Keys & Security</span>
                </button>
              </div>
              <div className="pt-1 border-t border-slate-800">
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-rose-400 hover:bg-rose-950/40"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
