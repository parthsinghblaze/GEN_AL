'use client';

import React, { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

export default function Section15GeminiOpenAiCompat() {
  const [activeTab, setActiveTab] = useState<'code' | 'simulator' | 'benefits'>('code');
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.8-flash');
  const [userPrompt, setUserPrompt] = useState<string>('Who are you?');
  const [systemPrompt, setSystemPrompt] = useState<string>('You are a helpful assistant.');
  const [simStatus, setSimStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const [simMessage, setSimMessage] = useState<string>('');
  const [latency, setLatency] = useState<number>(0);

  // Secure version hiding raw API keys and using dotenv
  const secureCode = `import os
from dotenv import load_dotenv
from openai import OpenAI

# 1. Load secrets from .env file (NEVER hardcode raw keys in code!)
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

# 2. Point standard OpenAI SDK to Google Gemini's OpenAI-compatible endpoint
client = OpenAI(
    api_key=api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# 3. Call standard client.chat.completions.create with a Gemini model
response = client.chat.completions.create(
    model="gemini-3.8-flash",
    messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "Who are you?"
        }
    ]
)

# 4. Access response using standard OpenAI syntax
print(response.choices[0].message)`;

  const envSample = `# .env in project root
GEMINI_API_KEY="AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"`;

  const sampleResponses: Record<string, string> = {
    'Who are you?':
      'I am Gemini, a large language model trained by Google. I can assist you with coding, analysis, answering questions, and reasoning across complex problems.',
    'Explain quantum computing simply':
      'Quantum computing uses quantum bits (qubits) that can exist in superposition (both 0 and 1 simultaneously), allowing them to solve certain complex mathematical problems exponentially faster than classical computers.',
    'What is the benefit of OpenAI endpoint compatibility?':
      'It allows developers to use any library, tool, or framework built for OpenAI (like LangChain, LiteLLM, or Cursor) with Google Gemini simply by changing the base_url, without rewriting code!',
  };

  const handleRunSimulation = () => {
    setSimStatus('running');
    const start = Date.now();
    setTimeout(() => {
      const reply =
        sampleResponses[userPrompt] ||
        `I am ${selectedModel}, responding through Google Gemini's OpenAI-compatible endpoint to your message: "${userPrompt}".`;
      setSimMessage(reply);
      setLatency(Date.now() - start + 210);
      setSimStatus('success');
    }, 500);
  };

  return (
    <section id="sec-openai-compat" className="space-y-8 scroll-mt-24 pt-8">
      {/* Group Title Banner */}
      <div className="border-b-2 border-purple-800/40 pb-3 pt-4 flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-purple-900/40 text-purple-300 border border-purple-700/50 px-3.5 py-1.5 rounded-lg shadow-sm">
          Section 15 // OpenAI SDK Compatibility
        </span>
        <span className="font-mono text-[11px] text-zinc-500 font-bold">
          Drop-in Multi-Provider Bridge
        </span>
      </div>

      {/* 03. Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">03</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            OpenAI-Compatible Endpoint
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Using Google Gemini with OpenAI-Compatible APIs
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            Did you know you can use the official <code>openai</code> Python library to call Google Gemini? Simply override <code>base_url</code> to target Gemini with zero code refactoring.
          </p>
        </div>
      </div>

      {/* Quick Concept Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-[#e2ddd6] shadow-sm">
          <div className="text-[10px] uppercase font-mono font-bold text-zinc-400">Library Used</div>
          <div className="font-mono text-xs font-bold text-purple-800 mt-1">from openai import OpenAI</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Standard OpenAI SDK</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e2ddd6] shadow-sm">
          <div className="text-[10px] uppercase font-mono font-bold text-zinc-400">Gemini Base URL</div>
          <div className="font-mono text-xs font-bold text-zinc-900 mt-1 truncate" title="https://generativelanguage.googleapis.com/v1beta/openai/">
            generativelanguage.../openai/
          </div>
          <div className="text-[11px] text-zinc-500 mt-0.5">v1beta OpenAI spec</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e2ddd6] shadow-sm">
          <div className="text-[10px] uppercase font-mono font-bold text-zinc-400">API Key Storage</div>
          <div className="font-mono text-xs font-bold text-emerald-700 mt-1">os.getenv(&quot;GEMINI_API_KEY&quot;)</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Secure from .env</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#e2ddd6] shadow-sm">
          <div className="text-[10px] uppercase font-mono font-bold text-zinc-400">Model Names</div>
          <div className="font-mono text-xs font-bold text-purple-700 mt-1">gemini-3.8-flash</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Also 2.5-flash / 2.5-pro</div>
        </div>
      </div>

      {/* Architectural Explanation */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-4">
        <h3 className="font-editorial text-xl font-bold text-[#1c1917] flex items-center space-x-2">
          <span>🔄</span>
          <span>Why This Is a Game-Changer for Developers</span>
        </h3>

        <p className="text-sm text-[#3f3f46] leading-relaxed">
          Google recognizes that the <strong>OpenAI API specification</strong> has become the de-facto standard across the AI ecosystem. Most frameworks (such as <strong>LangChain</strong>, <strong>LlamaIndex</strong>, <strong>CrewAI</strong>, <strong>AutoGen</strong>, and developer IDE plugins like Cursor or Continue.dev) expect OpenAI-style endpoints (<code className="code-inline">/chat/completions</code>).
        </p>

        <p className="text-sm text-[#3f3f46] leading-relaxed">
          Instead of rewriting client code or installing custom adapters, you can point the official <code className="code-inline">openai</code> library directly to Google&apos;s server using:
        </p>

        <div className="p-3.5 rounded-xl bg-zinc-900 text-zinc-200 font-mono text-xs border border-zinc-800">
          <span className="text-zinc-500"># Google Gemini OpenAI-compatible base URL:</span><br />
          <span className="text-emerald-400 font-bold">base_url</span> = <span className="text-amber-300">&quot;https://generativelanguage.googleapis.com/v1beta/openai/&quot;</span>
        </div>

        <NoteCallout
          type="danger"
          title="Security Best Practice: Never Hardcode API Keys"
          text="Never paste raw strings like api_key='AQ.Ab8RN...' directly into your code! Always use python-dotenv and os.getenv('GEMINI_API_KEY'). Hardcoded keys committed to git repositories will be automatically revoked by security scanners."
        />
      </div>

      {/* Interactive Tabs */}
      <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100/70 px-2.5 py-0.5 rounded-full mb-1">
              <span>🚀</span>
              <span>OpenAI SDK Bridge</span>
            </div>
            <h4 className="font-editorial text-lg font-bold text-[#1c1917]">
              Implementation &amp; Compatibility Lab
            </h4>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'code', label: '1. Python Implementation' },
              { id: 'simulator', label: '2. Live Terminal Simulator' },
              { id: 'benefits', label: '3. What Is Supported?' },
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

        {/* TAB 1: Code */}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="text-xs text-zinc-600 font-mono">
              Install dependencies:
              <pre className="mt-1 p-2.5 rounded-lg bg-zinc-900 text-emerald-400 font-mono text-xs">
                pip install openai python-dotenv
              </pre>
            </div>

            <CodeSnippet
              code={secureCode}
              language="python"
              title="gemini_via_openai_sdk.py"
              output={`ChatCompletionMessage(content='I am Gemini, a large language model trained by Google. I can assist you with coding, analysis, answering questions, and reasoning across complex problems.', role='assistant', function_call=None, tool_calls=None)`}
            />

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 space-y-1">
                <div className="font-mono font-bold text-purple-900">1. Safe Secret Storage (.env)</div>
                <pre className="p-2.5 rounded-lg bg-zinc-900 text-zinc-200 font-mono text-xs overflow-x-auto">
                  {envSample}
                </pre>
                <p className="text-[11px] text-purple-800 pt-1">
                  Your API key stays securely in <code className="code-inline">.env</code> and is never committed to GitHub.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1">
                <div className="font-mono font-bold text-blue-900">2. How the SDK Routes the Call</div>
                <p className="text-xs leading-relaxed text-blue-900">
                  When you instantiate <code className="code-inline">OpenAI(base_url=...)</code>, the SDK translates <code className="code-inline">chat.completions.create</code> into an HTTP POST request to Google&apos;s API endpoint using your Gemini key for bearer authorization.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Simulator */}
        {activeTab === 'simulator' && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase font-bold text-zinc-500 mb-1">
                  Target Gemini Model:
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-mono text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="gemini-3.8-flash">gemini-3.8-flash (Primary)</option>
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Balanced)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (Complex Reasoning)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase font-bold text-zinc-500 mb-1">
                  User Prompt Preset:
                </label>
                <select
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-mono text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="Who are you?">Who are you?</option>
                  <option value="Explain quantum computing simply">Explain quantum computing simply</option>
                  <option value="What is the benefit of OpenAI endpoint compatibility?">What is the benefit of OpenAI endpoint compatibility?</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-xs text-zinc-500">
                Calling <code className="code-inline">client.chat.completions.create</code> via Google&apos;s base_url
              </span>
              <button
                onClick={handleRunSimulation}
                disabled={simStatus === 'running'}
                className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-mono text-xs font-bold transition-all shadow disabled:opacity-50 flex items-center space-x-2"
              >
                <span>{simStatus === 'running' ? '⏳ Sending request...' : '▶ Execute via OpenAI SDK'}</span>
              </button>
            </div>

            {/* Output Box */}
            <div className="card-dark p-5 rounded-2xl border border-zinc-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[11px] text-zinc-400">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>OpenAI Client → Google Gemini Endpoint</span>
                </div>
                {simStatus === 'success' && (
                  <span className="text-emerald-400 font-bold">Status: 200 OK ({latency}ms)</span>
                )}
              </div>

              <div className="text-zinc-500 pt-1">
                $ python -c &quot;from openai import OpenAI; ...&quot;
              </div>

              {simStatus === 'running' && (
                <div className="text-amber-400 flex items-center space-x-2 py-2">
                  <span className="animate-spin">🔄</span>
                  <span>Transmitting payload to https://generativelanguage.googleapis.com/v1beta/openai/ ...</span>
                </div>
              )}

              {simStatus === 'success' && (
                <div className="space-y-3 pt-1">
                  <div className="text-zinc-400 text-[11px]">
                    <span className="text-purple-300 font-bold">response.choices[0].message:</span>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-zinc-950 text-emerald-300 leading-relaxed border border-emerald-500/30 overflow-x-auto">
{`ChatCompletionMessage(
  role='assistant',
  content='${simMessage}',
  function_call=None,
  tool_calls=None
)`}
                  </pre>
                  <div className="text-[11px] text-zinc-400">
                    <span className="text-purple-300 font-bold">response.choices[0].message.content:</span>
                    <div className="p-2.5 rounded-lg bg-zinc-900 text-zinc-100 mt-1">
                      {simMessage}
                    </div>
                  </div>
                </div>
              )}

              {simStatus === 'idle' && (
                <div className="text-zinc-500 italic py-2">
                  Click &quot;▶ Execute via OpenAI SDK&quot; to test the simulated call.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: What Is Supported? */}
        {activeTab === 'benefits' && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="font-mono text-xs font-bold text-emerald-900 flex items-center space-x-1.5">
                  <span>✅</span>
                  <span>Fully Supported OpenAI Features in Gemini</span>
                </div>
                <ul className="text-xs text-emerald-950 space-y-1.5 list-disc list-inside">
                  <li><strong>Chat Completions:</strong> <code className="code-inline">client.chat.completions.create()</code></li>
                  <li><strong>Streaming Responses:</strong> <code className="code-inline">stream=True</code> token generators</li>
                  <li><strong>System Instructions:</strong> Full multi-role conversations (system, user, assistant)</li>
                  <li><strong>Function / Tool Calling:</strong> OpenAI tools and schema parameters</li>
                  <li><strong>Temperature &amp; Top_P:</strong> Hyperparameter tuning</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
                <div className="font-mono text-xs font-bold text-purple-900 flex items-center space-x-1.5">
                  <span>💡</span>
                  <span>Top Use Cases</span>
                </div>
                <ul className="text-xs text-purple-950 space-y-1.5 list-disc list-inside">
                  <li><strong>Zero-Code Provider Switch:</strong> Instantly benchmark Gemini without modifying existing OpenAI pipelines.</li>
                  <li><strong>Unified Codebase:</strong> Use one client SDK across multiple AI backends (OpenAI, Gemini, Groq, Ollama).</li>
                  <li><strong>Tooling Compatibility:</strong> Run Gemini in frameworks that only support the OpenAI SDK.</li>
                  <li><strong>Cost Optimization:</strong> Route heavy or cost-sensitive queries to high-throughput Gemini models.</li>
                </ul>
              </div>
            </div>

            <NoteCallout
              type="tip"
              title="Official Google Documentation"
              text="Google actively maintains this compatibility layer in its v1beta API to make developer onboarding frictionless. You can switch between google-genai and openai SDKs depending on project needs."
            />
          </div>
        )}
      </div>
    </section>
  );
}
