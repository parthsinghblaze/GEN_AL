import React from 'react';

export default function PandasHero() {
  const stats = [
    { label: 'Core Abstractions', val: 'Series & DF', desc: '1D & 2D labeled data structures' },
    { label: 'Alignment Engine', val: 'Label-Aware', desc: 'Automatic index union matching' },
    { label: 'PyArrow Integration', val: 'Pandas 2.x', desc: 'Zero-copy columnar backend' },
    { label: 'Missing Data Model', val: 'NaN & <NA>', desc: 'Nullable Arrow data types' },
  ];

  return (
    <header className="card-paper rounded-2xl p-8 sm:p-10 mb-12 border border-[#e2ddd6] shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Meta tags */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest bg-[#b45309]/10 text-[#b45309] px-3 py-1 rounded-full">
          Tabular Data Engineering
        </span>
        <span className="font-mono text-xs uppercase font-bold tracking-widest bg-[#fbbf24]/20 text-[#b45309] px-3 py-1 rounded-full">
          Pandas 2.2 + PyArrow
        </span>
        <span className="font-mono text-xs uppercase font-bold tracking-widest bg-blue-700/10 text-blue-800 px-3 py-1 rounded-full">
          Label-Aligned Relational Data
        </span>
      </div>

      {/* Title */}
      <h1 className="font-editorial text-3xl sm:text-5xl font-black tracking-tight text-[#1c1917] mb-4 leading-tight">
        Pandas Architecture & Tabular Data Science
      </h1>
      <p className="text-base sm:text-lg text-[#71717a] font-normal leading-relaxed max-w-4xl mb-8">
        An in-depth, interactive masterclass covering Series and DataFrame data structures, automatic index alignment, Apache Arrow zero-copy memory layouts, dual indexing (.loc vs .iloc), and robust data cleaning pipelines.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#e2ddd6]">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white/60 border border-[#e2ddd6]/60 backdrop-blur-sm">
            <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#b45309]">
              {stat.val}
            </div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1c1917] mt-1">
              {stat.label}
            </div>
            <div className="text-[12px] text-[#71717a] mt-0.5">
              {stat.desc}
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}
