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

export default function PandasExercises() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const challenges: Challenge[] = [
    {
      id: 'ch-pd-1',
      title: 'Challenge 1: Outlier Clamping with IQR (Interquartile Range)',
      badge: 'Feature Engineering',
      problem:
        'Given a DataFrame column of house prices with extreme anomalies, calculate Q1 (25th percentile) and Q3 (75th percentile), determine IQR, and clamp outlier values using .clip().',
      solution: `import pandas as pd

df = pd.DataFrame({
    'House_ID': [1, 2, 3, 4, 5, 6, 7, 8],
    'Price': [250000, 290000, 310000, 280000, 1500000, 320000, 45000, 305000]
})

# 1. Calculate Quartiles & IQR
q1 = df['Price'].quantile(0.25)
q3 = df['Price'].quantile(0.75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

# 2. Vectorized Clamping with .clip()
df['Price_Cleaned'] = df['Price'].clip(lower=lower_bound, upper=upper_bound)

print("Bounds: [", lower_bound, ",", upper_bound, "]")
print(df[['Price', 'Price_Cleaned']])`,
    },
    {
      id: 'ch-pd-2',
      title: 'Challenge 2: Grouped Aggregation & Custom Feature Engineering',
      badge: 'Aggregations & Analytics',
      problem:
        'Given a sales transaction dataset with Store_ID, Department, and Revenue, compute total revenue, mean revenue, and transaction count per Store and Department using .groupby().agg().',
      solution: `import pandas as pd

sales = pd.DataFrame({
    'Store': ['North', 'North', 'South', 'North', 'South', 'South'],
    'Dept': ['Electronics', 'Clothing', 'Electronics', 'Electronics', 'Clothing', 'Clothing'],
    'Revenue': [1200, 450, 2100, 1800, 900, 600]
})

# Multi-level Grouped Aggregation
report = sales.groupby(['Store', 'Dept'])['Revenue'].agg(
    Total_Revenue='sum',
    Average_Revenue='mean',
    Transactions='count'
).reset_index()

print(report)`,
    },
    {
      id: 'ch-pd-3',
      title: 'Challenge 3: One-Hot Categorical Encoding with pd.get_dummies()',
      badge: 'ML Preprocessing Pipeline',
      problem:
        'Given a categorical customer table, convert the "City" and "Subscription_Tier" columns into binary one-hot dummy columns with drop_first=True to avoid collinearity.',
      solution: `import pandas as pd

customers = pd.DataFrame({
    'User_ID': [101, 102, 103, 104],
    'City': ['New York', 'London', 'Tokyo', 'London'],
    'Tier': ['Free', 'Premium', 'Free', 'Enterprise']
})

# One-hot encoding with dummy drop
encoded_df = pd.get_dummies(
    customers, 
    columns=['City', 'Tier'], 
    drop_first=True, 
    dtype=int
)

print(encoded_df)`,
    },
  ];

  return (
    <section id="sec-roadmap" className="space-y-8 mb-16 scroll-mt-20">
      <div className="border-b border-[#e2ddd6] pb-4">
        <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#b45309]">
          Module 08 • Applied Labs
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
          8. Practical Tabular Data Engineering Challenges
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
                <span className="font-mono text-[10px] uppercase font-bold bg-[#b45309]/10 text-[#b45309] px-2.5 py-1 rounded-full self-start sm:self-auto">
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
                  <CodeSnippet title="Pandas Implementation" code={c.solution} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
