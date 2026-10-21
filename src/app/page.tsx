import Link from 'next/link';
import TopNav from '@/components/common/TopNav';
import ProgressBar from '@/components/common/ProgressBar';

export default function Home() {
  const notesModules = [
    {
      id: 'numpy',
      title: 'NumPy Masterclass Notes',
      subtitle: 'Contiguous C-Memory, Vectorization & High-Throughput Tensor Primitives',
      href: '/numpy',
      icon: '🔢',
      version: 'NumPy 2.x',
      badgeColor: 'bg-blue-600/10 text-blue-700 border-blue-600/20',
      accentColor: 'text-[#1d4ed8]',
      borderHover: 'hover:border-[#1d4ed8]/40 hover:shadow-blue-500/10',
      description:
        'Master the foundational N-dimensional array abstraction powering modern deep learning. Dive into raw C-buffer memory layouts, zero-copy views, broadcasting rules, and hardware SIMD acceleration.',
      topics: [
        'ndarray Anatomy (Pointer, Strides, Shape, Dtype)',
        'RAM Layout vs Python Pointer Boxing (Benchmark Simulator)',
        '1D & 2D Slicing Views vs Allocated Copies',
        'Interactive 4x4 Matrix Slicer Lab',
        'Mathematical Broadcasting Rules (Trailing Dimensions)',
        'Interactive 2x2 Matrix Math & LAPACK Operations Lab',
        '9 Interactive Architectural Quiz Questions',
        '3 Applied Machine Learning Coding Challenges',
      ],
      ctaText: 'Explore NumPy Notes →',
    },
    {
      id: 'pandas',
      title: 'Pandas Masterclass Notes',
      subtitle: 'Tabular Data Engineering, Label-Aware Alignment & PyArrow 2.0',
      href: '/pandas',
      icon: '🐼',
      version: 'Pandas 2.2',
      badgeColor: 'bg-amber-600/10 text-amber-800 border-amber-600/20',
      accentColor: 'text-[#b45309]',
      borderHover: 'hover:border-[#b45309]/40 hover:shadow-amber-500/10',
      description:
        'Complete architectural guide to relational tabular structures in Python. Learn Series vs DataFrame internal mechanics, automatic index alignment math, Apache Arrow columnar memory, and clean data pipelines.',
      topics: [
        'Series Anatomy & Dual-Indexing (Label vs Positional)',
        'Interactive Automatic Label Alignment Calculator',
        'Interactive Series Builder Lab (5 Data Structures)',
        'DataFrame 2D Layout & Apache Arrow Columnar Backend',
        'Column Selection (Series vs DF) & Assignment Rules',
        'Dual Indexing: .loc (Inclusive) vs .iloc (Exclusive)',
        'Interactive 5x4 DataFrame Slicer & Filter Lab',
        'Missing Data Imputation Lab (Median, ffill, dropna)',
      ],
      ctaText: 'Explore Pandas Notes →',
    },
  ];

  const quickPillars = [
    { name: 'Contiguous C-Memory', desc: 'No PyObject wrapping overhead' },
    { name: 'SIMD Vectorization', desc: '50-100x hardware speedups' },
    { name: 'Label Alignment', desc: 'Zero accidental row mismatch' },
    { name: 'PyArrow 2.0 Backend', desc: 'Up to 70% memory reduction' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1c1917] flex flex-col">
      <ProgressBar />
      <TopNav />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 w-full">
        <div className="card-paper rounded-3xl p-8 sm:p-12 border border-[#e2ddd6] shadow-sm relative overflow-hidden text-center sm:text-left">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-amber-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase font-bold tracking-widest bg-[#18181b] text-[#fbbf24] px-3.5 py-1 rounded-full mb-6">
            <span>📚</span>
            <span>AI & Machine Learning Interactive Notes</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1c1917] mb-6 leading-tight">
            Comprehensive Visual & Architectural{' '}
            <span className="text-[#1d4ed8]">Data Science</span> Notes
          </h1>

          <p className="text-base sm:text-lg text-[#71717a] max-w-3xl leading-relaxed mb-8">
            An interactive, modular notes platform breaking down core numerical computing and tabular engineering architectures into component-wise visualizers, interactive labs, quizzes, and code references.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-[#e2ddd6]">
            {quickPillars.map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/70 border border-[#e2ddd6]/80 backdrop-blur-sm">
                <div className="font-mono text-xs font-bold text-[#1c1917]">{p.name}</div>
                <div className="text-[11px] text-[#71717a] mt-0.5">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Module Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#e2ddd6]">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Available Interactive Modules
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Select a module below to open the dedicated full-screen interactive study guide.
            </p>
          </div>
          <span className="font-mono text-xs font-bold bg-zinc-200 text-zinc-800 px-3 py-1 rounded-full">
            2 Modules Ready
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {notesModules.map((mod) => (
            <div
              key={mod.id}
              className={`card-paper rounded-2xl p-7 border border-[#e2ddd6] shadow-sm transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${mod.borderHover}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#141416] flex items-center justify-center text-2xl shadow-inner">
                    {mod.icon}
                  </div>
                  <span
                    className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${mod.badgeColor}`}
                  >
                    {mod.version}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl font-bold text-[#1c1917] mb-2">
                  {mod.title}
                </h3>
                <p className="font-mono text-xs text-[#71717a] mb-4">
                  {mod.subtitle}
                </p>
                <p className="text-sm text-[#3f3f46] leading-relaxed mb-6">
                  {mod.description}
                </p>

                {/* Topics list */}
                <div className="space-y-2 mb-8 bg-zinc-50/80 p-4 rounded-xl border border-zinc-200/80">
                  <div className="font-mono text-[10px] font-bold text-[#71717a] uppercase tracking-wider mb-2">
                    Included Components & Labs:
                  </div>
                  <ul className="text-xs font-sans space-y-1.5 text-[#3f3f46]">
                    {mod.topics.map((t, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[#fbbf24] font-bold">✓</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={mod.href}
                className="w-full text-center py-3.5 px-6 rounded-xl font-mono text-xs font-bold bg-[#141416] text-[#fbbf24] hover:bg-black hover:text-white transition-all shadow-md flex items-center justify-center space-x-2 group"
              >
                <span>{mod.ctaText}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#e2ddd6] bg-[#fdfbf8] py-8 text-center text-xs text-[#71717a] font-mono">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p>AI & Machine Learning Visual Notes • Built with Next.js 16 & React 19</p>
          <p className="text-[11px] text-[#a1a1aa]">Contiguous C Memory • SIMD Vectorization • Relational Index Alignment • Apache Arrow</p>
        </div>
      </footer>
    </div>
  );
}
