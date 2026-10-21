'use client';

import { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function Module1Architecture() {
  const [visType, setVisType] = useState<'py' | 'np'>('np');

  return (
    <div className="space-y-16 mb-20">
      {/* Group Title Banner */}
      <div className="border-b-2 border-[#1c1917] pb-3 pt-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-[#18181b] text-[#fbbf24] px-3 py-1 rounded">
          01 // Architecture & Origin
        </span>
      </div>

      {/* 01. Origin & History */}
      <section id="sec-origin" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">01</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              01 // Origin & History
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Origin & History of NumPy
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              How Travis Oliphant unified Numeric and Numarray in 2005 to create the foundation of scientific Python.
            </p>
          </div>
        </div>

        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-3">
          <p className="text-xs text-[#3f3f46] leading-relaxed">
            In 2005, <strong>Travis Oliphant</strong> unified Numeric and Numarray into <strong>NumPy</strong>. It replaced dynamic Python interpreter overhead with compiled C/Fortran routines executing directly on contiguous memory.
          </p>
        </div>
      </section>

      {/* 02. Why NumPy in ML */}
      <section id="sec-why" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">02</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              02 // Deep Learning Foundations
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Why NumPy in Machine Learning
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Every modern framework (PyTorch, TensorFlow, JAX, Scikit-Learn) adopts NumPy&apos;s buffer protocol and stride semantics.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-1">
            <strong className="text-[#1d4ed8]">1. Zero-Copy Tensors</strong>
            <p className="text-[#71717a] font-sans"><code>torch.from_numpy()</code> shares raw memory pointers directly with GPU DMA.</p>
          </div>
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-1">
            <strong className="text-[#1d4ed8]">2. Hardware SIMD</strong>
            <p className="text-[#71717a] font-sans">Executes 8x float64 operations per CPU clock cycle using AVX-512 instructions.</p>
          </div>
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-1">
            <strong className="text-[#1d4ed8]">3. Universal Protocol</strong>
            <p className="text-[#71717a] font-sans">Array interchange standard across OpenCV, SciPy, and Polars.</p>
          </div>
        </div>
      </section>

      {/* 03. List vs ndarray */}
      <section id="sec-vs" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">03</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              03 // Memory Layout
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Python List vs NumPy ndarray
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Fragmented pointers to heap PyObjects vs contiguous raw cache-aligned buffers.
            </p>
          </div>
        </div>

        <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-[#27272a] pb-3">
            <span className="font-mono text-xs font-bold text-[#fbbf24] uppercase">RAM Layout Visualizer</span>
            <div className="flex space-x-2">
              <button onClick={() => setVisType('py')} className={`tab-btn ${visType === 'py' ? 'active' : ''}`}>Python List</button>
              <button onClick={() => setVisType('np')} className={`tab-btn ${visType === 'np' ? 'active' : ''}`}>NumPy Array</button>
            </div>
          </div>

          {visType === 'py' ? (
            <div className="p-4 rounded-lg bg-[#141416] border border-rose-900/40 text-xs font-mono">
              <div className="text-rose-400 font-bold mb-2">Python List: 64-bit Pointer Array &rarr; Scattered Heap PyObjects (~36 bytes/int)</div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[10, 20, 30, 40].map((v, i) => (
                  <div key={i} className="p-2 rounded bg-rose-950/40 border border-rose-800 text-rose-200">
                    PyObject({v})
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-[#141416] border border-emerald-900/40 text-xs font-mono">
              <div className="text-emerald-400 font-bold mb-2">NumPy ndarray: Single Header &rarr; Contiguous 8-Byte Buffer (8 bytes/int)</div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[10, 20, 30, 40].map((v, i) => (
                  <div key={i} className="p-2 rounded bg-emerald-950/40 border border-emerald-500/40 text-[#fbbf24] font-bold">
                    {v}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 04. Memory & Strides */}
      <section id="sec-memory" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">04</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              04 // Memory Strides
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Memory Strides & C-Contiguity
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              How strides enable O(1) multi-dimensional matrix operations without copying data in RAM.
            </p>
          </div>
        </div>

        <CodeSnippet
          title="Inspecting Strides"
          code={`import numpy as np

arr = np.array([[10, 20, 30], [40, 50, 60]], dtype=np.int64)
print("Shape:   ", arr.shape)    # (2, 3)
print("Strides: ", arr.strides)  # (24, 8) -> 24 bytes/row, 8 bytes/col`}
        />
      </section>
    </div>
  );
}
