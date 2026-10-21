import React from 'react';

export default function NumpyHero() {
  const stats = [
    { label: 'Core Abstraction', val: 'ndarray', desc: 'Contiguous C memory block' },
    { label: 'Speed Advantage', val: '50-100x', desc: 'SIMD hardware vectorization' },
    { label: 'Memory Overhead', val: '8 bytes/elem', desc: 'Zero pointer boxing bloat' },
    { label: 'Linear Algebra', val: 'BLAS / LAPACK', desc: 'High-performance C/Fortran' },
  ];

  return (
    <header className="card-paper rounded-2xl p-8 sm:p-10 mb-12 border border-[#e2ddd6] shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/10 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Meta tags */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest bg-[#1d4ed8]/10 text-[#1d4ed8] px-3 py-1 rounded-full">
          Core Scientific Stack
        </span>
        <span className="font-mono text-xs uppercase font-bold tracking-widest bg-[#fbbf24]/20 text-[#b45309] px-3 py-1 rounded-full">
          NumPy 2.x Architecture
        </span>
        <span className="font-mono text-xs uppercase font-bold tracking-widest bg-emerald-700/10 text-emerald-800 px-3 py-1 rounded-full">
          Contiguous C-Memory
        </span>
      </div>

      {/* Title */}
      <h1 className="font-editorial text-3xl sm:text-5xl font-black tracking-tight text-[#1c1917] mb-4 leading-tight">
        NumPy Architecture & Vectorization Mastery
      </h1>
      <p className="text-base sm:text-lg text-[#71717a] font-normal leading-relaxed max-w-4xl mb-8">
        An exhaustive, interactive visual guide to n-dimensional arrays, zero-copy memory views, strided multi-dimensional indexing, broadcasting arithmetic, and high-throughput linear algebra primitives.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#e2ddd6]">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white/60 border border-[#e2ddd6]/60 backdrop-blur-sm">
            <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#1d4ed8]">
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
