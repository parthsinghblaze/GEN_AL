'use client';

import { useState } from 'react';
import NoteCallout from '@/components/common/NoteCallout';

export default function MatrixSlicerLab() {
  const [activePreset, setActivePreset] = useState<string>('submatrix');

  const matrixData = [
    [10, 12, 14, 16],
    [20, 22, 24, 26],
    [30, 32, 34, 36],
    [40, 42, 44, 46],
  ];

  const presets: Record<
    string,
    {
      title: string;
      cells: [number, number][];
      code: string;
      shape: string;
      mem: string;
      memType: 'view' | 'copy';
      output: string;
      desc: string;
    }
  > = {
    submatrix: {
      title: 'Submatrix [1:3, 1:4]',
      cells: [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3]],
      code: 'arr[1:3, 1:4]',
      shape: '(2, 3) • int64',
      mem: 'VIEW (Zero-Copy)',
      memType: 'view',
      output: '[[22, 24, 26],\n [32, 34, 36]]',
      desc: 'Extracts rows 1 & 2 and cols 1 through 3 without allocating memory.',
    },
    column: {
      title: 'Single Column [:, 2]',
      cells: [[0, 2], [1, 2], [2, 2], [3, 2]],
      code: 'arr[:, 2]',
      shape: '(4,) • int64',
      mem: 'VIEW (Zero-Copy)',
      memType: 'view',
      output: '[14, 24, 34, 44]',
      desc: 'Extracts column index 2 across all 4 rows as a 1D vector.',
    },
    row: {
      title: 'Single Row [1, :]',
      cells: [[1, 0], [1, 1], [1, 2], [1, 3]],
      code: 'arr[1, :]',
      shape: '(4,) • int64',
      mem: 'VIEW (Zero-Copy)',
      memType: 'view',
      output: '[20, 22, 24, 26]',
      desc: 'Extracts row index 1 across all 4 columns.',
    },
    strided: {
      title: 'Strided Step [::2, ::2]',
      cells: [[0, 0], [0, 2], [2, 0], [2, 2]],
      code: 'arr[::2, ::2]',
      shape: '(2, 2) • int64',
      mem: 'VIEW (Zero-Copy)',
      memType: 'view',
      output: '[[10, 14],\n [30, 34]]',
      desc: 'Skips every second row and column using double stride.',
    },
    mask: {
      title: 'Mask [arr > 30]',
      cells: [[2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]],
      code: 'arr[arr > 30]',
      shape: '(7,) • int64',
      mem: 'COPY (Allocated)',
      memType: 'copy',
      output: '[32, 34, 36, 40, 42, 44, 46]',
      desc: 'Evaluates condition boolean bitmask and collects matching items.',
    },
    fancy: {
      title: 'Fancy [[0, 3], [1, 2]]',
      cells: [[0, 1], [3, 2]],
      code: 'arr[[0, 3], [1, 2]]',
      shape: '(2,) • int64',
      mem: 'COPY (Allocated)',
      memType: 'copy',
      output: '[12, 44]',
      desc: 'Pairs coordinates (0,1) and (3,2) element-wise.',
    },
    reverse: {
      title: 'Reverse Rows [::-1, :]',
      cells: [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 0], [1, 1], [1, 2], [1, 3],
        [2, 0], [2, 1], [2, 2], [2, 3],
        [3, 0], [3, 1], [3, 2], [3, 3],
      ],
      code: 'arr[::-1, :]',
      shape: '(4, 4) • int64',
      mem: 'VIEW (Zero-Copy)',
      memType: 'view',
      output: '[[40, 42, 44, 46],\n [30, 32, 34, 36],\n [20, 22, 24, 26],\n [10, 12, 14, 16]]',
      desc: 'Flips row ordering vertically using negative row strides.',
    },
    corner: {
      title: 'Corners [0::3, 0::3]',
      cells: [[0, 0], [0, 3], [3, 0], [3, 3]],
      code: 'arr[0::3, 0::3]',
      shape: '(2, 2) • int64',
      mem: 'VIEW (Zero-Copy)',
      memType: 'view',
      output: '[[10, 16],\n [40, 46]]',
      desc: 'Extracts the 4 corner elements of the 4x4 matrix.',
    },
  };

  const current = presets[activePreset];

  const isCellSelected = (r: number, c: number) => {
    return current.cells.some(([row, col]) => row === r && col === c);
  };

  return (
    <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
        <div>
          <h3 className="font-editorial text-xl font-bold text-[#fbbf24]">
            Interactive 4x4 Matrix Slicer Lab
          </h3>
          <p className="text-xs text-[#a1a1aa] font-mono mt-1">
            Click slice patterns to visualize selected coordinates, shapes, and memory allocation.
          </p>
        </div>
        <span
          className={`font-mono text-xs font-bold px-3 py-1 rounded-full ${
            current.memType === 'view'
              ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-400'
              : 'bg-rose-950/60 border border-rose-500 text-rose-400'
          }`}
        >
          {current.mem}
        </span>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(presets).map(([key, p]) => (
          <button
            key={key}
            onClick={() => setActivePreset(key)}
            className={`tab-btn ${activePreset === key ? 'active' : ''}`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Interactive Stage */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Matrix Grid */}
        <div className="p-6 rounded-xl bg-[#141416] border border-[#27272a] flex flex-col items-center">
          <div className="font-mono text-[11px] text-[#71717a] uppercase mb-3 font-semibold">
            Input Array: arr (4x4, int64)
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {matrixData.map((row, rIdx) =>
              row.map((val, cIdx) => {
                const selected = isCellSelected(rIdx, cIdx);
                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className={`slicer-cell ${selected ? 'selected' : ''}`}
                  >
                    {val}
                  </div>
                );
              })
            )}
          </div>
          <div className="font-mono text-[11px] text-[#a1a1aa] mt-4">
            {current.desc}
          </div>
        </div>

        {/* Results Panel */}
        <div className="p-5 rounded-xl bg-[#141416] border border-[#27272a] space-y-3 font-mono">
          <div className="text-xs text-[#71717a] uppercase font-bold border-b border-[#27272a] pb-2">
            Slice Metadata & Code
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[#71717a]">NumPy Code: </span>
              <strong className="text-sky-400">{current.code}</strong>
            </div>
            <div>
              <span className="text-[#71717a]">Result Shape: </span>
              <strong className="text-[#fbbf24]">{current.shape}</strong>
            </div>
            <div>
              <span className="text-[#71717a]">Memory Type: </span>
              <strong className={current.memType === 'view' ? 'text-emerald-400' : 'text-rose-400'}>
                {current.mem}
              </strong>
            </div>
          </div>
          <div className="pt-2 border-t border-[#27272a]">
            <div className="text-[10px] text-[#71717a] uppercase font-bold mb-1">
              Resulting Array Buffer
            </div>
            <pre className="p-3 rounded bg-[#09090b] text-emerald-400 text-xs font-mono whitespace-pre leading-relaxed border border-[#27272a]">
              {current.output}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
