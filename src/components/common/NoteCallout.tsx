import React from 'react';

type CalloutType = 'tip' | 'danger' | 'warning' | 'info' | 'gold';

interface NoteCalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export default function NoteCallout({
  type = 'info',
  title,
  children,
}: NoteCalloutProps) {
  const styles: Record<CalloutType, { border: string; bg: string; text: string; icon: string; defaultTitle: string }> = {
    tip: {
      border: 'border-l-[#047857]',
      bg: 'bg-emerald-950/20 text-emerald-950 dark:text-emerald-200',
      text: 'text-[#047857]',
      icon: '💡',
      defaultTitle: 'Pro-Tip & Optimization',
    },
    danger: {
      border: 'border-l-[#be123c]',
      bg: 'bg-rose-950/20 text-rose-950 dark:text-rose-200',
      text: 'text-[#be123c]',
      icon: '⚠️',
      defaultTitle: 'Critical Anti-Pattern',
    },
    warning: {
      border: 'border-l-[#b45309]',
      bg: 'bg-amber-950/20 text-amber-950 dark:text-amber-200',
      text: 'text-[#b45309]',
      icon: '⚡',
      defaultTitle: 'Architecture Note',
    },
    info: {
      border: 'border-l-[#1d4ed8]',
      bg: 'bg-blue-950/20 text-blue-950 dark:text-blue-200',
      text: 'text-[#1d4ed8]',
      icon: '🔍',
      defaultTitle: 'Deep Dive Concept',
    },
    gold: {
      border: 'border-l-[#fbbf24]',
      bg: 'bg-amber-500/10 text-amber-950 dark:text-amber-200',
      text: 'text-[#b45309]',
      icon: '⭐',
      defaultTitle: 'Key Takeaway',
    },
  };

  const current = styles[type];

  return (
    <div
      className={`my-6 border-l-4 ${current.border} ${current.bg} p-4 rounded-r-lg border border-transparent transition-all`}
    >
      <div className="flex items-center space-x-2 font-mono font-bold text-xs uppercase tracking-wider mb-1.5 text-[#1c1917]">
        <span>{current.icon}</span>
        <span className={current.text}>{title || current.defaultTitle}</span>
      </div>
      <div className="text-[13.5px] leading-relaxed text-[#27272a] space-y-2">
        {children}
      </div>
    </div>
  );
}
