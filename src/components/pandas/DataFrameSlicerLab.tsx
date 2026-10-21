'use client';

import { useState } from 'react';
import NoteCallout from '@/components/common/NoteCallout';

export default function DataFrameSlicerLab() {
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
      desc: "Label slice is INCLUSIVE: extracts emp_1, emp_2, and emp_3 across Dept & Salary.",
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
    query_filter: {
      title: "Query: df.query(\"Dept == 'ML'\")",
      code: "ml_team = df.query(\"Dept == 'ML'\")",
      cols: [0, 1, 2, 3],
      rows: [0, 2],
      returnType: 'pd.DataFrame (2D)',
      shape: '(2, 4)',
      desc: 'Matches ML team members: emp_0 (Alice) and emp_2 (Charlie).',
    },
  };

  const current = dfSlices[activeSlice];

  return (
    <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
        <div>
          <h3 className="font-editorial text-xl font-bold text-[#fbbf24]">
            Interactive 5x4 DataFrame Slicer Lab
          </h3>
          <p className="text-xs text-[#a1a1aa] font-mono mt-1">
            Test column indexing, .loc, .iloc, and boolean filter highlights in real-time.
          </p>
        </div>
        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="text-[#a1a1aa]">Type:</span>
          <span className="text-emerald-400 font-bold">{current.returnType}</span>
          <span className="text-[#a1a1aa] pl-2">Shape:</span>
          <span className="text-[#fbbf24] font-bold">{current.shape}</span>
        </div>
      </div>

      {/* Preset Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(dfSlices).map(([key, p]) => (
          <button
            key={key}
            onClick={() => setActiveSlice(key)}
            className={`tab-btn ${activeSlice === key ? 'active' : ''}`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Table Visualization */}
      <div className="p-4 rounded-xl bg-[#141416] border border-[#27272a] overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-[#27272a] text-[#71717a]">
              <th className="p-2.5">Index</th>
              {['Name', 'Dept', 'Salary', 'Experience'].map((colName, cIdx) => (
                <th
                  key={cIdx}
                  className={`p-2.5 transition-colors ${
                    current.cols.includes(cIdx) ? 'text-[#fbbf24] font-bold bg-[#fbbf24]/10' : ''
                  }`}
                >
                  {colName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272a]">
            {employees.map((emp, rIdx) => {
              const isRowActive = current.rows.includes(rIdx);
              return (
                <tr
                  key={emp.id}
                  className={`transition-colors ${isRowActive ? 'bg-amber-400/5' : 'opacity-40'}`}
                >
                  <td className="p-2.5 font-bold text-sky-400">{emp.id}</td>
                  {[emp.name, emp.dept, `$${emp.salary}`, `${emp.experience} yrs`].map(
                    (val, cIdx) => {
                      const isCellSelected = isRowActive && current.cols.includes(cIdx);
                      return (
                        <td
                          key={cIdx}
                          className={`p-2.5 transition-all ${
                            isCellSelected
                              ? 'bg-amber-400/20 text-[#fbbf24] font-bold'
                              : 'text-[#d4d4d8]'
                          }`}
                        >
                          {val}
                        </td>
                      );
                    }
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Code & Explanation */}
      <div className="p-4 rounded-lg bg-[#09090b] border border-[#27272a] font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[#71717a]">Executed Code: </span>
          <strong className="text-sky-400">{current.code}</strong>
        </div>
        <div className="text-[#a1a1aa] font-sans">
          {current.desc}
        </div>
      </div>
    </div>
  );
}
