'use client';

import { useState, useEffect } from 'react';

export interface NavGroup {
  title: string;
  items: {
    id: string;
    num: string;
    label: string;
  }[];
}

interface SidebarProps {
  title: string;
  version: string;
  subtitle: string;
  groups: NavGroup[];
}

export default function Sidebar({
  title,
  version,
  subtitle,
  groups,
}: SidebarProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Update reading progress
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setProgress(Math.min(100, Math.max(0, Math.round(scrolled))));
      }

      // ScrollSpy for active section
      const scrollPos = window.scrollY + 140;
      const allIds = groups.flatMap((g) => g.items.map((i) => i.id));

      for (let i = allIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(allIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(allIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [groups]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-5 right-5 z-50 bg-[#18181b] text-[#fbbf24] border border-[#3f3f46] p-3 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:bg-black"
        aria-label="Toggle Table of Contents"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-[280px] bg-[#141416] text-[#e4e4e7] border-r border-[#27272a] z-40 flex flex-col transition-transform duration-300 ease-in-out overflow-y-auto ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#27272a]">
          <div className="flex items-center justify-between">
            <h2 className="font-editorial text-lg font-black text-white">
              {title} <span className="text-[#fbbf24]">Notes</span>
            </h2>
            <span className="font-mono text-[9px] bg-amber-400/10 text-[#fbbf24] border border-amber-400/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              {version}
            </span>
          </div>
          <p className="font-mono text-[11px] text-[#a1a1aa] mt-1.5 leading-snug">
            {subtitle}
          </p>
        </div>

        {/* Progress Tracker Widget */}
        <div className="px-5 py-3 border-b border-[#27272a] bg-white/[0.02]">
          <div className="flex justify-between font-mono text-[10px] uppercase text-[#a1a1aa] mb-1.5 font-semibold">
            <span>Reading Progress</span>
            <span className="text-[#fbbf24] font-bold">{progress}%</span>
          </div>
          <div className="h-1 bg-[#27272a] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#fbbf24] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="p-4 space-y-6 flex-1">
          {groups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <div className="font-mono text-[10px] font-bold text-[#71717a] uppercase tracking-widest px-2 pb-1 border-b border-white/[0.04]">
                {group.title}
              </div>
              <div className="space-y-0.5 pt-1">
                {group.items.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`w-full text-left flex items-center space-x-2.5 px-2.5 py-1.5 rounded text-[12.5px] font-medium transition-all ${
                        isActive
                          ? 'bg-[#fbbf24]/15 text-[#fbbf24] font-semibold border-l-2 border-[#fbbf24]'
                          : 'text-[#a1a1aa] hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-[#71717a] w-5">
                        {item.num}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
