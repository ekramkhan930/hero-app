import React from 'react';
import Link from 'next/link';
import { Film, Heart, Shield, Sparkles, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#05070a] border-t border-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                  <Film className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-wider text-white">
                CINE<span className="text-amber-400">STARS</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier cinema encyclopedia showcasing legendary Bollywood and Hollywood heroes and
              heroines, full filmographies, box office verdicts, awards, and cinematic trivia.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Built with Next.js, Tailwind CSS & TypeScript</span>
            </div>
          </div>

          {/* Quick Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Explore Cinema</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/celebrities" className="hover:text-amber-400 transition-colors">
                  All Celebrities
                </Link>
              </li>
              <li>
                <Link href="/bollywood" className="hover:text-amber-400 transition-colors">
                  Bollywood Stars
                </Link>
              </li>
              <li>
                <Link href="/hollywood" className="hover:text-amber-400 transition-colors">
                  Hollywood Stars
                </Link>
              </li>
              <li>
                <Link href="/movies" className="hover:text-amber-400 transition-colors">
                  Movies & Box Office
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-amber-400 transition-colors">
                  Advanced Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/celebrities?role=Hero&industry=Bollywood" className="hover:text-amber-400 transition-colors">
                  Bollywood Heroes
                </Link>
              </li>
              <li>
                <Link href="/celebrities?role=Heroine&industry=Bollywood" className="hover:text-amber-400 transition-colors">
                  Bollywood Heroines
                </Link>
              </li>
              <li>
                <Link href="/celebrities?role=Hero&industry=Hollywood" className="hover:text-amber-400 transition-colors">
                  Hollywood Heroes
                </Link>
              </li>
              <li>
                <Link href="/celebrities?role=Heroine&industry=Hollywood" className="hover:text-amber-400 transition-colors">
                  Hollywood Heroines
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>My Favorites</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin Management */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Management</h4>
            <p className="text-xs text-slate-400">
              Manage cinema records, add new stars, curate filmographies, and customize movies via the admin dashboard.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-slate-900 border border-slate-800 hover:border-amber-500/40 px-3 py-2 rounded-lg transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CineStars. Created for cinema lovers worldwide.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Frontend Architecture Ready for Backend / DB API Integration</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
