'use client';

import React, { useState } from 'react';
import NoteCallout from '@/components/common/NoteCallout';

export default function Section14TokenizationFundamentals() {
  const [selectedExample, setSelectedExample] = useState<number>(0);

  const sampleSentences = [
    {
      text: 'Tokenization is fascinating!',
      charTokens: ['T', 'o', 'k', 'e', 'n', 'i', 'z', 'a', 't', 'i', 'o', 'n', ' ', 'i', 's', ' ', 'f', 'a', 's', 'c', 'i', 'n', 'a', 't', 'i', 'n', 'g', '!'],
      wordTokens: ['Tokenization', 'is', 'fascinating!'],
      subwordTokens: ['Token', 'ization', ' is', ' fascinating', '!'],
    },
    {
      text: 'def calculate_loss(y_true, y_pred):',
      charTokens: ['d', 'e', 'f', ' ', 'c', 'a', 'l', 'c', 'u', 'l', 'a', 't', 'e', '_', 'l', 'o', 's', 's', '(', 'y', '_', 't', 'r', 'u', 'e', ',', ' ', 'y', '_', 'p', 'r', 'e', 'd', ')', ':'],
      wordTokens: ['def', 'calculate_loss(y_true,', 'y_pred):'],
      subwordTokens: ['def', ' calculate', '_loss', '(', 'y', '_true', ',', ' y', '_pred', '):'],
    },
    {
      text: 'Transformers understand multilingual text.',
      charTokens: ['T', 'r', 'a', 'n', 's', 'f', 'o', 'r', 'm', 'e', 'r', 's', '...'],
      wordTokens: ['Transformers', 'understand', 'multilingual', 'text.'],
      subwordTokens: ['Transform', 'ers', ' understand', ' multi', 'lingual', ' text', '.'],
    },
  ];

  const current = sampleSentences[selectedExample];

  return (
    <section id="sec-tokenization-fundamentals" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">04</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            14.4 // Tokenization Engine
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Fundamentals of Tokenization in NLP
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            Bridging raw human strings and mathematical tensors: Characters, Words, Subwords, and Byte-Pair Encoding.
          </p>
        </div>
      </div>

      {/* Conceptual Overview */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
          Why Can&apos;t Models Just Read Raw Letters?
        </h3>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          Neural networks are giant linear algebra calculators. They cannot process ASCII characters or Unicode strings directly. Every piece of text must first be chopped into atomic chunks called <strong>Tokens</strong>, and then mapped to unique integer indices known as <strong>Token IDs</strong>.
        </p>

        {/* The 3 Eras of Tokenization */}
        <div className="grid md:grid-cols-3 gap-4 pt-2">
          {/* Char Level */}
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
            <div className="font-mono text-xs font-bold text-zinc-800">
              01. Character-Level
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Splits text into individual letters: <code className="code-inline">c</code>, <code className="code-inline">a</code>, <code className="code-inline">t</code>.
            </p>
            <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-200">
              <strong className="text-emerald-700">Pros:</strong> Tiny vocab (~256 bytes).<br />
              <strong className="text-rose-700">Cons:</strong> Sequences are 5-10x longer! Model wastes compute learning spelling rules.
            </div>
          </div>

          {/* Word Level */}
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
            <div className="font-mono text-xs font-bold text-zinc-800">
              02. Word-Level
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Splits strictly on whitespace: <code className="code-inline">unbelievable</code>.
            </p>
            <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-200">
              <strong className="text-emerald-700">Pros:</strong> Short sequence lengths.<br />
              <strong className="text-rose-700">Cons:</strong> Vocab explodes to 1,000,000+ words. Fails on typos or rare compound words with [UNK] error.
            </div>
          </div>

          {/* Subword Level */}
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
            <div className="font-mono text-xs font-bold text-purple-900">
              03. Subword-Level (Standard)
            </div>
            <p className="text-xs text-purple-950 leading-relaxed">
              Splits into frequent morphological subwords: <code className="code-inline">un</code>, <code className="code-inline">believ</code>, <code className="code-inline">able</code>.
            </p>
            <div className="text-[11px] text-purple-900 pt-1 border-t border-purple-200">
              <strong className="text-purple-800">The Sweet Spot:</strong> Compact vocab (32k–100k). Common words stay whole; rare words split gracefully. Zero Out-of-Vocabulary errors!
            </div>
          </div>
        </div>

        <NoteCallout
          type="tip"
          title="Byte-Level BPE (Used in GPT-4 & LLaMA-3)"
          text="Modern tokenizers (like OpenAI's tiktoken and Meta's LLaMA tokenizer) operate directly on UTF-8 bytes rather than characters. Because there are only 256 unique bytes, ANY string in any human language, emoji, or corrupted binary file can be represented with zero out-of-vocabulary fallback!"
        />
      </div>

      {/* Interactive Tokenization Strategy Visualizer */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100/70 px-2.5 py-0.5 rounded-full mb-1">
              <span>🔤</span>
              <span>Interactive Token Decomposition</span>
            </div>
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              Comparing Tokenization Granularities
            </h4>
          </div>

          {/* Example selector tabs */}
          <div className="flex gap-1.5">
            {sampleSentences.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedExample(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  selectedExample === idx
                    ? 'bg-purple-700 text-white font-bold'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                Sample 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Target Sentence Banner */}
        <div className="p-3 bg-zinc-900 rounded-xl text-zinc-200 font-mono text-xs flex items-center justify-between">
          <span>Target Text: <strong className="text-[#fbbf24]">&quot;{current.text}&quot;</strong></span>
          <span className="text-[10px] text-zinc-400 font-sans">{current.text.length} characters</span>
        </div>

        {/* Side-by-Side comparison cards */}
        <div className="space-y-4">
          {/* 1. Character Level */}
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-800">
                1. Character-Level Tokenizer
              </span>
              <span className="font-mono text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                {current.charTokens.length} Tokens (Massive Sequence Length)
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {current.charTokens.map((c, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] bg-white border border-zinc-300 px-1.5 py-0.5 rounded text-zinc-700"
                >
                  {c === ' ' ? '␣' : c}
                </span>
              ))}
            </div>
          </div>

          {/* 2. Word Level */}
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-800">
                2. Word-Level Tokenizer
              </span>
              <span className="font-mono text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {current.wordTokens.length} Tokens (Vocab Explosion Hazard)
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {current.wordTokens.map((w, i) => (
                <span
                  key={i}
                  className="font-mono text-xs bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-md text-amber-900 font-medium"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Subword (BPE) */}
          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-purple-900">
                3. Subword Byte-Pair Encoding (GPT/LLaMA Standard)
              </span>
              <span className="font-mono text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                {current.subwordTokens.length} Tokens (Optimal Compression Ratio: {(current.text.length / current.subwordTokens.length).toFixed(1)} chars/token)
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {current.subwordTokens.map((sw, i) => (
                <span
                  key={i}
                  className="font-mono text-xs bg-purple-700 text-white px-3 py-1 rounded-lg shadow-xs flex items-center space-x-1"
                >
                  <span>{sw}</span>
                  <span className="text-[9px] text-purple-200 font-normal">#{i + 1}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
