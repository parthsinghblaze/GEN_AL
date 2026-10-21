'use client';

import { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function ReshapingSection() {
  const [currentShape, setCurrentShape] = useState<[number, number] | [number]>([3, 4]);

  const items = Array.from({ length: 12 }, (_, i) => (i + 1) * 10);

  const shapes: { label: string; shape: [number, number] | [number]; cols: number; strides: string }[] = [
    { label: '(12,)', shape: [12], cols: 12, strides: '(8,)' },
    { label: '(3, 4)', shape: [3, 4], cols: 4, strides: '(32, 8)' },
    { label: '(4, 3)', shape: [4, 3], cols: 3, strides: '(24, 8)' },
    { label: '(2, 6)', shape: [2, 6], cols: 6, strides: '(48, 8)' },
    { label: '(6, 2)', shape: [6, 2], cols: 2, strides: '(16, 8)' },
  ];

  const currentObj = shapes.find((s) => s.shape.join(',') === currentShape.join(',')) || shapes[1];

  return (
    <section id="sec-reshaping" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#1d4ed8]">
          Module 05 • Dimensional Manipulation
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          5. Array Reshaping & Interactive Reshaper Grid
        </h2>
      </div>

      {/* Interactive Reshaper Tool */}
      <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
          <div>
            <h3 className="font-editorial text-xl font-bold text-[#fbbf24]">
              Interactive Reshaper: 12 Elements Morphing Dimensions
            </h3>
            <p className="text-xs text-[#a1a1aa] font-mono mt-1">
              Click preset shapes to see how NumPy reinterprets 1D contiguous RAM without moving bytes.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {shapes.map((s) => (
              <button
                key={s.label}
                onClick={() => setCurrentShape(s.shape)}
                className={`tab-btn ${currentObj.label === s.label ? 'active' : ''}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid Stage */}
        <div className="p-6 rounded-xl bg-[#141416] border border-[#27272a] overflow-x-auto">
          <div
            className="grid gap-2 justify-center mx-auto"
            style={{
              gridTemplateColumns: `repeat(${currentObj.cols}, minmax(42px, 60px))`,
            }}
          >
            {items.map((val, idx) => (
              <div
                key={idx}
                className="h-12 flex items-center justify-center font-mono font-bold text-sm rounded bg-[#27272a] border border-[#3f3f46] text-[#fbbf24] shadow transition-all duration-300 transform hover:scale-105"
              >
                {val}
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Code & Strides Breakdown */}
        <div className="p-4 rounded-lg bg-[#09090b] border border-[#27272a] font-mono text-xs text-[#a1a1aa] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-sky-400">arr.reshape({currentObj.shape.join(', ')})</span> &rarr; Shape: <strong className="text-white">({currentObj.shape.join(', ')})</strong>
          </div>
          <div>
            Memory Strides: <strong className="text-emerald-400">{currentObj.strides} bytes</strong>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              ravel() — Zero-Copy View
            </h4>
            <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
              Zero-Copy (View)
            </span>
          </div>
          <p className="text-xs text-[#71717a] leading-relaxed">
            Flattens array to 1D returning a <strong>memory view</strong> sharing the exact underlying buffer. Modifying the raveled array alters the original array!
          </p>
          <div className="p-3 rounded bg-[#18181b] text-xs font-mono text-[#f4f4f5]">
            v = arr.ravel()<br />
            v[0] = 999 <span className="text-[#71717a]"># Mutates original arr!</span>
          </div>
        </div>

        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              flatten() — Allocated Copy
            </h4>
            <span className="font-mono text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
              Physical Copy (RAM)
            </span>
          </div>
          <p className="text-xs text-[#71717a] leading-relaxed">
            Flattens array to 1D by <strong>allocating a fresh new memory buffer</strong> in RAM. Modifying the flattened copy never affects the parent array.
          </p>
          <div className="p-3 rounded bg-[#18181b] text-xs font-mono text-[#f4f4f5]">
            c = arr.flatten()<br />
            c[0] = 999 <span className="text-[#71717a]"># Safe: original arr untouched</span>
          </div>
        </div>
      </div>

      <CodeSnippet
        title="Dimension Expansion & Squeezing"
        code={`import numpy as np

arr = np.array([10, 20, 30])  # Shape: (3,)

# 1. Add batch dimension (expand_dims or None/np.newaxis)
col_vec = arr[:, np.newaxis]       # Shape: (3, 1)
row_vec = np.expand_dims(arr, 0)   # Shape: (1, 3)

# 2. Squeeze redundant singleton dimensions
squeezed = np.squeeze(col_vec)     # Shape: (3,)

print("Col Vector Shape: ", col_vec.shape)
print("Squeezed Shape:   ", squeezed.shape)`}
        output={`Col Vector Shape:  (3, 1)
Squeezed Shape:    (3,)`}
      />

      <NoteCallout type="warning" title="Reshape -1 Dimension Inference">
        You can pass <code>-1</code> for at most one dimension in <code>arr.reshape(rows, -1)</code>. NumPy automatically calculates the missing dimension based on <code>arr.size / rows</code>.
      </NoteCallout>
    </section>
  );
}
