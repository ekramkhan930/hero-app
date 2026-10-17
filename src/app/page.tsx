'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Film,
  Sparkles,
  Trophy,
  TrendingUp,
  Star,
  Users,
  ShieldCheck,
  ArrowRight,
  Flame,
  Search,
  Clapperboard,
} from 'lucide-react';
import { celebrityService } from '@/lib/services/celebrityService';
import { movieService } from '@/lib/services/movieService';
import { Celebrity, Movie } from '@/types';
import { CelebrityCard } from '@/components/ui/CelebrityCard';
import { MovieCard } from '@/components/ui/MovieCard';
import { Badge } from '@/components/ui/Badge';

export default function HomePage() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'bollywood' | 'hollywood'>('all');

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

  const bollywoodStars = celebrities.filter((c) => c.industry === 'Bollywood');
  const hollywoodStars = celebrities.filter((c) => c.industry === 'Hollywood');

  const displayedCelebrities =
    activeTab === 'bollywood'
      ? bollywoodStars
      : activeTab === 'hollywood'
      ? hollywoodStars
      : celebrities;

  const totalAwardsCount = celebrities.reduce((acc, c) => acc + c.awards.length, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ========================================================
          1. HERO CINEMATIC SPOTLIGHT BANNER
      ======================================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-28 border-b border-slate-900">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-600/15 via-rose-600/10 to-indigo-600/20 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/10 blur-[90px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-600/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6 shadow-lg shadow-amber-500/10 animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>The Definitive Bollywood & Hollywood Cinema Encyclopedia</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
            Where Legends Shine <br />
            <span className="gold-gradient-text">Bollywood</span> &{' '}
            <span className="indigo-gradient-text">Hollywood</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Immerse yourself in comprehensive biographies, complete movie lists, box office verdicts,
            prestigious awards, and personal details of cinema’s most revered heroes and heroines.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link
              href="/celebrities"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Explore All Celebrities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/movies"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-slate-500 transition-all duration-200 flex items-center gap-2"
            >
              <Film className="w-4 h-4 text-indigo-400" />
              <span>Browse Movies Catalog</span>
            </Link>

            <Link
              href="/admin"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-500/40 hover:border-indigo-400 transition-all duration-200 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Manage in Admin Dashboard</span>
            </Link>
          </div>

          {/* Live Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 sm:p-6 rounded-2xl glass-panel border border-slate-800/80">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                {celebrities.length}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">
                Cataloged Stars
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400">
                {movies.length}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">
                Tracked Movies
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                {totalAwardsCount}+
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">
                Awards & Honors
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-400">
                $50B+
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">
                Global Box Office
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. INDUSTRY QUICK HUBS (4 PILLARS)
      ======================================================== */}
      <section className="py-16 bg-[#06080d] border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Flame className="w-4 h-4" />
                <span>Curated Industry Portals</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Explore By Industry & Gender
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md mt-2 md:mt-0">
              Direct access to Bollywood Heroes & Heroines and Hollywood Heroes & Heroines with specialized filmographies and achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Bollywood Heroes */}
            <Link
              href="/celebrities?industry=Bollywood&role=Hero"
              className="group relative rounded-2xl p-6 glass-panel-gold border border-amber-500/20 hover:border-amber-500/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Bollywood Heroes
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Superstars like Shah Rukh Khan, Aamir Khan, Hrithik Roshan, and Amitabh Bachchan.
              </p>
              <div className="mt-4 flex items-center text-xs font-semibold text-amber-400 gap-1 group-hover:translate-x-1 transition-transform">
                <span>View {bollywoodStars.filter((c) => c.role === 'Hero').length} Heroes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Bollywood Heroines */}
            <Link
              href="/celebrities?industry=Bollywood&role=Heroine"
              className="group relative rounded-2xl p-6 glass-panel-gold border border-amber-500/20 hover:border-amber-500/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Bollywood Heroines
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Queens of cinema like Deepika Padukone, Alia Bhatt, and Priyanka Chopra Jonas.
              </p>
              <div className="mt-4 flex items-center text-xs font-semibold text-amber-400 gap-1 group-hover:translate-x-1 transition-transform">
                <span>View {bollywoodStars.filter((c) => c.role === 'Heroine').length} Heroines</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Hollywood Heroes */}
            <Link
              href="/celebrities?industry=Hollywood&role=Hero"
              className="group relative rounded-2xl p-6 glass-panel-indigo border border-indigo-500/20 hover:border-indigo-500/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                <Clapperboard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                Hollywood Heroes
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Titan actors like Leonardo DiCaprio, Robert Downey Jr., and Tom Cruise.
              </p>
              <div className="mt-4 flex items-center text-xs font-semibold text-indigo-400 gap-1 group-hover:translate-x-1 transition-transform">
                <span>View {hollywoodStars.filter((c) => c.role === 'Hero').length} Heroes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Hollywood Heroines */}
            <Link
              href="/celebrities?industry=Hollywood&role=Heroine"
              className="group relative rounded-2xl p-6 glass-panel-indigo border border-indigo-500/20 hover:border-indigo-500/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                Hollywood Heroines
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Oscar and global trailblazers like Scarlett Johansson, Margot Robbie, and Emma Stone.
              </p>
              <div className="mt-4 flex items-center text-xs font-semibold text-indigo-400 gap-1 group-hover:translate-x-1 transition-transform">
                <span>View {hollywoodStars.filter((c) => c.role === 'Heroine').length} Heroines</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. FEATURED CELEBRITIES DIRECTORY PREVIEW
      ======================================================== */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>Cinema Spotlight</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Trending Celebrities
            </h2>
          </div>

          {/* Industry Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-medium self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Stars ({celebrities.length})
            </button>
            <button
              onClick={() => setActiveTab('bollywood')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'bollywood'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bollywood ({bollywoodStars.length})
            </button>
            <button
              onClick={() => setActiveTab('hollywood')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'hollywood'
                  ? 'bg-indigo-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hollywood ({hollywoodStars.length})
            </button>
          </div>
        </div>

        {/* Celebrities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedCelebrities.slice(0, 8).map((celebrity) => (
            <CelebrityCard key={celebrity.id} celebrity={celebrity} />
          ))}
        </div>

        {/* View All Celebrities Button */}
        <div className="mt-12 text-center">
          <Link
            href="/celebrities"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-amber-500/50 transition-all shadow-md"
          >
            <span>View All {celebrities.length} Celebrities</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>
      </section>

      {/* ========================================================
          4. BLOCKBUSTER MOVIES SPOTLIGHT
      ======================================================== */}
      <section className="py-16 md:py-20 bg-[#06080d] border-t border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Clapperboard className="w-4 h-4" />
                <span>Box Office Hall of Fame</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Iconic Blockbusters & Masterpieces
              </h2>
            </div>
            <Link
              href="/movies"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 self-start md:self-auto"
            >
              <span>Explore All Movies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.slice(0, 4).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. ADMIN DASHBOARD PROMOTION / DATA MANAGEMENT BANNER
      ======================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl p-8 sm:p-12 glass-panel border border-amber-500/30 overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                <ShieldCheck className="w-4 h-4" />
                <span>Full Administrative Control</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Manage Details Easily with the Admin Dashboard
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Add new Bollywood and Hollywood stars, update filmography titles, log box office records,
                curate awards, upload photo galleries, and export your database to JSON whenever you are ready
                to wire up your custom backend API and SQL/NoSQL database!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/admin/login"
                className="px-6 py-3.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-black text-center shadow-lg shadow-amber-500/20 transition-all"
              >
                Sign In to Dashboard
              </Link>
              <Link
                href="/admin/celebrities"
                className="px-6 py-3.5 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-center transition-all"
              >
                Manage Celebrities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
