import Link from 'next/link';
import TopNav from '@/components/common/TopNav';
import ProgressBar from '@/components/common/ProgressBar';
import Sidebar, { NavGroup } from '@/components/common/Sidebar';
import Section15OpenAiConfig from '@/components/genai/Section15OpenAiConfig';
import Section15GeminiConfig from '@/components/genai/Section15GeminiConfig';
import Section15GeminiOpenAiCompat from '@/components/genai/Section15GeminiOpenAiCompat';

export default function Section15Page() {
  const navGroups: NavGroup[] = [
    {
      title: 'Invoking AI APIs',
      badge: 'Active',
      defaultOpen: true,
      items: [
        { id: 'sec-openai-config', num: '01', label: 'Invoking OpenAI APIs' },
        { id: 'sec-gemini-config', num: '02', label: 'Setting up Google Gemini Account' },
        { id: 'sec-openai-compat', num: '03', label: 'Using Gemini with OpenAI SDK' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1c1917] flex flex-col">
      <ProgressBar />
      <TopNav />

      <div className="flex-1 flex w-full">
        {/* Flat Sidebar strictly for Section 15 */}
        <Sidebar
          title="Section 15"
          version="API Setup"
          subtitle="OpenAI & Gemini APIs"
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
                  Section 15 // Invoking AI APIs
                </span>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <Link
                  href="/genai/python-setup"
                  className="text-zinc-600 hover:text-purple-700 font-semibold transition-colors"
                >
                  🐍 Python &amp; venv Guide →
                </Link>
                <Link
                  href="/genai/section-14"
                  className="text-zinc-600 hover:text-purple-700 font-semibold transition-colors"
                >
                  ← Section 14 (Foundations)
                </Link>
              </div>
            </div>

            {/* Section 15 Hero Banner */}
            <header className="card-paper rounded-2xl p-8 sm:p-10 border border-[#e2ddd6] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-[#18181b] text-[#fbbf24] px-3.5 py-1 rounded-full">
                  Section 15 // Module
                </span>
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-emerald-700/10 text-emerald-800 border border-emerald-700/20 px-3 py-1 rounded-full">
                  Invoking AI APIs
                </span>
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-purple-700/10 text-purple-800 border border-purple-700/20 px-3 py-1 rounded-full">
                  OpenAI &amp; Google Gemini
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl font-black tracking-tight text-[#1c1917] mb-4 leading-tight">
                Invoking <span className="text-purple-700">AI APIs</span>
              </h1>
              
              <p className="text-base sm:text-lg text-[#71717a] font-normal leading-relaxed max-w-3xl mb-6">
                Bridge mathematical foundation models with production software applications. Master platform onboarding, API key lifecycle management, and zero-leak environment configurations across OpenAI and Google Gemini.
              </p>

              {/* Quick Pillars */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-[#e2ddd6]">
                {[
                  { label: 'OpenAI Portal', val: 'platform.openai.com' },
                  { label: 'Gemini Portal', val: 'aistudio.google.com' },
                  { label: 'Secret Storage', val: '.env (gitignored)' },
                  { label: 'SDK Clients', val: 'openai & google-genai' },
                ].map((p, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/70 border border-[#e2ddd6]/80 backdrop-blur-sm">
                    <div className="font-mono text-xs font-bold text-zinc-900">{p.val}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{p.label}</div>
                  </div>
                ))}
              </div>
            </header>

            {/* Topic 01: Configuring your OpenAI Account & Interactive Sandbox */}
            <Section15OpenAiConfig />

            {/* Topic 02: Creating and Setting up Google Gemini Account & SDK */}
            <Section15GeminiConfig />

            {/* Topic 03: Using Google Gemini with OpenAI-Compatible APIs */}
            <Section15GeminiOpenAiCompat />


          </div>
        </main>
      </div>
    </div>
  );
}
