'use client';

import { useState } from 'react';
import NoteCallout from '@/components/common/NoteCallout';

export default function MissingDataImputeLab() {
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

  const descriptions = {
    raw: 'Raw Dirty Dataset: Contains uncleaned NaN missing values across City, Income, and Credit Score.',
    median: 'Median Imputation: Missing monthly incomes are dynamically imputed with the column median ($94,000).',
    ffill: 'Forward Fill (ffill): Missing City in row #102 is filled using the preceding row #101 value ("New York").',
    dropna: 'Drop NaNs (dropna): Rows with at least one missing value are dropped (Rows #102, #103, #104, #105 dropped).',
  };

  const rows = getTableRows();

  return (
    <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
        <div>
          <h3 className="font-editorial text-xl font-bold text-[#fbbf24]">
            Interactive Missing Data & Imputation Lab
          </h3>
          <p className="text-xs text-[#a1a1aa] font-mono mt-1">
            Simulate real-world data cleaning strategies across dirty tabular rows.
          </p>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setImputeMode('raw')}
          className={`tab-btn ${imputeMode === 'raw' ? 'active' : ''}`}
        >
          1. Raw Dirty Data
        </button>
        <button
          onClick={() => setImputeMode('median')}
          className={`tab-btn ${imputeMode === 'median' ? 'active' : ''}`}
        >
          2. Median Imputation
        </button>
        <button
          onClick={() => setImputeMode('ffill')}
          className={`tab-btn ${imputeMode === 'ffill' ? 'active' : ''}`}
        >
          3. Forward Fill (ffill)
        </button>
        <button
          onClick={() => setImputeMode('dropna')}
          className={`tab-btn ${imputeMode === 'dropna' ? 'active' : ''}`}
        >
          4. Drop Rows (dropna)
        </button>
      </div>

      {/* Table */}
      <div className="p-4 rounded-xl bg-[#141416] border border-[#27272a] overflow-x-auto font-mono text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#27272a] text-[#71717a]">
              <th className="p-2.5">User ID</th>
              <th className="p-2.5">City</th>
              <th className="p-2.5">Monthly Income</th>
              <th className="p-2.5">Credit Score</th>
              <th className="p-2.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272a]">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="p-2.5 text-sky-400 font-bold">#{r.id}</td>
                <td
                  className={`p-2.5 ${
                    r.isCityImputed
                      ? 'text-emerald-400 font-bold bg-emerald-950/30'
                      : r.cityFormatted === 'NaN'
                      ? 'text-rose-400 font-bold'
                      : 'text-[#d4d4d8]'
                  }`}
                >
                  {r.cityFormatted}
                </td>
                <td
                  className={`p-2.5 ${
                    r.isIncomeImputed
                      ? 'text-emerald-400 font-bold bg-emerald-950/30'
                      : r.incomeFormatted === 'NaN'
                      ? 'text-rose-400 font-bold'
                      : 'text-[#d4d4d8]'
                  }`}
                >
                  {r.incomeFormatted}
                </td>
                <td
                  className={`p-2.5 ${
                    r.scoreFormatted === 'NaN' ? 'text-rose-400 font-bold' : 'text-[#d4d4d8]'
                  }`}
                >
                  {r.scoreFormatted}
                </td>
                <td className="p-2.5 text-[#a1a1aa]">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-lg bg-[#09090b] border border-[#27272a] font-mono text-xs text-[#a1a1aa] leading-relaxed">
        <strong className="text-[#fbbf24]">Cleaning Action: </strong> {descriptions[imputeMode]}
      </div>
    </div>
  );
}
