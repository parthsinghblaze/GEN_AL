'use client';

import { useState } from 'react';

export default function MatrixOpsLab() {
  const [activeOp, setActiveOp] = useState<'add' | 'mult' | 'dot' | 'transpose' | 'inv' | 'broadcast' | 'norm'>('add');

  const opsPresets = {
    add: {
      symbol: '+',
      matBTitle: 'MATRIX B (2×2)',
      bCols: 2,
      bCells: ['5', '2', '1', '4'],
      resTitle: 'RESULT (A + B)',
      resCols: 2,
      resCells: ['7', '6', '2', '7'],
      breakdown: (
        <div>
          <strong>Calculation Steps:</strong><br />
          • Cell (0,0): 2 + 5 = <strong>7</strong> &nbsp;|&nbsp; Cell (0,1): 4 + 2 = <strong>6</strong><br />
          • Cell (1,0): 1 + 1 = <strong>2</strong> &nbsp;|&nbsp; Cell (1,1): 3 + 4 = <strong>7</strong><br />
          <span className="text-[#fbbf24]">NumPy Code:</span> <code>result = A + B</code> &rarr; Shape: (2, 2)
        </div>
      ),
    },
    mult: {
      symbol: '⊙',
      matBTitle: 'MATRIX B (2×2)',
      bCols: 2,
      bCells: ['5', '2', '1', '4'],
      resTitle: 'RESULT (A * B)',
      resCols: 2,
      resCells: ['10', '8', '1', '12'],
      breakdown: (
        <div>
          <strong>Hadamard (Element-Wise) Multiply:</strong><br />
          • Cell (0,0): 2 × 5 = <strong>10</strong> &nbsp;|&nbsp; Cell (0,1): 4 × 2 = <strong>8</strong><br />
          • Cell (1,0): 1 × 1 = <strong>1</strong> &nbsp;|&nbsp; Cell (1,1): 3 × 4 = <strong>12</strong><br />
          <span className="text-[#fbbf24]">NumPy Code:</span> <code>result = A * B</code> &rarr; Shape: (2, 2)
        </div>
      ),
    },
    dot: {
      symbol: '@',
      matBTitle: 'MATRIX B (2×2)',
      bCols: 2,
      bCells: ['5', '2', '1', '4'],
      resTitle: 'RESULT (A @ B)',
      resCols: 2,
      resCells: ['14', '20', '8', '14'],
      breakdown: (
        <div>
          <strong>Matrix Dot Product (Row × Column Dot):</strong><br />
          • Cell (0,0): (2·5) + (4·1) = <strong>14</strong> &nbsp;|&nbsp; Cell (0,1): (2·2) + (4·4) = <strong>20</strong><br />
          • Cell (1,0): (1·5) + (3·1) = <strong>8</strong> &nbsp;|&nbsp; Cell (1,1): (1·2) + (3·4) = <strong>14</strong><br />
          <span className="text-[#fbbf24]">NumPy Code:</span> <code>result = A @ B</code> &rarr; Shape: (2, 2)
        </div>
      ),
    },
    transpose: {
      symbol: 'ᵀ',
      matBTitle: '— (UNARY)',
      bCols: 1,
      bCells: ['—'],
      resTitle: 'RESULT (A.T)',
      resCols: 2,
      resCells: ['2', '1', '4', '3'],
      breakdown: (
        <div>
          <strong>Matrix Transposition:</strong><br />
          • Rows swap with columns: A[i, j] → A[j, i]<br />
          • Row 0 [2, 4] becomes Col 0 [2, 4]; Row 1 [1, 3] becomes Col 1 [1, 3]<br />
          <span className="text-[#fbbf24]">NumPy Code:</span> <code>result = A.T</code> &rarr; Shape: (2, 2) (Zero-Copy Strides Swap)
        </div>
      ),
    },
    inv: {
      symbol: '⁻¹',
      matBTitle: '— (UNARY)',
      bCols: 1,
      bCells: ['—'],
      resTitle: 'RESULT inv(A)',
      resCols: 2,
      resCells: ['1.5', '-2.0', '-0.5', '1.0'],
      breakdown: (
        <div>
          • Inverse: 1/2 × [[3, -4], [-1, 2]] = [[1.5, -2.0], [-0.5, 1.0]]<br />
          <span className="text-[#fbbf24]">NumPy Code:</span> <code>result = np.linalg.inv(A)</code>
        </div>
      ),
    },
    broadcast: {
      symbol: '+',
      matBTitle: 'ROW BIAS (1×2)',
      bCols: 2,
      bCells: ['10', '20'],
      resTitle: 'RESULT (Broadcast)',
      resCols: 2,
      resCells: ['12', '24', '11', '23'],
      breakdown: (
        <div>
          <strong>Row Vector Broadcasting:</strong><br />
          • Vector <code>[10, 20]</code> stretches to both rows of A:<br />
          • Row 0: [2+10, 4+20] = [12, 24]<br />
          • Row 1: [1+10, 3+20] = [11, 23]<br />
          <span className="text-[#fbbf24]">NumPy Code:</span> <code>result = A + np.array([10, 20])</code>
        </div>
      ),
    },
    norm: {
      symbol: '‖·‖',
      matBTitle: '— (UNARY)',
      bCols: 1,
      bCells: ['—'],
      resTitle: 'FROBENIUS NORM',
      resCols: 1,
      resCells: ['5.477'],
      breakdown: (
        <div>
          <strong>Frobenius Matrix Norm:</strong><br />
          • $\|A\|_F = \sqrt{2^2 + 4^2 + 1^2 + 3^2} = \sqrt{4 + 16 + 1 + 9} = \sqrt{30} \approx 5.477$<br />
          <span className="text-[#fbbf24]">NumPy Code:</span> <code>result = np.linalg.norm(A)</code> &rarr; Scalar float
        </div>
      ),
    },
  };

  const current = opsPresets[activeOp];

  return (
    <div className="card-dark rounded-xl p-6 border border-[#27272a] shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
        <div>
          <h3 className="font-editorial text-xl font-bold text-[#fbbf24]">
            Interactive Matrix Math & Operations Lab
          </h3>
          <p className="text-xs text-[#a1a1aa] font-mono mt-1">
            Compare element-wise arithmetic, dot products, transpositions, and broadcasting visually.
          </p>
        </div>
      </div>

      {/* Operation Tabs */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveOp('add')} className={`tab-btn ${activeOp === 'add' ? 'active' : ''}`}>
          A + B (Addition)
        </button>
        <button onClick={() => setActiveOp('mult')} className={`tab-btn ${activeOp === 'mult' ? 'active' : ''}`}>
          A * B (Hadamard)
        </button>
        <button onClick={() => setActiveOp('dot')} className={`tab-btn ${activeOp === 'dot' ? 'active' : ''}`}>
          A @ B (Matrix Dot)
        </button>
        <button onClick={() => setActiveOp('transpose')} className={`tab-btn ${activeOp === 'transpose' ? 'active' : ''}`}>
          A.T (Transpose)
        </button>
        <button onClick={() => setActiveOp('inv')} className={`tab-btn ${activeOp === 'inv' ? 'active' : ''}`}>
          inv(A) (Inverse)
        </button>
        <button onClick={() => setActiveOp('broadcast')} className={`tab-btn ${activeOp === 'broadcast' ? 'active' : ''}`}>
          A + [10, 20] (Broadcast)
        </button>
        <button onClick={() => setActiveOp('norm')} className={`tab-btn ${activeOp === 'norm' ? 'active' : ''}`}>
          norm(A) (Frobenius)
        </button>
      </div>

      {/* Matrix Math Stage */}
      <div className="p-6 rounded-xl bg-[#141416] border border-[#27272a]">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-center">
          {/* Matrix A */}
          <div>
            <div className="font-mono text-[10px] text-[#71717a] uppercase mb-2 font-bold">
              MATRIX A (2×2)
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['2', '4', '1', '3'].map((val, idx) => (
                <div key={idx} className="w-11 h-11 flex items-center justify-center font-mono font-bold text-sm rounded bg-[#27272a] border border-[#3f3f46] text-[#f4f4f5]">
                  {val}
                </div>
              ))}
            </div>
          </div>

          {/* Operation Symbol */}
          <div className="font-mono text-2xl font-black text-[#fbbf24] px-2">
            {current.symbol}
          </div>

          {/* Matrix B */}
          <div>
            <div className="font-mono text-[10px] text-[#71717a] uppercase mb-2 font-bold">
              {current.matBTitle}
            </div>
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${current.bCols}, 44px)` }}
            >
              {current.bCells.map((val, idx) => (
                <div key={idx} className="w-11 h-11 flex items-center justify-center font-mono font-bold text-sm rounded bg-[#27272a] border border-[#3f3f46] text-[#f4f4f5]">
                  {val}
                </div>
              ))}
            </div>
          </div>

          {/* Equals Symbol */}
          <div className="font-mono text-2xl font-black text-[#fbbf24] px-2">
            =
          </div>

          {/* Result Matrix */}
          <div>
            <div className="font-mono text-[10px] text-emerald-400 uppercase mb-2 font-bold">
              {current.resTitle}
            </div>
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${current.resCols}, minmax(44px, auto))` }}
            >
              {current.resCells.map((val, idx) => (
                <div key={idx} className="h-11 px-3 flex items-center justify-center font-mono font-bold text-sm rounded bg-emerald-950/50 border border-emerald-500 text-emerald-300 shadow">
                  {val}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step-by-Step Breakdown */}
        <div className="mt-6 p-4 rounded-lg bg-[#09090b] border border-[#27272a] font-mono text-xs text-[#a1a1aa] leading-relaxed">
          {current.breakdown}
        </div>
      </div>
    </div>
  );
}
