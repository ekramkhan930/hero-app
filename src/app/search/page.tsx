'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Film, Users, X, Sparkles } from 'lucide-react';
import { celebrityService } from '@/lib/services/celebrityService';
import { movieService } from '@/lib/services/movieService';
import { Celebrity, Movie } from '@/types';
import { CelebrityCard } from '@/components/ui/CelebrityCard';
import { MovieCard } from '@/components/ui/MovieCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [typeFilter, setTypeFilter] = useState<'all' | 'celebrities' | 'movies'>('all');
  const [industryFilter, setIndustryFilter] = useState<'All' | 'Bollywood' | 'Hollywood'>('All');

  useEffect(() => {
    const load = async () => {
      const [c, m] = await Promise.all([celebrityService.getAll(), movieService.getAll()]);
      setCelebrities(c);
      setMovies(m);
    };
    load();
  }, []);

  const trimmed = query.trim().toLowerCase();

  const matchedCelebrities = useMemo(() => {
    if (!trimmed) return celebrities;
    return celebrities.filter((c) => {
      const matchInd = industryFilter === 'All' || c.industry === industryFilter;
      const matchQuery =
        c.name.toLowerCase().includes(trimmed) ||
        c.realName?.toLowerCase().includes(trimmed) ||
        c.biography.toLowerCase().includes(trimmed) ||
        c.debutMovie.toLowerCase().includes(trimmed);
      return matchInd && matchQuery;
    });
  }, [celebrities, trimmed, industryFilter]);

  const matchedMovies = useMemo(() => {
    if (!trimmed) return movies;
    return movies.filter((m) => {
      const matchInd = industryFilter === 'All' || m.industry === industryFilter;
      const matchQuery =
        m.title.toLowerCase().includes(trimmed) ||
        m.director.toLowerCase().includes(trimmed) ||
        m.genre.some((g) => g.toLowerCase().includes(trimmed)) ||
        m.leadActors?.some((a) => a.name.toLowerCase().includes(trimmed));
      return matchInd && matchQuery;
    });
  }, [movies, trimmed, industryFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
          <Search className="w-3.5 h-3.5" />
          <span>Unified Cinema Search Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Search Celebrities & Movies
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Search across Bollywood & Hollywood stars, biographies, movies, directors, roles, and awards.
        </p>
      </div>

      {/* Search Input & Filters */}
      <div className="p-4 sm:p-6 rounded-2xl glass-panel border border-slate-800 mb-10 space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type celebrity name, movie title, genre, or director..."
            className="w-full bg-[#0b0f19] text-white pl-12 pr-12 py-3.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-base placeholder:text-slate-500 shadow-inner"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Entity Type Filter */}
          <div className="flex items-center p-1 bg-[#0b0f19] rounded-xl border border-slate-800 text-xs font-medium">
            {[
              { id: 'all', label: `All Results (${matchedCelebrities.length + matchedMovies.length})` },
              { id: 'celebrities', label: `Stars (${matchedCelebrities.length})` },
              { id: 'movies', label: `Movies (${matchedMovies.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTypeFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  typeFilter === tab.id
                    ? 'bg-amber-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Industry Filter */}
          <div className="flex items-center p-1 bg-[#0b0f19] rounded-xl border border-slate-800 text-xs font-medium">
            {(['All', 'Bollywood', 'Hollywood'] as const).map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustryFilter(ind)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  industryFilter === ind
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Rendering */}
      <div className="space-y-12">
        {/* Celebrities Section */}
        {(typeFilter === 'all' || typeFilter === 'celebrities') && matchedCelebrities.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Stars ({matchedCelebrities.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {matchedCelebrities.map((celeb) => (
                <CelebrityCard key={celeb.id} celebrity={celeb} />
              ))}
            </div>
          </div>
        )}

        {/* Movies Section */}
        {(typeFilter === 'all' || typeFilter === 'movies') && matchedMovies.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Film className="w-5 h-5 text-indigo-400" />
                <span>Movies ({matchedMovies.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {matchedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {matchedCelebrities.length === 0 && matchedMovies.length === 0 && (
          <div className="text-center py-20 glass-panel rounded-2xl border border-slate-800">
            <p className="text-lg font-bold text-slate-300">No results found for &quot;{query}&quot;</p>
            <p className="text-xs text-slate-500 mt-1">Try another search term or industry filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
