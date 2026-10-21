'use client';

import { useState } from 'react';
import NoteCallout from '@/components/common/NoteCallout';

export default function AutomaticAlignmentLab() {
  const [opMode, setOpMode] = useState<'add' | 'fill' | 'mult'>('add');

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
      tip: 'Using fill_value=0 treats missing keys as 0 rather than propagating NaN, keeping all asset rows active!',
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
      tip: 'Element-wise label multiplication matches corresponding company tickers and computes their product.',
    },
  };

  const current = alignData[opMode];

  return (
    <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
        <div>
          <h3 className="font-editorial text-xl font-bold text-[#fbbf24]">
            Interactive Automatic Label Alignment Calculator
          </h3>
          <p className="text-xs text-[#a1a1aa] font-mono mt-1">
            Pandas aligns data on index labels, not row positions.
          </p>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setOpMode('add')}
          className={`tab-btn ${opMode === 'add' ? 'active' : ''}`}
        >
          s1 + s2 (Standard Union)
        </button>
        <button
          onClick={() => setOpMode('fill')}
          className={`tab-btn ${opMode === 'fill' ? 'active' : ''}`}
        >
          s1.add(s2, fill_value=0)
        </button>
        <button
          onClick={() => setOpMode('mult')}
          className={`tab-btn ${opMode === 'mult' ? 'active' : ''}`}
        >
          s1 * s2 (Multiplication)
        </button>
      </div>

      {/* Alignment Stage */}
      <div className="grid lg:grid-cols-3 gap-4 items-center">
        {/* Series 1 */}
        <div className="p-4 rounded-lg bg-[#141416] border border-[#27272a] font-mono text-xs">
          <div className="text-[#fbbf24] uppercase font-bold mb-3 border-b border-[#27272a] pb-1">
            Series s1 (Portfolio 1)
          </div>
          <div className="space-y-2">
            <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span className="text-[#71717a]">&apos;AAPL&apos;</span> <span className="font-bold text-white">150.0</span></div>
            <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span className="text-[#71717a]">&apos;MSFT&apos;</span> <span className="font-bold text-white">300.0</span></div>
            <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span className="text-[#71717a]">&apos;GOOG&apos;</span> <span className="font-bold text-white">2800.0</span></div>
            <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span className="text-[#71717a]">&apos;TSLA&apos;</span> <span className="font-bold text-white">700.0</span></div>
          </div>
        </div>

        {/* Series 2 */}
        <div className="p-4 rounded-lg bg-[#141416] border border-[#27272a] font-mono text-xs">
          <div className="text-[#fbbf24] uppercase font-bold mb-3 border-b border-[#27272a] pb-1">
            Series s2 (Portfolio 2)
          </div>
          <div className="space-y-2">
            <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span className="text-[#71717a]">&apos;MSFT&apos;</span> <span className="font-bold text-white">50.0</span></div>
            <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span className="text-[#71717a]">&apos;AAPL&apos;</span> <span className="font-bold text-white">25.0</span></div>
            <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span className="text-[#71717a]">&apos;AMZN&apos;</span> <span className="font-bold text-white">3300.0</span></div>
            <div className="flex justify-between p-1.5 rounded bg-[#27272a]"><span className="text-[#71717a]">&apos;GOOG&apos;</span> <span className="font-bold text-white">100.0</span></div>
          </div>
        </div>

        {/* Aligned Result */}
        <div className="p-4 rounded-lg bg-[#09090b] border border-emerald-500/40 font-mono text-xs">
          <div className="text-emerald-400 uppercase font-bold mb-3 border-b border-[#27272a] pb-1">
            {current.title}
          </div>
          <div className="space-y-1.5">
            {current.rows.map((row, idx) => (
              <div key={idx} className="flex justify-between p-1.5 rounded bg-[#18181b]">
                <span className="text-sky-300 font-bold">{row.key}</span>
                <span>
                  <strong className={row.val === 'NaN' ? 'text-rose-400' : 'text-emerald-400'}>
                    {row.val}
                  </strong>{' '}
                  <small className="text-[#71717a]">({row.desc})</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-[#141416] border border-[#27272a] text-xs font-mono text-[#a1a1aa] leading-relaxed">
        <strong className="text-[#fbbf24]">Architectural Mechanism:</strong> {current.tip}
      </div>
    </div>
  );
}
