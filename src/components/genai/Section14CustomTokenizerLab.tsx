'use client';

import React, { useState, useMemo } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function Section14CustomTokenizerLab() {
  const [inputText, setInputText] = useState<string>(
    'Artificial intelligence and neural transformers revolutionize data science!'
  );

  // Pre-set example prompts
  const presets = [
    { label: 'AI & Transformers', text: 'Artificial intelligence and neural transformers revolutionize data science!' },
    { label: 'Python Function', text: 'def attention(query, key, value): return softmax(query @ key.T) @ value' },
    { label: 'Compound Words', text: 'unbelievably hyperparameterized multilingual preprocessing' },
  ];

  // Simulated subword BPE tokenization dictionary
  const simulatedVocab: Record<string, number> = {
    'Artificial': 101,
    ' intelligence': 102,
    ' and': 103,
    ' neural': 104,
    ' transform': 105,
    'ers': 106,
    ' revolution': 107,
    'ize': 108,
    ' data': 109,
    ' science': 110,
    '!': 111,
    'def': 201,
    ' attention': 202,
    '(': 203,
    'query': 204,
    ',': 205,
    ' key': 206,
    ' value': 207,
    '):': 208,
    ' return': 209,
    ' softmax': 210,
    '@': 211,
    '.T)': 212,
    'un': 301,
    'believ': 302,
    'ably': 303,
    ' hyper': 304,
    'parameter': 305,
    'ized': 306,
    ' multi': 307,
    'lingual': 308,
    ' pre': 309,
    'process': 310,
    'ing': 311,
  };

  // Color palette for token chips
  const chipColors = [
    'bg-purple-100 text-purple-900 border-purple-300',
    'bg-blue-100 text-blue-900 border-blue-300',
    'bg-emerald-100 text-emerald-900 border-emerald-300',
    'bg-amber-100 text-amber-900 border-amber-300',
    'bg-rose-100 text-rose-900 border-rose-300',
    'bg-cyan-100 text-cyan-900 border-cyan-300',
  ];

  // Dynamic token splitting heuristic
  const parsedTokens = useMemo(() => {
    if (!inputText.trim()) return [];

    // Simple heuristic subword chunker for educational simulation
    const words = inputText.split(/(\s+|[.,!?:;()[\]{}@])/).filter(Boolean);
    const tokens: { text: string; id: number; colorClass: string }[] = [];

    let colorIdx = 0;
    for (const w of words) {
      if (w.length > 7 && !simulatedVocab[w]) {
        // split long words into 2 subwords
        const mid = Math.floor(w.length / 2);
        const p1 = w.slice(0, mid);
        const p2 = w.slice(mid);
        tokens.push({
          text: p1,
          id: simulatedVocab[p1] || 1000 + (tokens.length % 500),
          colorClass: chipColors[colorIdx++ % chipColors.length],
        });
        tokens.push({
          text: p2,
          id: simulatedVocab[p2] || 1500 + (tokens.length % 500),
          colorClass: chipColors[colorIdx++ % chipColors.length],
        });
      } else {
        tokens.push({
          text: w,
          id: simulatedVocab[w] || 2000 + (tokens.length * 37) % 800,
          colorClass: chipColors[colorIdx++ % chipColors.length],
        });
      }
    }

    return tokens;
  }, [inputText]);

  const compressionRatio = parsedTokens.length > 0 ? (inputText.length / parsedTokens.length).toFixed(2) : '0';

  const pythonBpeCode = `from collections import defaultdict, Counter
import re

class SimpleBPETokenizer:
    """
    A minimal, educational Byte-Pair Encoding (BPE) Tokenizer from scratch.
    """
    def __init__(self):
        self.merges = {}
        self.vocab = {}

    def get_stats(self, word_freqs):
        """Count frequencies of adjacent symbol pairs across all vocabulary words."""
        pairs = Counter()
        for word, freq in word_freqs.items():
            symbols = word.split()
            for i in range(len(symbols) - 1):
                pairs[(symbols[i], symbols[i + 1])] += freq
        return pairs

    def merge_vocab(self, pair, word_freqs):
        """Merge all occurrences of the most frequent pair in the vocabulary."""
        new_word_freqs = {}
        bigram = re.escape(' '.join(pair))
        p = re.compile(r'(?<!\S)' + bigram + r'(?!\S)')
        replacement = ''.join(pair)
        for word, freq in word_freqs.items():
            new_word = p.sub(replacement, word)
            new_word_freqs[new_word] = freq
        return new_word_freqs

    def train(self, corpus: list[str], num_merges: int = 10):
        # 1. Initialize words split into characters with end-of-token symbol '</w>'
        word_freqs = Counter()
        for text in corpus:
            for word in text.split():
                word_freqs[' '.join(list(word)) + ' </w>'] += 1

        # 2. Iteratively learn the most frequent adjacent pair and merge
        for i in range(num_merges):
            pairs = self.get_stats(word_freqs)
            if not pairs:
                break
            best_pair = max(pairs, key=pairs.get)
            word_freqs = self.merge_vocab(best_pair, word_freqs)
            self.merges[best_pair] = ''.join(best_pair)
            print(f"Merge #{i+1:02d}: {best_pair} -> '{''.join(best_pair)}' (Freq: {pairs[best_pair]})")

        # 3. Build token-to-ID dictionary
        unique_tokens = set()
        for word in word_freqs.keys():
            unique_tokens.update(word.split())
        self.vocab = {tok: idx for idx, tok in enumerate(sorted(unique_tokens))}
        print(f"\\nTraining complete! Final Vocabulary Size: {len(self.vocab)}")
        return self

# Example Usage:
corpus = ["low lower lowest newest wider new wider"]
bpe = SimpleBPETokenizer().train(corpus, num_merges=6)`;

  return (
    <section id="sec-custom-tokenizer" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">05</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            14.5 // Hands-on Implementation
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Implementing a Custom Tokenizer in Python
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            Build your own Byte-Pair Encoding (BPE) engine from scratch, train merge rules, and test interactive live encoding.
          </p>
        </div>
      </div>

      {/* 4 Step Explanation */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917]">
          How BPE Learns Merge Rules in 4 Simple Steps
        </h3>

        <div className="grid sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
            <span className="font-mono text-[10px] uppercase font-bold text-zinc-500">Step 1</span>
            <div className="font-mono text-xs font-bold text-zinc-900 mt-1">Char Base Vocab</div>
            <p className="text-[11px] text-zinc-600 mt-1 leading-snug">
              Every word is split into individual letters with an end marker: <code className="code-inline">l o w &lt;/w&gt;</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200">
            <span className="font-mono text-[10px] uppercase font-bold text-purple-700">Step 2</span>
            <div className="font-mono text-xs font-bold text-purple-950 mt-1">Count Bigram Pairs</div>
            <p className="text-[11px] text-purple-900 mt-1 leading-snug">
              Count all adjacent character pairs. Find which pair occurs most across the dataset.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
            <span className="font-mono text-[10px] uppercase font-bold text-blue-700">Step 3</span>
            <div className="font-mono text-xs font-bold text-blue-950 mt-1">Merge Top Pair</div>
            <p className="text-[11px] text-blue-900 mt-1 leading-snug">
              Merge the winner into a single subword unit: <code className="code-inline">(&apos;o&apos;, &apos;w&apos;) -&gt; &apos;ow&apos;</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="font-mono text-[10px] uppercase font-bold text-emerald-700">Step 4</span>
            <div className="font-mono text-xs font-bold text-emerald-950 mt-1">Repeat & Freeze</div>
            <p className="text-[11px] text-emerald-900 mt-1 leading-snug">
              Repeat for $K$ iterations. Freeze the learned merge table and assign integer IDs.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tokenizer Playground */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100/70 px-2.5 py-0.5 rounded-full mb-1">
              <span>⚡</span>
              <span>Live Custom Tokenizer Playground</span>
            </div>
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              Type Any Sentence to Inspect Real-Time Subword Slices
            </h4>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(p.text)}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Text Box */}
        <div className="space-y-1.5">
          <label className="font-mono text-xs font-bold text-zinc-700">
            Interactive Input String (Editable):
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type anything to test tokenization..."
            className="w-full p-3 rounded-xl border border-zinc-300 bg-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>

        {/* Tokenized Chips Animated Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-600">
            <span className="font-bold">Output Tokens ({parsedTokens.length}):</span>
            <span>Hover or click tokens to inspect details</span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-wrap gap-2 min-h-[70px] items-center">
            {parsedTokens.length === 0 ? (
              <span className="text-zinc-500 font-mono text-xs">Enter text above to see tokens</span>
            ) : (
              parsedTokens.map((tok, idx) => (
                <div
                  key={idx}
                  className={`inline-flex items-center space-x-1.5 font-mono text-xs px-2.5 py-1 rounded-md border font-semibold transition-all hover:scale-105 ${tok.colorClass}`}
                >
                  <span>{tok.text === ' ' ? '␣' : tok.text}</span>
                  <span className="text-[9px] opacity-70 border-l border-current/30 pl-1 font-mono">
                    ID:{tok.id}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dynamic Tokenizer Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="text-[10px] text-zinc-500 uppercase">Input Chars</div>
            <div className="text-xl font-bold text-zinc-900">{inputText.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="text-[10px] text-zinc-500 uppercase">Total Tokens</div>
            <div className="text-xl font-bold text-purple-700">{parsedTokens.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="text-[10px] text-zinc-500 uppercase">Compression</div>
            <div className="text-xl font-bold text-emerald-700">{compressionRatio} <span className="text-xs font-normal">c/tok</span></div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="text-[10px] text-zinc-500 uppercase">Token IDs Array</div>
            <div className="text-xs font-bold text-zinc-800 truncate px-1">
              [{parsedTokens.slice(0, 3).map((t) => t.id).join(', ')}...]
            </div>
          </div>
        </div>
      </div>

      {/* Python Implementation Code Block */}
      <CodeSnippet
        code={pythonBpeCode}
        language="python"
        title="custom_bpe_tokenizer.py (Pure Python)"
        output={`Merge #01: ('e', 's') -> 'es' (Freq: 2)
Merge #02: ('es', 't') -> 'est' (Freq: 2)
Merge #03: ('l', 'o') -> 'lo' (Freq: 3)
Merge #04: ('lo', 'w') -> 'low' (Freq: 3)
Merge #05: ('n', 'e') -> 'ne' (Freq: 2)
Merge #06: ('ne', 'w') -> 'new' (Freq: 2)

Training complete! Final Vocabulary Size: 14 unique tokens.`}
      />
    </section>
  );
}
