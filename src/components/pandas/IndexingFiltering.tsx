import React from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function IndexingFiltering() {
  return (
    <section id="sec-indexing" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#b45309]">
          Module 05 • Slicing & Subsets
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          5. Dual Indexing (.loc vs .iloc) & Filtering
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
              .loc[] — Label-Based Slicer
            </h3>
            <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
              INCLUSIVE
            </span>
          </div>
          <p className="text-xs text-[#71717a] leading-relaxed">
            Indexes by <strong>explicit row & column labels</strong>. Critical rule: <code>.loc[start : stop]</code> includes the endpoint <code>stop</code>!
          </p>
          <div className="p-3 rounded bg-[#18181b] text-xs font-mono text-[#f4f4f5]">
            df.loc[&apos;emp_1&apos;:&apos;emp_3&apos;, &apos;Name&apos;:&apos;Salary&apos;]
          </div>
        </div>

        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
              .iloc[] — Integer Position Slicer
            </h3>
            <span className="font-mono text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded">
              EXCLUSIVE
            </span>
          </div>
          <p className="text-xs text-[#71717a] leading-relaxed">
            Indexes by <strong>0-based integer positions</strong> like Python list slicing. <code>.iloc[0 : 3]</code> extracts indices 0, 1, 2 (excludes 3).
          </p>
          <div className="p-3 rounded bg-[#18181b] text-xs font-mono text-[#f4f4f5]">
            df.iloc[0:3, 1:3]
          </div>
        </div>
      </div>

      <CodeSnippet
        title="Boolean Filtering, Query & Set Membership"
        code={`import pandas as pd

df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Evan'],
    'Dept': ['ML', 'Backend', 'ML', 'Frontend', 'ML'],
    'Salary': [120000, 85000, 140000, 95000, 110000],
    'Years': [4, 2, 7, 3, 5]
})

# 1. Boolean Indexing with Bitwise Operators (&, |, ~)
ml_seniors = df[(df['Dept'] == 'ML') & (df['Salary'] >= 115000)]

# 2. Expressive .query() method
high_earners = df.query("Salary > 100000 and Dept == 'ML'")

# 3. Membership filtering with .isin() and .between()
target_depts = df[df['Dept'].isin(['ML', 'Frontend'])]
exp_range = df[df['Years'].between(3, 6)]

print("ML Seniors:\\n", ml_seniors)`}
        output={`ML Seniors:
      Name Dept  Salary  Years
0    Alice   ML  120000      4
2  Charlie   ML  140000      7`}
      />

      <NoteCallout type="warning" title="SettingWithCopyWarning Prevention">
        Never do chained indexing like <code>df[df[&apos;Salary&apos;] &gt; 100000][&apos;Tier&apos;] = &apos;Senior&apos;</code>! This triggers the dreaded <code>SettingWithCopyWarning</code>. Always use <code>.loc</code> for assignment: <code>df.loc[df[&apos;Salary&apos;] &gt; 100000, &apos;Tier&apos;] = &apos;Senior&apos;</code>.
      </NoteCallout>
    </section>
  );
}
