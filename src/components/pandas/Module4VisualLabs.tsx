'use client';

import { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function Module4VisualLabs() {
  // Imputation Lab state
  const [imputeMode, setImputeMode] = useState<'raw' | 'median' | 'ffill' | 'dropna'>('raw');

  const rawData = [
    { id: '101', city: 'New York', income: '85,000', score: '720', status: 'Active' },
    { id: '102', city: null, income: '94,000', score: '780', status: 'Active' },
    { id: '103', city: 'London', income: null, score: '690', status: 'Pending' },
    { id: '104', city: 'Tokyo', income: '110,000', score: null, status: 'Active' },
    { id: '105', city: 'London', income: null, score: '740', status: 'Churned' },
  ];

  const getTableRows = () => {
    if (imputeMode === 'raw') {
      return rawData.map((r) => ({
        ...r,
        incomeFormatted: r.income ?? 'NaN',
        isIncomeImputed: false,
        cityFormatted: r.city ?? 'NaN',
        isCityImputed: false,
        scoreFormatted: r.score ?? 'NaN',
      }));
    }
    if (imputeMode === 'median') {
      return rawData.map((r) => ({
        ...r,
        incomeFormatted: r.income ?? '94,000 (Median)',
        isIncomeImputed: r.income === null,
        cityFormatted: r.city ?? 'NaN',
        isCityImputed: false,
        scoreFormatted: r.score ?? 'NaN',
      }));
    }
    if (imputeMode === 'ffill') {
      return rawData.map((r) => ({
        ...r,
        incomeFormatted: r.income ?? 'NaN',
        isIncomeImputed: false,
        cityFormatted: r.id === '102' ? 'New York (ffill)' : (r.city ?? 'NaN'),
        isCityImputed: r.id === '102',
        scoreFormatted: r.score ?? 'NaN',
      }));
    }
    // dropna
    return rawData
      .filter((r) => r.city && r.income && r.score)
      .map((r) => ({
        ...r,
        incomeFormatted: r.income,
        isIncomeImputed: false,
        cityFormatted: r.city,
        isCityImputed: false,
        scoreFormatted: r.score,
      }));
  };

  // Slicer Lab state
  const [activeSlice, setActiveSlice] = useState<string>('col_single');

  const employees = [
    { id: 'emp_0', name: 'Alice', dept: 'ML', salary: '95,000', experience: '3' },
    { id: 'emp_1', name: 'Bob', dept: 'Backend', salary: '82,000', experience: '2' },
    { id: 'emp_2', name: 'Charlie', dept: 'ML', salary: '120,000', experience: '6' },
    { id: 'emp_3', name: 'Diana', dept: 'Frontend', salary: '74,000', experience: '1' },
    { id: 'emp_4', name: 'Evan', dept: 'DevOps', salary: '105,000', experience: '5' },
  ];

  const dfSlices: Record<
    string,
    {
      title: string;
      code: string;
      cols: number[];
      rows: number[];
      returnType: string;
      shape: string;
      desc: string;
    }
  > = {
    col_single: {
      title: "Single Col: df['Salary']",
      code: "s = df['Salary']",
      cols: [2],
      rows: [0, 1, 2, 3, 4],
      returnType: 'pd.Series (1D)',
      shape: '(5,)',
      desc: 'Extracts single Salary column as a 1D Series.',
    },
    col_multi: {
      title: "Multi Col: df[['Name', 'Salary']]",
      code: "sub_df = df[['Name', 'Salary']]",
      cols: [0, 2],
      rows: [0, 1, 2, 3, 4],
      returnType: 'pd.DataFrame (2D)',
      shape: '(5, 2)',
      desc: "Extracts 'Name' and 'Salary' columns as a 2D DataFrame.",
    },
    loc_range: {
      title: "Label .loc['emp_1':'emp_3', 'Dept':'Salary']",
      code: "sub = df.loc['emp_1':'emp_3', 'Dept':'Salary']",
      cols: [1, 2],
      rows: [1, 2, 3],
      returnType: 'pd.DataFrame (2D)',
      shape: '(3, 2)',
      desc: 'Label slice is INCLUSIVE: extracts emp_1, emp_2, and emp_3 across Dept & Salary.',
    },
    iloc_range: {
      title: 'Position .iloc[0:3, 1:3]',
      code: 'sub = df.iloc[0:3, 1:3]',
      cols: [1, 2],
      rows: [0, 1, 2],
      returnType: 'pd.DataFrame (2D)',
      shape: '(3, 2)',
      desc: 'Integer slice is EXCLUSIVE: extracts rows 0, 1, 2 (excludes 3) and cols 1, 2.',
    },
    bool_filter: {
      title: 'Boolean Mask: df[Salary >= 100,000]',
      code: "high_earners = df[df['Salary'] >= 100000]",
      cols: [0, 1, 2, 3],
      rows: [2, 4],
      returnType: 'pd.DataFrame (2D)',
      shape: '(2, 4)',
      desc: 'Filters rows matching condition: emp_2 ($120k) and emp_4 ($105k).',
    },
  };

  const curSlice = dfSlices[activeSlice];

  return (
    <div className="space-y-16 mb-20">
      {/* Group Title Banner */}
      <div className="border-b-2 border-[#1c1917] pb-3 pt-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-[#18181b] text-[#fbbf24] px-3 py-1 rounded">
          04 // Visual Labs & ML Pipeline
        </span>
      </div>

      {/* 18. Visual Data Cleaning Lab */}
      <section id="sec-why-pandas" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">18</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              18 // Visual Cleaning Lab
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Visual Data Cleaning Lab
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              See how different cleaning strategies transform a dirty real-world dataset before passing features to ML models.
            </p>
          </div>
        </div>

        <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setImputeMode('raw')} className={`tab-btn ${imputeMode === 'raw' ? 'active' : ''}`}>
              1. Raw Dirty Data (With NaNs)
            </button>
            <button onClick={() => setImputeMode('median')} className={`tab-btn ${imputeMode === 'median' ? 'active' : ''}`}>
              2. df[&apos;Income&apos;].fillna(median)
            </button>
            <button onClick={() => setImputeMode('ffill')} className={`tab-btn ${imputeMode === 'ffill' ? 'active' : ''}`}>
              3. df[&apos;City&apos;].ffill()
            </button>
            <button onClick={() => setImputeMode('dropna')} className={`tab-btn ${imputeMode === 'dropna' ? 'active' : ''}`}>
              4. df.dropna()
            </button>
          </div>

          <div className="overflow-x-auto font-mono text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#3f3f46] text-sky-400">
                  <th className="p-2.5">User ID</th>
                  <th className="p-2.5">City</th>
                  <th className="p-2.5">Monthly Income</th>
                  <th className="p-2.5">Credit Score</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {getTableRows().map((r) => (
                  <tr key={r.id}>
                    <td className="p-2.5 text-sky-400 font-bold">#{r.id}</td>
                    <td className={`p-2.5 ${r.isCityImputed ? 'text-emerald-400 font-bold bg-emerald-950/30' : r.cityFormatted === 'NaN' ? 'text-rose-400 font-bold' : 'text-[#d4d4d8]'}`}>
                      {r.cityFormatted}
                    </td>
                    <td className={`p-2.5 ${r.isIncomeImputed ? 'text-emerald-400 font-bold bg-emerald-950/30' : r.incomeFormatted === 'NaN' ? 'text-rose-400 font-bold' : 'text-[#d4d4d8]'}`}>
                      {r.incomeFormatted}
                    </td>
                    <td className={`p-2.5 ${r.scoreFormatted === 'NaN' ? 'text-rose-400 font-bold' : 'text-[#d4d4d8]'}`}>
                      {r.scoreFormatted}
                    </td>
                    <td className="p-2.5 text-[#a1a1aa]">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 19. 5 Industry Visual Use Cases */}
      <section id="sec-usecases-industry" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">19</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              19 // Industry Applications
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              5 Industry Visual Use Cases
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Visual representations of how top enterprises leverage Pandas across diverse technical domains.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-paper p-5 rounded-xl border border-[#e2ddd6] space-y-2">
            <span className="font-mono text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">WALL STREET</span>
            <h3 className="font-editorial text-base font-bold text-[#1c1917]">1. Quantitative Finance (OHLCV Resampling)</h3>
            <p className="text-xs text-[#71717a]">Resampling tick logs into 1-Day bars and 50-day moving averages.</p>
            <div className="p-2.5 rounded bg-[#18181b] text-white font-mono text-xs">
              daily_df = ticks.resample(&apos;1D&apos;).agg({'{'}&apos;price&apos;: [&apos;first&apos;, &apos;max&apos;, &apos;min&apos;, &apos;last&apos;]{'}'})
            </div>
          </div>

          <div className="card-paper p-5 rounded-xl border border-[#e2ddd6] space-y-2">
            <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">BIOMEDICAL</span>
            <h3 className="font-editorial text-base font-bold text-[#1c1917]">2. Healthcare & Clinical Trials</h3>
            <p className="text-xs text-[#71717a]">Aggregating longitudinal patient vitals and time-interpolation of missing tests.</p>
            <div className="p-2.5 rounded bg-[#18181b] text-white font-mono text-xs">
              df[&apos;glucose&apos;] = df[&apos;glucose&apos;].interpolate(method=&apos;time&apos;)
            </div>
          </div>
        </div>
      </section>

      {/* 20. Stack Comparison Matrix */}
      <section id="sec-comparison" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">20</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              20 // The Stack Comparison
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Stack Comparison Matrix
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Python Lists vs NumPy vs Pandas vs SQL vs Polars.
            </p>
          </div>
        </div>

        <div className="card-paper rounded-xl overflow-hidden border border-[#e2ddd6]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-100 text-[#71717a] border-b border-[#e2ddd6]">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3 text-blue-700">NumPy</th>
                <th className="p-3 text-amber-700">Pandas</th>
                <th className="p-3 text-emerald-700">SQL</th>
                <th className="p-3 text-purple-700">Polars</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2ddd6] text-[#3f3f46]">
              <tr>
                <td className="p-3 font-bold">Data Model</td>
                <td className="p-3">N-Dim Array</td>
                <td className="p-3">2D Labeled Table</td>
                <td className="p-3">Relational Table</td>
                <td className="p-3">Arrow Columnar</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Execution Engine</td>
                <td className="p-3">C / SIMD</td>
                <td className="p-3">Cython / PyArrow</td>
                <td className="p-3">Query Optimizer</td>
                <td className="p-3">Rust Multi-threaded</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 21. Interactive DataFrame Slicer */}
      <section id="sec-slicer-lab" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">21</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              21 // Interactive Slicer
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Interactive DataFrame Slicer
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Test column indexing, .loc, .iloc, and boolean filter highlights in real-time.
            </p>
          </div>
        </div>

        <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(dfSlices).map(([k, p]) => (
              <button
                key={k}
                onClick={() => setActiveSlice(k)}
                className={`tab-btn ${activeSlice === k ? 'active' : ''}`}
              >
                {p.title}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto font-mono text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#3f3f46] text-[#71717a]">
                  <th className="p-2.5">Index</th>
                  {['Name', 'Dept', 'Salary', 'Experience'].map((c, i) => (
                    <th key={i} className={`p-2.5 ${curSlice.cols.includes(i) ? 'text-[#fbbf24] font-bold bg-[#fbbf24]/10' : ''}`}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {employees.map((emp, rIdx) => {
                  const isRowActive = curSlice.rows.includes(rIdx);
                  return (
                    <tr key={emp.id} className={isRowActive ? 'bg-amber-400/5' : 'opacity-40'}>
                      <td className="p-2.5 font-bold text-sky-400">{emp.id}</td>
                      {[emp.name, emp.dept, `$${emp.salary}`, `${emp.experience} yrs`].map((val, cIdx) => (
                        <td key={cIdx} className={`p-2.5 ${isRowActive && curSlice.cols.includes(cIdx) ? 'bg-amber-400/20 text-[#fbbf24] font-bold' : 'text-[#d4d4d8]'}`}>
                          {val}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 22. End-to-End ML Pipeline */}
      <section id="sec-pipeline-lab" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">22</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              22 // Production Flow
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              End-to-End ML Pipeline
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Method chaining pipeline: Load &rarr; Impute &rarr; Feature Engineer &rarr; One-Hot Encode &rarr; NumPy Export.
            </p>
          </div>
        </div>

        <CodeSnippet
          title="Complete Production Pipeline"
          code={`import pandas as pd

# Method Chaining Pipeline
processed_df = (
    pd.read_csv('raw_churn_data.csv', engine='pyarrow')
    .dropna(subset=['customer_id', 'churn'])
    .assign(
        tenure_years=lambda d: d['tenure_months'] / 12,
        is_high_value=lambda d: d['monthly_charges'] > 80
    )
    .pipe(pd.get_dummies, columns=['contract_type'], drop_first=True)
)

# Export zero-copy matrix for PyTorch / Scikit-Learn
X = processed_df.drop(columns=['churn', 'customer_id']).to_numpy()
y = processed_df['churn'].to_numpy()`}
        />
      </section>
    </div>
  );
}
