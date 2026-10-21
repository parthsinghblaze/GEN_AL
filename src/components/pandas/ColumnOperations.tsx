import React from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function ColumnOperations() {
  return (
    <section id="sec-col-ops" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#b45309]">
          Module 04 • Column Engineering
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          4. Column Selection, Assignment & Dropping
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              Single Bracket: df[&apos;col&apos;]
            </h4>
            <span className="font-mono text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
              Returns pd.Series (1D)
            </span>
          </div>
          <p className="text-xs text-[#71717a] leading-relaxed">
            Extracts a single column as a 1D Series. Shape is <code>(N,)</code>.
          </p>
          <div className="p-2.5 rounded bg-[#18181b] text-white font-mono text-xs">
            salary_series = df[&apos;Salary&apos;]
          </div>
        </div>

        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              Double Bracket: df[[&apos;col&apos;]]
            </h4>
            <span className="font-mono text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
              Returns pd.DataFrame (2D)
            </span>
          </div>
          <p className="text-xs text-[#71717a] leading-relaxed">
            Passing a list of column names always produces a 2D DataFrame. Shape is <code>(N, len(cols))</code>.
          </p>
          <div className="p-2.5 rounded bg-[#18181b] text-white font-mono text-xs">
            sub_df = df[[&apos;Name&apos;, &apos;Salary&apos;]]
          </div>
        </div>
      </div>

      <CodeSnippet
        title="Column Creation, Transformation & Dropping"
        code={`import pandas as pd

df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Salary': [100000, 80000, 120000],
    'Bonus_Pct': [0.15, 0.10, 0.20]
})

# 1. Vectorized Column Assignment
df['Total_Compensation'] = df['Salary'] * (1 + df['Bonus_Pct'])

# 2. Conditional Column Assignment using np.where
import numpy as np
df['Tier'] = np.where(df['Salary'] >= 100000, 'Senior', 'Standard')

# 3. Dropping Columns with inplace=False (Modern Best Practice)
cleaned_df = df.drop(columns=['Bonus_Pct'])

print(cleaned_df)`}
        output={`      Name  Salary  Total_Compensation      Tier
0    Alice  100000            115000.0    Senior
1      Bob   80000             88000.0  Standard
2  Charlie  120000            144000.0    Senior`}
      />

      <NoteCallout type="danger" title="Why inplace=True is an Anti-Pattern">
        Avoid writing <code>df.drop(..., inplace=True)</code> or <code>df.fillna(..., inplace=True)</code>! In modern Pandas, <code>inplace=True</code> rarely saves memory, prevents method chaining pipelines, and will be deprecated in future Pandas 3.0 releases. Always assign to a new variable or overwrite <code>df = df.drop(...)</code>.
      </NoteCallout>
    </section>
  );
}
