'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shadow-inner">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-100">Something went wrong!</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-sm">
          An unexpected error occurred while loading dashboard components. Please try refreshing.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  );
}
