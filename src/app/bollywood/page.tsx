'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Trophy,
  Flame,
  Users,
  Film,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { celebrityService } from '@/lib/services/celebrityService';
import { movieService } from '@/lib/services/movieService';
import { Celebrity, Movie } from '@/types';
import { CelebrityCard } from '@/components/ui/CelebrityCard';
import { MovieCard } from '@/components/ui/MovieCard';

export default function BollywoodPage() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [roleFilter, setRoleFilter] = useState<'All' | 'Actor' | 'Actress'>('All');

  const loadData = async () => {
    const [allCelebs, allMovs] = await Promise.all([
      celebrityService.getAll(),
      movieService.getAll(),
    ]);
    setCelebrities(allCelebs.filter((c) => c.industry === 'Bollywood'));
    setMovies(allMovs.filter((m) => m.industry === 'Bollywood'));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('cinestars_data_updated', loadData);
    return () => window.removeEventListener('cinestars_data_updated', loadData);
  }, []);

  const actors = celebrities.filter((c) => c.role === 'Actor');
  const actresses = celebrities.filter((c) => c.role === 'Actress');

  const filteredCelebrities =
    roleFilter === 'Actor'
      ? actors
      : roleFilter === 'Actress'
      ? actresses
      : celebrities;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Bollywood Banner */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-slate-900 bg-gradient-to-b from-[#130d06] via-[#090b10] to-[#07090e]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Hindi Cinema Spotlight</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
            The Magic of <span className="gold-gradient-text">Bollywood</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Celebrate the largest film industry in the world. Explore iconic Bollywood actors and
            actresses, from golden era legends to current 1000-crore box office royalty.
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <div className="glass-panel px-4 py-2.5 rounded-xl border border-amber-500/20 text-slate-300">
              <span className="font-bold text-amber-400 text-sm">{actors.length}</span> Bollywood Actors
            </div>
            <div className="glass-panel px-4 py-2.5 rounded-xl border border-amber-500/20 text-slate-300">
              <span className="font-bold text-amber-400 text-sm">{actresses.length}</span> Bollywood Actresses
            </div>
            <div className="glass-panel px-4 py-2.5 rounded-xl border border-amber-500/20 text-slate-300">
              <span className="font-bold text-amber-400 text-sm">{movies.length}</span> Landmark Hindi Movies
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 space-y-16">
        {/* Celebrities Filter & Showcase */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Bollywood Stars</h2>
              <p className="text-xs text-slate-400 mt-1">
                Filter between Bollywood actors and actresses
              </p>
            </div>

            <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-medium self-start sm:self-auto">
              {(['All', 'Actor', 'Actress'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    roleFilter === r
                      ? 'bg-amber-500 text-black font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {r === 'All' ? 'All Stars' : r === 'Actor' ? 'Actors' : 'Actresses'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCelebrities.map((celeb) => (
              <CelebrityCard key={celeb.id} celebrity={celeb} />
            ))}
          </div>
        </div>

        {/* Bollywood Movies Showcase */}
        {movies.length > 0 && (
          <div className="pt-8 border-t border-slate-900">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Iconic Bollywood Blockbusters
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  All-time grossers, historical classics, and critical masterpieces.
                </p>
              </div>

              <Link
                href="/movies"
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>All Movies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
