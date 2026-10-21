import React from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function VectorizationMath() {
  return (
    <section id="sec-broadcasting" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#1d4ed8]">
          Module 07 • Mathematical Foundations
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          7. Vectorization, Broadcasting & Linear Algebra (LAPACK)
        </h2>
      </div>

      <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
          The 3 Golden Rules of NumPy Broadcasting
        </h3>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          Broadcasting describes how NumPy treats arrays with different shapes during arithmetic operations without creating redundant in-memory copies.
        </p>

        <div className="grid md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-mono space-y-2">
            <strong className="text-[#1d4ed8]">Rule 1: Prepend 1s</strong>
            <p className="text-[#71717a] font-sans">
              If arrays have different numbers of dimensions, the shape of the one with fewer dimensions is padded with ones on its <strong>left (leading)</strong> side.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-mono space-y-2">
            <strong className="text-[#1d4ed8]">Rule 2: Stretch Size 1</strong>
            <p className="text-[#71717a] font-sans">
              If the shape of the two arrays does not match in any dimension, the array with dimension size equal to <strong>1 is stretched</strong> to match the other shape.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-mono space-y-2">
            <strong className="text-[#be123c]">Rule 3: Incompatibility</strong>
            <p className="text-[#71717a] font-sans">
              If in any dimension the sizes disagree and neither is equal to 1, a <strong>ValueError: operands could not be broadcast together</strong> is raised!
            </p>
          </div>
        </div>
      </div>

      <CodeSnippet
        title="Broadcasting Example & Dimension Alignment"
        code={`import numpy as np

# Shape: (4, 3)
A = np.ones((4, 3))

# Shape: (3,) -> Prepended with 1 to become (1, 3) -> Stretched to (4, 3)
b = np.array([10, 20, 30])

result = A + b
print("Result Shape: ", result.shape)
print("Result:\\n", result)`}
        output={`Result Shape:  (4, 3)
Result:
 [[11. 21. 31.]
  [11. 21. 31.]
  [11. 21. 31.]
  [11. 21. 31.]]`}
      />

      <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
          High-Performance Linear Algebra (BLAS & LAPACK)
        </h3>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          NumPy delegates matrix multiplications and decompositions directly to compiled hardware-optimized libraries (OpenBLAS, Intel MKL, or Apple Accelerate).
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded bg-zinc-100 border border-zinc-200">
            <div className="font-bold text-[#1d4ed8]">A @ B (or np.matmul)</div>
            <div className="text-[#71717a] mt-1 font-sans">Matrix multiplication dot product.</div>
          </div>
          <div className="p-3 rounded bg-zinc-100 border border-zinc-200">
            <div className="font-bold text-[#1d4ed8]">np.linalg.solve(A, b)</div>
            <div className="text-[#71717a] mt-1 font-sans">Exact linear system solver via LU.</div>
          </div>
          <div className="p-3 rounded bg-zinc-100 border border-zinc-200">
            <div className="font-bold text-[#1d4ed8]">np.linalg.inv(A)</div>
            <div className="text-[#71717a] mt-1 font-sans">Matrix inversion ($A^{-1}$).</div>
          </div>
          <div className="p-3 rounded bg-zinc-100 border border-zinc-200">
            <div className="font-bold text-[#1d4ed8]">np.linalg.norm(A)</div>
            <div className="text-[#71717a] mt-1 font-sans">Matrix & vector Frobenius/L2 norm.</div>
          </div>
        </div>
      </div>

      <NoteCallout type="tip" title="Always Prefer solve() over inv()">
        Never compute <code>x = np.linalg.inv(A) @ b</code>! Explicit inversion is $O(n^3)$ with poor numerical stability. Always use <code>np.linalg.solve(A, b)</code> which uses direct LU factorization and is ~2x faster with lower floating point drift.
      </NoteCallout>
    </section>
  );
}
