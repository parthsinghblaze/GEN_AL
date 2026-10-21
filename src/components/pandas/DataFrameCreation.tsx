import React from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function DataFrameCreation() {
  return (
    <section id="sec-df-creation" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#b45309]">
          Module 03 • 2D Tabular Engine
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          3. DataFrame Construction & 2D Layout
        </h2>
      </div>

      <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
          The 3 Primary Construction Paradigms
        </h3>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          A DataFrame is conceptually an aligned dictionary of Series sharing a common index. You can construct DataFrames using column-oriented, row-oriented, or matrix-oriented structures.
        </p>

        <div className="grid md:grid-cols-3 gap-4 pt-2 text-xs font-mono">
          <div className="p-4 rounded-lg bg-zinc-100 border border-zinc-200 space-y-2">
            <strong className="text-[#b45309]">1. Dict of Lists (Columnar)</strong>
            <p className="text-[#71717a] font-sans">
              Natural match for columnar memory. Fast and memory efficient.
            </p>
            <div className="p-2 rounded bg-[#18181b] text-white">
              pd.DataFrame({'{'}&apos;age&apos;: [25, 30], &apos;city&apos;: [&apos;NY&apos;, &apos;SF&apos;]{'}'})
            </div>
          </div>

          <div className="p-4 rounded-lg bg-zinc-100 border border-zinc-200 space-y-2">
            <strong className="text-[#1d4ed8]">2. List of Dicts (Row-wise)</strong>
            <p className="text-[#71717a] font-sans">
              Common when parsing JSON API payloads or MongoDB documents.
            </p>
            <div className="p-2 rounded bg-[#18181b] text-white">
              pd.DataFrame([{'{'}&apos;a&apos;: 1, &apos;b&apos;: 2{'}'}, {'{'}&apos;a&apos;: 3, &apos;b&apos;: 4{'}'}])
            </div>
          </div>

          <div className="p-4 rounded-lg bg-zinc-100 border border-zinc-200 space-y-2">
            <strong className="text-[#047857]">3. 2D NumPy Array (Matrix)</strong>
            <p className="text-[#71717a] font-sans">
              Direct zero-copy wrap when passing explicit columns and index.
            </p>
            <div className="p-2 rounded bg-[#18181b] text-white">
              pd.DataFrame(arr, columns=[&apos;x&apos;, &apos;y&apos;])
            </div>
          </div>
        </div>
      </div>

      <CodeSnippet
        title="DataFrame Construction & Structural Inspection"
        code={`import pandas as pd
import numpy as np

# Constructing employee tabular record
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Department': ['ML', 'Backend', 'ML', 'DevOps'],
    'Salary': [120000, 95000, 135000, 110000],
    'Experience_Yrs': [4, 2, 6, 5]
}
custom_index = ['emp_101', 'emp_102', 'emp_103', 'emp_104']

df = pd.DataFrame(data, index=custom_index)

print("Employee DataFrame:\\n", df)
print("\\nDataFrame Shape:  ", df.shape)    # (4, 4)
print("Column Types:\\n", df.dtypes)
print("\\nMemory per Col (bytes):\\n", df.memory_usage())`}
        output={`Employee DataFrame:
             Name Department  Salary  Experience_Yrs
emp_101    Alice         ML  120000               4
emp_102      Bob    Backend   95000               2
emp_103  Charlie         ML  135000               6
emp_104    Diana     DevOps  110000               5

DataFrame Shape:   (4, 4)
Column Types:
 Name              object
Department        object
Salary             int64
Experience_Yrs     int64
dtype: object

Memory per Col (bytes):
 Index             32
Name              32
Department        32
Salary            32
Experience_Yrs    32
dtype: int64`}
      />

      <NoteCallout type="tip" title="Column Homogeneity vs DataFrame Heterogeneity">
        While a whole DataFrame is heterogeneous (each column can have a distinct data type like int, string, datetime), <strong>each single column Series must be strictly homogeneous</strong>.
      </NoteCallout>
    </section>
  );
}
