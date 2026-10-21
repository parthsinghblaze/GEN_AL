'use client';

import { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';

export default function SeriesBuilderLab() {
  const [activePreset, setActivePreset] = useState<string>('list_custom');

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
      title: 'List + Custom String Index',
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
      title: 'Dict + NaN Reindexing',
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
      title: 'Scalar Value Broadcasting',
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
      title: 'PyArrow String Backend',
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
  };

  const current = seriesPresets[activePreset];

  return (
    <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
        <div>
          <h3 className="font-editorial text-xl font-bold text-[#fbbf24]">
            Interactive Series Builder Lab
          </h3>
          <p className="text-xs text-[#a1a1aa] font-mono mt-1">
            Construct Series from various data structures and inspect memory representations.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(seriesPresets).map(([key, p]) => (
          <button
            key={key}
            onClick={() => setActivePreset(key)}
            className={`tab-btn ${activePreset === key ? 'active' : ''}`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Visualizer Card */}
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Visual Rows */}
        <div className="p-5 rounded-xl bg-[#141416] border border-[#27272a] space-y-3 font-mono">
          <div className="flex justify-between text-xs text-[#a1a1aa] border-b border-[#27272a] pb-2">
            <span>Name: <strong className="text-sky-400">{current.name}</strong></span>
            <span>Dtype: <strong className="text-[#fbbf24]">{current.dtype}</strong></span>
          </div>

          <div className="space-y-2 pt-1">
            {current.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#27272a] text-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-sky-300 font-bold">{item.label}</span>
                  <span className="text-[10px] text-[#71717a]">[pos {item.pos}]</span>
                </div>
                <div
                  className={`font-bold ${
                    item.val.includes('NaN') || item.val.includes('NA')
                      ? 'text-rose-400'
                      : 'text-[#fbbf24]'
                  }`}
                >
                  {item.val}
                </div>
              </div>
            ))}
          </div>

          {/* Attributes Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#27272a] text-[11px]">
            {current.attrs.map((a, idx) => (
              <div key={idx} className="p-1.5 rounded bg-[#18181b] border border-[#27272a] flex justify-between">
                <span className="text-[#71717a]">{a.k}:</span>
                <span className="text-[#fbbf24] font-bold">{a.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code & Explanation */}
        <div className="space-y-4">
          <CodeSnippet code={current.code} />
          <div className="p-4 rounded-lg bg-[#141416] border border-[#27272a] text-xs text-[#a1a1aa] leading-relaxed">
            <strong className="text-[#fbbf24]">Mechanism:</strong> {current.exp}
          </div>
        </div>
      </div>
    </div>
  );
}
