'use client';

import React, { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function Section14GptArchitecture() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const pipelineSteps = [
    {
      title: '01. Token & Positional Embedding',
      tensor: '[Batch=1, SeqLen=3, d_model=768]',
      badge: 'Input Projection',
      desc: 'Discrete token IDs are converted into dense continuous 768-dimensional vectors via a learned lookup table W_e, then combined with positional vectors W_p.',
      detail: 'x = TokenEmbedding(tokens) + PositionalEmbedding(positions)',
      color: 'border-blue-500 bg-blue-500/10 text-blue-400',
    },
    {
      title: '02. Causal Masked Self-Attention',
      tensor: '[Batch=1, SeqLen=3, d_model=768]',
      badge: 'No Peeking Ahead',
      desc: 'Each token computes Query, Key, and Value vectors. Attention is strictly masked with an upper-triangular matrix of -inf so tokens can never look ahead into future words.',
      detail: 'Attention(Q, K, V) = softmax((Q K^T / sqrt(d_k)) + M) V',
      color: 'border-purple-500 bg-purple-500/10 text-purple-400',
    },
    {
      title: '03. Residual Add & LayerNorm',
      tensor: '[Batch=1, SeqLen=3, d_model=768]',
      badge: 'Skip Connection',
      desc: 'The original input x is added back to the attention output (x + Attention(x)). This skip connection prevents vanishing gradients across dozens of stacked layers.',
      detail: 'h1 = LayerNorm(x + MaskedAttention(LayerNorm(x)))',
      color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
    },
    {
      title: '04. Feed-Forward Network (MLP)',
      tensor: '[Batch=1, SeqLen=3, 4*d_model=3072]',
      badge: 'Knowledge Storage',
      desc: 'Each token vector is projected into a wider 3072-dimensional hidden layer with non-linear activation (GELU or SwiGLU) and projected back. This acts as associative memory.',
      detail: 'FFN(x) = GELU(x W_1 + b_1) W_2 + b_2',
      color: 'border-amber-500 bg-amber-500/10 text-amber-400',
    },
    {
      title: '05. Language Modeling Head (Linear)',
      tensor: '[Batch=1, SeqLen=3, VocabSize=50257]',
      badge: 'Unembedding Projection',
      desc: 'The final 768-dimensional output vector is projected back up to the full vocabulary dimension (e.g. 50,257 for GPT-2 / 128k for LLaMA-3) to produce raw unnormalized logits.',
      detail: 'logits = LayerNorm(h_final) W_vocab^T',
      color: 'border-rose-500 bg-rose-500/10 text-rose-400',
    },
    {
      title: '06. Softmax & Next-Token Sampling',
      tensor: '[VocabSize=50257] -> Next Token ID',
      badge: 'Probability Distribution',
      desc: 'Softmax converts logits into positive probabilities summing to 1.0. A decoding sampler picks the next token ("world", prob: 64.2%), which is appended to repeat the cycle.',
      detail: 'probs = softmax(logits / Temperature)',
      color: 'border-teal-500 bg-teal-500/10 text-teal-400',
    },
  ];

  const gptPyCode = `# Minimal PyTorch implementation of a GPT Decoder Block
import torch
import torch.nn as nn
import torch.nn.functional as F

class GPTDecoderBlock(nn.Module):
    def __init__(self, d_model=768, n_heads=12, d_ff=3072):
        super().__init__()
        self.ln_1 = nn.LayerNorm(d_model)
        self.attn = nn.MultiheadAttention(embed_dim=d_model, num_heads=n_heads, batch_first=True)
        self.ln_2 = nn.LayerNorm(d_model)
        self.mlp = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.GELU(),
            nn.Linear(d_ff, d_model)
        )

    def forward(self, x, causal_mask=None):
        # 1. Pre-LayerNorm & Causal Self-Attention with Residual Connection
        norm_x = self.ln_1(x)
        attn_out, _ = self.attn(norm_x, norm_x, norm_x, attn_mask=causal_mask, is_causal=True)
        x = x + attn_out  # Residual connection

        # 2. Pre-LayerNorm & Feed-Forward MLP with Residual Connection
        x = x + self.mlp(self.ln_2(x))
        return x`;

  return (
    <section id="sec-gpt-architecture" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">02</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            14.2 // Architecture Deep Dive
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Deep Dive into the GPT Architecture
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            Understanding the Decoder-Only Transformer: Causal Masking, Residual Connections, and Feed-Forward Networks.
          </p>
        </div>
      </div>

      {/* Conceptual Overview */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
          Why Did GPT Choose Decoder-Only?
        </h3>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          The original 2017 Transformer had two halves: an <strong>Encoder</strong> (which reads the whole input at once, like a document reader) and a <strong>Decoder</strong> (which generates output word-by-word, like a translator).
        </p>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          OpenAI’s critical realization with GPT (Generative Pre-trained Transformer) was: <strong>You don&apos;t need the encoder at all for open-ended text generation!</strong> By stacking only decoders and enforcing strict <em>causal masking</em> (a token at position 3 can only attend to positions 0, 1, 2, and 3), the entire internet can be trained as an unsupervised next-token prediction stream.
        </p>

        {/* Structural comparison */}
        <div className="grid sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-zinc-100 border border-zinc-200">
            <div className="font-mono text-xs font-bold text-zinc-900 mb-1">BERT (Encoder-Only)</div>
            <div className="text-[11px] text-zinc-600">
              Bidirectional. Can see both left and right words simultaneously. Great for classification and search; cannot generate flowing prose naturally.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-purple-100/70 border border-purple-300">
            <div className="font-mono text-xs font-bold text-purple-900 mb-1">GPT (Decoder-Only)</div>
            <div className="text-[11px] text-purple-900">
              Unidirectional (Causal). Only looks at past tokens. Perfect for open-ended generation, reasoning, and autoregressive continuation.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-100 border border-zinc-200">
            <div className="font-mono text-xs font-bold text-zinc-900 mb-1">T5 (Encoder-Decoder)</div>
            <div className="text-[11px] text-zinc-600">
              Both halves. Encodes input with bidirectional attention, decodes with causal attention. Great for translation, but slower and less versatile.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Decoder Flow Explorer */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100/70 px-2.5 py-0.5 rounded-full mb-1">
              <span>🔬</span>
              <span>Interactive Architectural Stepper</span>
            </div>
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              Step-by-Step GPT Forward Pass Flow
            </h4>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="px-3 py-1.5 rounded-lg border border-zinc-300 bg-white text-xs font-mono disabled:opacity-40 hover:bg-zinc-50"
            >
              ← Prev Step
            </button>
            <span className="font-mono text-xs font-bold text-zinc-600 px-2">
              {activeStep + 1} / {pipelineSteps.length}
            </span>
            <button
              onClick={() => setActiveStep((prev) => Math.min(pipelineSteps.length - 1, prev + 1))}
              disabled={activeStep === pipelineSteps.length - 1}
              className="px-3 py-1.5 rounded-lg border border-purple-300 bg-purple-700 text-white text-xs font-mono disabled:opacity-40 hover:bg-purple-800"
            >
              Next Step →
            </button>
          </div>
        </div>

        {/* Step buttons progress bar */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {pipelineSteps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                activeStep === idx
                  ? 'border-purple-600 bg-purple-50 shadow-sm scale-[1.02]'
                  : 'border-zinc-200 bg-white hover:border-zinc-300'
              }`}
            >
              <div className="font-mono text-[10px] text-zinc-400 font-bold">
                0{idx + 1}
              </div>
              <div className="font-mono text-[11px] font-bold text-zinc-800 truncate mt-0.5">
                {s.title.split('. ')[1]}
              </div>
            </button>
          ))}
        </div>

        {/* Active Step Visualizer Box */}
        <div className="card-dark p-6 rounded-2xl border border-zinc-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800 px-2 py-0.5 rounded">
                {pipelineSteps[activeStep].badge}
              </span>
              <h5 className="font-editorial text-xl font-bold text-white mt-1">
                {pipelineSteps[activeStep].title}
              </h5>
            </div>
            <div className="font-mono text-xs text-[#fbbf24] bg-zinc-900 border border-zinc-700 px-3 py-1 rounded-md">
              Tensor Shape: {pipelineSteps[activeStep].tensor}
            </div>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            {pipelineSteps[activeStep].desc}
          </p>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
            <div className="text-[10px] uppercase font-mono text-zinc-500 font-bold mb-1">
              Internal Mathematical Transformation:
            </div>
            <code className="text-xs font-mono text-emerald-400">
              {pipelineSteps[activeStep].detail}
            </code>
          </div>

          {/* Causal Mask Matrix Visualizer on Step 1 */}
          {activeStep === 1 && (
            <div className="bg-zinc-900/90 p-4 rounded-xl border border-purple-800/50 space-y-2">
              <div className="text-xs font-mono font-bold text-purple-300 flex items-center justify-between">
                <span>Causal Mask Matrix M (SeqLen = 4):</span>
                <span className="text-[10px] text-zinc-400">Tokens cannot look into future</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 max-w-xs font-mono text-xs text-center">
                <div className="p-2 bg-emerald-900/40 text-emerald-300 rounded border border-emerald-700">0</div>
                <div className="p-2 bg-rose-950/40 text-rose-400 rounded border border-rose-800">-∞</div>
                <div className="p-2 bg-rose-950/40 text-rose-400 rounded border border-rose-800">-∞</div>
                <div className="p-2 bg-rose-950/40 text-rose-400 rounded border border-rose-800">-∞</div>

                <div className="p-2 bg-emerald-900/40 text-emerald-300 rounded border border-emerald-700">0</div>
                <div className="p-2 bg-emerald-900/40 text-emerald-300 rounded border border-emerald-700">0</div>
                <div className="p-2 bg-rose-950/40 text-rose-400 rounded border border-rose-800">-∞</div>
                <div className="p-2 bg-rose-950/40 text-rose-400 rounded border border-rose-800">-∞</div>

                <div className="p-2 bg-emerald-900/40 text-emerald-300 rounded border border-emerald-700">0</div>
                <div className="p-2 bg-emerald-900/40 text-emerald-300 rounded border border-emerald-700">0</div>
                <div className="p-2 bg-emerald-900/40 text-emerald-300 rounded border border-emerald-700">0</div>
                <div className="p-2 bg-rose-950/40 text-rose-400 rounded border border-rose-800">-∞</div>

                <div className="p-2 bg-emerald-900/40 text-emerald-300 rounded border border-emerald-700">0</div>
                <div className="p-2 bg-emerald-900/40 text-emerald-300 rounded border border-emerald-700">0</div>
                <div className="p-2 bg-emerald-900/40 text-emerald-300 rounded border border-emerald-700">0</div>
                <div className="p-2 bg-emerald-900/40 text-emerald-300 rounded border border-emerald-700">0</div>
              </div>
              <p className="text-[11px] text-zinc-400 pt-1">
                Softmax(-∞) = 0.0. The attention probability for any future token is mathematically zero.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* PyTorch Architecture Code Snippet */}
      <CodeSnippet
        code={gptPyCode}
        language="python"
        title="gpt_decoder_block.py (PyTorch Reference)"
        output="[Inference test]: Input tensor (1, 3, 768) successfully processed through Causal Attention & MLP -> Output shape: torch.Size([1, 3, 768])"
      />
    </section>
  );
}
