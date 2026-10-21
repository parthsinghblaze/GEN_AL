import React from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function CreationMethods() {
  return (
    <section id="sec-creation" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#1d4ed8]">
          Module 03 • Array Initialization
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          3. Array Creation & High-Speed Generators
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-paper p-5 rounded-xl border border-[#e2ddd6] space-y-3">
          <span className="font-mono text-xs font-bold text-[#1d4ed8] uppercase">
            Constant Fill Arrays
          </span>
          <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
            zeros, ones, full & empty
          </h4>
          <p className="text-xs text-[#71717a] leading-relaxed">
            Fast memory allocators. <code>np.empty()</code> is the fastest as it allocates uninitialized RAM without zeroing bytes.
          </p>
          <div className="p-2.5 rounded bg-[#18181b] text-white font-mono text-xs">
            <span className="text-rose-400">np.zeros</span>((2, 3), dtype=int)<br/>
            <span className="text-rose-400">np.ones</span>((3, 3))<br/>
            <span className="text-rose-400">np.full</span>((2, 2), fill_value=7)<br/>
            <span className="text-rose-400">np.empty</span>((4, 4))
          </div>
        </div>

        <div className="card-paper p-5 rounded-xl border border-[#e2ddd6] space-y-3">
          <span className="font-mono text-xs font-bold text-[#b45309] uppercase">
            Range & Grid Builders
          </span>
          <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
            arange, linspace & logspace
          </h4>
          <p className="text-xs text-[#71717a] leading-relaxed">
            <code>np.arange(start, stop, step)</code> uses step size, while <code>np.linspace(start, stop, num)</code> generates precise evenly spaced sample points.
          </p>
          <div className="p-2.5 rounded bg-[#18181b] text-white font-mono text-xs">
            <span className="text-amber-400">np.arange</span>(0, 10, 2)<br/>
            <span className="text-emerald-400"># [0, 2, 4, 6, 8]</span><br/>
            <span className="text-amber-400">np.linspace</span>(0, 1, 5)<br/>
            <span className="text-emerald-400"># [0., 0.25, 0.5, 0.75, 1.]</span>
          </div>
        </div>

        <div className="card-paper p-5 rounded-xl border border-[#e2ddd6] space-y-3">
          <span className="font-mono text-xs font-bold text-[#047857] uppercase">
            Linear Algebra & Diagonal
          </span>
          <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
            eye, identity & diag
          </h4>
          <p className="text-xs text-[#71717a] leading-relaxed">
            Construct identity matrices and diagonal arrays for weight regularization, covariance matrices, and transformations.
          </p>
          <div className="p-2.5 rounded bg-[#18181b] text-white font-mono text-xs">
            <span className="text-sky-400">np.eye</span>(3, 3)<br/>
            <span className="text-sky-400">np.diag</span>([10, 20, 30])
          </div>
        </div>
      </div>

      <CodeSnippet
        title="Modern Random Generation API (default_rng)"
        code={`import numpy as np

# Modern NumPy 2.x Best Practice: Use default_rng (PCG64 generator)
rng = np.random.default_rng(seed=42)

# 1. Uniform floats in [0.0, 1.0)
uniform_data = rng.random((2, 3))

# 2. Standard Normal Gaussian distribution (mean=0, std=1)
normal_weights = rng.standard_normal((3, 3))

# 3. Discrete Integers in [10, 50)
random_integers = rng.integers(low=10, high=50, size=(2, 4))

print("Normal Weights:\\n", normal_weights)`}
        output={`Normal Weights:
 [[ 0.30471708 -1.03998411  0.7504512 ]
  [ 0.94056472 -1.95103519 -1.30217951]
  [ 0.1278404   0.21867144  0.47055964]]`}
      />

      <NoteCallout type="danger" title="Legacy np.random Deprecation Notice">
        Avoid using legacy global functions like <code>np.random.seed()</code>, <code>np.random.rand()</code>, or <code>np.random.randn()</code>. They rely on the slower Mersenne Twister and are not thread-safe. Always use <code>np.random.default_rng()</code>.
      </NoteCallout>
    </section>
  );
}
