import React from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function OriginArchitecture() {
  return (
    <section id="sec-origin" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#b45309]">
          Module 01 • Origin & Memory Models
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          1. Origin, Architecture & PyArrow 2.0 Integration
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
          <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
            Historical Origin: Quant Finance at AQR Capital
          </h3>
          <p className="text-sm text-[#3f3f46] leading-relaxed">
            In 2008, <strong>Wes McKinney</strong> built Pandas while working at AQR Capital Management. Quantitative researchers needed a Python library that could handle <strong>financial time series</strong>, date arithmetic, missing price ticks, and heterogeneous columns (stocks, dates, volume, prices) with SQL-like joins and automatic alignment.
          </p>
          <p className="text-sm text-[#3f3f46] leading-relaxed">
            The name comes from <strong>&quot;PANel DAta&quot;</strong> (an econometrics term for multi-dimensional structured data across time).
          </p>
        </div>

        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
          <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
            The 3 Core Pillars of Pandas
          </h3>
          <ul className="text-xs font-mono space-y-2.5 text-[#3f3f46]">
            <li className="p-2 rounded bg-zinc-100 border border-zinc-200">
              <strong className="text-[#b45309]">1. pd.Series:</strong> 1D labeled array wrapping a contiguous NumPy or PyArrow buffer + an Index object.
            </li>
            <li className="p-2 rounded bg-zinc-100 border border-zinc-200">
              <strong className="text-[#b45309]">2. pd.DataFrame:</strong> 2D tabular data structure with heterogeneous column types, shared Index, and column labels.
            </li>
            <li className="p-2 rounded bg-zinc-100 border border-zinc-200">
              <strong className="text-[#b45309]">3. pd.Index:</strong> Immutable, hashable label lookup engine providing O(1) row label lookups and relational alignment.
            </li>
          </ul>
        </div>
      </div>

      {/* Memory Architecture: BlockManager vs PyArrow */}
      <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
          <span className="font-mono text-xs uppercase font-bold text-[#fbbf24]">
            Pandas Memory Engine Evolution
          </span>
          <span className="font-mono text-[10px] text-[#a1a1aa]">BlockManager vs Apache Arrow</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-[#141416] border border-amber-900/40 space-y-2 font-mono text-xs">
            <div className="font-bold text-amber-400">Classic BlockManager (Legacy)</div>
            <p className="text-[#a1a1aa] font-sans text-xs">
              Groups columns by identical NumPy dtype into 2D contiguous blocks.
            </p>
            <ul className="text-[11px] text-[#71717a] space-y-1">
              <li>• FloatBlock: float64 [col1, col3]</li>
              <li>• IntBlock: int64 [col2]</li>
              <li>• ObjectBlock: Python String pointers (High memory bloat!)</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-[#141416] border border-emerald-900/40 space-y-2 font-mono text-xs">
            <div className="font-bold text-emerald-400">Pandas 2.0+ PyArrow Columnar Backend</div>
            <p className="text-[#a1a1aa] font-sans text-xs">
              Direct Apache Arrow columnar layout with contiguous strings and null validity bitmaps.
            </p>
            <ul className="text-[11px] text-[#71717a] space-y-1">
              <li>• Up to 70% RAM reduction on string columns</li>
              <li>• Clean <code className="text-emerald-300">&lt;NA&gt;</code> nullable types</li>
              <li>• Zero-copy memory sharing with DuckDB, Polars, PySpark</li>
            </ul>
          </div>
        </div>
      </div>

      <CodeSnippet
        title="Enabling PyArrow Backend in Modern Pandas"
        code={`import pandas as pd

# Load CSV directly with PyArrow engine and Arrow nullable dtypes
df = pd.read_csv("large_dataset.csv", engine="pyarrow", dtype_backend="pyarrow")

print("Data Types:\\n", df.dtypes)
print("\\nMemory Usage:\\n", df.memory_usage(deep=True))`}
      />

      <NoteCallout type="tip" title="Why PyArrow String Types Win">
        Standard NumPy <code>object</code> dtype stores 64-bit pointers to scattered heap <code>PyUnicode</code> objects (~50 bytes overhead per string cell). PyArrow stores characters in one continuous memory buffer with a compact byte offset array, slashing memory consumption by 3x–10x!
      </NoteCallout>
    </section>
  );
}
