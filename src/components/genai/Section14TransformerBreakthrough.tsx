'use client';

import React, { useState } from 'react';
import NoteCallout from '@/components/common/NoteCallout';

export default function Section14TransformerBreakthrough() {
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [rnnStep, setRnnStep] = useState<number>(0);
  const [transformerActive, setTransformerActive] = useState<boolean>(false);

  const tokens = ['The', 'Transformer', 'architecture', 'revolutionized', 'deep-learning'];

  const handleSimulate = () => {
    setIsSimulating(true);
    setRnnStep(0);
    setTransformerActive(false);

    // Transformer fires all tokens at once almost immediately
    setTimeout(() => {
      setTransformerActive(true);
    }, 300);

    // RNN steps sequentially 1 by 1
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setRnnStep(step);
      if (step >= tokens.length) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 600);
  };

  return (
    <section id="sec-transformer-breakthrough" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">06</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            14.6 // Historical Breakthrough
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            The Transformer Breakthrough: Google Paper on Attention
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            Vaswani et al. (2017) &quot;Attention Is All You Need&quot;: The demise of recurrence and the birth of parallel attention.
          </p>
        </div>
      </div>

      {/* Conceptual Explanation in Simple Terms */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917] flex items-center space-x-2">
          <span>📜</span>
          <span>The Death of Recurrent Networks (RNNs)</span>
        </h3>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          Before June 2017, natural language processing was dominated by <strong>Recurrent Neural Networks (RNNs)</strong> and <strong>LSTMs</strong>. An RNN processed a sentence like a human reading letter-by-letter: to understand word #50, it had to compress words #1 through #49 into a single hidden vector $h_{49}$.
        </p>

        {/* 3 Critical Bottlenecks of RNNs */}
        <div className="grid md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
            <div className="font-mono text-xs font-bold text-rose-900 mb-1">
              1. The Sequential Wall
            </div>
            <p className="text-xs text-rose-950 leading-relaxed">
              Word $t$ cannot be computed until word $t-1$ finishes. GPUs have 10,000 parallel tensor cores, but RNNs forced them to run in single-file sequential lockstep!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="font-mono text-xs font-bold text-amber-900 mb-1">
              2. Catastrophic Forgetting
            </div>
            <p className="text-xs text-amber-950 leading-relaxed">
              Information passed through a chain of 100 tanh/sigmoid gates suffers from vanishing gradients. Early subjects were forgotten by the end of long paragraphs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="font-mono text-xs font-bold text-emerald-900 mb-1">
              3. The O(1) Solution
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed">
              Transformers discard recurrence completely! Every token establishes a direct mathematical line of sight to every other token in a single matrix multiplication.
            </p>
          </div>
        </div>

        <NoteCallout
          type="info"
          title="Vaswani et al. 2017: Why 'Attention Is All You Need'?"
          text="The paper title was literal: researchers previously assumed attention was just an optional add-on for RNNs. The Google team proved that self-attention ALONE, without any recurrence or convolution, is superior in accuracy, 100x faster to train on GPUs, and scales to infinite compute."
        />
      </div>

      {/* Interactive Simulation: RNN Sequential vs Transformer Parallel */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100/70 px-2.5 py-0.5 rounded-full mb-1">
              <span>🏎️</span>
              <span>Interactive Parallelization Arena</span>
            </div>
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              RNN Sequential Bottleneck vs. Transformer GPU Parallelism
            </h4>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-700 text-white font-mono text-xs font-bold shadow hover:bg-purple-800 disabled:opacity-50 transition-all self-start sm:self-auto"
          >
            <span>▶ Simulate Forward Pass</span>
          </button>
        </div>

        {/* Comparison Arena Lanes */}
        <div className="space-y-6">
          {/* Lane 1: RNN */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Legacy Architecture: Recurrent Neural Network (RNN / LSTM)
                </span>
              </div>
              <span className="font-mono text-[11px] text-rose-400 font-bold">
                Time Complexity: O(N) Sequential Steps
              </span>
            </div>

            <p className="text-xs text-zinc-400">
              Each cell must wait for the previous hidden state vector h_(t-1). GPU tensor cores sit largely idle.
            </p>

            <div className="grid grid-cols-5 gap-2 pt-2">
              {tokens.map((tok, idx) => {
                const isCompleted = rnnStep > idx;
                const isCurrent = rnnStep === idx;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                      isCurrent
                        ? 'bg-rose-900/60 border-rose-500 text-white scale-105 shadow-md shadow-rose-900/50'
                        : isCompleted
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-300'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-600'
                    }`}
                  >
                    <div className="font-mono text-[9px] uppercase text-zinc-400 mb-1">
                      Step {idx + 1}
                    </div>
                    <div className="font-mono text-xs font-bold truncate">{tok}</div>
                    <div className="mt-2 text-[9px] font-mono">
                      {isCurrent ? '⚡ Computing...' : isCompleted ? '✓ h_t computed' : 'Waiting...'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lane 2: Transformer */}
          <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Modern Architecture: Transformer Self-Attention (Vaswani 2017)
                </span>
              </div>
              <span className="font-mono text-[11px] text-emerald-400 font-bold">
                Time Complexity: O(1) Fully Parallel Step
              </span>
            </div>

            <p className="text-xs text-purple-200">
              All tokens matrix-multiply simultaneously across GPU cores. Every token attends directly to all other tokens.
            </p>

            <div className="grid grid-cols-5 gap-2 pt-2">
              {tokens.map((tok, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-center transition-all duration-500 ${
                    transformerActive
                      ? 'bg-purple-900/80 border-purple-400 text-white shadow-lg shadow-purple-600/30 scale-102'
                      : 'bg-zinc-950 border-zinc-900 text-zinc-600'
                  }`}
                >
                  <div className="font-mono text-[9px] uppercase text-purple-300 mb-1">
                    GPU Core #{idx + 1}
                  </div>
                  <div className="font-mono text-xs font-bold truncate">{tok}</div>
                  <div className="mt-2 text-[9px] font-mono text-emerald-400">
                    {transformerActive ? '⚡ Parallel QKV' : 'Idle'}
                  </div>
                </div>
              ))}
            </div>

            {transformerActive && (
              <div className="p-3 bg-purple-900/40 border border-purple-700/50 rounded-xl text-xs font-mono text-purple-200 flex items-center justify-between">
                <span>🔥 Direct Line of Sight: Max path length between any two words = 1 step!</span>
                <span className="text-emerald-400 font-bold">100% GPU Saturation</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
