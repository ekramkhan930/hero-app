'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Film,
  Search,
  Heart,
  ShieldAlert,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
} from 'lucide-react';
import { useFavorites } from '@/lib/context/FavoritesContext';
import { useAuth } from '@/lib/context/AuthContext';
import { SearchModal } from '@/components/ui/SearchModal';

export function Navbar() {
  const pathname = usePathname();
  const { totalFavoritesCount } = useFavorites();
  const { isAuthenticated, user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If in admin layout, we can let admin pages have their own focused top bar or keep universal navbar
  const isAdminSection = pathname.startsWith('/admin') && pathname !== '/admin/login';

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Celebrities', href: '/celebrities' },
    { label: 'Bollywood', href: '/bollywood' },
    { label: 'Hollywood', href: '/hollywood' },
    { label: 'Movies', href: '/movies' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-[#07090e]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-indigo-500 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
                <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                  <Film className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-wider text-white">
                  CINE<span className="text-amber-400">STARS</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                  Cinema Database
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl hover:text-white transition-colors"
                title="Search database (Ctrl+K)"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-400">
                  Ctrl+K
                </kbd>
              </button>

              {/* Favorites Button */}
              <Link
                href="/favorites"
                className={`relative p-2 rounded-xl border transition-colors ${
                  pathname === '/favorites'
                    ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                    : 'text-slate-300 hover:text-white bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
                title="View Bookmarks & Favorites"
              >
                <Heart className="w-5 h-5" />
                {totalFavoritesCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-pulse">
                    {totalFavoritesCount}
                  </span>
                )}
              </Link>

              {/* Admin Portal Button */}
              <Link
                href="/admin"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-md ${
                  pathname.startsWith('/admin')
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-amber-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 hover:border-amber-500/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#0a0e17] px-4 pt-3 pb-5 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.href)
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 border-t border-slate-800">
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-amber-400 bg-amber-500/10"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Command/Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
