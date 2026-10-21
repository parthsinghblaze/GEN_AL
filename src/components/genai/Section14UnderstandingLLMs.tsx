'use client';

import React, { useState } from 'react';
import NoteCallout from '@/components/common/NoteCallout';

export default function Section14UnderstandingLLMs() {
  const [selectedModel, setSelectedModel] = useState<'1b' | '7b' | '70b' | '405b'>('7b');
  const [precision, setPrecision] = useState<'fp16' | 'int8' | 'int4'>('fp16');

  const modelSpecs = {
    '1b': {
      name: 'GPT-2 XL (1.5B)',
      params: 1.5,
      tokensTrained: '40 Billion (WebText)',
      idealHardware: 'Consumer GPU / MacBook M-series (8GB RAM)',
      era: '2019 (OpenAI)',
      strengths: 'Basic prose continuation, simple syntax matching',
      weaknesses: 'Hallucinates easily, zero multi-step reasoning, 1024 token limit',
    },
    '7b': {
      name: 'Mistral / LLaMA-3 (8B)',
      params: 8.0,
      tokensTrained: '15 Trillion (Open Web & Code)',
      idealHardware: 'Single RTX 3060 / 4090 or Apple M2/M3 (16GB RAM)',
      era: '2024 (Meta / Mistral AI)',
      strengths: 'Strong Python coding, nuanced chat, follows system instructions',
      weaknesses: 'Can struggle with extreme edge-case formal mathematical proofs',
    },
    '70b': {
      name: 'LLaMA-3 (70B)',
      params: 70.0,
      tokensTrained: '15 Trillion (High-Quality Synthetic + Text)',
      idealHardware: 'Multi-GPU Rig (2x-4x RTX 3090/4090 or 64GB Mac)',
      era: '2024 (Industry Standard Tier)',
      strengths: 'Near GPT-4 reasoning, complex agent workflows, multilingual fluently',
      weaknesses: 'Requires substantial VRAM for high-concurrency production serving',
    },
    '405b': {
      name: 'LLaMA-3 (405B) / Frontier Scale',
      params: 405.0,
      tokensTrained: '15+ Trillion (Supercomputed Cluster)',
      idealHardware: 'Enterprise Cluster (8x H100 80GB SXM5 GPUs)',
      era: 'Frontier Flagship Tier',
      strengths: 'Synthetic data generation, master-level coding, nuanced research analysis',
      weaknesses: 'Extremely costly to serve; strictly data center infrastructure',
    },
  };

  const bytesPerParam = {
    fp16: 2.0, // 16 bits = 2 bytes
    int8: 1.0, // 8 bits = 1 byte
    int4: 0.5, // 4 bits = 0.5 bytes
  };

  const currentModel = modelSpecs[selectedModel];
  const weightVramGB = (currentModel.params * bytesPerParam[precision]).toFixed(1);
  const totalRecommendedVramGB = (parseFloat(weightVramGB) * 1.25).toFixed(1); // includes 25% KV-cache & activations headroom

  return (
    <section id="sec-llm-understanding" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">01</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            14.1 // Core Foundation
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Understanding Large Language Models (LLMs)
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            The transition from simple statistical autocomplete to billion-parameter emergent reasoning engines.
          </p>
        </div>
      </div>

      {/* Conceptual Explanation in Simple Terms */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917] flex items-center space-x-2">
          <span>🧠</span>
          <span>What is an LLM in Simple Terms?</span>
        </h3>
        
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          At its core, a <strong>Large Language Model (LLM)</strong> is an extraordinarily deep mathematical function trained on a massive objective: <em>given a sequence of prior words, predict what word comes next with the highest probability</em>.
        </p>

        <div className="grid md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200/80">
            <div className="font-mono text-xs font-bold text-purple-900 mb-1">
              1. The Scale Factor
            </div>
            <p className="text-xs text-[#52525b] leading-relaxed">
              Trained on trillions of words across human literature, encyclopedias, and GitHub repositories. Instead of memorizing text verbatim, it compresses knowledge into billions of continuous mathematical weights (matrices).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80">
            <div className="font-mono text-xs font-bold text-blue-900 mb-1">
              2. Emergent Capabilities
            </div>
            <p className="text-xs text-[#52525b] leading-relaxed">
              When models scale past ~10 billion parameters, abilities like multi-step logic, code debugging, translation, and in-context learning spontaneously appear without explicit programming.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <div className="font-mono text-xs font-bold text-amber-900 mb-1">
              3. Non-Deterministic Autocomplete
            </div>
            <p className="text-xs text-[#52525b] leading-relaxed">
              An LLM does not execute a SQL query or fetch from a hard drive. It generates a dynamic probability curve over a 50,000+ token vocabulary and samples the next piece of text autoregressively.
            </p>
          </div>
        </div>

        <NoteCallout
          type="tip"
          title="The 'Lossy Compression of the Web' Analogy"
          text="Computer scientist Ted Chiang famously described LLMs as a blurry JPEG of all the text on the web. It retains the global conceptual geometry, grammar, and relationship hierarchies of human thought while discarding exact character-by-character storage."
        />
      </div>

      {/* Interactive LLM Parameter & VRAM Footprint Simulator */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100/70 px-2.5 py-0.5 rounded-full mb-1">
              <span>⚡</span>
              <span>Interactive Hardware & Scale Simulator</span>
            </div>
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              Model Scale vs. VRAM & Hardware Demands
            </h4>
          </div>

          {/* Model selection tabs */}
          <div className="flex flex-wrap gap-1.5">
            {(['1b', '7b', '70b', '405b'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedModel(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedModel === key
                    ? 'bg-purple-700 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Quantization selector */}
        <div className="flex items-center space-x-3 bg-zinc-50 p-3 rounded-xl border border-zinc-200 text-xs">
          <span className="font-mono font-bold text-zinc-600">Weight Quantization:</span>
          <div className="flex space-x-2">
            {[
              { id: 'fp16', label: 'FP16 / BF16 (16-bit)', bytes: '2 Bytes/Param (Full Quality)' },
              { id: 'int8', label: 'INT8 (8-bit Quant)', bytes: '1 Byte/Param (Near Lossless)' },
              { id: 'int4', label: 'INT4 (4-bit Quant / AWQ)', bytes: '0.5 Bytes/Param (Edge/Consumer)' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPrecision(p.id as any)}
                className={`px-3 py-1 rounded-md font-mono text-[11px] font-medium transition-all ${
                  precision === p.id
                    ? 'bg-[#18181b] text-[#fbbf24] font-bold shadow'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic calculation display */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card-dark p-5 rounded-xl border border-zinc-800 space-y-2">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              Model Weight Size
            </div>
            <div className="text-3xl font-editorial font-black text-[#fbbf24]">
              {weightVramGB} <span className="text-sm font-sans font-normal text-zinc-400">GB</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-400">
              Formula: {currentModel.params}B params × {bytesPerParam[precision]}B = {weightVramGB} GB
            </div>
          </div>

          <div className="card-dark p-5 rounded-xl border border-zinc-800 space-y-2">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              Recommended Total VRAM
            </div>
            <div className="text-3xl font-editorial font-black text-emerald-400">
              {totalRecommendedVramGB} <span className="text-sm font-sans font-normal text-zinc-400">GB</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-400">
              Includes +25% KV cache & attention activations
            </div>
          </div>

          <div className="card-dark p-5 rounded-xl border border-zinc-800 space-y-2">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              Pre-training Corpus
            </div>
            <div className="text-2xl font-editorial font-bold text-white">
              {currentModel.tokensTrained.split(' ')[0]} <span className="text-sm font-sans text-purple-300">Tokens</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-400 truncate">
              {currentModel.tokensTrained}
            </div>
          </div>
        </div>

        {/* Hardware & Spec Card */}
        <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-editorial text-lg font-bold text-zinc-900">
              {currentModel.name}
            </div>
            <span className="font-mono text-xs bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded">
              {currentModel.era}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-mono font-bold text-zinc-600 uppercase text-[10px] block mb-0.5">
                Target Hardware Requirements:
              </span>
              <p className="text-zinc-800 font-medium">{currentModel.idealHardware}</p>
            </div>
            <div>
              <span className="font-mono font-bold text-emerald-700 uppercase text-[10px] block mb-0.5">
                Key Strengths:
              </span>
              <p className="text-zinc-700">{currentModel.strengths}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
