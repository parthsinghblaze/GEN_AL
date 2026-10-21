'use client';

import QuizCard, { QuizQuestionProps } from '@/components/common/QuizCard';

export default function PandasQuiz() {
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
    {
      id: 4,
      category: 'Selection Data Types',
      question: "What is the difference between df['Salary'] and df[['Salary']]?",
      options: [
        { id: 'A', text: "df['Salary'] returns a 1D pd.Series; df[['Salary']] returns a 2D pd.DataFrame.", isCorrect: true },
        { id: 'B', text: 'They are identical and return the same type.', isCorrect: false },
        { id: 'C', text: "df['Salary'] makes a copy; df[['Salary']] returns a view.", isCorrect: false },
        { id: 'D', text: 'Single brackets sort the column ascendingly.', isCorrect: false },
      ],
      correctExplanation: 'Single string key extracts a 1D Series of shape (N,). A list of strings (even with 1 item) extracts a 2D DataFrame of shape (N, 1).',
      wrongExplanation: 'Single bracket returns a Series (1D); double brackets return a DataFrame (2D).',
    },
  ];

  return (
    <section id="sec-quiz" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#b45309]">
          Module 07 • Self Assessment
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          7. Pandas Architecture & Slicing Mastery Quiz
        </h2>
      </div>

      <div className="space-y-4">
        {questions.map((q) => (
          <QuizCard key={q.id} {...q} />
        ))}
      </div>
    </section>
  );
}
