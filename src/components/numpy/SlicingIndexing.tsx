import React from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function SlicingIndexing() {
  return (
    <section id="sec-slicing" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#1d4ed8]">
          Module 06 • Indexing & Slicing
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          6. Slicing, Boolean Masking & Fancy Indexing
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-paper p-5 rounded-xl border border-[#e2ddd6] space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs font-bold text-[#1d4ed8] uppercase">Basic Slicing</span>
            <span className="font-mono text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">VIEW</span>
          </div>
          <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
            arr[start : stop : step]
          </h4>
          <p className="text-xs text-[#71717a] leading-relaxed">
            Standard slice intervals return a <strong>memory view</strong>. Does not allocate new data memory. In-place changes propagate.
          </p>
          <div className="p-2.5 rounded bg-[#18181b] text-white font-mono text-xs">
            arr[1:4, 2:5]<br />
            arr[::2, ::-1] <span className="text-[#71717a]"># Strided & reverse</span>
          </div>
        </div>

        <div className="card-paper p-5 rounded-xl border border-[#e2ddd6] space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs font-bold text-[#b45309] uppercase">Boolean Masking</span>
            <span className="font-mono text-[9px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded">COPY</span>
          </div>
          <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
            arr[condition]
          </h4>
          <p className="text-xs text-[#71717a] leading-relaxed">
            Evaluates conditional expression into boolean array and filters elements. Always allocates a <strong>fresh copy</strong>.
          </p>
          <div className="p-2.5 rounded bg-[#18181b] text-white font-mono text-xs">
            mask = (arr &gt; 50) &amp; (arr &lt; 90)<br />
            filtered = arr[mask]
          </div>
        </div>

        <div className="card-paper p-5 rounded-xl border border-[#e2ddd6] space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs font-bold text-[#047857] uppercase">Fancy Indexing</span>
            <span className="font-mono text-[9px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded">COPY</span>
          </div>
          <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
            arr[[row_ids], [col_ids]]
          </h4>
          <p className="text-xs text-[#71717a] leading-relaxed">
            Index with integer lists or arrays to extract arbitrary coordinates. Pairs coordinates element-wise and returns a <strong>copy</strong>.
          </p>
          <div className="p-2.5 rounded bg-[#18181b] text-white font-mono text-xs">
            arr[[0, 2], [1, 3]]<br />
            <span className="text-[#71717a]"># Extracts (0,1) &amp; (2,3)</span>
          </div>
        </div>
      </div>

      <CodeSnippet
        title="Comprehensive Indexing & Boolean Operators"
        code={`import numpy as np

arr = np.arange(10, 26).reshape(4, 4)
print("Original Matrix (4x4):\\n", arr)

# 1. Basic Slicing View
sub_view = arr[1:3, 1:4]
print("\\nSubmatrix 2x3:\\n", sub_view)

# 2. Boolean Mask with Bitwise AND (&)
# Note: Use & and | (not 'and', 'or'), and wrap conditions in ()
evens_gt_15 = arr[(arr % 2 == 0) & (arr > 15)]
print("\\nEvens > 15:\\n", evens_gt_15)

# 3. Fancy Coordinate Indexing
coords = arr[[0, 3], [1, 2]]  # picks (0,1) -> 11 and (3,2) -> 24
print("\\nFancy Indexed Coords:\\n", coords)`}
        output={`Original Matrix (4x4):
 [[10 11 12 13]
  [14 15 16 17]
  [18 19 20 21]
  [22 23 24 25]]

Submatrix 2x3:
 [[15 16 17]
  [19 20 21]]

Evens > 15:
 [16 18 20 22 24]

Fancy Indexed Coords:
 [11 24]`}
      />

      <NoteCallout type="danger" title="The Golden Rule: View vs Copy">
        <strong>Basic Slices</strong> (using <code>:</code>) return <strong>Views</strong> (mutations affect the source). <strong>Boolean Indexing</strong> and <strong>Fancy Indexing</strong> (using integer lists) return <strong>Allocated Copies</strong> (mutations are isolated).
      </NoteCallout>
    </section>
  );
}
