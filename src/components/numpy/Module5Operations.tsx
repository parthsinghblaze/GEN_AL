'use client';

import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';
import MatrixOpsLab from './MatrixOpsLab';

export default function Module5Operations() {
  return (
    <div className="space-y-16 mb-20">
      {/* Group Title Banner */}
      <div className="border-b-2 border-[#1c1917] pb-3 pt-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-[#18181b] text-[#fbbf24] px-3 py-1 rounded">
          05 // Array Operations & LinAlg
        </span>
      </div>

      {/* 14. Arithmetic & ufuncs */}
      <section id="sec-arithmetic" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">14</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              14 // Vectorized ufuncs
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Arithmetic & Universal Functions (ufuncs)
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Element-wise operations executing compiled C loops without Python interpreter overhead.
            </p>
          </div>
        </div>

        <CodeSnippet
          title="Element-wise ufuncs"
          code={`A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Element-wise operations
add_res = A + B       # np.add(A, B)
mult_res = A * B      # np.multiply(A, B) - Hadamard product
exp_res = np.exp(A)   # Vectorized exponential
sqrt_res = np.sqrt(A) # Vectorized square root`}
        />
      </section>

      {/* 15. Broadcasting & Math */}
      <section id="sec-broadcasting" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">15</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              15 // Broadcasting Rules
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Broadcasting & Trailing Dimensions
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              How arrays of differing dimensions align automatically from right to left.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-1">
            <strong className="text-[#1d4ed8]">Rule 1: Prepend 1s</strong>
            <p className="text-[#71717a] font-sans">Array with fewer dims is padded with 1s on left.</p>
          </div>
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-1">
            <strong className="text-[#1d4ed8]">Rule 2: Stretch Size 1</strong>
            <p className="text-[#71717a] font-sans">Dimension of size 1 stretches to match other shape.</p>
          </div>
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-1">
            <strong className="text-[#be123c]">Rule 3: Incompatibility</strong>
            <p className="text-[#71717a] font-sans">Mismatch without 1 raises ValueError.</p>
          </div>
        </div>
      </section>

      {/* 16. LinAlg & Matrix Math */}
      <section id="sec-linalg" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">16</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              16 // Linear Algebra
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Linear Algebra & LAPACK Solvers
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              High-throughput matrix dot products (@), inversions, LU linear solvers, and norms.
            </p>
          </div>
        </div>

        <CodeSnippet
          title="BLAS & LAPACK Routines"
          code={`# Matrix dot product
dot_prod = A @ B  # or np.matmul(A, B)

# Linear System Solver: Ax = b (Prefer solve over inv!)
x = np.linalg.solve(A, b)

# Frobenius Norm
norm_val = np.linalg.norm(A)`}
        />
      </section>

      {/* 17. Operations Lab & Q&A */}
      <section id="sec-ops-lab" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">17</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              17 // Interactive Matrix Lab
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Operations Lab & Matrix Sandbox
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Step-by-step visual calculations of matrix math, broadcasting, and decompositions.
            </p>
          </div>
        </div>

        <MatrixOpsLab />
      </section>
    </div>
  );
}
