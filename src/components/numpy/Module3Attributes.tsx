'use client';

import { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function Module3Attributes() {
  const [highlightAxis, setHighlightAxis] = useState<0 | 1>(0);
  const [curShape, setCurShape] = useState<[number, number] | [number]>([3, 4]);

  const matrix = [
    [10, 20, 30],
    [40, 50, 60],
  ];

  const shapes: { label: string; shape: [number, number] | [number]; cols: number; strides: string }[] = [
    { label: '(12,)', shape: [12], cols: 12, strides: '(8,)' },
    { label: '(3, 4)', shape: [3, 4], cols: 4, strides: '(32, 8)' },
    { label: '(4, 3)', shape: [4, 3], cols: 3, strides: '(24, 8)' },
    { label: '(2, 6)', shape: [2, 6], cols: 6, strides: '(48, 8)' },
    { label: '(6, 2)', shape: [6, 2], cols: 2, strides: '(16, 8)' },
  ];

  const curObj = shapes.find((s) => s.shape.join(',') === curShape.join(',')) || shapes[1];

  return (
    <div className="space-y-16 mb-20">
      {/* Group Title Banner */}
      <div className="border-b-2 border-[#1c1917] pb-3 pt-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-[#18181b] text-[#fbbf24] px-3 py-1 rounded">
          03 // Attributes & Shape
        </span>
      </div>

      {/* 08. Array Attributes */}
      <section id="sec-attributes" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">08</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              08 // Array Attributes
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Array Metadata Attributes
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Constant O(1) metadata access: ndim, shape, size, dtype, itemsize, nbytes, and strides.
            </p>
          </div>
        </div>

        <div className="card-paper rounded-xl overflow-hidden border border-[#e2ddd6]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-100 text-[#71717a] border-b border-[#e2ddd6]">
              <tr>
                <th className="p-3">Attribute</th>
                <th className="p-3">Example</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2ddd6] text-[#3f3f46]">
              <tr><td className="p-3 font-bold text-[#1d4ed8]">arr.ndim</td><td className="p-3 text-emerald-700">2</td><td className="p-3 font-sans">Number of dimensions (axes).</td></tr>
              <tr><td className="p-3 font-bold text-[#1d4ed8]">arr.shape</td><td className="p-3 text-emerald-700">(2, 3)</td><td className="p-3 font-sans">Lengths along each axis.</td></tr>
              <tr><td className="p-3 font-bold text-[#1d4ed8]">arr.size</td><td className="p-3 text-emerald-700">6</td><td className="p-3 font-sans">Total element count.</td></tr>
              <tr><td className="p-3 font-bold text-[#1d4ed8]">arr.nbytes</td><td className="p-3 text-emerald-700">48</td><td className="p-3 font-sans">Total bytes consumed in RAM.</td></tr>
              <tr><td className="p-3 font-bold text-[#1d4ed8]">arr.strides</td><td className="p-3 text-emerald-700">(24, 8)</td><td className="p-3 font-sans">Byte step increments in RAM.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 09. Methods & Axis Ops */}
      <section id="sec-methods" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">09</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              09 // Methods & Axis Ops
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Methods & Interactive Axis Reductions
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Visualize row-wise vs column-wise aggregation across ndarray matrices.
            </p>
          </div>
        </div>

        <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-[#27272a] pb-3">
            <span className="font-mono text-xs font-bold text-[#fbbf24] uppercase">Axis Collapse Visualizer</span>
            <div className="flex space-x-2">
              <button onClick={() => setHighlightAxis(0)} className={`tab-btn ${highlightAxis === 0 ? 'active' : ''}`}>
                axis=0 (Down Columns &darr;)
              </button>
              <button onClick={() => setHighlightAxis(1)} className={`tab-btn ${highlightAxis === 1 ? 'active' : ''}`}>
                axis=1 (Across Rows &rarr;)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center font-mono text-xs">
            <div className="p-4 rounded-lg bg-[#141416] border border-[#27272a] space-y-2">
              <div className="text-[#a1a1aa] flex justify-between">
                <span>Input Matrix A (2 × 3)</span>
                <span className="text-[#fbbf24]">Collapsing {highlightAxis === 0 ? 'Rows (axis=0)' : 'Cols (axis=1)'}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {matrix.flatMap((row, r) =>
                  row.map((val, c) => (
                    <div
                      key={`${r}-${c}`}
                      className={`p-3 text-center rounded font-bold ${
                        highlightAxis === 0
                          ? 'bg-blue-900/40 border border-blue-400 text-blue-200'
                          : 'bg-emerald-900/40 border border-emerald-400 text-emerald-200'
                      }`}
                    >
                      {val}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#141416] border border-[#27272a] space-y-2">
              <div className="text-[#a1a1aa] uppercase font-bold">np.sum(A, axis={highlightAxis})</div>
              {highlightAxis === 0 ? (
                <div className="text-blue-300 space-y-1">
                  <div className="text-sm font-bold">Result: [50, 70, 90] (Shape: (3,))</div>
                  <p className="text-[#a1a1aa] text-[11px]">• Col 0: 10+40=50 | Col 1: 20+50=70 | Col 2: 30+60=90</p>
                </div>
              ) : (
                <div className="text-emerald-300 space-y-1">
                  <div className="text-sm font-bold">Result: [60, 150] (Shape: (2,))</div>
                  <p className="text-[#a1a1aa] text-[11px]">• Row 0: 10+20+30=60 | Row 1: 40+50+60=150</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Reshaping & Resizing */}
      <section id="sec-reshaping" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">10</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              10 // Reshaping & Resizing
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Reshaping & Interactive Reshaper Grid
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Morph 12 elements across dimensions without memory copying in RAM.
            </p>
          </div>
        </div>

        <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
          <div className="flex flex-wrap gap-2">
            {shapes.map((s) => (
              <button
                key={s.label}
                onClick={() => setCurShape(s.shape)}
                className={`tab-btn ${curObj.label === s.label ? 'active' : ''}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="p-6 rounded-xl bg-[#141416] border border-[#27272a]">
            <div
              className="grid gap-2 justify-center mx-auto"
              style={{ gridTemplateColumns: `repeat(${curObj.cols}, minmax(42px, 60px))` }}
            >
              {Array.from({ length: 12 }, (_, i) => (i + 1) * 10).map((v, i) => (
                <div key={i} className="h-11 flex items-center justify-center font-mono font-bold text-sm rounded bg-[#27272a] border border-[#3f3f46] text-[#fbbf24]">
                  {v}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#09090b] border border-[#27272a] font-mono text-xs flex justify-between text-[#a1a1aa]">
            <div>arr.reshape({curObj.shape.join(', ')}) &rarr; <strong className="text-white">({curObj.shape.join(', ')})</strong></div>
            <div>Strides: <strong className="text-emerald-400">{curObj.strides}</strong></div>
          </div>
        </div>
      </section>
    </div>
  );
}
