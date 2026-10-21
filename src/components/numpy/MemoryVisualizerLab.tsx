'use client';

import { useState } from 'react';
import NoteCallout from '@/components/common/NoteCallout';

export default function MemoryVisualizerLab() {
  const [visType, setVisType] = useState<'py' | 'np'>('np');
  const [benchOp, setBenchOp] = useState<'add' | 'mult' | 'sum' | 'filter'>('add');

  const benchData = {
    add: {
      py: '112.4 ms',
      np: '1.42 ms',
      ratio: '79x Faster!',
      note: 'Vectorized C additions execute SIMD instructions across 8 float64 values per CPU clock tick.',
      pyWidth: 92,
      npWidth: 3,
    },
    mult: {
      py: '98.6 ms',
      np: '1.18 ms',
      ratio: '83x Faster!',
      note: 'Floating point multiplication occurs directly in CPU floating point registers without object boxing.',
      pyWidth: 88,
      npWidth: 2.5,
    },
    sum: {
      py: '42.1 ms',
      np: '0.64 ms',
      ratio: '65x Faster!',
      note: 'Sum reduction is optimized with low-level C accumulator loops over contiguous cache lines.',
      pyWidth: 72,
      npWidth: 2,
    },
    filter: {
      py: '135.2 ms',
      np: '2.10 ms',
      ratio: '64x Faster!',
      note: 'Boolean masking computes bitmasks directly in C buffers instead of creating Python conditional branch checks.',
      pyWidth: 96,
      npWidth: 3.5,
    },
  };

  const currentBench = benchData[benchOp];

  return (
    <section id="sec-memory" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#1d4ed8]">
          Module 02 • Performance & Memory
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          2. Memory Architecture & Interactive Benchmark Simulator
        </h2>
      </div>

      {/* Visualizer 1: Python Boxed List vs NumPy Contiguous Buffer */}
      <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
          <div>
            <h3 className="font-editorial text-xl font-bold text-[#fbbf24]">
              RAM Layout Visualizer: Python List vs NumPy ndarray
            </h3>
            <p className="text-xs text-[#a1a1aa] font-mono mt-1">
              Toggle between fragmented pointer references and contiguous cache-aligned buffers.
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setVisType('py')}
              className={`tab-btn ${visType === 'py' ? 'active' : ''}`}
            >
              Python List (Boxed)
            </button>
            <button
              onClick={() => setVisType('np')}
              className={`tab-btn ${visType === 'np' ? 'active' : ''}`}
            >
              NumPy Array (Contiguous)
            </button>
          </div>
        </div>

        {/* Python List Representation */}
        {visType === 'py' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-lg bg-[#141416] border border-rose-900/40">
              <div className="text-xs font-mono font-bold text-rose-400 mb-2">
                Python List: Array of 64-bit Pointers &rarr; Scattered Heap `PyObject`s
              </div>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[10, 20, 30, 40].map((val, idx) => (
                  <div key={idx} className="p-3 rounded bg-[#27272a] border border-rose-500/30">
                    <div className="font-mono text-[10px] text-rose-300">ptr[{idx}] &rarr; 0x{8000 + idx * 128}</div>
                    <div className="my-2 p-2 rounded bg-rose-950/40 border border-rose-800 text-xs font-mono">
                      <div className="text-[10px] text-[#a1a1aa]">PyObject (28 Bytes)</div>
                      <div className="text-sm font-bold text-rose-200">value: {val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-[#a1a1aa] font-mono leading-relaxed">
              <strong className="text-rose-400">Total Memory:</strong> ~28 bytes per integer object + 8 bytes per pointer reference = <strong>36 bytes per integer!</strong> High cache misses from pointer dereferencing.
            </div>
          </div>
        )}

        {/* NumPy Contiguous Buffer Representation */}
        {visType === 'np' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-lg bg-[#141416] border border-emerald-900/40">
              <div className="text-xs font-mono font-bold text-emerald-400 mb-2">
                NumPy ndarray: Single Header &rarr; Contiguous 8-Byte int64 Raw Memory Block
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[10, 20, 30, 40].map((val, idx) => (
                  <div key={idx} className="p-3 rounded bg-emerald-950/40 border border-emerald-500/40">
                    <div className="font-mono text-[10px] text-emerald-400">Offset +{idx * 8}B</div>
                    <div className="text-lg font-bold font-mono text-[#fbbf24] my-1">{val}</div>
                    <div className="text-[10px] font-mono text-[#a1a1aa]">int64 (8 Bytes)</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-[#a1a1aa] font-mono leading-relaxed">
              <strong className="text-emerald-400">Total Memory:</strong> Exactly <strong>8 bytes per integer</strong>. Fits directly into CPU L1/L2 cache lines with zero pointer indirection!
            </div>
          </div>
        )}
      </div>

      {/* Visualizer 2: Interactive Benchmark Simulator */}
      <div className="card-paper rounded-xl p-6 border border-[#e2ddd6] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2ddd6] pb-4">
          <div>
            <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
              Hardware Benchmark Simulator (1,000,000 Elements)
            </h3>
            <p className="text-xs text-[#71717a] font-mono mt-0.5">
              Simulate execution time across heavy numerical calculations.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-xs font-mono font-bold text-[#71717a]">Operation:</label>
            <select
              value={benchOp}
              onChange={(e) => setBenchOp(e.target.value as any)}
              className="font-mono text-xs p-1.5 rounded border border-[#e2ddd6] bg-white text-[#1c1917] font-semibold cursor-pointer focus:ring-2 focus:ring-[#1d4ed8]"
            >
              <option value="add">Element-wise Addition (A + B)</option>
              <option value="mult">Element-wise Multiplication (A * B)</option>
              <option value="sum">Sum Reduction (np.sum)</option>
              <option value="filter">Boolean Mask Filtering</option>
            </select>
          </div>
        </div>

        {/* Benchmark Bars */}
        <div className="space-y-4">
          {/* Python Standard Bar */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 font-bold text-[#71717a]">
              <span>Standard Python Loop (interpreted)</span>
              <span className="text-rose-600">{currentBench.py}</span>
            </div>
            <div className="h-6 bg-zinc-200 rounded-md overflow-hidden p-0.5">
              <div
                className="h-full bg-rose-500 rounded text-right pr-2 text-white font-mono text-[11px] font-bold flex items-center justify-end transition-all duration-500"
                style={{ width: `${currentBench.pyWidth}%` }}
              >
                {currentBench.py}
              </div>
            </div>
          </div>

          {/* NumPy Vectorized Bar */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 font-bold text-[#71717a]">
              <span>NumPy Vectorized C-Loop (SIMD AVX-512)</span>
              <span className="text-emerald-700">{currentBench.np}</span>
            </div>
            <div className="h-6 bg-zinc-200 rounded-md overflow-hidden p-0.5">
              <div
                className="h-full bg-emerald-600 rounded text-right pr-2 text-white font-mono text-[11px] font-bold flex items-center justify-end transition-all duration-500 min-w-[65px]"
                style={{ width: `${currentBench.npWidth}%` }}
              >
                {currentBench.np}
              </div>
            </div>
          </div>

          {/* Speedup Badge & Notes */}
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-editorial text-2xl font-black text-emerald-800">
                {currentBench.ratio}
              </div>
              <p className="text-xs text-emerald-900 mt-1">
                {currentBench.note}
              </p>
            </div>
          </div>
        </div>
      </div>

      <NoteCallout type="tip" title="CPU Cache Line Locality">
        Modern CPUs load 64-byte chunks of memory (cache lines) into L1 cache at once. Because NumPy arrays are contiguous, a single CPU fetch loads 8 continuous <code>float64</code> values, enabling SIMD parallel instructions without stalling the memory bus!
      </NoteCallout>
    </section>
  );
}
