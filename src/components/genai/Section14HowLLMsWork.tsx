'use client';

import React, { useState, useMemo } from 'react';
import NoteCallout from '@/components/common/NoteCallout';

export default function Section14HowLLMsWork() {
  const [tokens, setTokens] = useState<string[]>(['Artificial', 'intelligence', 'will']);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [topK, setTopK] = useState<number>(4);
  const [lastSampled, setLastSampled] = useState<string | null>(null);
  const [isSampling, setIsSampling] = useState<boolean>(false);

  // Pool of candidate next-tokens with baseline logits
  const candidatePool = [
    { word: 'transform', baseLogit: 4.8, category: 'constructive' },
    { word: 'revolutionize', baseLogit: 4.2, category: 'constructive' },
    { word: 'empower', baseLogit: 3.5, category: 'constructive' },
    { word: 'accelerate', baseLogit: 2.9, category: 'constructive' },
    { word: 'challenge', baseLogit: 1.8, category: 'critical' },
    { word: 'disrupt', baseLogit: 1.2, category: 'critical' },
    { word: 'replace', baseLogit: 0.6, category: 'critical' },
    { word: 'surpass', baseLogit: -0.4, category: 'wildcard' },
  ];

  // Calculate dynamic probabilities based on Temperature & Top-K
  const tokenProbabilities = useMemo(() => {
    // 1. Scale logits by Temperature
    const scaled = candidatePool.map((c) => ({
      ...c,
      scaledLogit: c.baseLogit / Math.max(0.05, temperature),
    }));

    // 2. Sort descending
    scaled.sort((a, b) => b.scaledLogit - a.scaledLogit);

    // 3. Apply Top-K cutoff
    const valid = scaled.slice(0, topK);

    // 4. Softmax over Top-K
    const maxLogit = Math.max(...valid.map((v) => v.scaledLogit));
    const expValues = valid.map((v) => Math.exp(v.scaledLogit - maxLogit));
    const sumExp = expValues.reduce((a, b) => a + b, 0);

    return scaled.map((item, idx) => {
      const inTopK = idx < topK;
      const prob = inTopK ? (expValues[idx] / sumExp) * 100 : 0;
      return {
        ...item,
        inTopK,
        probability: prob,
      };
    });
  }, [temperature, topK]);

  // Handle sampling the next token
  const handleSampleToken = () => {
    setIsSampling(true);
    setTimeout(() => {
      // Weighted random selection
      const activeCandidates = tokenProbabilities.filter((t) => t.inTopK && t.probability > 0);
      const rand = Math.random() * 100;
      let cumulative = 0;
      let chosen = activeCandidates[0].word;

      for (const cand of activeCandidates) {
        cumulative += cand.probability;
        if (rand <= cumulative) {
          chosen = cand.word;
          break;
        }
      }

      setTokens((prev) => [...prev, chosen]);
      setLastSampled(chosen);
      setIsSampling(false);
    }, 450);
  };

  const handleReset = () => {
    setTokens(['Artificial', 'intelligence', 'will']);
    setLastSampled(null);
  };

  return (
    <section id="sec-how-llms-work" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">03</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            14.3 // Internal Mechanics
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            How LLMs Work Under the Hood
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            The Autoregressive Loop, Next-Token Prediction, Logits, Softmax, and Temperature Sampling.
          </p>
        </div>
      </div>

      {/* Simple Term Explanation */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917] flex items-center space-x-2">
          <span>🔄</span>
          <span>The Universal Autoregressive Generation Loop</span>
        </h3>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          When you send a message to ChatGPT, Claude, or Gemini, the model does <strong>not</strong> produce the whole reply in one instant snapshot. Instead, it runs an infinite <strong>autoregressive loop</strong>, generating one piece of text at a time.
        </p>

        {/* The 5 Steps of Next-Token Prediction */}
        <div className="grid sm:grid-cols-5 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
            <div className="font-mono text-[10px] uppercase font-bold text-purple-700">Step 1</div>
            <div className="font-mono text-xs font-bold text-zinc-900 mt-0.5">Ingest Prompt</div>
            <div className="text-[11px] text-zinc-600 mt-1">Prompt is converted to token IDs and embedded.</div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
            <div className="font-mono text-[10px] uppercase font-bold text-blue-700">Step 2</div>
            <div className="font-mono text-xs font-bold text-zinc-900 mt-0.5">Compute Logits</div>
            <div className="text-[11px] text-zinc-600 mt-1">Scores generated for all ~50,000 words.</div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <div className="font-mono text-[10px] uppercase font-bold text-amber-700">Step 3</div>
            <div className="font-mono text-xs font-bold text-zinc-900 mt-0.5">Softmax Probs</div>
            <div className="text-[11px] text-zinc-600 mt-1">Scores scaled by Temperature into % odds.</div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="font-mono text-[10px] uppercase font-bold text-emerald-700">Step 4</div>
            <div className="font-mono text-xs font-bold text-zinc-900 mt-0.5">Sample Token</div>
            <div className="text-[11px] text-zinc-600 mt-1">Weighted dice roll selects the winner.</div>
          </div>

          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
            <div className="font-mono text-[10px] uppercase font-bold text-rose-700">Step 5</div>
            <div className="font-mono text-xs font-bold text-zinc-900 mt-0.5">Append & Loop</div>
            <div className="text-[11px] text-zinc-600 mt-1">Appends token; repeats until EOS token.</div>
          </div>
        </div>

        <NoteCallout
          type="info"
          title="Why Does Temperature Change Output Quality?"
          text="Mathematically, Temperature scales the raw logits before softmax: softmax(z / T). When T is low (0.1), high logits dominate and probability concentrates on 1 word (greedy/predictable). When T is high (1.5), differences shrink, leveling the playing field and yielding surprising, imaginative words."
        />
      </div>

      {/* Interactive Autoregressive Next-Token Simulator */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100/70 px-2.5 py-0.5 rounded-full mb-1">
              <span>🎲</span>
              <span>Live Interactive Simulator</span>
            </div>
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              Next-Token Predictor & Sampling Engine
            </h4>
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-mono font-medium text-zinc-500 hover:text-zinc-800 underline self-start sm:self-auto"
          >
            Reset Sentence
          </button>
        </div>

        {/* Current Prompt Box */}
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Current Context Sequence (Prompt):
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {tokens.map((tok, idx) => (
              <span
                key={idx}
                className={`font-mono text-sm px-3 py-1 rounded-lg border transition-all duration-300 ${
                  idx === tokens.length - 1 && lastSampled
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 scale-105 shadow-md shadow-emerald-500/20'
                    : 'bg-zinc-800 text-zinc-200 border-zinc-700'
                }`}
              >
                {tok}
              </span>
            ))}
            <span className="font-mono text-sm px-2.5 py-1 text-purple-400 animate-pulse border border-dashed border-purple-500/50 rounded-lg bg-purple-950/20">
              [Predicting Next...]
            </span>
          </div>
        </div>

        {/* Controls: Temperature & Top-K sliders */}
        <div className="grid md:grid-cols-2 gap-5 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
          {/* Temperature Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-800">
                Temperature (T): <span className="text-purple-700 font-bold">{temperature.toFixed(2)}</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                {temperature < 0.3 ? 'Deterministic / Greedy' : temperature > 1.2 ? 'Creative / Chaotic' : 'Balanced Coherent'}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.8"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-purple-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>0.1 (Strict)</span>
              <span>0.7 (Default)</span>
              <span>1.8 (Wild)</span>
            </div>
          </div>

          {/* Top-K Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-800">
                Top-K Cutoff: <span className="text-purple-700 font-bold">{topK} tokens</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                Filters out tail probabilities
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={topK}
              onChange={(e) => setTopK(parseInt(e.target.value))}
              className="w-full accent-purple-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>K=1 (Only #1)</span>
              <span>K=4 (Standard)</span>
              <span>K=8 (All)</span>
            </div>
          </div>
        </div>

        {/* Live Probability Bars */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-600 font-bold">
            <span>Candidate Next Tokens</span>
            <span>Probability Distribution %</span>
          </div>

          <div className="space-y-2">
            {tokenProbabilities.map((cand, idx) => (
              <div
                key={cand.word}
                className={`p-2.5 rounded-xl border transition-all duration-300 ${
                  cand.inTopK
                    ? 'bg-white border-zinc-200 shadow-xs'
                    : 'bg-zinc-100/50 border-dashed border-zinc-200 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[11px] text-zinc-400 w-4 font-bold">
                      #{idx + 1}
                    </span>
                    <span className="font-mono font-bold text-zinc-900">
                      &quot;{cand.word}&quot;
                    </span>
                    {!cand.inTopK && (
                      <span className="text-[9px] font-mono text-rose-500 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                        Top-K Filtered
                      </span>
                    )}
                  </div>
                  <span className="font-mono font-bold text-purple-700">
                    {cand.probability.toFixed(1)}%
                  </span>
                </div>

                {/* Animated bar */}
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      idx === 0 ? 'bg-purple-600' : idx === 1 ? 'bg-blue-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${cand.probability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSampleToken}
            disabled={isSampling || tokens.length >= 10}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-purple-700 text-white font-mono text-xs font-bold shadow-lg hover:bg-purple-800 active:scale-95 transition-all disabled:opacity-50"
          >
            <span>{isSampling ? 'Rolling Dice...' : '🎲 Sample Next Token'}</span>
            <span className="text-purple-200 font-normal">→ Autoregress</span>
          </button>
        </div>
      </div>
    </section>
  );
}
