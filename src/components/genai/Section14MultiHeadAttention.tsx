'use client';

import React, { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function Section14MultiHeadAttention() {
  const [selectedHead, setSelectedHead] = useState<number>(0);
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(7); // Default on "it"

  const sentence = ['The', 'robot', 'did', 'not', 'cross', 'the', 'street', 'because', 'it', 'was', 'too', 'tired'];

  // Head specialization profiles
  const heads = [
    {
      name: 'Head 1: Pronoun Coreference',
      role: 'Resolves pronouns to their antecedent entity',
      focusToken: 'it',
      attendsTo: 'robot',
      weight: '89%',
      desc: 'Links "it" back to "robot" so the model knows who was tired.',
      color: 'border-purple-500 bg-purple-500/10 text-purple-400',
      activeIndices: { query: 8, key: 1 },
    },
    {
      name: 'Head 2: Syntactic Verb-Object',
      role: 'Tracks direct objects of action verbs',
      focusToken: 'cross',
      attendsTo: 'street',
      weight: '92%',
      desc: 'Connects the action verb "cross" with what is being crossed ("street").',
      color: 'border-blue-500 bg-blue-500/10 text-blue-400',
      activeIndices: { query: 4, key: 6 },
    },
    {
      name: 'Head 3: Causal Conjunction & State',
      role: 'Links causal clauses to the reason',
      focusToken: 'because',
      attendsTo: 'tired',
      weight: '84%',
      desc: 'Connects the causal conjunction "because" to the final psychological state "tired".',
      color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
      activeIndices: { query: 7, key: 11 },
    },
    {
      name: 'Head 4: Negation Scope',
      role: 'Binds negation adverbs to main auxiliary verbs',
      focusToken: 'not',
      attendsTo: 'did',
      weight: '95%',
      desc: 'Binds negation "not" directly with auxiliary "did" to invert predicate logic.',
      color: 'border-amber-500 bg-amber-500/10 text-amber-400',
      activeIndices: { query: 3, key: 2 },
    },
  ];

  const currentHead = heads[selectedHead];

  const attentionPyCode = `import torch
import torch.nn as nn
import math

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Computes Scaled Dot-Product Attention:
    Attention(Q, K, V) = softmax(Q @ K.T / sqrt(d_k)) @ V
    """
    d_k = Q.size(-1)
    
    # 1. Compute raw affinity scores (Q @ K^T)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    
    # 2. Apply causal mask (optional)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
        
    # 3. Softmax across last dimension to obtain probability weights
    attn_weights = torch.softmax(scores, dim=-1)
    
    # 4. Multiply attention weights by Value vectors
    output = torch.matmul(attn_weights, V)
    return output, attn_weights`;

  return (
    <section id="sec-multihead-attention" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">09</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            14.9 // Multi-Head Attention
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Understanding Multi-Head Attention for Rich Content
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            Query, Key, Value vector projections, Scaled Dot-Product, and why multiple parallel heads are essential for rich language comprehension.
          </p>
        </div>
      </div>

      {/* Conceptual Explanation in Simple Terms */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917] flex items-center space-x-2">
          <span>🔍</span>
          <span>The YouTube Search Analogy: Q, K, and V</span>
        </h3>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          Every token in a transformer block creates three distinct vectors by multiplying its embedding with three learned weight matrices: $W_Q, W_K, W_V$.
        </p>

        {/* QKV Cards */}
        <div className="grid md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
            <div className="font-mono text-xs font-bold text-purple-900 mb-1">
              Query (Q) = The Search Query
            </div>
            <p className="text-xs text-purple-950 leading-relaxed">
              What this word is looking for. E.g. the pronoun &quot;it&quot; asks: <em>&quot;Who is the noun antecedent that I refer to?&quot;</em>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div className="font-mono text-xs font-bold text-blue-900 mb-1">
              Key (K) = The Video Tags
            </div>
            <p className="text-xs text-blue-950 leading-relaxed">
              What this word offers. E.g. the noun &quot;robot&quot; advertises: <em>&quot;I am a physical singular agent, valid for pronouns.&quot;</em>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="font-mono text-xs font-bold text-emerald-900 mb-1">
              Value (V) = The Video Content
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed">
              The actual semantic payload transferred if Query and Key match. E.g. the mechanical agent attributes of &quot;robot&quot;.
            </p>
          </div>
        </div>

        <NoteCallout
          type="tip"
          title="Why Divide by sqrt(d_k)?"
          text="When vectors have high dimensionality (d_k=64 or 128), dot products grow large in magnitude. Large values push Softmax into saturated flat zones where gradients are microscopic (causing training to freeze). Dividing by sqrt(d_k) normalizes the variance back to 1.0, ensuring fast, stable gradient descent!"
        />
      </div>

      {/* Interactive Multi-Head Attention Visualizer */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100/70 px-2.5 py-0.5 rounded-full mb-1">
              <span>🎯</span>
              <span>Interactive Attention Matrix Simulator</span>
            </div>
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              Multi-Head Attention Across Subspaces
            </h4>
          </div>

          {/* Head Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {heads.map((h, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedHead(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  selectedHead === idx
                    ? 'bg-purple-700 text-white font-bold shadow'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                Head #{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Active Head Banner */}
        <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="font-mono text-xs font-bold text-purple-900">
              {currentHead.name}
            </div>
            <div className="text-xs text-purple-800 mt-0.5">
              {currentHead.desc}
            </div>
          </div>
          <div className="font-mono text-xs font-bold bg-white text-purple-800 px-3 py-1.5 rounded-lg border border-purple-200 shadow-xs self-start sm:self-auto">
            &quot;{currentHead.focusToken}&quot; → &quot;{currentHead.attendsTo}&quot; ({currentHead.weight} attention weight)
          </div>
        </div>

        {/* Interactive Sentence Word Tokens Bar */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-zinc-600 font-bold">
            Interactive Attention Flow Across Sentence:
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-wrap gap-2 items-center justify-center">
            {sentence.map((word, idx) => {
              const isQuery = currentHead.activeIndices.query === idx;
              const isKey = currentHead.activeIndices.key === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredWordIndex(idx)}
                  className={`font-mono text-xs sm:text-sm px-3 py-2 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col items-center ${
                    isQuery
                      ? 'bg-purple-600 text-white border-purple-400 scale-110 shadow-lg shadow-purple-600/40 z-20'
                      : isKey
                      ? 'bg-emerald-600 text-white border-emerald-400 scale-110 shadow-lg shadow-emerald-600/40 z-20'
                      : hoveredWordIndex === idx
                      ? 'bg-zinc-800 text-white border-zinc-600'
                      : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-bold">{word}</span>
                  <span className="text-[9px] opacity-60 font-sans mt-0.5">
                    {isQuery ? 'Query (Q)' : isKey ? 'Key (K)' : `pos:${idx}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scaled Dot-Product Math Visual Card */}
        <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
          <div className="font-mono text-xs font-bold text-zinc-800 flex items-center justify-between">
            <span>Mathematical Attention Equation:</span>
            <span className="text-[10px] text-purple-700">Scaled Dot-Product</span>
          </div>
          <div className="font-mono text-xs sm:text-sm text-purple-900 bg-white p-3 rounded-lg border border-zinc-300 text-center font-bold">
            Attention(Q, K, V) = softmax( (Q · K^T) / √d_k ) · V
          </div>
          <p className="text-[11px] text-zinc-600">
            For Head #{selectedHead + 1}: Query vector for token &apos;{currentHead.focusToken}&apos; takes dot product with Key vector for &apos;{currentHead.attendsTo}&apos;, yielding peak activation value {currentHead.weight}.
          </p>
        </div>
      </div>

      {/* Pure PyTorch Implementation Code */}
      <CodeSnippet
        code={attentionPyCode}
        language="python"
        title="scaled_dot_product_attention.py (PyTorch Function)"
        output="Successfully computed attention output of shape: torch.Size([1, 8, 12, 64]) for 8 heads across 12 tokens."
      />
    </section>
  );
}
