'use client';

import React, { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function Section15GeminiConfig() {
  const [activeTab, setActiveTab] = useState<'code' | 'simulator' | 'env'>('code');
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.8-flash');
  const [promptInput, setPromptInput] = useState<string>('Explain how AI works in a few words');
  const [simStatus, setSimStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const [simOutput, setSimOutput] = useState<string>('');
  const [latency, setLatency] = useState<number>(0);

  const userCode = `from google import genai
from dotenv import load_dotenv
import os
import time

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Explain how AI works in a few words"
)

print(interaction.output_text)`;

  const envSampleCode = `# .env file in project root (NEVER commit to git!)
GEMINI_API_KEY="AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"`;

  const gitignoreSampleCode = `# .gitignore
.env
.env.local
.env.*.local
__pycache__/
*.pyc
.venv/`;

  const sampleResponses: Record<string, string> = {
    'Explain how AI works in a few words':
      'AI learns statistical patterns from vast datasets to recognize information, reason across context, and predict optimal answers.',
    'What is a token in LLMs?':
      'A token is a sub-word chunk of text (approx 4 characters or 0.75 words) that machine learning models process numerically.',
    'Write a one-sentence Python tip':
      'Always use virtual environments (venv) and .env files to protect package versions and keep secret API keys off GitHub.',
  };

  const handleRunSimulation = () => {
    setSimStatus('running');
    const start = Date.now();
    setTimeout(() => {
      const response =
        sampleResponses[promptInput] ||
        `Gemini (${selectedModel}) processed: "${promptInput}" and generated output tokens based on learned statistical representations.`;
      setSimOutput(response);
      setLatency(Date.now() - start + 240);
      setSimStatus('success');
    }, 550);
  };

  return (
    <section id="sec-gemini-config" className="space-y-8 scroll-mt-24 pt-8">
      {/* Group Title Banner */}
      <div className="border-b-2 border-purple-800/40 pb-3 pt-4 flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-purple-900/40 text-purple-300 border border-purple-700/50 px-3.5 py-1.5 rounded-lg shadow-sm">
          Section 15 // Google Gemini Integration
        </span>
        <span className="font-mono text-[11px] text-zinc-500 font-bold">
          Google AI Studio
        </span>
      </div>

      {/* 02. Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">02</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            Google AI Studio &amp; Gemini SDK
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Creating &amp; Setting up Google Gemini Account
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            Generate your API key from Google AI Studio, secure it with environment variables, and invoke models using the official google-genai library.
          </p>
        </div>
      </div>

      {/* Quick Specs Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-[#e2ddd6] shadow-sm">
          <div className="text-[10px] uppercase font-mono font-bold text-zinc-400">Portal</div>
          <a
            href="https://aistudio.google.com/docs/get-started"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs font-bold text-purple-700 hover:underline flex items-center space-x-1 mt-1 truncate"
          >
            <span>aistudio.google.com</span>
            <span>↗</span>
          </a>
          <div className="text-[11px] text-zinc-500 mt-0.5">Google AI Studio</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e2ddd6] shadow-sm">
          <div className="text-[10px] uppercase font-mono font-bold text-zinc-400">Key Variable</div>
          <div className="font-mono text-xs font-bold text-zinc-900 mt-1">GEMINI_API_KEY</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Starts with AIzaSy...</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e2ddd6] shadow-sm">
          <div className="text-[10px] uppercase font-mono font-bold text-zinc-400">Python Library</div>
          <div className="font-mono text-xs font-bold text-emerald-700 mt-1">google-genai</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">pip install google-genai</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e2ddd6] shadow-sm">
          <div className="text-[10px] uppercase font-mono font-bold text-zinc-400">Primary Model</div>
          <div className="font-mono text-xs font-bold text-purple-800 mt-1">gemini-3.8-flash</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Fast, multimodal API</div>
        </div>
      </div>

      {/* Step-by-Step Setup Guide */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-5">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917] flex items-center space-x-2">
          <span>⚡</span>
          <span>5-Step Setup Workflow: From Zero to First Gemini API Call</span>
        </h3>

        <div className="grid md:grid-cols-5 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs font-bold text-purple-900 mb-1">
                Step 1: Sign In
              </div>
              <p className="text-xs text-purple-950 leading-relaxed">
                Open <a href="https://aistudio.google.com/docs/get-started" target="_blank" rel="noopener noreferrer" className="underline font-bold">Google AI Studio</a> and sign in with your Google Account.
              </p>
            </div>
            <span className="font-mono text-[10px] text-purple-600 font-bold mt-2">Free to start</span>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs font-bold text-blue-900 mb-1">
                Step 2: Get API Key
              </div>
              <p className="text-xs text-blue-950 leading-relaxed">
                Click <strong>&quot;Get API key&quot;</strong> in the left sidebar, then click <strong>&quot;Create API key&quot;</strong> in a new or existing project.
              </p>
            </div>
            <span className="font-mono text-[10px] text-blue-600 font-bold mt-2">Copy key string</span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs font-bold text-amber-900 mb-1">
                Step 3: Save in .env
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                Create a local <code className="code-inline">.env</code> file in your project folder: <code className="code-inline">GEMINI_API_KEY=&quot;...&quot;</code>.
              </p>
            </div>
            <span className="font-mono text-[10px] text-amber-600 font-bold mt-2">Zero-leak storage</span>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs font-bold text-rose-900 mb-1">
                Step 4: .gitignore
              </div>
              <p className="text-xs text-rose-950 leading-relaxed">
                Verify that <code className="code-inline">.env</code> is added to <code className="code-inline">.gitignore</code> so your key is never pushed to GitHub!
              </p>
            </div>
            <span className="font-mono text-[10px] text-rose-600 font-bold mt-2">Protect credentials</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs font-bold text-emerald-900 mb-1">
                Step 5: Run Script
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                Install packages: <code className="code-inline">pip install google-genai python-dotenv</code> and execute your script with python!
              </p>
            </div>
            <span className="font-mono text-[10px] text-emerald-600 font-bold mt-2">Ready to query</span>
          </div>
        </div>

        <NoteCallout
          type="tip"
          title="Google AI Studio Free Tier Advantage"
          text="Google AI Studio provides a free tier with high RPM (Requests Per Minute) allowances, making it fast and easy to build prototypes without adding a credit card up-front."
        />
      </div>

      {/* Interactive Tabs: Code, Live Terminal Simulator, and .env Inspection */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100/70 px-2.5 py-0.5 rounded-full mb-1">
              <span>🤖</span>
              <span>Python SDK Implementation</span>
            </div>
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              Google Gemini Client Code &amp; Interactive Simulator
            </h4>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'code', label: '1. Python Code' },
              { id: 'simulator', label: '2. Terminal Simulator' },
              { id: 'env', label: '3. .env & .gitignore' },
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

        {/* TAB 1: Code View */}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="text-xs text-zinc-600 font-mono">
              Install the official Google GenAI package and dotenv:
              <pre className="mt-1 p-2.5 rounded-lg bg-zinc-900 text-emerald-400 font-mono text-xs">
                pip install google-genai python-dotenv
              </pre>
            </div>

            <CodeSnippet
              code={userCode}
              language="python"
              title="gemini.py (Official google-genai SDK)"
              output={`AI learns statistical patterns from vast datasets to recognize information, reason across context, and predict optimal answers.`}
            />

            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs text-purple-950 space-y-2">
              <div className="font-mono font-bold text-purple-900">Key Breakdown:</div>
              <ul className="list-disc list-inside space-y-1">
                <li><code className="code-inline">load_dotenv()</code> reads keys from local <code className="code-inline">.env</code> without hardcoding secrets in python.</li>
                <li><code className="code-inline">client = genai.Client(api_key=api_key)</code> authenticates the Google GenAI client.</li>
                <li><code className="code-inline">client.interactions.create(...)</code> or <code className="code-inline">client.models.generate_content(...)</code> sends the prompt to the specified model (<code className="code-inline">gemini-3.8-flash</code>).</li>
                <li><code className="code-inline">interaction.output_text</code> extracts the generated response directly.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: Interactive Terminal Simulator */}
        {activeTab === 'simulator' && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase font-bold text-zinc-500 mb-1">
                  Select Model:
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-mono text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="gemini-3.8-flash">gemini-3.8-flash (Fast &amp; Ultra-responsive)</option>
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Balanced)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (High Reasoning)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase font-bold text-zinc-500 mb-1">
                  Prompt Preset:
                </label>
                <select
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-mono text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="Explain how AI works in a few words">Explain how AI works in a few words</option>
                  <option value="What is a token in LLMs?">What is a token in LLMs?</option>
                  <option value="Write a one-sentence Python tip">Write a one-sentence Python tip</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-xs text-zinc-500">
                Simulated execution with API key loaded from <code className="code-inline">.env</code>
              </span>
              <button
                onClick={handleRunSimulation}
                disabled={simStatus === 'running'}
                className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-mono text-xs font-bold transition-all shadow disabled:opacity-50 flex items-center space-x-2"
              >
                <span>{simStatus === 'running' ? '⏳ Calling Gemini...' : '▶ Run Python Script'}</span>
              </button>
            </div>

            {/* Live Terminal Output Box */}
            <div className="card-dark p-5 rounded-2xl border border-zinc-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[11px] text-zinc-400">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Terminal // python gemini.py</span>
                </div>
                {simStatus === 'success' && (
                  <span className="text-emerald-400 font-bold">200 OK — Latency: {latency}ms</span>
                )}
              </div>

              <div className="text-zinc-500 pt-1">
                $ python gemini.py
              </div>

              {simStatus === 'running' && (
                <div className="text-amber-400 flex items-center space-x-2 py-2">
                  <span className="animate-spin">🔄</span>
                  <span>Connecting to Google GenAI API ({selectedModel})...</span>
                </div>
              )}

              {simStatus === 'success' && (
                <div className="space-y-2 pt-1">
                  <div className="text-purple-300 font-bold">Output Text:</div>
                  <div className="p-3 rounded-xl bg-zinc-950 text-emerald-300 leading-relaxed border border-emerald-500/30">
                    {simOutput}
                  </div>
                </div>
              )}

              {simStatus === 'idle' && (
                <div className="text-zinc-500 italic py-2">
                  Click &quot;▶ Run Python Script&quot; above to simulate the API call and view output.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Environment Setup */}
        {activeTab === 'env' && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-mono font-bold text-zinc-700 mb-1">
                  1. Project Root <code className="code-inline">.env</code>
                </div>
                <pre className="p-3.5 rounded-xl bg-zinc-900 text-zinc-200 font-mono text-xs overflow-x-auto">
                  {envSampleCode}
                </pre>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Replace with your secret key from Google AI Studio.
                </p>
              </div>

              <div>
                <div className="text-xs font-mono font-bold text-zinc-700 mb-1">
                  2. Project Root <code className="code-inline">.gitignore</code>
                </div>
                <pre className="p-3.5 rounded-xl bg-zinc-900 text-zinc-200 font-mono text-xs overflow-x-auto">
                  {gitignoreSampleCode}
                </pre>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Ensures git ignores all secret environment files.
                </p>
              </div>
            </div>

            <NoteCallout
              type="danger"
              title="Never Expose Your GEMINI_API_KEY"
              text="Google monitors public GitHub repositories for leaked AIzaSy keys and will immediately revoke any keys exposed in public commits."
            />
          </div>
        )}
      </div>
    </section>
  );
}
