'use client';

import { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';

export default function Module2Series() {
  const [activeSeriesPreset, setActiveSeriesPreset] = useState<string>('list_custom');

  const seriesPresets: Record<
    string,
    {
      title: string;
      name: string;
      dtype: string;
      length: number;
      items: { label: string; pos: number; val: string }[];
      attrs: { k: string; v: string }[];
      code: string;
      exp: string;
    }
  > = {
    list_custom: {
      title: '1. List & Custom Index',
      name: "'temperature_readings'",
      dtype: 'float64',
      length: 4,
      items: [
        { label: "'Mon'", pos: 0, val: '22.4 °C' },
        { label: "'Tue'", pos: 1, val: '24.1 °C' },
        { label: "'Wed'", pos: 2, val: '21.8 °C' },
        { label: "'Thu'", pos: 3, val: '25.0 °C' },
      ],
      attrs: [
        { k: 's.shape', v: '(4,)' },
        { k: 's.dtype', v: 'float64' },
        { k: 's.nbytes', v: '32 bytes' },
        { k: 's.hasnans', v: 'False' },
      ],
      code: `import pandas as pd

temps = [22.4, 24.1, 21.8, 25.0]
days = ['Mon', 'Tue', 'Wed', 'Thu']

s = pd.Series(temps, index=days, name='temperature_readings')
print(s)`,
      exp: "Custom Labeled Index: Explicit string labels ('Mon', 'Tue', etc.) replace default integer index. Dual-indexing allows accessing s['Mon'] or s.iloc[0].",
    },
    dict_stock: {
      title: '2. Dict Reindexing (NaN)',
      name: "'portfolio_prices'",
      dtype: 'float64',
      length: 4,
      items: [
        { label: "'AAPL'", pos: 0, val: '$185.00' },
        { label: "'MSFT'", pos: 1, val: '$415.00' },
        { label: "'NVDA'", pos: 2, val: '$880.00' },
        { label: "'TSLA'", pos: 3, val: 'NaN (Missing)' },
      ],
      attrs: [
        { k: 's.shape', v: '(4,)' },
        { k: 's.dtype', v: 'float64' },
        { k: 's.nbytes', v: '32 bytes' },
        { k: 's.hasnans', v: 'True' },
      ],
      code: `import pandas as pd

stocks = {'AAPL': 185.0, 'MSFT': 415.0, 'NVDA': 880.0}
target_idx = ['AAPL', 'MSFT', 'NVDA', 'TSLA']

# Reindexing: TSLA is missing in dict -> Filled with NaN!
s = pd.Series(stocks, index=target_idx, name='portfolio_prices')`,
      exp: "Dictionary Reindexing: When a custom index is passed with a dictionary, keys missing from the dict ('TSLA') automatically receive NaN.",
    },
    scalar_quota: {
      title: '3. Scalar Broadcaster',
      name: "'sales_target'",
      dtype: 'int64',
      length: 4,
      items: [
        { label: "'Q1'", pos: 0, val: '50,000' },
        { label: "'Q2'", pos: 1, val: '50,000' },
        { label: "'Q3'", pos: 2, val: '50,000' },
        { label: "'Q4'", pos: 3, val: '50,000' },
      ],
      attrs: [
        { k: 's.shape', v: '(4,)' },
        { k: 's.dtype', v: 'int64' },
        { k: 's.nbytes', v: '32 bytes' },
        { k: 's.is_unique', v: 'False' },
      ],
      code: `import pandas as pd

# Scalar 50000 expands automatically across all 4 quarters
s = pd.Series(50000, index=['Q1', 'Q2', 'Q3', 'Q4'], name='sales_target')`,
      exp: 'Scalar Value Broadcasting: A single scalar (50000) expands automatically across the entire index array without generating a redundant Python list.',
    },
    arrow_string: {
      title: '4. PyArrow String Array',
      name: "'customer_status'",
      dtype: 'string[pyarrow]',
      length: 4,
      items: [
        { label: "'user_1'", pos: 0, val: '"Premium"' },
        { label: "'user_2'", pos: 1, val: '"Free"' },
        { label: "'user_3'", pos: 2, val: '"Enterprise"' },
        { label: "'user_4'", pos: 3, val: '<NA>' },
      ],
      attrs: [
        { k: 's.shape', v: '(4,)' },
        { k: 's.dtype', v: 'string[pyarrow]' },
        { k: 's.hasnans', v: 'True' },
        { k: 'Zero-Copy', v: 'True' },
      ],
      code: `import pandas as pd

# Pandas 2.0+ Apache Arrow String Backend
s = pd.Series(
    ['Premium', 'Free', 'Enterprise', None],
    index=['user_1', 'user_2', 'user_3', 'user_4'],
    dtype='string[pyarrow]',
    name='customer_status'
)`,
      exp: 'PyArrow String Backend: Text is stored in unified contiguous Arrow memory with a bitmap validity mask. Nulls are represented cleanly as <NA>.',
    },
    numpy_zerocopy: {
      title: '5. NumPy Zero-Copy Float32',
      name: "'sensor_voltage'",
      dtype: 'float32',
      length: 4,
      items: [
        { label: "'s_0'", pos: 0, val: '3.31 V' },
        { label: "'s_1'", pos: 1, val: '3.28 V' },
        { label: "'s_2'", pos: 2, val: '3.34 V' },
        { label: "'s_3'", pos: 3, val: '3.30 V' },
      ],
      attrs: [
        { k: 's.shape', v: '(4,)' },
        { k: 's.dtype', v: 'float32' },
        { k: 's.nbytes', v: '16 bytes' },
        { k: 's.hasnans', v: 'False' },
      ],
      code: `import numpy as np
import pandas as pd

arr = np.array([3.31, 3.28, 3.34, 3.30], dtype='float32')
# Direct zero-overhead wrapper over C-buffer
s = pd.Series(arr, index=['s_0', 's_1', 's_2', 's_3'], name='sensor_voltage')`,
      exp: 'NumPy Zero-Copy Wrapping: Points directly to existing float32 memory buffer without memory reallocation.',
    },
  };

  const curPreset = seriesPresets[activeSeriesPreset];

  return (
    <div className="space-y-16 mb-20">
      {/* Group Title Banner */}
      <div className="border-b-2 border-[#1c1917] pb-3 pt-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-[#18181b] text-[#fbbf24] px-3 py-1 rounded">
          02 // Pandas Series in Depth
        </span>
      </div>

      {/* 05. What is a Series? */}
      <section id="sec-what-is-series" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">05</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              05 // 1D Data Structure
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              What is a Series?
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              A Series is the foundational 1-Dimensional building block of Pandas. A DataFrame is an orchestrated collection of Series sharing a common index!
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
            <h3 className="font-editorial text-lg font-bold text-[#1c1917]">The Tripartite Anatomy of a Series</h3>
            <ul className="text-xs text-[#3f3f46] space-y-2.5">
              <li className="p-2 rounded bg-zinc-100 border border-zinc-200">
                <strong>1. Data Buffer (<code>.values</code>):</strong> Contiguous 1D array of values (NumPy or Apache Arrow backed).
              </li>
              <li className="p-2 rounded bg-zinc-100 border border-zinc-200">
                <strong>2. Index Labels (<code>.index</code>):</strong> Explicit axis labels enabling O(1) dictionary-speed lookups and label alignment.
              </li>
              <li className="p-2 rounded bg-zinc-100 border border-zinc-200">
                <strong>3. Metadata (<code>.dtype</code> & <code>.name</code>):</strong> Strict datatype enforcement and identification tag.
              </li>
            </ul>
            <div className="p-3 rounded bg-blue-50 border border-blue-200 text-xs text-blue-900 font-mono">
              <strong>Equation:</strong> Series = 1D Data Array + Hashable Labeled Index + Dtype Metadata
            </div>
          </div>

          <div className="card-dark p-6 rounded-xl border border-[#27272a] shadow-xl space-y-3 font-mono">
            <div className="flex justify-between text-xs text-[#a1a1aa] border-b border-[#27272a] pb-2">
              <span>Name: <strong className="text-sky-400">&apos;closing_price&apos;</strong></span>
              <span>Dtype: <strong className="text-amber-400">float64</strong></span>
              <span>Length: <strong className="text-emerald-400">4</strong></span>
            </div>
            <div className="space-y-1.5 text-xs">
              {[
                { date: "'2026-01-01'", pos: 0, val: '$182.50' },
                { date: "'2026-01-02'", pos: 1, val: '$184.20' },
                { date: "'2026-01-03'", pos: 2, val: '$181.90' },
                { date: "'2026-01-04'", pos: 3, val: '$186.75' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 rounded bg-[#27272a]">
                  <div className="flex space-x-2">
                    <span className="text-sky-300 font-bold">{item.date}</span>
                    <span className="text-[10px] text-[#71717a]">[pos {item.pos}]</span>
                  </div>
                  <div className="text-[#fbbf24] font-bold">{item.val}</div>
                </div>
              ))}
            </div>
            <div className="p-2.5 rounded bg-[#141416] text-[11px] text-[#a1a1aa] border border-[#27272a]">
              <strong>Dual Indexing:</strong> Access by label <code>s[&apos;2026-01-01&apos;]</code> or by position <code>s.iloc[0]</code>!
            </div>
          </div>
        </div>
      </section>

      {/* 06. How to Create a Series */}
      <section id="sec-create-series" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">06</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              06 // Creation Patterns
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              How to Create a Series
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Pandas provides flexible constructors to instantiate a Series from lists, NumPy arrays, dictionaries, scalars, and missing values.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-2 text-xs font-mono">
            <strong className="text-[#b45309] uppercase">1. Python List</strong>
            <p className="text-[#71717a] font-sans">Default 0-indexed RangeIndex or custom labels.</p>
            <div className="p-2 rounded bg-[#18181b] text-white">
              pd.Series([10, 20], index=[&apos;q1&apos;, &apos;q2&apos;])
            </div>
          </div>
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-2 text-xs font-mono">
            <strong className="text-[#1d4ed8] uppercase">2. NumPy Array</strong>
            <p className="text-[#71717a] font-sans">Zero-overhead wrapper around continuous buffer.</p>
            <div className="p-2 rounded bg-[#18181b] text-white">
              pd.Series(np.array([1.5, 2.8]))
            </div>
          </div>
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-2 text-xs font-mono">
            <strong className="text-[#047857] uppercase">3. Python Dict</strong>
            <p className="text-[#71717a] font-sans">Keys automatically become index labels.</p>
            <div className="p-2 rounded bg-[#18181b] text-white">
              pd.Series({'{'}&apos;AAPL&apos;: 182{'}'})
            </div>
          </div>
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-2 text-xs font-mono">
            <strong className="text-[#6d28d9] uppercase">4. Scalar Broadcast</strong>
            <p className="text-[#71717a] font-sans">Single value broadcasts across index.</p>
            <div className="p-2 rounded bg-[#18181b] text-white">
              pd.Series(0.0, index=[&apos;a&apos;, &apos;b&apos;])
            </div>
          </div>
        </div>
      </section>

      {/* 07. Series Attributes & Inspection */}
      <section id="sec-series-attributes" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">07</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              07 // Attributes & Inspection
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Series Attributes & Inspection
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Inspect underlying memory, shape, labels, and status of any pd.Series object.
            </p>
          </div>
        </div>

        <div className="card-paper rounded-xl overflow-hidden border border-[#e2ddd6]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-100 text-[#71717a] border-b border-[#e2ddd6]">
              <tr>
                <th className="p-3">Attribute</th>
                <th className="p-3">Returns</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2ddd6] text-[#3f3f46]">
              <tr><td className="p-3 font-bold text-[#b45309]">s.values / s.to_numpy()</td><td className="p-3">ndarray</td><td className="p-3 font-sans">Returns the raw underlying 1D array.</td></tr>
              <tr><td className="p-3 font-bold text-[#b45309]">s.index</td><td className="p-3">Index</td><td className="p-3 font-sans">Returns the index object (labels).</td></tr>
              <tr><td className="p-3 font-bold text-[#b45309]">s.dtype</td><td className="p-3">dtype</td><td className="p-3 font-sans">Returns the exact data type.</td></tr>
              <tr><td className="p-3 font-bold text-[#b45309]">s.shape / s.size</td><td className="p-3">tuple / int</td><td className="p-3 font-sans">(N,) dimensions and total count.</td></tr>
              <tr><td className="p-3 font-bold text-[#b45309]">s.nbytes</td><td className="p-3">int</td><td className="p-3 font-sans">Memory consumed in bytes.</td></tr>
              <tr><td className="p-3 font-bold text-[#b45309]">s.hasnans</td><td className="p-3">bool</td><td className="p-3 font-sans">True if any null values exist.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 08. Interactive Series Builder */}
      <section id="sec-series-builder-lab" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">08</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              08 // Interactive Series Lab
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Interactive Series Builder
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Test and visualize Pandas Series data structures in real-time across 5 construction pipelines.
            </p>
          </div>
        </div>

        <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(seriesPresets).map(([k, p]) => (
              <button
                key={k}
                onClick={() => setActiveSeriesPreset(k)}
                className={`tab-btn ${activeSeriesPreset === k ? 'active' : ''}`}
              >
                {p.title}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#141416] border border-[#27272a] space-y-3">
              <div className="flex justify-between border-b border-[#27272a] pb-2 text-[#a1a1aa]">
                <span>Name: <strong className="text-sky-400">{curPreset.name}</strong></span>
                <span>Dtype: <strong className="text-amber-400">{curPreset.dtype}</strong></span>
              </div>
              <div className="space-y-1.5">
                {curPreset.items.map((item, i) => (
                  <div key={i} className="flex justify-between p-2 rounded bg-[#27272a]">
                    <div className="space-x-2">
                      <span className="text-sky-300 font-bold">{item.label}</span>
                      <span className="text-[10px] text-[#71717a]">[pos {item.pos}]</span>
                    </div>
                    <div className={item.val.includes('NaN') || item.val.includes('NA') ? 'text-rose-400 font-bold' : 'text-[#fbbf24] font-bold'}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#27272a] text-[11px]">
                {curPreset.attrs.map((a, i) => (
                  <div key={i} className="p-1.5 rounded bg-[#18181b] border border-[#27272a] flex justify-between">
                    <span className="text-[#71717a]">{a.k}:</span>
                    <span className="text-[#fbbf24] font-bold">{a.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <CodeSnippet code={curPreset.code} />
              <div className="p-3.5 rounded-lg bg-[#141416] border border-[#27272a] text-xs text-[#a1a1aa]">
                <strong className="text-[#fbbf24]">Mechanism: </strong>{curPreset.exp}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
