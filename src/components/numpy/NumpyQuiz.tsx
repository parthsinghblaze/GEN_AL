'use client';

import QuizCard, { QuizQuestionProps } from '@/components/common/QuizCard';

export default function NumpyQuiz() {
  const questions: QuizQuestionProps[] = [
    {
      id: 1,
      category: 'Memory Management',
      question: 'What is the critical architectural difference between ravel() and flatten()?',
      options: [
        { id: 'A', text: 'ravel() always makes a physical copy; flatten() returns a memory view.', isCorrect: false },
        { id: 'B', text: 'ravel() returns a memory view sharing the underlying buffer whenever possible; flatten() always allocates a new physical copy.', isCorrect: true },
        { id: 'C', text: 'ravel() only works on 2D arrays; flatten() works on N-dimensional arrays.', isCorrect: false },
        { id: 'D', text: 'There is no difference; they are exact aliases.', isCorrect: false },
      ],
      correctExplanation: 'ravel() creates a zero-copy 1D view sharing the memory buffer whenever contiguous, whereas flatten() always allocates a separate array in RAM.',
      wrongExplanation: 'ravel() is optimized for zero-copy memory views, while flatten() forces a full memory buffer copy.',
    },
    {
      id: 2,
      category: 'Axis Reductions',
      question: 'When executing arr.sum(axis=0) on a 2D array of shape (4, 6), what does axis=0 do?',
      options: [
        { id: 'A', text: 'Sums across each row, producing a vector of shape (4,)', isCorrect: false },
        { id: 'B', text: 'Collapses the row dimension (axis 0), performing calculations down each column, producing shape (6,)', isCorrect: true },
        { id: 'C', text: 'Flattens the matrix and sums all 24 numbers into a scalar', isCorrect: false },
        { id: 'D', text: 'Calculates the cumulative sum along the diagonal', isCorrect: false },
      ],
      correctExplanation: 'axis=0 collapses the 0th dimension (rows), summing values vertically down each column to yield shape (6,).',
      wrongExplanation: 'axis=0 collapses the row dimension (axis 0) to produce column-wise sums.',
    },
    {
      id: 3,
      category: 'Reshaping Rules',
      question: 'Given an array arr with shape (2, 3, 4), which reshape operation will raise a ValueError?',
      options: [
        { id: 'A', text: 'arr.reshape(4, 6)', isCorrect: false },
        { id: 'B', text: 'arr.reshape(-1, 8)', isCorrect: false },
        { id: 'C', text: 'arr.reshape(5, 5)', isCorrect: true },
        { id: 'D', text: 'arr.reshape(24)', isCorrect: false },
      ],
      correctExplanation: 'Total element count must match exactly: 2 × 3 × 4 = 24 elements. 5 × 5 = 25 elements, causing a shape mismatch ValueError!',
      wrongExplanation: 'Total number of elements must remain invariant (24 elements). 5 × 5 = 25 != 24.',
    },
    {
      id: 4,
      category: 'Slicing & Memory Views',
      question: 'What happens when modifying a sub-slice: sub = arr[1:3, 1:4]; sub[0, 0] = 999?',
      options: [
        { id: 'A', text: 'Only sub changes; arr remains unchanged because slicing makes a copy.', isCorrect: false },
        { id: 'B', text: 'Both sub and the parent arr are modified, because basic slicing returns a memory view sharing the underlying raw buffer.', isCorrect: true },
        { id: 'C', text: 'NumPy raises a ReadOnlyError.', isCorrect: false },
        { id: 'D', text: 'Python spawns a background thread to synchronize values.', isCorrect: false },
      ],
      correctExplanation: 'Standard basic slicing returns a memory view pointing directly to the parent buffer, modifying the parent array in-place.',
      wrongExplanation: 'Basic slicing produces zero-copy views. Changes reflect immediately in the original array.',
    },
    {
      id: 5,
      category: 'Boolean Indexing',
      question: 'Why does writing arr[arr > 5 and arr < 20] cause a ValueError in Python?',
      options: [
        { id: 'A', text: 'Python "and" evaluates the truth value of the whole array as a single boolean (ambiguous). You must write (arr > 5) & (arr < 20).', isCorrect: true },
        { id: 'B', text: 'NumPy does not support multiple conditions.', isCorrect: false },
        { id: 'C', text: 'Integers cannot be compared with floats.', isCorrect: false },
        { id: 'D', text: 'The array must be sorted first.', isCorrect: false },
      ],
      correctExplanation: 'Standard Python "and" / "or" invoke bool(arr) which is ambiguous. Always use element-wise bitwise & / | with parenthesized sub-expressions.',
      wrongExplanation: 'Use bitwise operators (&, |, ~) with parentheses for element-wise boolean indexing.',
    },
    {
      id: 6,
      category: 'Broadcasting Alignment',
      question: 'Array A has shape (4, 1, 8) and Array B has shape (3, 8). What is the resulting shape of A + B?',
      options: [
        { id: 'A', text: 'ValueError: Operands cannot be broadcast', isCorrect: false },
        { id: 'B', text: 'Shape (4, 3, 8)', isCorrect: true },
        { id: 'C', text: 'Shape (4, 3, 16)', isCorrect: false },
        { id: 'D', text: 'Shape (12, 8)', isCorrect: false },
      ],
      correctExplanation: 'B shape (3, 8) prepends 1 -> (1, 3, 8). Trailing dim 8 matches 8; dim 1 stretches to 3; leading dim 1 stretches to 4 -> (4, 3, 8).',
      wrongExplanation: 'Dimensions are aligned from right to left with 1s expanding to match larger dimensions.',
    },
  ];

  return (
    <section id="sec-quiz" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#1d4ed8]">
          Module 08 • Self Assessment
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          8. Architectural & Mathematical Mastery Quiz
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
