'use client';

import { useState } from 'react';
import NoteCallout from '@/components/common/NoteCallout';

export default function Module1Foundation() {
  const [alignOp, setAlignOp] = useState<'add' | 'fill' | 'mult'>('add');

  const alignData = {
    add: {
      symbol: '+',
      title: 'RESULT: s1 + s2 (UNION ALIGNED)',
      rows: [
        { key: "'AAPL'", val: '175.0', desc: '150 + 25' },
        { key: "'AMZN'", val: 'NaN', desc: 'Missing in s1' },
        { key: "'GOOG'", val: '2900.0', desc: '2800 + 100' },
        { key: "'MSFT'", val: '350.0', desc: '300 + 50' },
        { key: "'TSLA'", val: 'NaN', desc: 'Missing in s2' },
      ],
      tip: "Matching labels ('AAPL', 'GOOG', 'MSFT') are added automatically despite different row orders. Unmatched keys ('AMZN', 'TSLA') safely yield NaN so you never accidentally sum mismatched stocks!",
    },
    fill: {
      symbol: '+',
      title: 'RESULT: s1.add(s2, fill_value=0)',
      rows: [
        { key: "'AAPL'", val: '175.0', desc: '150 + 25' },
        { key: "'AMZN'", val: '3300.0', desc: '0 + 3300' },
        { key: "'GOOG'", val: '2900.0', desc: '2800 + 100' },
        { key: "'MSFT'", val: '350.0', desc: '300 + 50' },
        { key: "'TSLA'", val: '700.0', desc: '700 + 0' },
      ],
      tip: 'Safe Imputed Addition: Using fill_value=0 treats missing keys as 0 rather than propagating NaN, keeping all asset rows active!',
    },
    mult: {
      symbol: '×',
      title: 'RESULT: s1 * s2 (MULTIPLIED)',
      rows: [
        { key: "'AAPL'", val: '3,750.0', desc: '150 × 25' },
        { key: "'AMZN'", val: 'NaN', desc: 'Missing in s1' },
        { key: "'GOOG'", val: '280,000.0', desc: '2800 × 100' },
        { key: "'MSFT'", val: '15,000.0', desc: '300 × 50' },
        { key: "'TSLA'", val: 'NaN', desc: 'Missing in s2' },
      ],
      tip: 'Element-wise Label Multiplication: Automatically matches corresponding company stocks and computes the product.',
    },
  };

  const currentAlign = alignData[alignOp];

  return (
    <div className="space-y-16 mb-20">
      {/* Group Title Banner */}
      <div className="border-b-2 border-[#1c1917] pb-3 pt-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-[#18181b] text-[#fbbf24] px-3 py-1 rounded">
          01 // Foundation & Origin
        </span>
      </div>

      {/* 01. Origin & Wes McKinney */}
      <section id="sec-origin" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">01</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              01 // Historical Origin
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Origin & Wes McKinney
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              How a quantitative crisis at AQR Capital Management led Wes McKinney to build the foundational pillar of modern data science.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-editorial text-lg font-bold text-[#1c1917]">The Quantitative Crisis (2008)</h3>
              <span className="font-mono text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">GENESIS STORY</span>
            </div>
            <p className="text-xs text-[#3f3f46] leading-relaxed">
              In 2008, <strong>Wes McKinney</strong> was working as a quantitative researcher at <strong>AQR Capital Management</strong>. His mission was to analyze high-frequency financial ticks and economic indicators.
            </p>
            <ul className="text-xs text-[#3f3f46] space-y-2 list-disc pl-4">
              <li><strong>The Friction:</strong> Switching between R/SAS (good for stats) and Java/C++ (fast for production) was creating massive technical debt.</li>
              <li><strong>The NumPy Limitation:</strong> NumPy matrices were homogeneous (all floats). Financial tables required <em>dates, ticker strings, customer IDs, and prices</em> side-by-side with automatic alignment.</li>
            </ul>
            <div className="p-3 rounded bg-amber-50 border border-amber-200 text-xs text-amber-900 font-mono">
              <strong>Etymology:</strong> Portmanteau of <strong>&quot;PANel DAta&quot;</strong> (an econometrics term for multi-dimensional structured data over time) and <strong>&quot;Python Data Analysis&quot;</strong>.
            </div>
          </div>

          <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-editorial text-lg font-bold text-[#1c1917]">The Evolution Timeline</h3>
              <span className="font-mono text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">2008 &rarr; PRESENT</span>
            </div>
            <div className="space-y-3 font-mono text-xs border-l-2 border-[#e2ddd6] pl-4">
              <div>
                <div className="text-[10px] font-bold text-[#b45309]">2008 // Inception at AQR Capital</div>
                <div className="font-bold text-[#1c1917]">Wes McKinney&apos;s Quant Breakthrough</div>
                <div className="text-[#71717a] text-[11px]">Conceived to solve time-series financial modeling, labeled indexing, and mixed data wrangling.</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#b45309]">2009 // Open Source Release</div>
                <div className="font-bold text-[#1c1917]">Community Adoption Begins</div>
                <div className="text-[#71717a] text-[11px]">Pandas is open-sourced under BSD. Python transforms into a scientific and statistical computing powerhouse.</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#b45309]">2023–Present // Pandas 2.0 & Apache Arrow</div>
                <div className="font-bold text-[#1c1917]">The PyArrow Engine & Copy-on-Write</div>
                <div className="text-[#71717a] text-[11px]">Full Apache Arrow backend integration for lightning-fast memory representation, zero-copy string slicing, and Copy-on-Write.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Visual DataFrame Anatomy */}
      <section id="sec-anatomy" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">02</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              02 // Visual Architecture
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Visual DataFrame Anatomy
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Understand how rows, columns, heterogeneous dtypes, and explicit labels interconnect within Pandas.
            </p>
          </div>
        </div>

        <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-[#27272a] pb-3">
            <span className="font-mono text-xs font-bold text-[#fbbf24] uppercase">
              2D DataFrame Anatomy Breakdown (Axis 0 × Axis 1)
            </span>
            <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/40">
              Shape: (4, 4)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#3f3f46] text-[#a1a1aa]">
                  <th className="p-3 bg-zinc-900 border-r border-[#27272a] text-[#71717a]">INDEX \ COLS</th>
                  <th className="p-3 bg-[#18181b]">
                    <div>&apos;Name&apos;</div>
                    <div className="text-[10px] text-sky-400">string[pyarrow]</div>
                  </th>
                  <th className="p-3 bg-[#18181b]">
                    <div>&apos;Age&apos;</div>
                    <div className="text-[10px] text-amber-400">int64</div>
                  </th>
                  <th className="p-3 bg-[#18181b]">
                    <div>&apos;Salary&apos;</div>
                    <div className="text-[10px] text-emerald-400">float64</div>
                  </th>
                  <th className="p-3 bg-[#18181b]">
                    <div>&apos;Active&apos;</div>
                    <div className="text-[10px] text-purple-400">boolean</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {[
                  { id: "'cust_101'", pos: 0, name: '"Alice"', age: 29, salary: '78,500.00', active: 'True' },
                  { id: "'cust_102'", pos: 1, name: '"Bob"', age: 34, salary: '92,000.00', active: 'False' },
                  { id: "'cust_103'", pos: 2, name: '"Charlie"', age: 41, salary: '115,200.00', active: 'True' },
                  { id: "'cust_104'", pos: 3, name: '"Diana"', age: 26, salary: '64,000.00', active: 'True' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="p-3 bg-zinc-900 border-r border-[#27272a] text-sky-400 font-bold">
                      {row.id} <span className="text-[10px] text-[#71717a]">[pos {row.pos}]</span>
                    </td>
                    <td className="p-3 text-sky-200">{row.name}</td>
                    <td className="p-3 text-amber-200">{row.age}</td>
                    <td className="p-3 text-emerald-300">{row.salary}</td>
                    <td className={`p-3 font-bold ${row.active === 'True' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {row.active}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-3 gap-3 pt-3 text-xs font-mono">
            <div className="p-3 rounded bg-[#141416] border-l-4 border-indigo-500">
              <strong className="text-indigo-300">1. Row Index (Axis 0):</strong> Explicit human labels coupled with 0-indexed positions.
            </div>
            <div className="p-3 rounded bg-[#141416] border-l-4 border-sky-500">
              <strong className="text-sky-300">2. Column Headers (Axis 1):</strong> Each column is a 1D pd.Series with its own homogeneous dtype.
            </div>
            <div className="p-3 rounded bg-[#141416] border-l-4 border-emerald-500">
              <strong className="text-emerald-300">3. Heterogeneous 2D Table:</strong> Combines strings, ints, floats, and bools in one synchronized object.
            </div>
          </div>
        </div>
      </section>

      {/* 03. Visual Label Alignment */}
      <section id="sec-alignment" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">03</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              03 // Automatic Alignment
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Visual Label Alignment
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              The mathematical superpower of Pandas: arithmetic operations align by explicit label rather than raw index positions.
            </p>
          </div>
        </div>

        <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setAlignOp('add')} className={`tab-btn ${alignOp === 'add' ? 'active' : ''}`}>
              s1 + s2 (Standard Union)
            </button>
            <button onClick={() => setAlignOp('fill')} className={`tab-btn ${alignOp === 'fill' ? 'active' : ''}`}>
              s1.add(s2, fill_value=0)
            </button>
            <button onClick={() => setAlignOp('mult')} className={`tab-btn ${alignOp === 'mult' ? 'active' : ''}`}>
              s1 * s2 (Multiplication)
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 items-center font-mono text-xs">
            <div className="p-4 rounded-lg bg-[#141416] border border-[#27272a] space-y-2">
              <div className="text-sky-400 font-bold border-b border-[#27272a] pb-1">SERIES 1 (s1)</div>
              <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span>&apos;AAPL&apos;</span> <span className="font-bold text-white">150</span></div>
              <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span>&apos;GOOG&apos;</span> <span className="font-bold text-white">2800</span></div>
              <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span>&apos;MSFT&apos;</span> <span className="font-bold text-white">300</span></div>
              <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span>&apos;TSLA&apos;</span> <span className="font-bold text-white">700</span></div>
            </div>

            <div className="p-4 rounded-lg bg-[#141416] border border-[#27272a] space-y-2">
              <div className="text-pink-400 font-bold border-b border-[#27272a] pb-1">SERIES 2 (s2)</div>
              <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span>&apos;MSFT&apos;</span> <span className="font-bold text-white">50</span></div>
              <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span>&apos;AAPL&apos;</span> <span className="font-bold text-white">25</span></div>
              <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span>&apos;AMZN&apos;</span> <span className="font-bold text-white">3300</span></div>
              <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span>&apos;GOOG&apos;</span> <span className="font-bold text-white">100</span></div>
            </div>

            <div className="p-4 rounded-lg bg-[#09090b] border border-emerald-500/50 space-y-2">
              <div className="text-emerald-400 font-bold border-b border-[#27272a] pb-1">{currentAlign.title}</div>
              {currentAlign.rows.map((r, i) => (
                <div key={i} className="flex justify-between p-1.5 rounded bg-[#18181b]">
                  <span className="text-sky-300 font-bold">{r.key}</span>
                  <span>
                    <strong className={r.val === 'NaN' ? 'text-rose-400' : 'text-emerald-400'}>{r.val}</strong>{' '}
                    <small className="text-[#71717a]">({r.desc})</small>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#141416] border border-[#27272a] text-xs font-mono text-[#a1a1aa]">
            <strong className="text-[#fbbf24]">Mechanism: </strong>{currentAlign.tip}
          </div>
        </div>
      </section>

      {/* 04. Memory & PyArrow Block */}
      <section id="sec-architecture" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">04</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              04 // Under the Hood
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Memory & PyArrow Block
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              How Pandas stores heterogeneous data in RAM, and why the Pandas 2.0 Apache Arrow revolution slashes memory usage.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-editorial text-base font-bold text-[#1c1917]">1. Classic BlockManager (Pandas 1.x)</h3>
              <span className="font-mono text-[10px] bg-zinc-200 text-zinc-800 font-bold px-2 py-0.5 rounded">LEGACY</span>
            </div>
            <p className="text-[#71717a] font-sans text-xs">
              Clusters columns of identical dtypes into single contiguous 2D NumPy arrays:
            </p>
            <div className="p-2.5 rounded bg-blue-50 border border-blue-200 text-blue-900">
              <strong>[Float64Block (2, N)]:</strong> &apos;price&apos;, &apos;revenue&apos;
            </div>
            <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900">
              <strong>[Int64Block (2, N)]:</strong> &apos;user_id&apos;, &apos;age&apos;
            </div>
            <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-900">
              <strong>[ObjectBlock]:</strong> Python String pointers (High 50-byte pointer bloat!)
            </div>
          </div>

          <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-editorial text-base font-bold text-[#1c1917]">2. Apache Arrow Backend (Pandas 2.0+)</h3>
              <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">MODERN</span>
            </div>
            <p className="text-[#71717a] font-sans text-xs">
              Direct columnar memory buffers with contiguous string offsets and null bitmaps:
            </p>
            <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-900">
              <strong>PyArrow String Arrays:</strong> Slashes RAM usage by up to 70%!
            </div>
            <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-900">
              <strong>Nullable Primitives:</strong> Native &lt;NA&gt; without float conversions.
            </div>
            <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-900">
              <strong>Zero-Copy Interop:</strong> Direct memory sharing with DuckDB, Polars, and PySpark.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
