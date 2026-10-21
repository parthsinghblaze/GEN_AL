'use client';

import { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function AttributesMethods() {
  const [highlightAxis, setHighlightAxis] = useState<0 | 1 | null>(null);

  const matrix = [
    [10, 20, 30],
    [40, 50, 60],
  ];

  return (
    <section id="sec-attributes" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#1d4ed8]">
          Module 04 • Inspection & Reductions
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          4. ndarray Attributes & Interactive Axis Reductions
        </h2>
      </div>

      {/* Attributes Table */}
      <div className="card-paper rounded-xl overflow-hidden border border-[#e2ddd6] shadow-sm">
        <div className="p-4 bg-[#141416] text-white border-b border-[#27272a] flex items-center justify-between">
          <span className="font-mono text-xs uppercase font-bold text-[#fbbf24]">
            Key ndarray Metadata Properties
          </span>
          <span className="font-mono text-[10px] text-[#a1a1aa]">Constant O(1) Access</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 font-mono text-[#71717a] border-b border-[#e2ddd6]">
              <tr>
                <th className="p-3">Attribute</th>
                <th className="p-3">Returns</th>
                <th className="p-3">Example for (2, 3) float64</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2ddd6] font-mono text-[#3f3f46]">
              <tr>
                <td className="p-3 font-bold text-[#1d4ed8]">arr.ndim</td>
                <td className="p-3">int</td>
                <td className="p-3 text-emerald-700 font-bold">2</td>
                <td className="p-3 font-sans">Number of dimensions (axes).</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1d4ed8]">arr.shape</td>
                <td className="p-3">tuple</td>
                <td className="p-3 text-emerald-700 font-bold">(2, 3)</td>
                <td className="p-3 font-sans">Length along each axis.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1d4ed8]">arr.size</td>
                <td className="p-3">int</td>
                <td className="p-3 text-emerald-700 font-bold">6</td>
                <td className="p-3 font-sans">Total number of elements in array.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1d4ed8]">arr.dtype</td>
                <td className="p-3">dtype</td>
                <td className="p-3 text-emerald-700 font-bold">float64</td>
                <td className="p-3 font-sans">Data type descriptor for elements.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1d4ed8]">arr.itemsize</td>
                <td className="p-3">int</td>
                <td className="p-3 text-emerald-700 font-bold">8</td>
                <td className="p-3 font-sans">Bytes per element in RAM.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1d4ed8]">arr.nbytes</td>
                <td className="p-3">int</td>
                <td className="p-3 text-emerald-700 font-bold">48</td>
                <td className="p-3 font-sans">Total RAM consumed (size × itemsize).</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1d4ed8]">arr.strides</td>
                <td className="p-3">tuple</td>
                <td className="p-3 text-emerald-700 font-bold">(24, 8)</td>
                <td className="p-3 font-sans">Bytes to step in RAM along each dimension.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Axis Reducer */}
      <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
          <div>
            <h3 className="font-editorial text-xl font-bold text-[#fbbf24]">
              Interactive Axis Visualizer: Collapse Along Axis 0 vs Axis 1
            </h3>
            <p className="text-xs text-[#a1a1aa] font-mono mt-1">
              Click below to visualize row-wise vs column-wise aggregation.
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setHighlightAxis(0)}
              className={`tab-btn ${highlightAxis === 0 ? 'active' : ''}`}
            >
              axis=0 (Down Columns &darr;)
            </button>
            <button
              onClick={() => setHighlightAxis(1)}
              className={`tab-btn ${highlightAxis === 1 ? 'active' : ''}`}
            >
              axis=1 (Across Rows &rarr;)
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Matrix Display */}
          <div className="p-5 rounded-lg bg-[#141416] border border-[#27272a] space-y-3">
            <div className="font-mono text-xs text-[#a1a1aa] flex justify-between">
              <span>Input Matrix A (2 × 3)</span>
              <span className="text-[#fbbf24]">
                {highlightAxis === 0 ? 'Collapsing Rows (axis=0)' : highlightAxis === 1 ? 'Collapsing Cols (axis=1)' : 'Select an axis'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {matrix.flatMap((row, rIdx) =>
                row.map((val, cIdx) => {
                  const isAxis0 = highlightAxis === 0;
                  const isAxis1 = highlightAxis === 1;
                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`p-3 text-center rounded font-mono font-bold text-sm transition-all ${
                        isAxis0
                          ? 'bg-blue-900/40 border border-blue-400 text-blue-200'
                          : isAxis1
                          ? 'bg-emerald-900/40 border border-emerald-400 text-emerald-200'
                          : 'bg-[#27272a] border border-[#3f3f46] text-[#f4f4f5]'
                      }`}
                    >
                      {val}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Reduction Result */}
          <div className="p-5 rounded-lg bg-[#141416] border border-[#27272a] space-y-3 font-mono">
            <div className="text-xs text-[#a1a1aa] uppercase font-bold">
              Reduction Result: np.sum(A, axis={highlightAxis ?? 0})
            </div>
            {highlightAxis === 0 && (
              <div className="space-y-2">
                <div className="text-sm text-blue-300 font-bold">
                  Result Shape: (3,) &rarr; [50, 70, 90]
                </div>
                <p className="text-xs text-[#a1a1aa]">
                  • Col 0: 10 + 40 = <strong>50</strong><br />
                  • Col 1: 20 + 50 = <strong>70</strong><br />
                  • Col 2: 30 + 60 = <strong>90</strong>
                </p>
              </div>
            )}
            {highlightAxis === 1 && (
              <div className="space-y-2">
                <div className="text-sm text-emerald-300 font-bold">
                  Result Shape: (2,) &rarr; [60, 150]
                </div>
                <p className="text-xs text-[#a1a1aa]">
                  • Row 0: 10 + 20 + 30 = <strong>60</strong><br />
                  • Row 1: 40 + 50 + 60 = <strong>150</strong>
                </p>
              </div>
            )}
            {highlightAxis === null && (
              <p className="text-xs text-[#71717a]">
                Select an axis above to see the calculation breakdown.
              </p>
            )}
          </div>
        </div>
      </div>

      <CodeSnippet
        title="Key Reduction Methods"
        code={`import numpy as np

A = np.array([[10, 20, 30], 
              [40, 50, 60]])

# 1. Total Sum & Mean
print("Total Sum: ", A.sum())        # 210
print("Mean:      ", A.mean())       # 35.0

# 2. Axis-Specific Reductions
print("Sum axis 0 (down cols): ", A.sum(axis=0)) # [50, 70, 90]
print("Sum axis 1 (along rows): ", A.sum(axis=1)) # [60, 150]

# 3. Argmax (Index of Maximum Value)
print("Argmax flat: ", A.argmax())         # 5 (value 60)
print("Argmax col:  ", A.argmax(axis=0))    # [1, 1, 1]`}
        output={`Total Sum:  210
Mean:       35.0
Sum axis 0 (down cols):  [50 70 90]
Sum axis 1 (along rows):  [ 60 150]
Argmax flat:  5
Argmax col:   [1 1 1]`}
      />

      <NoteCallout type="gold" title="Mental Model for Axis">
        The dimension specified by <code>axis</code> is the one that gets <strong>collapsed</strong> (eliminated) in the output shape! For shape <code>(2, 3)</code>, <code>axis=0</code> removes the 2, leaving shape <code>(3,)</code>.
      </NoteCallout>
    </section>
  );
}
