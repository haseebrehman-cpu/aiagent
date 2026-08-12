'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  'integrations': 'Integrations',
  'knowledge': 'Knowledge Base',
  'ai-configuration': 'AI Configuration',
  'prompt': 'System Prompt',
  'models': 'Models',
  'features': 'Features & Tools',
  'widget': 'Channels / Widget',
  'conversations': 'Conversations',
  'analytics': 'Analytics',
  'team': 'Team',
  'settings': 'Settings',
  'billing': 'Billing',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-slate-400">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-slate-200 transition-colors py-1 px-1.5 rounded-md hover:bg-slate-800/50"
      >
        <Home className="w-3.5 h-3.5 text-indigo-400" />
        <span>Overview</span>
      </Link>

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        const label = routeLabels[segment] || segment;

        return (
          <div key={href} className="flex items-center space-x-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            {isLast ? (
              <span className="font-medium text-slate-200 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/50">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-slate-200 transition-colors py-1 px-1.5 rounded-md hover:bg-slate-800/50 capitalize"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
