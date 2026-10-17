import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'indigo' | 'emerald' | 'rose' | 'default' | 'amber';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className = '' }: BadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  const variantClasses = {
    gold: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    amber: 'bg-amber-600/20 text-amber-200 border border-amber-500/40',
    indigo: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
    default: 'bg-slate-800/80 text-slate-300 border border-slate-700/60',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full backdrop-blur-sm ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}
