'use client';

import { useState } from 'react';
import QuizCard, { QuizQuestionProps } from '@/components/common/QuizCard';
import CodeSnippet from '@/components/common/CodeSnippet';

export default function Module6Labs() {
  const [benchOp, setBenchOp] = useState<'add' | 'mult' | 'sum' | 'filter'>('add');
  const [openChallengeId, setOpenChallengeId] = useState<string | null>(null);

  const benchData = {
    add: { py: '112.4 ms', np: '1.42 ms', ratio: '79x Faster!', note: 'SIMD AVX-512 hardware vectorization.' },
    mult: { py: '98.6 ms', np: '1.18 ms', ratio: '83x Faster!', note: 'Direct CPU floating point registers.' },
    sum: { py: '42.1 ms', np: '0.64 ms', ratio: '65x Faster!', note: 'Low-level contiguous cache line reduction.' },
    filter: { py: '135.2 ms', np: '2.10 ms', ratio: '64x Faster!', note: 'Bitmask vectorization in C memory.' },
  };

  const questions: QuizQuestionProps[] = [
    {
      id: 1,
      category: 'Memory Management',
      question: 'What is the critical difference between ravel() and flatten()?',
      options: [
        { id: 'A', text: 'ravel() always makes a physical copy; flatten() returns a memory view.', isCorrect: false },
        { id: 'B', text: 'ravel() returns a memory view sharing the underlying buffer; flatten() always allocates a new physical copy.', isCorrect: true },
        { id: 'C', text: 'ravel() only works on 2D arrays.', isCorrect: false },
        { id: 'D', text: 'They are identical.', isCorrect: false },
      ],
      correctExplanation: 'ravel() creates a zero-copy 1D view sharing the memory buffer, while flatten() forces a full memory buffer copy.',
      wrongExplanation: 'ravel() returns a memory view, while flatten() allocates a fresh copy in RAM.',
    },
    {
      id: 2,
      category: 'Broadcasting Alignment',
      question: 'Array A has shape (4, 1, 8) and Array B has shape (3, 8). What is the resulting shape of A + B?',
      options: [
        { id: 'A', text: 'ValueError: Operands cannot be broadcast', isCorrect: false },
        { id: 'B', text: 'Shape (4, 3, 8)', isCorrect: true },
        { id: 'C', text: 'Shape (4, 3, 16)', isCorrect: false },
        { id: 'D', text: 'Shape (12, 8)', isCorrect: false },
      ],
      correctExplanation: 'B shape (3, 8) prepends 1 -> (1, 3, 8). Trailing dim 8 matches 8; dim 1 stretches to 3; leading dim 1 stretches to 4 -> (4, 3, 8).',
      wrongExplanation: 'Trailing dimensions match and singleton dimensions stretch to produce (4, 3, 8).',
    },
  ];

  const roadmapPhases = [
    { phase: 'Phase 01', title: 'Foundations & ndarray', desc: 'C-buffers, Strides, Dtypes, Pointer memory' },
    { phase: 'Phase 02', title: 'Indexing & Slicing', desc: 'Views vs copies, Strided steps, Boolean masks' },
    { phase: 'Phase 03', title: 'Broadcasting & Math', desc: 'Trailing dimensions, Vectorization, ufuncs' },
    { phase: 'Phase 04', title: 'Linear Algebra & BLAS', desc: 'Matrix multiplication, LU solve, SVD, Norms' },
    { phase: 'Phase 05', title: 'Deep Learning Bridge', desc: 'Zero-copy PyTorch/JAX DMA, Tensor memory' },
  ];

  return (
    <div className="space-y-16 mb-20">
      {/* Group Title Banner */}
      <div className="border-b-2 border-[#1c1917] pb-3 pt-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-[#18181b] text-[#fbbf24] px-3 py-1 rounded">
          06 // Labs & Exercises
        </span>
      </div>

      {/* 18. Speed Benchmark */}
      <section id="sec-playground" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">18</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              18 // Hardware Benchmarks
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Speed Benchmark & SIMD Simulator
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Compare execution speed across 1,000,000 elements in Python vs NumPy.
            </p>
          </div>
        </div>

        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-mono font-bold text-[#71717a]">Benchmark Operation:</label>
            <select
              value={benchOp}
              onChange={(e) => setBenchOp(e.target.value as any)}
              className="font-mono text-xs p-1.5 rounded border border-[#e2ddd6] bg-white font-semibold"
            >
              <option value="add">Element-wise Addition</option>
              <option value="mult">Element-wise Multiplication</option>
              <option value="sum">Sum Reduction</option>
              <option value="filter">Boolean Mask Filtering</option>
            </select>
          </div>

          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex justify-between items-center">
            <span className="font-editorial text-2xl font-black text-emerald-800">
              {benchData[benchOp].ratio}
            </span>
            <span className="text-xs text-emerald-900 font-mono">
              {benchData[benchOp].note}
            </span>
          </div>
        </div>
      </section>

      {/* 19. Knowledge Quiz */}
      <section id="sec-quiz" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">19</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              19 // Self Assessment
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Knowledge Mastery Quiz
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Test your understanding of memory views, axis collapse, and broadcasting.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((q) => (
            <QuizCard key={q.id} {...q} />
          ))}
        </div>
      </section>

      {/* 20. Problem Bank & Applied ML */}
      <section id="sec-exercises" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">20</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              20 // Applied Challenges
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Problem Bank & Machine Learning Labs
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Feature standardization (Z-score), pairwise Euclidean distance, and one-hot encoding.
            </p>
          </div>
        </div>

        <div className="card-paper p-6 rounded-xl border border-[#e2ddd6] space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">Z-Score Normalization ((X - mu) / sigma)</h4>
            <button
              onClick={() => setOpenChallengeId(openChallengeId === 'zscore' ? null : 'zscore')}
              className="font-mono text-xs font-bold px-3 py-1 rounded bg-zinc-100 border border-zinc-300"
            >
              {openChallengeId === 'zscore' ? '▲ Hide Code' : '💡 Reveal Code'}
            </button>
          </div>
          {openChallengeId === 'zscore' && (
            <CodeSnippet
              title="Vectorized Z-Score Normalization"
              code={`mu = X.mean(axis=0)
sigma = X.std(axis=0)
X_norm = (X - mu) / sigma  # Broadcasting: (N, D) - (D,)`}
            />
          )}
        </div>
      </section>

      {/* 21. Topic Roadmap */}
      <section id="sec-roadmap" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">21</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              21 // Topic Syllabus
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Complete NumPy Roadmap
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              5 progression phases to mastery of numerical computing in Python.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-3 font-mono text-xs">
          {roadmapPhases.map((r, i) => (
            <div key={i} className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-2">
              <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded">
                {r.phase}
              </span>
              <div className="font-bold text-[#1c1917]">{r.title}</div>
              <div className="text-[11px] text-[#71717a] font-sans">{r.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
