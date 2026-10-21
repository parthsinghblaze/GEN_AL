'use client';

import React, { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function Section15OpenAiConfig() {
  const [activeTab, setActiveTab] = useState<'console' | 'keygen' | 'security' | 'handshake'>('console');
  const [projectName, setProjectName] = useState<string>('ai-masterclass-dev');
  const [spendLimit, setSpendLimit] = useState<number>(25);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<boolean>(false);
  const [keyCopied, setKeyCopied] = useState<boolean>(false);
  const [pingStatus, setPingStatus] = useState<'idle' | 'testing' | 'success'>('idle');

  const handleGenerateKey = () => {
    const randomHex = Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setGeneratedKey(`sk-proj-${randomHex}`);
    setShowKey(true);
  };

  const handleCopyKey = () => {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  };

  const handleTestPing = () => {
    setPingStatus('testing');
    setTimeout(() => {
      setPingStatus('success');
    }, 600);
  };

  const pythonQuickstartCode = `# 1. Install dependencies:
# pip install openai python-dotenv

import os
from dotenv import load_dotenv
from openai import OpenAI, AuthenticationError, RateLimitError

# Load environment variables from .env file
load_dotenv()

# Initialize official OpenAI client (v1.x+)
# Automatically retrieves key from os.environ["OPENAI_API_KEY"]
client = OpenAI()

try:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a concise AI engineering assistant."},
            {"role": "user", "content": "Explain what an API token is in one short sentence."}
        ],
        temperature=0.7,
        max_tokens=60
    )
    print("API Response:", response.choices[0].message.content)

except AuthenticationError:
    print("Error: Invalid OpenAI API key. Check your .env file!")
except RateLimitError:
    print("Error: Exceeded organization quota or rate limits!")
except Exception as e:
    print(f"Unexpected error: {e}")`;

  const envSampleCode = `# .env file in project root (NEVER commit this to git!)
OPENAI_API_KEY="sk-proj-YOUR_ACTUAL_SECRET_KEY_HERE"
OPENAI_ORG_ID="org-yourOrgIdHere"
OPENAI_PROJECT_ID="proj_yourProjectIdHere"`;

  const gitignoreCode = `# .gitignore
.env
.env.local
.env.*.local
node_modules/
__pycache__/
*.pyc`;

  return (
    <div className="space-y-16 pt-8">
      {/* Group Title Banner */}
      <div className="border-b-2 border-purple-800/40 pb-3 pt-6 flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-purple-900/40 text-purple-300 border border-purple-700/50 px-3.5 py-1.5 rounded-lg shadow-sm">
          Section 15 // API Setup & Integration
        </span>
        <span className="font-mono text-[11px] text-zinc-500 font-bold">
          Developer Cloud Platform
        </span>
      </div>

      {/* 01. Configuring your OpenAI Account */}
      <section id="sec-openai-config" className="space-y-6 scroll-mt-24">
        {/* Header */}
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-purple-700">01</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              15.1 // Account Setup & Credentials
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Configuring your OpenAI Account
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Platform onboarding, Projects isolation, Usage limits, Secret API key lifecycle, and zero-leak environment variables.
            </p>
          </div>
        </div>

        {/* Conceptual Explanation in Simple Terms */}
        <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-4">
          <h3 className="font-editorial text-xl font-bold text-[#1c1917] flex items-center space-x-2">
            <span>🔑</span>
            <span>What is an OpenAI API Key in Simple Terms?</span>
          </h3>

          <p className="text-sm text-[#3f3f46] leading-relaxed">
            While consumer <strong>ChatGPT</strong> is a chat website with a monthly subscription, the <strong>OpenAI Developer Platform</strong> (<code className="code-inline">platform.openai.com</code>) gives your software programmatic, token-by-token pay-as-you-go access to OpenAI&apos;s raw foundation models.
          </p>

          <p className="text-sm text-[#3f3f46] leading-relaxed">
            Your <strong>API Key</strong> is a secret digital passport. Every time your Python script or backend server requests a next-token completion or vector embedding, it attaches this secret string in an HTTP Bearer header to prove who you are and bill your account.
          </p>

          {/* 3 Pillars of Account Setup */}
          <div className="grid md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200">
              <div className="font-mono text-xs font-bold text-purple-900 mb-1">
                1. Projects & Budget Limits
              </div>
              <p className="text-xs text-purple-950 leading-relaxed">
                Never use global keys! Create isolated projects (e.g. <code className="code-inline">dev-test</code>) and set strict monthly spend limits ($10) to prevent accidental infinite loops.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
              <div className="font-mono text-xs font-bold text-rose-900 mb-1">
                2. Zero-Leak Security Rule
              </div>
              <p className="text-xs text-rose-950 leading-relaxed">
                Never put API keys in client-side React code or push them to GitHub. GitHub bots scrape public repos in 2 seconds and can drain your credit balance!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <div className="font-mono text-xs font-bold text-emerald-900 mb-1">
                3. Prepaid Credits & Tiers
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                OpenAI uses a prepaid credit balance. Adding $5 unlocks Tier 1 rate limits (500 Requests/Min & 30,000 Tokens/Min) on models like <code className="code-inline">gpt-4o-mini</code>.
              </p>
            </div>
          </div>

          <NoteCallout
            type="danger"
            title="Golden Security Rule: .env + .gitignore"
            text="Store your secret API key in a local .env file: OPENAI_API_KEY='sk-proj-...'. Always verify that .env is listed in your .gitignore file before running 'git commit' or 'git push'."
          />
        </div>

        {/* Interactive OpenAI Account Setup & Security Sandbox */}
        <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
            <div>
              <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100/70 px-2.5 py-0.5 rounded-full mb-1">
                <span>🛠️</span>
                <span>Interactive Developer Sandbox</span>
              </div>
              <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
                OpenAI Account Configuration & Security Simulator
              </h4>
            </div>

            {/* Sandbox Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'console', label: '1. Project & Budget' },
                { id: 'keygen', label: '2. Key Generator' },
                { id: 'security', label: '3. Security Architecture' },
                { id: 'handshake', label: '4. Ping Test' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    activeTab === t.id
                      ? 'bg-purple-700 text-white font-bold shadow'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: Project & Spend Limit */}
          {activeTab === 'console' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs font-bold text-zinc-700">
                    OpenAI Project Name:
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 font-mono text-xs bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <div className="text-[10px] font-mono text-zinc-500">
                    Scoped to project ID: <code className="code-inline">proj_{projectName.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)}</code>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs font-bold text-zinc-700">
                    <span>Monthly Hard Spend Limit:</span>
                    <span className="text-purple-700 font-bold">${spendLimit}.00 / month</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    step="5"
                    value={spendLimit}
                    onChange={(e) => setSpendLimit(parseInt(e.target.value))}
                    className="w-full accent-purple-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>$5 (Dev baseline)</span>
                    <span>$50 (Team prototype)</span>
                    <span>$150 (Staging)</span>
                  </div>
                </div>
              </div>

              {/* Status summary banner */}
              <div className="card-dark p-4 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase text-zinc-400">Project Quota Safeguard:</div>
                  <div className="font-mono text-white">
                    Project <strong className="text-purple-400">&quot;{projectName}&quot;</strong> will automatically block further API requests once usage reaches <strong>${spendLimit}</strong>.
                  </div>
                </div>
                <div className="font-mono text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-lg self-start sm:self-auto">
                  ✓ Spend Cap Active
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Key Generator */}
          {activeTab === 'keygen' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                <div>
                  <div className="font-mono text-xs font-bold text-zinc-900">
                    Create Project API Key
                  </div>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Generate a scoped secret key starting with prefix <code className="code-inline">sk-proj-</code>.
                  </p>
                </div>
                <button
                  onClick={handleGenerateKey}
                  className="px-4 py-2 rounded-xl bg-purple-700 text-white font-mono text-xs font-bold hover:bg-purple-800 shadow transition-all self-start sm:self-auto"
                >
                  ⚡ Generate New Secret Key
                </button>
              </div>

              {generatedKey && (
                <div className="card-dark p-5 rounded-xl border border-purple-500/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase font-bold text-purple-400">
                      Generated Secret API Key (Save immediately):
                    </span>
                    <button
                      onClick={() => setShowKey(!showKey)}
                      className="text-[11px] font-mono text-zinc-400 hover:text-white"
                    >
                      {showKey ? '🙈 Hide' : '👁️ Reveal'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                    <span className="font-mono text-xs text-emerald-400 tracking-wider truncate pr-2">
                      {showKey ? generatedKey : `${generatedKey.slice(0, 11)}••••••••••••••••••••••••••••••••`}
                    </span>
                    <button
                      onClick={handleCopyKey}
                      className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs shrink-0"
                    >
                      {keyCopied ? '✓ Copied!' : 'Copy Key'}
                    </button>
                  </div>

                  <div className="text-[11px] text-amber-300 font-mono flex items-center space-x-1.5">
                    <span>⚠️</span>
                    <span>OpenAI will never show you this secret key again after you close this page!</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Security Architecture */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Insecure Path */}
                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-300 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-800 font-mono text-xs font-bold">
                    <span>❌</span>
                    <span>Anti-Pattern: Client-Side Calling</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-rose-200 text-xs font-mono text-zinc-800 space-y-1">
                    <div className="text-zinc-500">// Browser JavaScript Component:</div>
                    <code className="text-rose-600 block">
                      const client = new OpenAI(&#123; apiKey: &apos;sk-proj-...&apos; &#125;);
                    </code>
                  </div>
                  <p className="text-[11px] text-rose-900 leading-relaxed">
                    <strong>Catastrophic vulnerability!</strong> Anyone can open Chrome DevTools, inspect Network headers or JS bundles, and steal your key within seconds.
                  </p>
                </div>

                {/* Secure Path */}
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-300 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-800 font-mono text-xs font-bold">
                    <span>✓</span>
                    <span>Best Practice: Server-Side Proxy</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs font-mono text-zinc-800 space-y-1">
                    <div className="text-zinc-500">// Backend API Route (/api/chat):</div>
                    <code className="text-emerald-700 block">
                      process.env.OPENAI_API_KEY // Kept on secure server!
                    </code>
                  </div>
                  <p className="text-[11px] text-emerald-900 leading-relaxed">
                    The secret key remains securely isolated in server memory. The client browser only talks to your backend endpoint.
                  </p>
                </div>
              </div>

              {/* gitignore sample */}
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <div className="text-[10px] uppercase font-mono font-bold text-zinc-500 mb-1">
                    Sample .env File:
                  </div>
                  <pre className="p-3 rounded-lg bg-zinc-900 text-zinc-200 font-mono text-xs overflow-x-auto">
                    {envSampleCode}
                  </pre>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono font-bold text-zinc-500 mb-1">
                    Required .gitignore Entry:
                  </div>
                  <pre className="p-3 rounded-lg bg-zinc-900 text-zinc-200 font-mono text-xs overflow-x-auto">
                    {gitignoreCode}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Ping Test */}
          {activeTab === 'handshake' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-zinc-50 border border-zinc-200 gap-3">
                <div>
                  <div className="font-mono text-xs font-bold text-zinc-900">
                    Live Simulated API Handshake
                  </div>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Simulate client authentication, TLS connection, and fetching <code className="code-inline">client.models.list()</code>.
                  </p>
                </div>
                <button
                  onClick={handleTestPing}
                  disabled={pingStatus === 'testing'}
                  className="px-4 py-2 rounded-xl bg-purple-700 text-white font-mono text-xs font-bold hover:bg-purple-800 shadow transition-all self-start sm:self-auto disabled:opacity-50"
                >
                  {pingStatus === 'testing' ? 'Connecting...' : '📡 Ping OpenAI API'}
                </button>
              </div>

              {pingStatus === 'success' && (
                <div className="card-dark p-5 rounded-xl border border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>200 OK — Authentication Successful</span>
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400">Latency: 114ms</span>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-950 font-mono text-[11px] text-zinc-300 space-y-1">
                    <div className="text-purple-400 font-bold">// Active Models Verified:</div>
                    <div>✓ gpt-4o (Omni multimodal flagship)</div>
                    <div>✓ gpt-4o-mini (Cost-effective fast reasoning)</div>
                    <div>✓ o1 / o3-mini (Advanced mathematical reasoning)</div>
                    <div>✓ text-embedding-3-small (Vector representations)</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Python SDK Reference Code */}
        <CodeSnippet
          code={pythonQuickstartCode}
          language="python"
          title="openai_quickstart.py (Official Python SDK v1.x)"
          output={`API Response: An API token is a unique credential string that authenticates your software when accessing a remote cloud service.

[Status]: Model gpt-4o-mini executed in 240ms. Tokens used: Prompt=28, Completion=23, Total=51.`}
        />
      </section>
    </div>
  );
}
