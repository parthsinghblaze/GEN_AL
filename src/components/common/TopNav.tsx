'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview Hub', href: '/', icon: '🏠' },
    { label: 'NumPy Masterclass', href: '/numpy', icon: '🔢', badge: 'v2.0' },
    { label: 'Pandas Masterclass', href: '/pandas', hrefBadge: 'Series & DF', icon: '🐼', badge: 'v2.2' },
    { label: 'Gen AI Masterclass', href: '/genai', hrefBadge: 'Section 14', icon: '✨', badge: 'Sec 14' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#141416]/95 backdrop-blur border-b border-[#27272a] text-[#f4f4f5]">
      <div className="w-full px-4 sm:px-8 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-7 h-7 rounded-md bg-[#fbbf24] flex items-center justify-center font-editorial font-black text-black text-base shadow-sm group-hover:scale-105 transition-transform">
            λ
          </div>
          <span className="font-editorial font-bold text-base tracking-tight text-white">
            AI/ML <span className="text-[#fbbf24]">Notes Hub</span>
          </span>
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-[#fbbf24] text-black font-bold shadow'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.label.split(' ')[0]}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-black/10 text-black' : 'bg-white/10 text-[#fbbf24]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
