'use client';

import { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function Module3DataFrames() {
  // DF Workbench state
  const [selectedCol, setSelectedCol] = useState<'all' | 'Salary' | 'Dept' | 'Name'>('all');
  const [filterThreshold, setFilterThreshold] = useState<number>(80000);

  const dfData = [
    { id: 'emp_1', name: 'Alice', age: 28, dept: 'ML', salary: 98000 },
    { id: 'emp_2', name: 'Bob', age: 34, dept: 'Backend', salary: 84000 },
    { id: 'emp_3', name: 'Charlie', age: 42, dept: 'ML', salary: 125000 },
    { id: 'emp_4', name: 'Diana', age: 25, dept: 'Eng', salary: 72000 },
  ];

  const filteredDf = dfData.filter((r) => r.salary >= filterThreshold);

  return (
    <div className="space-y-16 mb-20">
      {/* Group Title Banner */}
      <div className="border-b-2 border-[#1c1917] pb-3 pt-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-[#18181b] text-[#fbbf24] px-3 py-1 rounded">
          03 // DataFrames Deep Dive
        </span>
      </div>

      {/* 09. Creating a DataFrame */}
      <section id="sec-df-creation" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">09</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              09 // 2D Tabular Engine
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Creating a DataFrame & Core Attributes
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Construct DataFrames from dictionaries of lists, lists of dicts, 2D NumPy arrays, and external I/O files.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-paper p-5 rounded-xl border border-[#e2ddd6] space-y-3 font-mono text-xs">
            <strong className="text-[#b45309] uppercase">1. Dict of Lists (Columnar)</strong>
            <p className="text-[#71717a] font-sans">Dictionary keys become column names; list items are values.</p>
            <CodeSnippet
              title="Dict of Lists"
              code={`data = {'Name': ['Alice', 'Bob'], 'Salary': [98000, 84000]}
df = pd.DataFrame(data, index=['emp_1', 'emp_2'])`}
            />
          </div>

          <div className="card-paper p-5 rounded-xl border border-[#e2ddd6] space-y-3 font-mono text-xs">
            <strong className="text-[#1d4ed8] uppercase">2. List of Dicts (Row-wise JSON)</strong>
            <p className="text-[#71717a] font-sans">Each dictionary represents a single row (REST API records).</p>
            <CodeSnippet
              title="JSON Records"
              code={`records = [{'id': 101, 'temp': 23.5}, {'id': 102, 'temp': 28.1}]
df = pd.DataFrame(records)`}
            />
          </div>
        </div>
      </section>

      {/* 10. Column Selection & Indexing */}
      <section id="sec-col-selection" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">10</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              10 // Column Extraction
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Column Selection & Indexing
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Distinguish between single bracket 1D Series extraction and double bracket 2D DataFrame subsetting.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-editorial text-lg font-bold text-[#1c1917]">Single Bracket: df[&apos;Salary&apos;]</h3>
              <span className="font-mono text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">1D SERIES</span>
            </div>
            <p className="text-xs text-[#71717a]">
              Extracts single column as a <code>pd.Series</code> of shape <code>(N,)</code>.
            </p>
            <div className="p-2.5 rounded bg-[#18181b] text-white font-mono text-xs">
              salary_col = df[&apos;Salary&apos;]
            </div>
          </div>

          <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-editorial text-lg font-bold text-[#1c1917]">Double Bracket: df[[&apos;Name&apos;, &apos;Salary&apos;]]</h3>
              <span className="font-mono text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">2D DATAFRAME</span>
            </div>
            <p className="text-xs text-[#71717a]">
              Passing a list of column names always produces a <code>pd.DataFrame</code> of shape <code>(N, 2)</code>.
            </p>
            <div className="p-2.5 rounded bg-[#18181b] text-white font-mono text-xs">
              sub_df = df[[&apos;Name&apos;, &apos;Salary&apos;]]
            </div>
          </div>
        </div>
      </section>

      {/* 11. Creating New Columns */}
      <section id="sec-col-create" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">11</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              11 // Feature Engineering
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Creating New Columns
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Add new calculated columns using direct assignment, scalar broadcast, and conditional logic.
            </p>
          </div>
        </div>

        <CodeSnippet
          title="Column Creation Patterns"
          code={`# 1. Direct Vectorized Arithmetic
df['Total_Comp'] = df['Salary'] * 1.15

# 2. Scalar Constant Assignment
df['Year'] = 2026

# 3. Conditional Feature with np.where
import numpy as np
df['Senior_Flag'] = np.where(df['Salary'] >= 100000, 'Senior', 'Standard')`}
        />
      </section>

      {/* 12. Dropping & Removing Columns */}
      <section id="sec-col-drop" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">12</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              12 // Column Pruning
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Dropping & Removing Columns
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Prune unwanted columns using df.drop() with modern out-of-place practices.
            </p>
          </div>
        </div>

        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-3">
          <p className="text-xs text-[#3f3f46] leading-relaxed">
            Drop columns cleanly by passing <code>columns=[&apos;col1&apos;, &apos;col2&apos;]</code>:
          </p>
          <div className="p-3 rounded bg-[#18181b] text-white font-mono text-xs">
            cleaned_df = df.drop(columns=[&apos;Year&apos;, &apos;Senior_Flag&apos;])
          </div>
          <NoteCallout type="danger" title="Avoid inplace=True">
            <code>inplace=True</code> is an anti-pattern that breaks method chaining and will be deprecated in future Pandas 3.0. Always assign results: <code>df = df.drop(...)</code>.
          </NoteCallout>
        </div>
      </section>

      {/* 13. Selecting Rows (loc vs iloc) */}
      <section id="sec-row-selection" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">13</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              13 // Row Slicing
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Selecting Rows (loc vs iloc)
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Master the distinction between explicit label indexing (.loc) and positional integer indexing (.iloc).
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="card-paper p-5 rounded-xl border border-[#e2ddd6] space-y-3">
            <div className="flex justify-between items-center">
              <strong className="text-[#047857] text-sm">.loc[row_label] (INCLUSIVE)</strong>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">LABELS</span>
            </div>
            <p className="text-[#71717a] font-sans">
              Indexes by explicit labels. <code>df.loc[&apos;emp_1&apos;:&apos;emp_3&apos;]</code> INCLUDES <code>emp_3</code>.
            </p>
            <div className="p-2.5 rounded bg-[#18181b] text-white">
              df.loc[&apos;emp_1&apos;:&apos;emp_3&apos;]
            </div>
          </div>

          <div className="card-paper p-5 rounded-xl border border-[#e2ddd6] space-y-3">
            <div className="flex justify-between items-center">
              <strong className="text-[#1d4ed8] text-sm">.iloc[row_pos] (EXCLUSIVE)</strong>
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">POSITIONS</span>
            </div>
            <p className="text-[#71717a] font-sans">
              Indexes by 0-based positions. <code>df.iloc[0:3]</code> EXCLUDES index 3 (returns 0, 1, 2).
            </p>
            <div className="p-2.5 rounded bg-[#18181b] text-white">
              df.iloc[0:3]
            </div>
          </div>
        </div>
      </section>

      {/* 14. Subsets of Rows & Columns */}
      <section id="sec-2d-subsets" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">14</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              14 // 2D Subsetting
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Subsets of Rows & Columns
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Select 2D submatrix slices using df.loc[rows, cols] and df.iloc[row_idx, col_idx].
            </p>
          </div>
        </div>

        <CodeSnippet
          title="2D Matrix Subsetting"
          code={`# Label-based 2D slice
subset_loc = df.loc['emp_1':'emp_3', 'Name':'Salary']

# Position-based 2D slice
subset_iloc = df.iloc[0:3, 0:3]`}
        />
      </section>

      {/* 15. Conditional Selection & Masks */}
      <section id="sec-conditional-filter" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">15</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              15 // Boolean Filtering
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Conditional Selection & Masks
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Filter rows with boolean conditions and bitwise operators (&, |, ~).
            </p>
          </div>
        </div>

        <CodeSnippet
          title="Boolean Masking & Queries"
          code={`# 1. Multi-Condition Mask with Bitwise AND (&)
ml_seniors = df[(df['Dept'] == 'ML') & (df['Salary'] >= 100000)]

# 2. String Query method
high_earners = df.query("Salary >= 90000 and Dept == 'ML'")

# 3. Membership Set with .isin()
selected_depts = df[df['Dept'].isin(['ML', 'Eng'])]`}
        />
      </section>

      {/* 16. Interactive DF Workbench */}
      <section id="sec-df-workbench" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">16</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              16 // Interactive Sandbox
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Interactive DF Workbench
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Filter employee records dynamically by salary threshold and column selection.
            </p>
          </div>
        </div>

        <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center space-x-3">
              <label className="text-[#a1a1aa] font-bold">Min Salary Filter:</label>
              <input
                type="range"
                min="70000"
                max="130000"
                step="5000"
                value={filterThreshold}
                onChange={(e) => setFilterThreshold(Number(e.target.value))}
                className="accent-amber-400 cursor-pointer"
              />
              <span className="text-[#fbbf24] font-bold">${filterThreshold.toLocaleString()}</span>
            </div>
            <div className="text-emerald-400 font-bold">
              Matching Rows: {filteredDf.length} / {dfData.length}
            </div>
          </div>

          <div className="overflow-x-auto font-mono text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#3f3f46] text-[#71717a]">
                  <th className="p-2.5">Index</th>
                  <th className="p-2.5">Name</th>
                  <th className="p-2.5">Age</th>
                  <th className="p-2.5">Dept</th>
                  <th className="p-2.5">Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {dfData.map((emp) => {
                  const isMatch = emp.salary >= filterThreshold;
                  return (
                    <tr key={emp.id} className={isMatch ? 'bg-amber-400/10' : 'opacity-30'}>
                      <td className="p-2.5 text-sky-400 font-bold">{emp.id}</td>
                      <td className="p-2.5 text-white">{emp.name}</td>
                      <td className="p-2.5 text-amber-200">{emp.age}</td>
                      <td className="p-2.5 text-purple-300">{emp.dept}</td>
                      <td className="p-2.5 text-emerald-400 font-bold">${emp.salary.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 17. Boolean Mask Visual Flow */}
      <section id="sec-bool-flow-lab" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">17</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              17 // Filter Mechanics
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Boolean Mask Visual Flow
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Understand how Pandas evaluates boolean conditions element-wise into bitmasks before filtering.
            </p>
          </div>
        </div>

        <div className="card-dark rounded-xl p-6 border border-[#27272a] font-mono text-xs space-y-4">
          <div className="p-4 rounded-lg bg-[#141416] border border-[#27272a] space-y-2">
            <div className="text-sky-400 font-bold">Step 1: Condition Evaluation &rarr; Boolean Series (Bitmask)</div>
            <div className="text-[#a1a1aa]">
              mask = df[&apos;Salary&apos;] &gt;= 90000 &rarr; [True, False, True, False]
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#141416] border border-[#27272a] space-y-2">
            <div className="text-emerald-400 font-bold">Step 2: Subsetting Rows with True Mask Values</div>
            <div className="text-[#a1a1aa]">
              df[mask] &rarr; Keeps emp_1 (Alice: $98k) and emp_3 (Charlie: $125k).
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
