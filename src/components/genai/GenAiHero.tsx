import React from 'react';

export default function GenAiHero() {
  const stats = [
    { label: 'Foundation Model Stack', val: 'Decoder-Only', desc: 'Autoregressive Causal Attention' },
    { label: 'Tokenization Standard', val: 'Byte-Pair BPE', desc: 'Subword token-to-ID projection' },
    { label: 'Attention Mechanism', val: 'Multi-Head QKV', desc: 'Scaled dot-product in d_k space' },
    { label: 'Spatial Geometry', val: 'Sin/Cos + RoPE', desc: 'Permutation-invariance resolution' },
  ];

  return (
    <header className="card-paper rounded-2xl p-8 sm:p-10 mb-12 border border-[#e2ddd6] shadow-sm relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-amber-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Meta tags */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest bg-[#18181b] text-[#fbbf24] px-3.5 py-1 rounded-full shadow-sm">
          Section 14 // Core Foundation
        </span>
        <span className="font-mono text-xs uppercase font-bold tracking-widest bg-purple-700/10 text-purple-800 border border-purple-700/20 px-3 py-1 rounded-full">
          Generative AI & LLMs
        </span>
        <span className="font-mono text-xs uppercase font-bold tracking-widest bg-blue-700/10 text-blue-800 border border-blue-700/20 px-3 py-1 rounded-full">
          Transformer Primitives
        </span>
        <span className="font-mono text-xs uppercase font-bold tracking-widest bg-emerald-700/10 text-emerald-800 border border-emerald-700/20 px-3 py-1 rounded-full">
          Interactive Simulators
        </span>
      </div>

      {/* Title */}
      <h1 className="font-editorial text-3xl sm:text-5xl font-black tracking-tight text-[#1c1917] mb-4 leading-tight">
        Core Foundation of <span className="text-purple-700">Generative AI</span> & Large Language Models
      </h1>
      
      <p className="text-base sm:text-lg text-[#71717a] font-normal leading-relaxed max-w-4xl mb-8">
        A deep architectural breakdown of modern foundation models. Explore the complete pipeline from raw string tokenization, subword BPE encoding, dense semantic embeddings, and sinusoidal positional waves, to the breakthrough multi-head self-attention mechanism and autoregressive sampling loops.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#e2ddd6]">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white/70 border border-[#e2ddd6]/80 backdrop-blur-sm shadow-xs">
            <div className="font-editorial text-2xl sm:text-3xl font-bold text-purple-700">
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
