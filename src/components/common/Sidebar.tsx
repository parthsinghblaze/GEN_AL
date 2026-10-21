'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export interface NavGroup {
  title: string;
  badge?: string;
  defaultOpen?: boolean;
  items: {
    id: string;
    num: string;
    label: string;
  }[];
}

export interface SectionSwitcher {
  label: string;
  href: string;
  isActive: boolean;
  badge?: string;
  num?: string;
}

interface SidebarProps {
  title: string;
  version: string;
  subtitle: string;
  groups: NavGroup[];
  accordion?: boolean;
  sectionSwitchers?: SectionSwitcher[];
}

export default function Sidebar({
  title,
  version,
  subtitle,
  groups,
  accordion = true,
  sectionSwitchers,
}: SidebarProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track accordion open state per group
  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    groups.forEach((g, idx) => {
      initial[idx] = g.defaultOpen !== undefined ? g.defaultOpen : true;
    });
    return initial;
  });

  const toggleGroup = (idx: number) => {
    if (!accordion) return;
    setOpenGroups((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

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
          const currentId = allIds[i];
          setActiveId(currentId);

          // Auto-expand accordion if the active item belongs to a collapsed group
          const parentGroupIdx = groups.findIndex((g) => g.items.some((item) => item.id === currentId));
          if (parentGroupIdx !== -1) {
            setOpenGroups((prev) => {
              if (!prev[parentGroupIdx]) {
                return { ...prev, [parentGroupIdx]: true };
              }
              return prev;
            });
          }
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

        {/* Section Switcher Tabs if provided */}
        {sectionSwitchers && sectionSwitchers.length > 0 && (
          <div className="p-3 border-b border-[#27272a] bg-black/30 space-y-2">
            <div className="flex items-center justify-between text-[10px] uppercase font-mono font-bold text-[#71717a] px-1 tracking-wider">
              <span>Course Sections</span>
              <span className="text-[#fbbf24]">{sectionSwitchers.length} Active</span>
            </div>
            <div className="space-y-1">
              {sectionSwitchers.map((sec) => (
                <Link
                  key={sec.href}
                  href={sec.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                    sec.isActive
                      ? 'bg-purple-900/50 text-white border border-purple-500/60 font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    {sec.num && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        sec.isActive ? 'bg-purple-500 text-white' : 'bg-zinc-800 text-[#fbbf24]'
                      }`}>
                        {sec.num}
                      </span>
                    )}
                    <span className="truncate">{sec.label}</span>
                  </div>
                  {sec.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 ${
                        sec.isActive
                          ? 'bg-purple-700 text-white'
                          : 'bg-white/10 text-zinc-400'
                      }`}
                    >
                      {sec.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Groups / Accordions */}
        <nav className="p-3 space-y-3 flex-1">
          {groups.map((group, gIdx) => {
            const isOpen = openGroups[gIdx] ?? true;
            const hasActiveItem = group.items.some((i) => i.id === activeId);

            return (
              <div
                key={gIdx}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  hasActiveItem
                    ? 'border-[#fbbf24]/30 bg-white/[0.03]'
                    : 'border-white/[0.04] bg-white/[0.01]'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleGroup(gIdx)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-white/[0.04] transition-colors group cursor-pointer"
                  title={isOpen ? 'Collapse Section' : 'Expand Section'}
                >
                  <div className="flex items-center space-x-2 min-w-0 pr-2">
                    <svg
                      className={`w-3.5 h-3.5 text-[#fbbf24] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-90' : 'rotate-0'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                    <span
                      className={`font-mono text-[11px] font-bold uppercase tracking-wider truncate ${
                        hasActiveItem
                          ? 'text-[#fbbf24]'
                          : 'text-[#d4d4d8] group-hover:text-white'
                      }`}
                    >
                      {group.title}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    {group.badge ? (
                      <span className="font-mono text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 rounded font-bold">
                        {group.badge}
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] text-[#71717a] bg-white/[0.06] px-1.5 py-0.2 rounded">
                        {group.items.length}
                      </span>
                    )}
                  </div>
                </button>

                {/* Collapsible Items List */}
                {isOpen && (
                  <div className="space-y-0.5 px-2 pb-2 pt-0.5 border-t border-white/[0.03]">
                    {group.items.map((item) => {
                      const isActive = activeId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollTo(item.id)}
                          className={`w-full text-left flex items-center space-x-2 px-2 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                            isActive
                              ? 'bg-[#fbbf24]/15 text-[#fbbf24] font-semibold border-l-2 border-[#fbbf24]'
                              : 'text-[#a1a1aa] hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          <span className="font-mono text-[10px] text-[#71717a] w-5 shrink-0">
                            {item.num}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
