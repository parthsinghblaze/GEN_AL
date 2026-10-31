import Link from 'next/link';
import TopNav from '@/components/common/TopNav';
import ProgressBar from '@/components/common/ProgressBar';
import Sidebar, { NavGroup } from '@/components/common/Sidebar';
import PythonProjectSetupGuide from '@/components/genai/PythonProjectSetupGuide';

export default function PythonProjectSetupPage() {
  const navGroups: NavGroup[] = [
    {
      title: '01 // Core Architecture & Shell',
      badge: '3 Topics',
      defaultOpen: true,
      items: [
        { id: 'sec-why-venv', num: '01', label: 'Why Virtual Environments Matter' },
        { id: 'sec-cli-simulator', num: '02', label: 'Interactive Multi-OS CLI Simulator' },
        { id: 'sec-activation-matrix', num: '03', label: 'Activation & PowerShell Gotcha' },
      ],
    },
    {
      title: '02 // Scaffolding & Security',
      badge: '3 Topics',
      defaultOpen: true,
      items: [
        { id: 'sec-project-anatomy', num: '04', label: 'Production Directory Anatomy' },
        { id: 'sec-security-leak', num: '05', label: 'Zero-Leak Security Architecture' },
        { id: 'sec-package-managers', num: '06', label: 'Tooling: pip vs uv vs conda' },
      ],
    },
    {
      title: '03 // Workflow & Verification',
      badge: '4 Topics',
      defaultOpen: true,
      items: [
        { id: 'sec-ide-vscode', num: '07', label: 'VS Code & IDE Integration' },
        { id: 'sec-troubleshooting', num: '08', label: 'Troubleshooting Wizard (5 Traps)' },
        { id: 'sec-starter-templates', num: '09', label: 'Production Starter Boilerplate' },
        { id: 'sec-readiness-quiz', num: '10', label: 'Knowledge Checkpoint & Quiz' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1c1917] flex flex-col">
      <ProgressBar />
      <TopNav />

      <div className="flex-1 flex w-full">
        {/* Accordion Sidebar strictly for Python Project Setup Topics */}
        <Sidebar
          title="Python Setup"
          version="venv & Tools"
          subtitle="Virtual Environments & Scaffolding"
          groups={navGroups}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-[280px] w-full min-w-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
            {/* Breadcrumb / Top Navigation Links */}
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
                  Prerequisites // Python &amp; venv
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Link
                  href="/genai/section-14"
                  className="text-zinc-600 hover:text-purple-700 font-semibold transition-colors"
                >
                  Section 14 (Foundations) →
                </Link>
                <Link
                  href="/genai/section-15"
                  className="text-zinc-600 hover:text-purple-700 font-semibold transition-colors"
                >
                  Section 15 (API Setup) →
                </Link>
              </div>
            </div>

            {/* Hero Header */}
            <header className="card-paper rounded-3xl p-8 sm:p-10 border border-[#e2ddd6] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-[#18181b] text-[#fbbf24] px-3.5 py-1 rounded-full">
                  Engineering Prerequisite
                </span>
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-emerald-700/10 text-emerald-800 border border-emerald-700/20 px-3 py-1 rounded-full">
                  Virtual Environments
                </span>
                <span className="font-mono text-xs uppercase font-bold tracking-widest bg-purple-700/10 text-purple-800 border border-purple-700/20 px-3 py-1 rounded-full">
                  venv &amp; uv Guide
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl font-black tracking-tight text-[#1c1917] mb-4 leading-tight">
                How to Start a Python Project <span className="text-purple-700">with venv &amp; Modern Tooling</span>
              </h1>

              <p className="text-base sm:text-lg text-[#71717a] font-normal leading-relaxed max-w-3xl mb-8">
                Master complete Python project scaffolding for Generative AI and Machine Learning. Learn runtime isolation with <code className="code-inline">venv</code> and high-speed <code className="code-inline">uv</code>, cross-platform shell activation, zero-leak credential architecture (<code className="code-inline">.env</code> + <code className="code-inline">.gitignore</code>), and IDE integration.
              </p>

              {/* KPI Feature Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-[#e2ddd6]">
                {[
                  { val: '0 Collision', label: 'Isolated site-packages', desc: 'No global pollution' },
                  { val: 'Cross-Platform', label: 'Win, Mac, Linux & uv', desc: 'Shell-specific activation' },
                  { val: 'Zero Leaks', label: '.gitignore + .env', desc: 'Never commit secret keys' },
                  { val: 'VS Code Ready', label: 'Auto Interpreter', desc: 'No missing import warnings' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/70 border border-[#e2ddd6]/80 backdrop-blur-sm">
                    <div className="font-editorial text-xl font-bold text-purple-700">{item.val}</div>
                    <div className="font-mono text-[10px] font-bold uppercase text-zinc-800 mt-0.5">{item.label}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>
            </header>

            {/* Python Project Setup Core Guide Component */}
            <PythonProjectSetupGuide />

          </div>
        </main>
      </div>
    </div>
  );
}
