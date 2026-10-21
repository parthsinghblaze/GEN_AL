'use client';

import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';

// Import essential language grammars
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  output?: string;
  showLineNumbers?: boolean;
}

export default function CodeSnippet({
  code,
  language = 'python',
  title,
  output,
  showLineNumbers = true,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');

  useEffect(() => {
    try {
      const lang = language.toLowerCase();
      const grammar = Prism.languages[lang] || Prism.languages.python || Prism.languages.javascript;
      if (grammar) {
        const highlighted = Prism.highlight(code, grammar, lang);
        setHighlightedHtml(highlighted);
      } else {
        setHighlightedHtml(code);
      }
    } catch {
      setHighlightedHtml(code);
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-[#27272a] bg-[#141416] shadow-2xl transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-[#27272a] text-xs">
        <div className="flex items-center space-x-2.5 min-w-0">
          {/* Mac window dots */}
          <div className="flex space-x-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/90 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/90 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/90 inline-block" />
          </div>

          {title && (
            <span className="font-mono text-[#e4e4e7] pl-2 text-[11px] font-bold border-l border-[#27272a] truncate">
              {title}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <span className="font-mono uppercase text-[10px] tracking-widest text-[#fbbf24] bg-[#fbbf24]/10 border border-[#fbbf24]/20 px-2 py-0.5 rounded font-bold">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 font-mono text-[11px] text-[#a1a1aa] hover:text-[#fbbf24] transition-colors py-1 px-2.5 rounded-md hover:bg-white/5 border border-transparent hover:border-white/10"
            title="Copy Code to Clipboard"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body with Syntax Highlighting and Line Numbers */}
      <div className="flex text-[13px] font-mono leading-relaxed bg-[#141416] overflow-x-auto selection:bg-purple-600/40 selection:text-white">
        {showLineNumbers && (
          <div className="select-none py-4 pl-3.5 pr-2.5 text-right text-zinc-600 border-r border-[#27272a]/60 bg-[#141416]/50 shrink-0 font-mono text-xs">
            {lines.map((_, i) => (
              <div key={i} className="leading-relaxed">
                {i + 1}
              </div>
            ))}
          </div>
        )}

        <pre className="p-4 flex-1 overflow-x-auto m-0 bg-transparent text-[#f4f4f5]">
          {highlightedHtml ? (
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          ) : (
            <code className={`language-${language}`}>{code}</code>
          )}
        </pre>
      </div>

      {/* Output / Terminal Panel if provided */}
      {output && (
        <div className="border-t border-[#27272a] bg-[#09090b] px-4 py-3">
          <div className="flex items-center space-x-1.5 text-[10px] uppercase font-mono tracking-widest text-[#fbbf24] mb-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] inline-block" />
            <span>Terminal Output / Verification</span>
          </div>
          <pre className="text-[12px] font-mono text-[#a1a1aa] leading-relaxed whitespace-pre-wrap selection:bg-[#fbbf24]/30 selection:text-white">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
