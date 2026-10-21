'use client';

import { useState } from 'react';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  output?: string;
}

export default function CodeSnippet({
  code,
  language = 'python',
  title,
  output,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="my-5 rounded-lg overflow-hidden border border-[#27272a] bg-[#18181b] shadow-xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141416] border-b border-[#27272a] text-xs">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80 inline-block" />
          </div>
          {title && (
            <span className="font-mono text-[#a1a1aa] pl-2 text-[11px] font-medium border-l border-[#27272a]">
              {title}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <span className="font-mono uppercase text-[10px] tracking-wider text-[#71717a] font-semibold">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 font-mono text-[11px] text-[#a1a1aa] hover:text-[#fbbf24] transition-colors py-1 px-2 rounded hover:bg-white/5"
            title="Copy Code"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <pre className="p-4 text-[13px] font-mono leading-relaxed text-[#f4f4f5] overflow-x-auto selection:bg-[#fbbf24]/30 selection:text-white">
        <code>{code}</code>
      </pre>

      {/* Output Panel if provided */}
      {output && (
        <div className="border-t border-[#27272a] bg-[#09090b] px-4 py-3">
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#71717a] mb-1 font-semibold">
            Output / Terminal
          </div>
          <pre className="text-[12px] font-mono text-[#a1a1aa] leading-relaxed whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
