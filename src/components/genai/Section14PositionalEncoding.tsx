'use client';

import React, { useState } from 'react';
import NoteCallout from '@/components/common/NoteCallout';

export default function Section14PositionalEncoding() {
  const [selectedPos, setSelectedPos] = useState<number>(4);

  // Compute Sinusoidal Positional Encoding for 4 sample dimensions
  const dims = [0, 4, 16, 64];
  const d_model = 512;

  const calculatePE = (pos: number, dim: number) => {
    const isSin = dim % 2 === 0;
    const exponent = (2 * Math.floor(dim / 2)) / d_model;
    const denominator = Math.pow(10000, exponent);
    const angle = pos / denominator;
    return isSin ? Math.sin(angle) : Math.cos(angle);
  };

  return (
    <section id="sec-positional-encoding" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">08</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            14.8 // Sequence Awareness
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Role of Positional Encoding in Transformers
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            Overcoming permutation invariance: Why Attention is order-blind and how sinusoidal frequencies stamp temporal order.
          </p>
        </div>
      </div>

      {/* Conceptual Explanation in Simple Terms */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917] flex items-center space-x-2">
          <span>⏰</span>
          <span>Why is Self-Attention Completely Order-Blind?</span>
        </h3>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          Unlike an RNN which processes words sequentially in time, Self-Attention computes dot products across all words simultaneously in parallel.
        </p>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          Because set operations and matrix sums are symmetric, the Transformer is <strong>permutation-invariant</strong>. Without positional encoding, the model cannot tell the difference between:
        </p>

        {/* Permutation dilemma callout */}
        <div className="grid sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
            <span className="font-mono text-[10px] uppercase font-bold text-rose-700">Sentence A</span>
            <div className="font-mono text-xs font-bold text-rose-950 mt-1">&quot;The dog bit the man&quot;</div>
            <div className="text-[11px] text-rose-800 mt-1">Subject = Dog, Object = Man</div>
          </div>
          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200">
            <span className="font-mono text-[10px] uppercase font-bold text-purple-700">Sentence B</span>
            <div className="font-mono text-xs font-bold text-purple-950 mt-1">&quot;The man bit the dog&quot;</div>
            <div className="text-[11px] text-purple-800 mt-1">Subject = Man, Object = Dog</div>
          </div>
        </div>

        <p className="text-xs text-zinc-600 leading-relaxed pt-1">
          To solve this without breaking GPU parallelism, we add a fixed positional vector to each word vector: <code className="code-inline">x_input = Embedding(token) + PE(position)</code>.
        </p>

        <NoteCallout
          type="info"
          title="The Clock Analogy for Sinusoidal Waves"
          text="Think of sinusoidal positional encoding like an analog clock. Low dimensions alternate rapidly like the fast seconds hand, distinguishing immediately adjacent words. High dimensions oscillate slowly like the hour hand, keeping track of global sentence location across thousands of tokens."
        />
      </div>

      {/* Interactive Sinusoidal Frequency Oscillator & Heatmap */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100/70 px-2.5 py-0.5 rounded-full mb-1">
              <span>🌊</span>
              <span>Interactive Wave Oscillator</span>
            </div>
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              Sinusoidal Frequency Spectrum Across Dimensions
            </h4>
          </div>

          <div className="flex items-center space-x-3 bg-zinc-100 px-3 py-1.5 rounded-xl">
            <span className="font-mono text-xs font-bold text-zinc-700">
              Token Position (pos): <span className="text-purple-700">{selectedPos}</span>
            </span>
          </div>
        </div>

        {/* Position Slider */}
        <div className="space-y-1.5 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
          <div className="flex justify-between text-xs font-mono font-bold text-zinc-700">
            <span>Slide Token Index in Sequence:</span>
            <span className="text-purple-700 font-bold">pos = {selectedPos}</span>
          </div>
          <input
            type="range"
            min="0"
            max="16"
            step="1"
            value={selectedPos}
            onChange={(e) => setSelectedPos(parseInt(e.target.value))}
            className="w-full accent-purple-700 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
            <span>0 (Start of prompt)</span>
            <span>8 (Mid-sentence)</span>
            <span>16 (Extended context)</span>
          </div>
        </div>

        {/* Wave Channels Visualizer */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold text-zinc-700">
            Computed Positional Encoding Values at pos={selectedPos}:
          </div>

          <div className="grid sm:grid-cols-4 gap-3">
            {dims.map((d) => {
              const val = calculatePE(selectedPos, d);
              return (
                <div key={d} className="card-dark p-4 rounded-xl border border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
                    <span>Dim #{d}</span>
                    <span className="text-purple-400">{d % 2 === 0 ? 'sin' : 'cos'}</span>
                  </div>
                  <div className={`text-2xl font-editorial font-bold ${val >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {val >= 0 ? `+${val.toFixed(3)}` : val.toFixed(3)}
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${val >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{ width: `${Math.abs(val) * 100}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 pt-1">
                    {d === 0 ? '⚡ Ultra-high freq' : d === 4 ? '🌊 High freq' : d === 16 ? '〰️ Medium freq' : '💤 Low freq anchor'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2D Heatmap Matrix of Positions vs Dimensions */}
        <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Positional Encoding Heatmap Grid (8 positions × 8 dimensions):</span>
            <span className="text-[10px] text-zinc-500">Purple = +1.0 | Cyan = -1.0</span>
          </div>

          <div className="grid grid-cols-8 gap-1 pt-1">
            {Array.from({ length: 8 }).map((_, r) =>
              Array.from({ length: 8 }).map((_, c) => {
                const heatVal = calculatePE(r, c * 4);
                const isCurrentRow = r === (selectedPos % 8);
                return (
                  <div
                    key={`${r}-${c}`}
                    title={`pos: ${r}, dim: ${c * 4}, val: ${heatVal.toFixed(2)}`}
                    className={`h-6 rounded-xs flex items-center justify-center font-mono text-[9px] font-bold transition-all ${
                      isCurrentRow ? 'ring-2 ring-amber-400 scale-105 z-10' : ''
                    } ${
                      heatVal > 0.3
                        ? 'bg-purple-700 text-white'
                        : heatVal > -0.3
                        ? 'bg-zinc-800 text-zinc-400'
                        : 'bg-cyan-800 text-cyan-100'
                    }`}
                  >
                    {heatVal.toFixed(1)}
                  </div>
                );
              })
            )}
          </div>
          <div className="text-[10px] font-mono text-zinc-400 text-center pt-1">
            Row highlighted indicates token pos={selectedPos % 8}. Each row forms a globally unique mathematical fingerprint!
          </div>
        </div>
      </div>
    </section>
  );
}
