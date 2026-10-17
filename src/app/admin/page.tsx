'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Film,
  Trophy,
  Plus,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Database,
  ExternalLink,
} from 'lucide-react';
import { celebrityService } from '@/lib/services/celebrityService';
import { movieService } from '@/lib/services/movieService';
import { Celebrity, Movie } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { CelebrityModal } from '@/components/admin/CelebrityModal';
import { MovieModal } from '@/components/admin/MovieModal';

export default function AdminDashboardPage() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isCelebModalOpen, setIsCelebModalOpen] = useState(false);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);

  const loadData = async () => {
    const [celebs, movs] = await Promise.all([
      celebrityService.getAll(),
      movieService.getAll(),
    ]);
    setCelebrities(celebs);
    setMovies(movs);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('cinestars_data_updated', loadData);
    return () => window.removeEventListener('cinestars_data_updated', loadData);
  }, []);

  const bollywoodCelebs = celebrities.filter((c) => c.industry === 'Bollywood');
  const hollywoodCelebs = celebrities.filter((c) => c.industry === 'Hollywood');

  const heroesCount = celebrities.filter((c) => c.role === 'Hero').length;
  const heroinesCount = celebrities.filter((c) => c.role === 'Heroine').length;

  const totalAwardsCount = celebrities.reduce((acc, c) => acc + c.awards.length, 0);

  const handleSaveCelebrity = async (data: any) => {
    await celebrityService.create(data);
    await loadData();
  };

  const handleSaveMovie = async (data: any) => {
    await movieService.create(data);
    await loadData();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Cinema Management Dashboard
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real-time catalog oversight for Bollywood & Hollywood heroes, heroines, and filmographies.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCelebModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Celebrity</span>
          </button>

          <button
            onClick={() => setIsMovieModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Movie</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Celebrities
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{celebrities.length}</div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>{heroesCount} Heroes</span>
            <span>•</span>
            <span>{heroinesCount} Heroines</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Bollywood Stars
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-400">{bollywoodCelebs.length}</div>
          <div className="text-[11px] text-slate-400">
            {Math.round((bollywoodCelebs.length / (celebrities.length || 1)) * 100)}% of total catalog
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Hollywood Stars
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-indigo-400">{hollywoodCelebs.length}</div>
          <div className="text-[11px] text-slate-400">
            {Math.round((hollywoodCelebs.length / (celebrities.length || 1)) * 100)}% of total catalog
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tracked Movies
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400">{movies.length}</div>
          <div className="text-[11px] text-slate-400">{totalAwardsCount}+ awards logged</div>
        </div>
      </div>

      {/* Tables Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Celebrities */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Recently Cataloged Stars</span>
            </h3>
            <Link
              href="/admin/celebrities"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2">
            {celebrities.slice(0, 5).map((celeb) => (
              <div
                key={celeb.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={celeb.profileImage}
                    alt={celeb.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-bold text-white">{celeb.name}</span>
                    <p className="text-[11px] text-slate-400">
                      {celeb.role} • Debut {celeb.debutYear}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={celeb.industry === 'Bollywood' ? 'gold' : 'indigo'} size="sm">
                    {celeb.industry}
                  </Badge>
                  <Link
                    href={`/celebrities/${celeb.slug}`}
                    className="text-slate-400 hover:text-white p-1"
                    title="View Public Profile"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Movies */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Film className="w-4 h-4 text-indigo-400" />
              <span>Recently Cataloged Movies</span>
            </h3>
            <Link
              href="/admin/movies"
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2">
            {movies.slice(0, 5).map((movie) => (
              <div
                key={movie.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-8 h-11 rounded object-cover border border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-bold text-white">{movie.title}</span>
                    <p className="text-[11px] text-slate-400">
                      {movie.releaseYear} • Dir. {movie.director}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={movie.industry === 'Bollywood' ? 'gold' : 'indigo'} size="sm">
                    {movie.industry}
                  </Badge>
                  <Link
                    href={`/movies/${movie.slug}`}
                    className="text-slate-400 hover:text-white p-1"
                    title="View Public Page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Backend & API Integration Info Box */}
      <div className="p-6 rounded-2xl glass-panel-gold border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>Ready for Custom Backend & Database Integration</span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            All services are cleanly decoupled in <code className="text-amber-300">src/lib/services/celebrityService.ts</code> and <code className="text-amber-300">movieService.ts</code>. You can export your current dataset as JSON anytime from the Database Settings page to populate your database!
          </p>
        </div>

        <Link
          href="/admin/settings"
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-white text-xs font-bold shrink-0 transition-colors"
        >
          Export Data / Settings
        </Link>
      </div>

      {/* Modals */}
      <CelebrityModal
        isOpen={isCelebModalOpen}
        onClose={() => setIsCelebModalOpen(false)}
        onSave={handleSaveCelebrity}
      />

      <MovieModal
        isOpen={isMovieModalOpen}
        onClose={() => setIsMovieModalOpen(false)}
        onSave={handleSaveMovie}
      />
    </div>
  );
}
