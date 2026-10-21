'use client';

import React, { useState } from 'react';
import NoteCallout from '@/components/common/NoteCallout';

interface WordPoint {
  word: string;
  x: number; // Normalized -1 to 1
  y: number; // Normalized -1 to 1
  category: 'royalty' | 'animals' | 'tech' | 'food';
  color: string;
}

export default function Section14VectorEmbeddings() {
  const points: WordPoint[] = [
    { word: 'King', x: 0.25, y: 0.75, category: 'royalty', color: 'bg-purple-600' },
    { word: 'Queen', x: 0.55, y: 0.82, category: 'royalty', color: 'bg-purple-600' },
    { word: 'Man', x: 0.15, y: 0.35, category: 'royalty', color: 'bg-purple-500' },
    { word: 'Woman', x: 0.45, y: 0.42, category: 'royalty', color: 'bg-purple-500' },
    { word: 'Dog', x: -0.7, y: -0.3, category: 'animals', color: 'bg-emerald-600' },
    { word: 'Puppy', x: -0.8, y: -0.5, category: 'animals', color: 'bg-emerald-600' },
    { word: 'Cat', x: -0.45, y: -0.2, category: 'animals', color: 'bg-emerald-600' },
    { word: 'Kitten', x: -0.55, y: -0.4, category: 'animals', color: 'bg-emerald-600' },
    { word: 'Computer', x: 0.65, y: -0.6, category: 'tech', color: 'bg-blue-600' },
    { word: 'Neural Net', x: 0.55, y: -0.45, category: 'tech', color: 'bg-blue-600' },
    { word: 'GPU', x: 0.8, y: -0.5, category: 'tech', color: 'bg-blue-600' },
  ];

  const [selectedWords, setSelectedWords] = useState<[WordPoint, WordPoint]>([
    points[0], // King
    points[1], // Queen
  ]);

  const [arithmeticActive, setArithmeticActive] = useState<boolean>(false);

  // Compute Cosine Similarity between 2 selected points
  const p1 = selectedWords[0];
  const p2 = selectedWords[1];

  const dotProduct = p1.x * p2.x + p1.y * p2.y;
  const mag1 = Math.sqrt(p1.x * p1.x + p1.y * p1.y);
  const mag2 = Math.sqrt(p2.x * p2.x + p2.y * p2.y);
  const cosineSim = (dotProduct / (mag1 * mag2)).toFixed(3);
  const euclideanDist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)).toFixed(2);

  const handleSelectWord = (word: WordPoint) => {
    setArithmeticActive(false);
    if (selectedWords[0].word === word.word) return;
    setSelectedWords([selectedWords[1], word]);
  };

  const handleRunArithmetic = () => {
    setArithmeticActive(true);
    // Focus on King and Queen
    const king = points.find((p) => p.word === 'King')!;
    const queen = points.find((p) => p.word === 'Queen')!;
    setSelectedWords([king, queen]);
  };

  return (
    <section id="sec-vector-embeddings" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">07</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            14.7 // Representation Geometry
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Deep Diving into Vector Embeddings
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            Mapping discrete tokens into continuous semantic hyperspace: Cosine Similarity, Dot Products, and Vector Arithmetic.
          </p>
        </div>
      </div>

      {/* Conceptual Explanation in Simple Terms */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917] flex items-center space-x-2">
          <span>📐</span>
          <span>What is a Vector Embedding in Simple Terms?</span>
        </h3>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          Imagine giving every word on Earth GPS coordinates. But instead of latitude and longitude (2 dimensions), an LLM uses <strong>768 to 4,096 dimensions</strong>.
        </p>
        <p className="text-sm text-[#3f3f46] leading-relaxed">
          In this multidimensional geometric space, words that share similar meanings, contexts, or grammatical functions naturally group together. The distance and angle between word vectors encode deep human concepts!
        </p>

        {/* 3 Key Properties */}
        <div className="grid md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
            <div className="font-mono text-xs font-bold text-purple-900 mb-1">
              1. Dense vs. One-Hot
            </div>
            <p className="text-xs text-purple-950 leading-relaxed">
              One-hot vectors waste 99.99% memory on zeros. Dense embeddings pack rich semantic information into floating-point coordinates.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div className="font-mono text-xs font-bold text-blue-900 mb-1">
              2. Cosine Similarity (cos θ)
            </div>
            <p className="text-xs text-blue-950 leading-relaxed">
              Measures the cosine of the angle between two word vectors. If θ = 0°, cos(0°) = 1.0 (identical meaning). If 90°, they are totally unrelated.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="font-mono text-xs font-bold text-emerald-900 mb-1">
              3. Vector Arithmetic
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed">
              Directions encode concepts! Vector(&quot;King&quot;) - Vector(&quot;Man&quot;) + Vector(&quot;Woman&quot;) = Vector(&quot;Queen&quot;).
            </p>
          </div>
        </div>
      </div>

      {/* Interactive 2D Vector Space Playground */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100/70 px-2.5 py-0.5 rounded-full mb-1">
              <span>🧭</span>
              <span>Interactive 2D Semantic Space Canvas</span>
            </div>
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              Click Any 2 Words to Measure Geometric Proximity
            </h4>
          </div>

          <button
            onClick={handleRunArithmetic}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
              arithmeticActive
                ? 'bg-amber-400 text-black shadow-md'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
            }`}
          >
            👑 Animate: King - Man + Woman = Queen
          </button>
        </div>

        {/* 2D Canvas Container */}
        <div className="relative w-full h-80 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-inner p-4 flex items-center justify-center">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>

          {/* Coordinate Axes */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-zinc-700 pointer-events-none" />
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-zinc-700 pointer-events-none" />
          <span className="absolute bottom-2 right-3 font-mono text-[10px] text-zinc-500">
            Semantic Dimension X →
          </span>
          <span className="absolute top-2 left-3 font-mono text-[10px] text-zinc-500">
            ↑ Semantic Dimension Y
          </span>

          {/* Vector Arithmetic visual banner if active */}
          {arithmeticActive && (
            <div className="absolute top-4 bg-purple-900/90 border border-purple-500 text-purple-100 px-4 py-1.5 rounded-full font-mono text-xs shadow-xl animate-bounce z-20">
              Vector(&quot;King&quot;) - Vector(&quot;Man&quot;) + Vector(&quot;Woman&quot;) ≈ Vector(&quot;Queen&quot;)
            </div>
          )}

          {/* Render points */}
          {points.map((pt) => {
            // Map -1..1 to percentage 10%..90%
            const leftPct = ((pt.x + 1) / 2) * 80 + 10;
            const topPct = ((-pt.y + 1) / 2) * 80 + 10;
            const isSelected = selectedWords[0].word === pt.word || selectedWords[1].word === pt.word;

            return (
              <button
                key={pt.word}
                onClick={() => handleSelectWord(pt)}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 px-2.5 py-1 rounded-full font-mono text-xs font-bold transition-all duration-300 z-10 ${
                  isSelected
                    ? 'bg-[#fbbf24] text-black ring-4 ring-amber-400/30 scale-125 shadow-lg'
                    : 'bg-zinc-800/90 text-zinc-200 border border-zinc-700 hover:border-zinc-500 hover:scale-110'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${pt.color}`} />
                <span>{pt.word}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Word Pair Metric Readout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="text-[10px] text-zinc-500 uppercase font-bold">Selected Pair</div>
            <div className="text-sm font-bold text-zinc-900 mt-0.5 truncate">
              {p1.word} ↔ {p2.word}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="text-[10px] text-zinc-500 uppercase font-bold">Cosine Similarity</div>
            <div className={`text-xl font-bold mt-0.5 ${parseFloat(cosineSim) > 0.8 ? 'text-emerald-600' : parseFloat(cosineSim) > 0.4 ? 'text-blue-600' : 'text-zinc-600'}`}>
              {cosineSim}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="text-[10px] text-zinc-500 uppercase font-bold">Euclidean Distance</div>
            <div className="text-xl font-bold text-purple-700 mt-0.5">
              {euclideanDist}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="text-[10px] text-zinc-500 uppercase font-bold">Semantic Relationship</div>
            <div className="text-xs font-bold text-zinc-800 mt-1">
              {p1.category === p2.category ? '🎯 Strong Cluster' : '🌐 Cross-Domain'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
