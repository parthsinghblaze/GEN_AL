'use client';

import QuizCard, { QuizQuestionProps } from '@/components/common/QuizCard';

export default function Module5Checkpoints() {
  const questions: QuizQuestionProps[] = [
    {
      id: 1,
      category: 'Indexing Semantics',
      question: 'What is the crucial boundary difference between .loc[0:3] and .iloc[0:3]?',
      options: [
        { id: 'A', text: '.loc is inclusive of endpoint 3; .iloc is exclusive (stops at index 2).', isCorrect: true },
        { id: 'B', text: '.loc is exclusive; .iloc is inclusive.', isCorrect: false },
        { id: 'C', text: 'Both are always exclusive.', isCorrect: false },
        { id: 'D', text: '.loc only accepts column names, not row slices.', isCorrect: false },
      ],
      correctExplanation: '.loc operates on explicit labels and is strictly INCLUSIVE of the stop boundary. .iloc operates on positional integers and is EXCLUSIVE (like standard Python slice notation).',
      wrongExplanation: '.loc is label-inclusive, whereas .iloc follows Python 0-based exclusive slice semantics.',
    },
    {
      id: 2,
      category: 'Data Alignment',
      question: 'When adding two Series s1 + s2 with non-identical index labels, what happens to keys present in only one Series?',
      options: [
        { id: 'A', text: 'Pandas raises a KeyAlignmentError.', isCorrect: false },
        { id: 'B', text: 'Unmatched keys result in NaN (missing value) in the output Series.', isCorrect: true },
        { id: 'C', text: 'Missing keys are automatically treated as 0 without explicitly calling add(fill_value=0).', isCorrect: false },
        { id: 'D', text: 'The missing keys are dropped from the resulting Series.', isCorrect: false },
      ],
      correctExplanation: 'Standard arithmetic (+, -, *, /) performs an outer label union. Any key missing in either operand defaults to NaN to prevent accidental misalignment bugs.',
      wrongExplanation: 'Pandas protects calculations by marking missing keys as NaN in union alignment.',
    },
    {
      id: 3,
      category: 'Memory & Architecture',
      question: 'Why does Pandas 2.0+ introduce the Apache Arrow backend (e.g., string[pyarrow])?',
      options: [
        { id: 'A', text: 'It completely eliminates Python functions.', isCorrect: false },
        { id: 'B', text: 'It stores text in contiguous memory with validity null bitmaps, slashing memory usage by up to 70% and eliminating object pointer bloat.', isCorrect: true },
        { id: 'C', text: 'It converts all DataFrames into SQL tables.', isCorrect: false },
        { id: 'D', text: 'It requires GPU acceleration.', isCorrect: false },
      ],
      correctExplanation: 'PyArrow provides contiguous columnar layout with zero-copy interoperability and first-class <NA> support, avoiding expensive PyObject pointer wrappers.',
      wrongExplanation: 'PyArrow provides compact columnar memory buffers for strings and nullable primitives.',
    },
  ];

  const roadmapPhases = [
    { phase: 'Phase 01', title: 'Foundations & 1D Series', topics: 'Anatomy, Dtypes, Indexing, Vectorization' },
    { phase: 'Phase 02', title: '2D DataFrame Operations', topics: 'Column assignment, .loc vs .iloc, Boolean masking' },
    { phase: 'Phase 03', title: 'Data Cleaning & Preprocessing', topics: 'Missing value imputation, String methods, Outliers' },
    { phase: 'Phase 04', title: 'Advanced Aggregations & Joins', topics: 'Groupby, Pivot tables, Merge, Concat, Time Series' },
    { phase: 'Phase 05', title: 'Production ML Feature Pipelines', topics: 'PyArrow, Method chaining, Parquet, Scikit-Learn export' },
  ];

  return (
    <div className="space-y-16 mb-20">
      {/* Group Title Banner */}
      <div className="border-b-2 border-[#1c1917] pb-3 pt-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-[#18181b] text-[#fbbf24] px-3 py-1 rounded">
          05 // Checkpoints & Syllabus
        </span>
      </div>

      {/* 23. Knowledge Flashcards & Quiz */}
      <section id="sec-quiz" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">23</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              23 // Checkpoints
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Knowledge Flashcards & Quiz
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Verify your architectural understanding of DataFrame indexing, Series alignment, and Arrow memory.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((q) => (
            <QuizCard key={q.id} {...q} />
          ))}
        </div>
      </section>

      {/* 24. Complete Pandas Roadmap */}
      <section id="sec-roadmap" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#b45309]">24</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              24 // Mastery Syllabus
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Complete Pandas Roadmap
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              5 progressive stages from basic tabular structures to enterprise production feature stores.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-3 font-mono text-xs">
          {roadmapPhases.map((r, i) => (
            <div key={i} className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-2">
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                {r.phase}
              </span>
              <div className="font-bold text-[#1c1917]">{r.title}</div>
              <div className="text-[11px] text-[#71717a] font-sans">{r.topics}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
