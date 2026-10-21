'use client';

import { useState } from 'react';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestionProps {
  id: number | string;
  category: string;
  question: string;
  options: QuizOption[];
  correctExplanation: string;
  wrongExplanation: string;
}

export default function QuizCard({
  id,
  category,
  question,
  options,
  correctExplanation,
  wrongExplanation,
}: QuizQuestionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    setSelectedId(optionId);
  };

  const selectedOption = options.find((opt) => opt.id === selectedId);
  const isAnswered = selectedId !== null;
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className="card-paper rounded-xl p-6 border border-[#e2ddd6] shadow-sm mb-6 transition-all hover:shadow-md">
      {/* Category Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] tracking-widest uppercase bg-[#18181b] text-[#fbbf24] px-2.5 py-1 rounded font-semibold">
          Question {id} • {category}
        </span>
        {isAnswered && (
          <span
            className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-full ${
              isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}
          >
            {isCorrect ? '✓ Correct' : '✗ Needs Review'}
          </span>
        )}
      </div>

      {/* Question Text */}
      <h4 className="font-editorial text-lg font-bold text-[#1c1917] mb-4 leading-snug">
        {question}
      </h4>

      {/* Options */}
      <div className="space-y-2.5 mb-4">
        {options.map((option) => {
          let optionStyles = 'border-[#e2ddd6] bg-[#fdfbf8] text-[#27272a] hover:border-[#fbbf24] hover:bg-amber-50/50';

          if (isAnswered) {
            if (option.isCorrect) {
              optionStyles = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
            } else if (option.id === selectedId && !option.isCorrect) {
              optionStyles = 'border-rose-500 bg-rose-50 text-rose-950 ring-1 ring-rose-500';
            } else {
              optionStyles = 'border-[#e2ddd6] opacity-60 bg-zinc-50';
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={isAnswered}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-sans flex items-start space-x-3 transition-all cursor-pointer disabled:cursor-default ${optionStyles}`}
            >
              <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-black/5 text-[#71717a] mt-0.5">
                {option.id}
              </span>
              <span className="flex-1 leading-relaxed">{option.text}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation Feedback */}
      {isAnswered && (
        <div
          className={`p-4 rounded-lg text-xs font-sans leading-relaxed border ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="font-mono font-bold uppercase tracking-wider mb-1">
            {isCorrect ? '💡 Why this is correct:' : '🔍 Architectural Insight:'}
          </div>
          <p>{isCorrect ? correctExplanation : wrongExplanation}</p>
        </div>
      )}
    </div>
  );
}
