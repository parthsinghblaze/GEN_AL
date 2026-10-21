'use client';

import { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';
import MatrixSlicerLab from './MatrixSlicerLab';

export default function Module4Indexing() {
  return (
    <div className="space-y-16 mb-20">
      {/* Group Title Banner */}
      <div className="border-b-2 border-[#1c1917] pb-3 pt-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-[#18181b] text-[#fbbf24] px-3 py-1 rounded">
          04 // Indexing & Slicing
        </span>
      </div>

      {/* 11. 1D & 2D Slicing */}
      <section id="sec-slicing" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">11</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              11 // Slicing & Views
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              1D & 2D Slicing Views
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Basic slicing with [start:stop:step] returns zero-copy memory views.
            </p>
          </div>
        </div>

        <CodeSnippet
          title="Basic 2D Slicing"
          code={`arr = np.arange(10, 26).reshape(4, 4)

# 2D Submatrix View (rows 1-2, cols 1-3)
sub_view = arr[1:3, 1:4]

# Strided slicing (step of 2)
strided = arr[::2, ::2]`}
        />
      </section>

      {/* 12. Boolean & Fancy Indexing */}
      <section id="sec-boolean-fancy" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">12</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              12 // Boolean & Fancy
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Boolean Masking & Fancy Indexing
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Conditional filtering and integer coordinate selection (always allocates memory copies).
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-2">
            <strong className="text-[#b45309]">Boolean Masking (&, |, ~)</strong>
            <p className="text-[#71717a] font-sans">Evaluates conditions element-wise into bitmasks.</p>
            <div className="p-2 rounded bg-[#18181b] text-white">
              filtered = arr[(arr &gt; 15) &amp; (arr % 2 == 0)]
            </div>
          </div>
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-2">
            <strong className="text-[#047857]">Fancy Indexing (Integer Arrays)</strong>
            <p className="text-[#71717a] font-sans">Pairs coordinates: (0,1) &amp; (3,2).</p>
            <div className="p-2 rounded bg-[#18181b] text-white">
              coords = arr[[0, 3], [1, 2]]
            </div>
          </div>
        </div>
      </section>

      {/* 13. Slicing Lab & Practice */}
      <section id="sec-slicing-lab" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">13</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              13 // Interactive Slicing Lab
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Slicing Lab & Practice
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Visual interactive 4x4 matrix slicer with zero-copy view indicators.
            </p>
          </div>
        </div>

        <MatrixSlicerLab />
      </section>
    </div>
  );
}
