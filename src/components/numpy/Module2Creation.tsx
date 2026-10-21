'use client';

import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function Module2Creation() {
  return (
    <div className="space-y-16 mb-20">
      {/* Group Title Banner */}
      <div className="border-b-2 border-[#1c1917] pb-3 pt-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-[#18181b] text-[#fbbf24] px-3 py-1 rounded">
          02 // Creation & Generators
        </span>
      </div>

      {/* 05. Creation & Dtypes */}
      <section id="sec-creation" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">05</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              05 // Creation & Dtypes
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Array Creation & Explicit Dtypes
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Construct ndarrays with explicit floating point and integer precision specifications.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-2">
            <strong className="text-[#1d4ed8]">np.array([1, 2, 3], dtype=np.float32)</strong>
            <p className="text-[#71717a] font-sans">Explicit float32 (single precision) saves 50% RAM compared to default float64.</p>
          </div>
          <div className="card-paper p-4 rounded-xl border border-[#e2ddd6] space-y-2">
            <strong className="text-[#1d4ed8]">np.asarray(data)</strong>
            <p className="text-[#71717a] font-sans">Zero-copy conversion if data is already an ndarray of the matching dtype.</p>
          </div>
        </div>
      </section>

      {/* 06. Generation Functions */}
      <section id="sec-gen-funcs" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">06</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              06 // Generation Functions
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Built-in Generator Functions
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Fast memory allocators: zeros, ones, full, empty, arange, linspace, and eye.
            </p>
          </div>
        </div>

        <CodeSnippet
          title="Generation Primitives"
          code={`import numpy as np

# Constant Arrays
z = np.zeros((3, 3))             # All 0.0 floats
o = np.ones((2, 4), dtype=int)   # All 1 ints
f = np.full((2, 2), 7.5)         # All 7.5
e = np.empty((3, 3))             # Uninitialized memory (Fastest!)

# Ranges & Diagonal
r = np.arange(0, 10, 2)          # [0, 2, 4, 6, 8]
l = np.linspace(0, 1, 5)         # [0., 0.25, 0.5, 0.75, 1.]
i = np.eye(3)                    # 3x3 Identity Matrix`}
        />
      </section>

      {/* 07. Random Number Gen */}
      <section id="sec-random" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-[#1d4ed8]">07</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              07 // Random Number Gen
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Modern Random Generation (default_rng)
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Thread-safe PCG64 pseudo-random generator in modern NumPy 2.x.
            </p>
          </div>
        </div>

        <CodeSnippet
          title="Generator API"
          code={`rng = np.random.default_rng(seed=42)

uniform_floats = rng.random((3, 3))        # Uniform [0.0, 1.0)
gaussian_vals  = rng.standard_normal((3, 3)) # Standard Normal (mean=0, std=1)
discrete_ints  = rng.integers(10, 50, (2, 4)) # Discrete Integers [10, 50)`}
        />
      </section>
    </div>
  );
}
