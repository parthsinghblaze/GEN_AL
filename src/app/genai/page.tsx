import Link from 'next/link';
import TopNav from '@/components/common/TopNav';
import ProgressBar from '@/components/common/ProgressBar';
import Sidebar, { NavGroup } from '@/components/common/Sidebar';

export default function GenAiHubPage() {
  const navGroups: NavGroup[] = [
    {
      title: 'Course Sections',
      badge: 'Hub',
      defaultOpen: true,
      items: [
        { id: 'sec-overview', num: '00', label: 'Masterclass Overview' },
        { id: 'sec-14-card', num: '14', label: 'Section 14: Core Foundations' },
        { id: 'sec-15-card', num: '15', label: 'Section 15: API Integration' },
        { id: 'sec-roadmap', num: '16', label: 'Full Course Roadmap' },
      ],
    },
  ];

  const sec14Topics = [
    '01. Understanding Large Language Models (Scale & VRAM Simulator)',
    '02. Deep Dive into the GPT Architecture (Animated Decoder Stack)',
    '03. How LLMs Work Under the Hood (Temperature & Top-K Sampling)',
    '04. Fundamentals of Tokenization in NLP (Subword vs Word)',
    '05. Implementing a Custom Tokenizer in Python (Interactive BPE Lab)',
    '06. The Transformer Breakthrough (Google 2017 Paper on Attention)',
    '07. Deep Diving into Vector Embeddings (2D Semantic Hyperspace)',
    '08. Role of Positional Encoding in Transformers (Sin/Cos Waves)',
    '09. Understanding Multi-Head Attention for Rich Content (QKV Heatmap)',
    '10. Section 14 Knowledge Checkpoint & Interactive Flashcards',
  ];

  const sec15Topics = [
    '01. Configuring your OpenAI Account (Developer Platform)',
    '02. Project Scoping & Spend Limit Safeguards ($5–$150/mo)',
    '03. Zero-Leak Credential Security (.env + .gitignore)',
    '04. Live API Handshake & Model Verification Ping',
    '05. Official Python SDK v1.x Setup & Error Handling',
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1c1917] flex flex-col">
      <ProgressBar />
      <TopNav />

      <div className="flex-1 flex w-full">
        {/* Accordion Sidebar strictly for Course Directory */}
        <Sidebar
          title="Gen AI"
          version="Directory"
          subtitle="Generative AI Course Hub"
          groups={navGroups}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-[280px] w-full min-w-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
            {/* Hub Header */}
            <header id="sec-overview" className="card-paper rounded-3xl p-8 sm:p-10 border border-[#e2ddd6] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-amber-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-[#18181b] text-[#fbbf24] px-3.5 py-1 rounded-full">
                  Curriculum Hub
                </span>
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-purple-700/10 text-purple-800 border border-purple-700/20 px-3 py-1 rounded-full">
                  Sections 14 &amp; 15 Available
                </span>
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-emerald-700/10 text-emerald-800 border border-emerald-700/20 px-3 py-1 rounded-full">
                  Interactive Simulators
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl font-black tracking-tight text-[#1c1917] mb-4 leading-tight">
                Generative AI <span className="text-purple-700">Masterclass Notes</span>
              </h1>

              <p className="text-base sm:text-lg text-[#71717a] font-normal leading-relaxed max-w-3xl mb-8">
                Welcome to the Generative AI study guide. Select a section below to enter its dedicated workspace with complete component breakdowns, interactive visualizers, and code implementations.
              </p>

              {/* Course Highlights Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-[#e2ddd6]">
                {[
                  { val: 'Section 14', label: 'Core Foundation', desc: 'LLMs, GPT, Attention, Vectors' },
                  { val: 'Section 15', label: 'API Setup', desc: 'OpenAI, Keys, Spend Caps' },
                  { val: '5 Simulators', label: 'Interactive Labs', desc: 'Temperature, BPE, Waves, Heatmap' },
                  { val: 'Production', label: 'Code Standards', desc: 'PyTorch & Official OpenAI SDK' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/70 border border-[#e2ddd6]/80 backdrop-blur-sm">
                    <div className="font-editorial text-xl font-bold text-purple-700">{item.val}</div>
                    <div className="font-mono text-[10px] font-bold uppercase text-zinc-800 mt-0.5">{item.label}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>
            </header>

            {/* Section Selection Cards */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#e2ddd6] pb-3">
                <div>
                  <h2 className="font-editorial text-2xl font-bold text-zinc-900">
                    Available Course Sections
                  </h2>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">
                    Click a section card below to open its dedicated study guide and sidebar topic index.
                  </p>
                </div>
                <span className="font-mono text-xs font-bold bg-purple-100 text-purple-800 px-3 py-1 rounded-full border border-purple-200">
                  2 Sections Ready
                </span>
              </div>

              {/* SECTION 14 CARD */}
              <div id="sec-14-card" className="card-paper rounded-3xl p-7 sm:p-9 border-2 border-purple-300 hover:border-purple-600 transition-all duration-300 hover:shadow-xl bg-white relative overflow-hidden group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs uppercase font-bold tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-3 py-0.5 rounded-full">
                        Section 14 // Foundation Masterclass
                      </span>
                      <span className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        10 Subtopics
                      </span>
                    </div>

                    <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-zinc-900 group-hover:text-purple-700 transition-colors">
                      Core Foundation of Generative AI
                    </h3>

                    <p className="text-xs font-mono text-zinc-500">
                      LLMs, GPT Decoder Stack, Tokenization Math, Vector Hyperspace &amp; Multi-Head Attention
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-purple-900/10 text-purple-700 flex items-center justify-center text-2xl shrink-0 border border-purple-200">
                    🧠
                  </div>
                </div>

                <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                  Master the foundational mathematical and architectural building blocks powering modern Large Language Models. Learn autoregressive next-token prediction, implement a custom Byte-Pair Encoding (BPE) tokenizer in Python from scratch, explore 2D semantic embedding vectors, oscillate sinusoidal positional waves, and compute Scaled Dot-Product Attention.
                </p>

                {/* Subtopics Checklist */}
                <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200/80 mb-6">
                  <div className="font-mono text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-3">
                    Included Subtopics &amp; Interactive Simulators:
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-700">
                    {sec14Topics.map((t, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="text-purple-600 font-bold">✓</span>
                        <span className="truncate">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-zinc-500 font-mono">
                    Includes 5 interactive visualizers + 3 code references
                  </div>
                  <Link
                    href="/genai/section-14"
                    className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-mono text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    <span>Open Section 14 Notes →</span>
                  </Link>
                </div>
              </div>

              {/* SECTION 15 CARD */}
              <div id="sec-15-card" className="card-paper rounded-3xl p-7 sm:p-9 border-2 border-emerald-300 hover:border-emerald-600 transition-all duration-300 hover:shadow-xl bg-white relative overflow-hidden group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
                        Section 15 // Integration Masterclass
                      </span>
                      <span className="font-mono text-[10px] text-purple-700 font-bold bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                        Developer Setup
                      </span>
                    </div>

                    <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                      API Setup &amp; Production Integration
                    </h3>

                    <p className="text-xs font-mono text-zinc-500">
                      OpenAI Developer Platform, Projects Isolation, Spend Caps &amp; Official SDKs
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-emerald-900/10 text-emerald-700 flex items-center justify-center text-2xl shrink-0 border border-emerald-200">
                    🔑
                  </div>
                </div>

                <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                  Transition from theoretical machine learning to production software development. Learn how to create and scope OpenAI Project environments, enforce strict monthly spend limits ($10) to prevent runaway bills, implement zero-leak security (.env + .gitignore), and execute your first programmatic model connection using the modern Python SDK.
                </p>

                {/* Subtopics Checklist */}
                <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200/80 mb-6">
                  <div className="font-mono text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-3">
                    Included Subtopics &amp; Developer Sandbox:
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-700">
                    {sec15Topics.map((t, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span className="truncate">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-zinc-500 font-mono">
                    Includes 4-tab interactive sandbox + Python SDK v1.x reference
                  </div>
                  <Link
                    href="/genai/section-15"
                    className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    <span>Open Section 15 Notes →</span>
                  </Link>
                </div>
              </div>

              {/* SECTION 16 ROADMAP PREVIEW */}
              <div id="sec-roadmap" className="card-paper rounded-2xl p-6 border border-dashed border-zinc-300 bg-zinc-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 bg-zinc-200 px-2 py-0.5 rounded">
                      Roadmap // Upcoming
                    </span>
                    <span className="font-mono text-xs font-bold text-zinc-700">
                      Section 16: Prompt Engineering, Tool Calling &amp; RAG
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">
                    Structured outputs with Pydantic, Function Calling, Retrieval-Augmented Generation with Vector DBs.
                  </p>
                </div>
                <span className="font-mono text-[11px] text-zinc-400 font-bold shrink-0">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
