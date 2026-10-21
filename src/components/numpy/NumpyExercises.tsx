'use client';

import { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';

interface Challenge {
  id: string;
  title: string;
  badge: string;
  problem: string;
  solution: string;
}

export default function NumpyExercises() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const challenges: Challenge[] = [
    {
      id: 'ch-1',
      title: 'Challenge 1: Feature Standardization (Z-Score Normalization)',
      badge: 'Machine Learning Preprocessing',
      problem:
        'Given a 2D feature matrix X of shape (N, D) representing N samples with D features, compute the mean and standard deviation per feature, and normalize X in-place so each column has mean=0 and std=1.',
      solution: `import numpy as np

# Sample dataset: 5 samples, 3 features
X = np.array([
    [10.0, 200.0, 0.5],
    [12.0, 180.0, 0.7],
    [9.0,  210.0, 0.4],
    [15.0, 240.0, 0.9],
    [11.0, 190.0, 0.6]
])

# 1. Compute column-wise statistics (axis=0)
mu = X.mean(axis=0)     # Shape: (3,)
sigma = X.std(axis=0)   # Shape: (3,)

# 2. Vectorized broadcasting normalization: (N, D) - (D,)
X_norm = (X - mu) / sigma

print("Normalized X:\\n", np.round(X_norm, 3))
print("Normalized Mean: ", np.round(X_norm.mean(axis=0), 3)) # [0., 0., 0.]
print("Normalized Std:  ", np.round(X_norm.std(axis=0), 3))  # [1., 1., 1.]`,
    },
    {
      id: 'ch-2',
      title: 'Challenge 2: Pairwise Euclidean Distance Matrix (No Python Loops!)',
      badge: 'Computer Vision & Clustering',
      problem:
        'Given matrix P of shape (N, D) containing N points in D-dimensional space, compute the (N, N) pairwise distance matrix where dist[i, j] is the Euclidean distance between point i and point j using pure broadcasting.',
      solution: `import numpy as np

# 4 points in 2D space
P = np.array([
    [0.0, 0.0],
    [3.0, 4.0],
    [1.0, 1.0],
    [0.0, 5.0]
])

# Broadcasting: (N, 1, D) - (1, N, D) -> (N, N, D)
diff = P[:, np.newaxis, :] - P[np.newaxis, :, :]

# Compute Euclidean Norm across coordinates (axis=-1)
dist_matrix = np.sqrt(np.sum(diff ** 2, axis=-1))

print("Pairwise Distance Matrix (4x4):\\n", np.round(dist_matrix, 2))`,
    },
    {
      id: 'ch-3',
      title: 'Challenge 3: One-Hot Encoding Array Construction',
      badge: 'Deep Learning Classification',
      problem:
        'Given a 1D vector of class label integers y = [0, 2, 1, 0, 3] and num_classes = 4, construct the corresponding (N, num_classes) one-hot binary matrix using np.eye().',
      solution: `import numpy as np

y = np.array([0, 2, 1, 0, 3])
num_classes = 4

# Indexing the identity matrix directly produces one-hot vectors!
one_hot = np.eye(num_classes)[y]

print("Labels:  ", y)
print("One-Hot:\\n", one_hot)`,
    },
  ];

  return (
    <section id="sec-exercises" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#1d4ed8]">
          Module 09 • Applied Labs
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          9. Practical Machine Learning Coding Challenges
        </h2>
      </div>

      <div className="space-y-6">
        {challenges.map((c) => {
          const isOpen = openIds[c.id];
          return (
            <div key={c.id} className="card-paper p-6 rounded-xl border border-[#e2ddd6] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
                  {c.title}
                </h4>
                <span className="font-mono text-[10px] uppercase font-bold bg-[#1d4ed8]/10 text-[#1d4ed8] px-2.5 py-1 rounded-full self-start sm:self-auto">
                  {c.badge}
                </span>
              </div>
              <p className="text-sm text-[#3f3f46] leading-relaxed">
                {c.problem}
              </p>
              <button
                onClick={() => toggle(c.id)}
                className="font-mono text-xs font-bold px-3 py-1.5 rounded bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-[#1c1917] transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <span>{isOpen ? '▲ Hide Solution' : '💡 Reveal Solution & Code'}</span>
              </button>

              {isOpen && (
                <div className="pt-2 animate-fadeIn">
                  <CodeSnippet title="NumPy Vectorized Implementation" code={c.solution} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
