import Link from 'next/link';
import TopNav from '@/components/common/TopNav';
import ProgressBar from '@/components/common/ProgressBar';
import Sidebar, { NavGroup } from '@/components/common/Sidebar';
import Section15OpenAiConfig from '@/components/genai/Section15OpenAiConfig';

export default function Section15Page() {
  const navGroups: NavGroup[] = [
    {
      title: '15.1 // Account Setup & Credentials',
      badge: 'Active',
      defaultOpen: true,
      items: [
        { id: 'sec-openai-config', num: '01', label: 'Configuring your OpenAI Account' },
      ],
    },
    {
      title: '15.2 // Upcoming Integration Modules',
      badge: 'Roadmap',
      defaultOpen: true,
      items: [
        { id: 'sec-openai-config', num: '02', label: 'First Chat Completion & Streaming (Preview)' },
        { id: 'sec-openai-config', num: '03', label: 'Structured JSON Outputs & Tools (Preview)' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1c1917] flex flex-col">
      <ProgressBar />
      <TopNav />

      <div className="flex-1 flex w-full">
        {/* Accordion Sidebar strictly for Section 15 Subtopics */}
        <Sidebar
          title="Section 15"
          version="API Setup"
          subtitle="API Setup & Production Integration"
          groups={navGroups}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-[280px] w-full min-w-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
            {/* Breadcrumb / Back Link */}
            <div className="flex items-center justify-between border-b border-[#e2ddd6] pb-3 text-xs font-mono">
              <Link
                href="/genai/section-14"
                className="inline-flex items-center space-x-1.5 text-zinc-500 hover:text-purple-700 transition-colors"
              >
                <span>← Back to Section 14: Core Foundation of Gen AI</span>
              </Link>
              <span className="text-purple-700 font-bold bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                Section 15 // Active Module
              </span>
            </div>

            {/* Section 15 Hero Banner */}
            <header className="card-paper rounded-2xl p-8 sm:p-10 border border-[#e2ddd6] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-[#18181b] text-[#fbbf24] px-3.5 py-1 rounded-full">
                  Section 15 // Module
                </span>
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-emerald-700/10 text-emerald-800 border border-emerald-700/20 px-3 py-1 rounded-full">
                  API Setup & Integration
                </span>
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-purple-700/10 text-purple-800 border border-purple-700/20 px-3 py-1 rounded-full">
                  OpenAI SDK v1.x+
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl font-black tracking-tight text-[#1c1917] mb-4 leading-tight">
                API Setup &amp; <span className="text-purple-700">Production Integration</span>
              </h1>
              
              <p className="text-base sm:text-lg text-[#71717a] font-normal leading-relaxed max-w-3xl mb-6">
                Bridge mathematical foundation models with production software applications. Master platform onboarding, project budget containment, secret credential lifecycles, and zero-leak environment architectures.
              </p>

              {/* Quick Pillars */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-[#e2ddd6]">
                {[
                  { label: 'Platform Portal', val: 'platform.openai.com' },
                  { label: 'Key Format', val: 'sk-proj-...' },
                  { label: 'Credential Storage', val: '.env.local' },
                  { label: 'SDK Client', val: 'openai>=1.0.0' },
                ].map((p, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/70 border border-[#e2ddd6]/80 backdrop-blur-sm">
                    <div className="font-mono text-xs font-bold text-zinc-900">{p.val}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{p.label}</div>
                  </div>
                ))}
              </div>
            </header>

            {/* Topic 1: Configuring your OpenAI Account */}
            <Section15OpenAiConfig />

            {/* Back to Section 14 Navigation Card */}
            <div className="card-paper rounded-2xl p-6 sm:p-8 border border-[#e2ddd6] bg-zinc-50/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 bg-zinc-200/80 px-2 py-0.5 rounded">
                  Need a refresher on Transformer Architecture?
                </span>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-zinc-900">
                  Section 14: Core Foundation of Generative AI
                </h3>
                <p className="text-xs text-zinc-600 max-w-xl">
                  Revisit Tokenization, Subword BPE, Vector Embeddings, Positional Encodings, and Multi-Head Attention mechanisms.
                </p>
              </div>

              <Link
                href="/genai/section-14"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-zinc-900 text-white font-mono text-xs font-bold hover:bg-black shadow transition-all self-start sm:self-auto shrink-0"
              >
                <span>← Back to Section 14</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
