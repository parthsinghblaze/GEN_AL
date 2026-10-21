'use client';

import React, { useState } from 'react';
import QuizCard, { QuizOption } from '@/components/common/QuizCard';

export default function Section14CheckpointsQuiz() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'flashcards'>('quiz');

  const quizQuestions = [
    {
      id: 'Q1',
      category: 'GPT Decoder Architecture',
      question: 'In the GPT forward pass, what prevents token #4 from peeking at future token #5?',
      options: [
        { id: 'opt1', text: 'A recurrent hidden state loop like an LSTM', isCorrect: false },
        { id: 'opt2', text: 'A causal mask matrix setting upper-triangular attention logits to -infinity before Softmax', isCorrect: true },
        { id: 'opt3', text: 'Lowering the Temperature parameter to 0.0', isCorrect: false },
        { id: 'opt4', text: 'Discarding the positional encoding matrix', isCorrect: false },
      ],
      correctExplanation: 'Correct! The causal mask sets attention logits for all future positions to -infinity. Because softmax(-inf) = 0.0, the attention probability for future tokens is mathematically zero, preventing future information leakage.',
      wrongExplanation: 'Incorrect. Remember that GPT is non-recurrent. Future tokens are masked out by adding -infinity to upper-triangular logits before the Softmax operation.',
    },
    {
      id: 'Q2',
      category: 'Inference & Sampling Dynamics',
      question: 'Why does increasing the Temperature parameter (e.g. from 0.2 to 1.4) make an LLM generate more creative words?',
      options: [
        { id: 'opt1', text: 'It increases GPU clock frequency to calculate extra parameters', isCorrect: false },
        { id: 'opt2', text: 'It divides logits by T, flattening the probability curve and giving lower-ranked tokens higher odds of selection', isCorrect: true },
        { id: 'opt3', text: 'It switches the subword tokenizer from BPE to character-level', isCorrect: false },
        { id: 'opt4', text: 'It removes all residual skip connections from the transformer blocks', isCorrect: false },
      ],
      correctExplanation: 'Correct! Temperature divides raw logits (z / T) before Softmax. When T > 1.0, the numerical gap between top and lower logits shrinks, flattening the distribution so diverse candidate words are sampled.',
      wrongExplanation: 'Incorrect. Temperature is purely a mathematical logit scaling factor: softmax(z / T). Higher values flatten the distribution curve.',
    },
    {
      id: 'Q3',
      category: 'Attention Mechanism',
      question: 'What is the primary advantage of Multi-Head Attention over Single-Head Attention?',
      options: [
        { id: 'opt1', text: 'It uses 50% less GPU memory than a single large head', isCorrect: false },
        { id: 'opt2', text: 'It allows the model to simultaneously attend to information from different representation subspaces (syntax, coreference, modifiers)', isCorrect: true },
        { id: 'opt3', text: 'It eliminates the need for tokenization vocabularies', isCorrect: false },
        { id: 'opt4', text: 'It converts the model into an encoder-only classifier like BERT', isCorrect: false },
      ],
      correctExplanation: 'Correct! Single-head attention averages different linguistic relationships together into one blur. Multi-head attention projects Queries, Keys, and Values into distinct subspaces, allowing Head 1 to track pronouns, Head 2 to track verbs, and Head 3 to track adjectives simultaneously.',
      wrongExplanation: 'Incorrect. Multiple heads allow the network to simultaneously focus on multiple distinct types of relationships without averaging them together.',
    },
  ];

  const flashcards = [
    {
      q: 'Why does GPT use a Decoder-Only architecture instead of Encoder-Decoder?',
      a: 'Because open-ended generation is autoregressive. By enforcing causal masking (only attending to prior tokens), the entire internet can be trained as an unsupervised next-token prediction stream without needing labeled pairs.',
    },
    {
      q: 'Why did BPE (Byte-Pair Encoding) replace word-level and character-level tokenization?',
      a: 'It hits the Goldilocks zone: avoiding the sequence-length explosion of character tokenization while preventing the vocabulary explosion and Out-Of-Vocabulary (OOV) errors of word tokenization.',
    },
    {
      q: 'Why is Positional Encoding strictly mandatory in Transformers?',
      a: 'Because the Self-Attention formula QK^T is permutation-invariant. Without positional encoding, "The dog bit the man" and "The man bit the dog" produce the exact same attention outputs.',
    },
    {
      q: 'What catastrophic failure happens if you remove 1/√d_k from scaled dot-product attention?',
      a: 'When d_k is large, dot products become huge numbers. Softmax on large numbers saturates near 0 or 1 with microscopic gradients, completely freezing model training.',
    },
  ];

  return (
    <section id="sec-genai-quiz" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">10</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            14.10 // Knowledge Verification
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Section 14 Knowledge Checkpoint & Flashcards
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            Test your mastery of LLMs, GPT decoders, BPE tokenization, vector hyperspace, and multi-head attention.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-[#e2ddd6] pb-3">
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'quiz'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          📝 Interactive Quiz (3 Questions)
        </button>
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'flashcards'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          💡 Architecture Flashcards (4 Cards)
        </button>
      </div>

      {/* Quiz Tab */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          {quizQuestions.map((q) => (
            <QuizCard
              key={q.id}
              id={q.id}
              category={q.category}
              question={q.question}
              options={q.options}
              correctExplanation={q.correctExplanation}
              wrongExplanation={q.wrongExplanation}
            />
          ))}
        </div>
      )}

      {/* Flashcards Tab */}
      {activeTab === 'flashcards' && (
        <div className="grid sm:grid-cols-2 gap-4">
          {flashcards.map((f, idx) => (
            <div key={idx} className="card-paper p-5 rounded-2xl border border-[#e2ddd6] space-y-3">
              <div className="font-mono text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded w-max border border-purple-200">
                Flashcard 0{idx + 1}
              </div>
              <div className="font-editorial text-base font-bold text-zinc-900">
                {f.q}
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed pt-1 border-t border-zinc-100">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
