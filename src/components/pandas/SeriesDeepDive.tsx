import React from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function SeriesDeepDive() {
  return (
    <section id="sec-what-is-series" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#b45309]">
          Module 02 • 1D Data Structures
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          2. The pd.Series Anatomy & Dual-Indexing
        </h2>
      </div>

      <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
          What Exactly is a Pandas Series?
        </h3>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          A <code>pd.Series</code> is a 1D labeled array capable of holding any data type. It consists of two synchronized components:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-lg bg-zinc-100 border border-zinc-200">
            <strong className="text-[#b45309]">1. The Values Array:</strong>
            <p className="text-[#71717a] font-sans mt-1">
              Contiguous 1D <code>numpy.ndarray</code> or PyArrow buffer holding the raw payload.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-zinc-100 border border-zinc-200">
            <strong className="text-[#1d4ed8]">2. The Index Object:</strong>
            <p className="text-[#71717a] font-sans mt-1">
              Immutable hash map connecting custom row labels (strings, dates, integers) to 0-based memory offsets.
            </p>
          </div>
        </div>
      </div>

      <CodeSnippet
        title="Constructing Series & Inspecting Core Attributes"
        code={`import pandas as pd

# 1. Create from a list with custom labeled index
prices = [150.5, 310.2, 2800.0]
tickers = ['AAPL', 'MSFT', 'GOOG']

s = pd.Series(prices, index=tickers, name="stock_prices")

print(s)
print("\\nAttributes:")
print("Shape:   ", s.shape)     # (3,)
print("Dtype:   ", s.dtype)     # float64
print("Index:   ", s.index)     # Index(['AAPL', 'MSFT', 'GOOG'], dtype='object')
print("Values:  ", s.values)    # array([ 150.5,  310.2, 2800. ])`}
        output={`AAPL      150.5
MSFT      310.2
GOOG     2800.0
Name: stock_prices, dtype: float64

Attributes:
Shape:    (3,)
Dtype:    float64
Index:    Index(['AAPL', 'MSFT', 'GOOG'], dtype='object')
Values:   [ 150.5  310.2 2800. ]`}
      />

      <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
          Dictionary Initialization & Custom Reindexing
        </h3>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          When initializing a Series from a Python dictionary while passing an explicit <code>index</code> list, Pandas uses the index as the source of truth, filling missing dictionary keys with <code>NaN</code>.
        </p>

        <CodeSnippet
          title="Dictionary Reindexing with Missing NaN Injection"
          code={`stocks = {'AAPL': 185.0, 'MSFT': 415.0, 'NVDA': 880.0}
target_index = ['AAPL', 'MSFT', 'NVDA', 'TSLA']

# 'TSLA' is missing in dict -> Automatically imputed with NaN
s_portfolio = pd.Series(stocks, index=target_index)

print(s_portfolio)`}
          output={`AAPL    185.0
MSFT    415.0
NVDA    880.0
TSLA      NaN
dtype: float64`}
        />
      </div>

      <NoteCallout type="gold" title="Dual-Indexing Superpower">
        Every Series can be indexed by <strong>Label</strong> (<code>s[&apos;AAPL&apos;]</code> or <code>s.loc[&apos;AAPL&apos;]</code>) AND by <strong>Integer Position</strong> (<code>s.iloc[0]</code>).
      </NoteCallout>
    </section>
  );
}
