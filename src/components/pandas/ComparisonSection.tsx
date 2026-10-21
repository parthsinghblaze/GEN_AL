import React from 'react';
import NoteCallout from '@/components/common/NoteCallout';

export default function ComparisonSection() {
  return (
    <section id="sec-comparison" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#b45309]">
          Module 06 • Ecosystem Architecture
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          6. Comparison Matrix: NumPy vs Pandas vs SQL vs Polars
        </h2>
      </div>

      <div className="card-paper rounded-xl overflow-hidden border border-[#e2ddd6] shadow-sm">
        <div className="p-4 bg-[#141416] text-white border-b border-[#27272a] flex items-center justify-between">
          <span className="font-mono text-xs uppercase font-bold text-[#fbbf24]">
            Data Processing Engines Comparison
          </span>
          <span className="font-mono text-[10px] text-[#a1a1aa]">Performance & Semantics</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-100 text-[#71717a] border-b border-[#e2ddd6]">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3 text-[#1d4ed8]">NumPy</th>
                <th className="p-3 text-[#b45309]">Pandas</th>
                <th className="p-3 text-[#047857]">SQL</th>
                <th className="p-3 text-purple-700">Polars</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2ddd6] text-[#3f3f46]">
              <tr>
                <td className="p-3 font-bold">Primary Data Model</td>
                <td className="p-3">N-Dim Homogeneous Array</td>
                <td className="p-3">2D Labeled Heterogeneous Table</td>
                <td className="p-3">Relational Tables (ACID)</td>
                <td className="p-3">Arrow Columnar Table</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Execution Engine</td>
                <td className="p-3">C / SIMD Vectorized</td>
                <td className="p-3">Cython / PyArrow / C</td>
                <td className="p-3">Optimized DB Query Plan</td>
                <td className="p-3">Rust Multi-threaded SIMD</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Memory Layout</td>
                <td className="p-3">Contiguous C-Buffer</td>
                <td className="p-3">BlockManager / Apache Arrow</td>
                <td className="p-3">Disk Pages / Buffer Pool</td>
                <td className="p-3">Apache Arrow Columnar</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Evaluation Type</td>
                <td className="p-3">Eager</td>
                <td className="p-3">Eager</td>
                <td className="p-3">Lazy / Declarative</td>
                <td className="p-3">Lazy & Eager Query Engine</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Best Use Case</td>
                <td className="p-3">Linear algebra, Tensors, DSP</td>
                <td className="p-3">Data exploration & ML prep</td>
                <td className="p-3">Transactional data & Warehousing</td>
                <td className="p-3">Large-scale out-of-core pipelines</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <NoteCallout type="info" title="The Modern Data Stack Hierarchy">
        In real-world data science: <strong>SQL</strong> extracts aggregated subsets from the database &rarr; <strong>Pandas / PyArrow</strong> cleans, pivots, and engineers features &rarr; <strong>NumPy</strong> feeds numerical weight matrices directly into PyTorch or Scikit-Learn!
      </NoteCallout>
    </section>
  );
}
