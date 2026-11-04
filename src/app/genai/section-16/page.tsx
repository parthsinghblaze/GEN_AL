import Link from 'next/link';
import TopNav from '@/components/common/TopNav';
import ProgressBar from '@/components/common/ProgressBar';
import Sidebar, { NavGroup } from '@/components/common/Sidebar';
import Section16PromptTypes from '@/components/genai/Section16PromptTypes';
import Section16StructuredFewShot from '@/components/genai/Section16StructuredFewShot';
import Section16ChainOfThought from '@/components/genai/Section16ChainOfThought';

export default function Section16Page() {
  const navGroups: NavGroup[] = [
    {
      title: 'Prompt Engineering',
      badge: 'Active',
      defaultOpen: true,
      items: [
        { id: 'sec-prompt-types', num: '01', label: 'Zero, One & Few-Shot Prompting' },
        { id: 'sec-structured-fewshot', num: '02', label: 'Structured Output with Few-Shot' },
        { id: 'sec-chain-of-thought', num: '03', label: 'Chain of Thought (CoT) Reasoning' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1c1917] flex flex-col">
      <ProgressBar />
      <TopNav />

      <div className="flex-1 flex w-full">
        {/* Flat Sidebar strictly for Section 16 */}
        <Sidebar
          title="Section 16"
          version="Prompting"
          subtitle="Advanced Prompt Engineering"
          groups={navGroups}
          accordion={false}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-[280px] w-full min-w-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
            {/* Breadcrumb / Section Switcher Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2ddd6] pb-3 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <Link
                  href="/genai"
                  className="text-zinc-500 hover:text-purple-700 transition-colors"
                >
                  GenAI Hub
                </Link>
                <span className="text-zinc-400">/</span>
                <span className="text-purple-700 font-bold bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                  Section 16 // Advanced Prompt Engineering Techniques
                </span>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <Link
                  href="/genai/section-15"
                  className="text-zinc-600 hover:text-purple-700 font-semibold transition-colors"
                >
                  ← Section 15 (Invoking AI APIs)
                </Link>
              </div>
            </div>

            {/* Section 16 Hero Banner */}
            <header className="card-paper rounded-2xl p-8 sm:p-10 border border-[#e2ddd6] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-500/10 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-[#18181b] text-[#fbbf24] px-3.5 py-1 rounded-full">
                  Section 16 // Module
                </span>
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-purple-700/10 text-purple-800 border border-purple-700/20 px-3 py-1 rounded-full">
                  Advanced Prompt Engineering Techniques
                </span>
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-emerald-700/10 text-emerald-800 border border-emerald-700/20 px-3 py-1 rounded-full">
                  CoT, Few-Shot &amp; Framing
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl font-black tracking-tight text-[#1c1917] mb-4 leading-tight">
                Advanced <span className="text-purple-700">Prompt Engineering Techniques</span>
              </h1>
              
              <p className="text-base sm:text-lg text-[#71717a] font-normal leading-relaxed max-w-3xl mb-6">
                Elevate model reliability and reasoning beyond naive zero-shot queries. Master few-shot exemplars, Chain-of-Thought (CoT), self-consistency sampling, directional stimulus, and production prompt architecture.
              </p>

              {/* Quick Pillars */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-[#e2ddd6]">
                {[
                  { label: 'Prompt Architecture', val: 'Zero-Shot vs Few-Shot' },
                  { label: 'Reasoning Pattern', val: 'Chain-of-Thought (CoT)' },
                  { label: 'Role & Context', val: 'System Prompt Crafting' },
                  { label: 'Output Control', val: 'Delimiters & Guardrails' },
                ].map((p, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/70 border border-[#e2ddd6]/80 backdrop-blur-sm">
                    <div className="font-mono text-xs font-bold text-zinc-900">{p.val}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{p.label}</div>
                  </div>
                ))}
              </div>
            </header>

            {/* Topic 01: Prompting Types: Zero-Shot, One-Shot & Few-Shot Prompting */}
            <Section16PromptTypes />

            {/* Topic 02: Structured Output with Few-Shot Prompting */}
            <Section16StructuredFewShot />

            {/* Topic 03: Chain of Thought (CoT) for Reasoning */}
            <Section16ChainOfThought />
          </div>
        </main>
      </div>
    </div>
  );
}
