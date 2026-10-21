import React from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function OriginArchitecture() {
  return (
    <section id="sec-origin" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#1d4ed8]">
          Module 01 • History & Under the Hood
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          1. Origin & The ndarray Internal Anatomy
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
          <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
            Historical Origin: Numeric & Numarray Unification
          </h3>
          <p className="text-sm text-[#3f3f46] leading-relaxed">
            In 2005, <strong>Travis Oliphant</strong> unified two competing numerical Python packages—<strong>Numeric</strong> (simple, fast for small arrays) and <strong>Numarray</strong> (flexible memory features for large astronomy arrays)—to create <strong>NumPy</strong>.
          </p>
          <p className="text-sm text-[#3f3f46] leading-relaxed">
            NumPy solved Python&apos;s fundamental performance bottleneck: the dynamic interpreter overhead. Instead of interpreting every calculation through Python object wrappers, operations are handed off to compiled C/Fortran routines.
          </p>
        </div>

        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
          <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
            The 5 Core Pillars of an ndarray Object
          </h3>
          <ul className="text-xs font-mono space-y-2.5 text-[#3f3f46]">
            <li className="p-2 rounded bg-zinc-100 border border-zinc-200">
              <strong className="text-[#1d4ed8]">1. Data Pointer:</strong> Raw memory address pointing to the first byte in contiguous RAM.
            </li>
            <li className="p-2 rounded bg-zinc-100 border border-zinc-200">
              <strong className="text-[#1d4ed8]">2. Dtype (Data Type):</strong> Exact byte layout descriptor (e.g. <code>float64</code> = 8 bytes IEEE 754).
            </li>
            <li className="p-2 rounded bg-zinc-100 border border-zinc-200">
              <strong className="text-[#1d4ed8]">3. Shape Tuple:</strong> Dimensions of the array, e.g., <code>(3, 4)</code>.
            </li>
            <li className="p-2 rounded bg-zinc-100 border border-zinc-200">
              <strong className="text-[#1d4ed8]">4. Strides Tuple:</strong> Bytes to step in RAM to move 1 index forward along each dimension.
            </li>
            <li className="p-2 rounded bg-zinc-100 border border-zinc-200">
              <strong className="text-[#1d4ed8]">5. Flags:</strong> Memory attributes (C-contiguous, Fortran-contiguous, OWNDATA, WRITEABLE).
            </li>
          </ul>
        </div>
      </div>

      {/* Anatomy Visualizer Card */}
      <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl">
        <div className="flex items-center justify-between mb-4 border-b border-[#27272a] pb-3">
          <span className="font-mono text-xs uppercase font-bold text-[#fbbf24]">
            ndarray Internal Header & Contiguous RAM Buffer
          </span>
          <span className="font-mono text-[10px] text-[#a1a1aa]">Zero-Copy Memory Model</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Header Metadata */}
          <div className="bg-[#141416] p-4 rounded-lg border border-[#27272a] space-y-3">
            <div className="font-mono text-xs text-[#a1a1aa] uppercase font-bold border-b border-[#27272a] pb-1">
              Python Wrapper (Header)
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between"><span className="text-[#71717a]">data_ptr:</span> <span className="text-emerald-400 font-bold">0x7ffd9a10</span></div>
              <div className="flex justify-between"><span className="text-[#71717a]">shape:</span> <span className="text-[#fbbf24]">(2, 3)</span></div>
              <div className="flex justify-between"><span className="text-[#71717a]">strides:</span> <span className="text-sky-400">(24, 8) bytes</span></div>
              <div className="flex justify-between"><span className="text-[#71717a]">dtype:</span> <span className="text-rose-400">float64 (8B)</span></div>
              <div className="flex justify-between"><span className="text-[#71717a]">OWNDATA:</span> <span className="text-emerald-400">True</span></div>
            </div>
          </div>

          {/* Raw Buffer */}
          <div className="lg:col-span-2 bg-[#141416] p-4 rounded-lg border border-[#27272a] space-y-3">
            <div className="font-mono text-xs text-[#a1a1aa] uppercase font-bold border-b border-[#27272a] pb-1">
              Underlying Continuous C-Memory Array (48 Raw Bytes in RAM)
            </div>
            <div className="grid grid-cols-6 gap-2">
              {[10.0, 20.0, 30.0, 40.0, 50.0, 60.0].map((val, idx) => (
                <div key={idx} className="p-2 text-center rounded bg-[#27272a] border border-[#3f3f46]">
                  <div className="font-mono text-[10px] text-[#71717a]">+{idx * 8}B</div>
                  <div className="font-mono text-sm font-bold text-[#fbbf24]">{val}</div>
                  <div className="text-[9px] font-mono text-[#a1a1aa]">[{Math.floor(idx / 3)},{idx % 3}]</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#a1a1aa] mt-2 font-mono">
              Formula: <code>Byte Offset = (Row_Index × 24) + (Col_Index × 8)</code>
            </p>
          </div>
        </div>
      </div>

      <CodeSnippet
        title="Inspecting Array Memory Strides and C-Contiguity"
        code={`import numpy as np

# Create a 2D array
arr = np.array([[10, 20, 30], 
                [40, 50, 60]], dtype=np.int64)

print("Shape:   ", arr.shape)    # (2, 3)
print("Strides: ", arr.strides)  # (24, 8) -> 24 bytes per row, 8 bytes per item
print("Nbytes:  ", arr.nbytes)   # 48 bytes total
print("Flags:\\n", arr.flags)     # C_CONTIGUOUS : True, OWNDATA : True`}
        output={`Shape:    (2, 3)
Strides:  (24, 8)
Nbytes:   48
Flags:
  C_CONTIGUOUS : True
  F_CONTIGUOUS : False
  OWNDATA : True
  WRITEABLE : True`}
      />

      <NoteCallout type="warning" title="Why Strides Matter">
        Strides allow NumPy to transpose or slice multi-dimensional matrices in <strong>O(1) constant time</strong> with <strong>zero memory allocation</strong> simply by updating the stride arithmetic rather than moving elements in RAM!
      </NoteCallout>
    </section>
  );
}
