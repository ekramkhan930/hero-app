'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Film, Star, X, Clapperboard, Sparkles } from 'lucide-react';
import { movieService } from '@/lib/services/movieService';
import { Movie, Industry, BoxOfficeVerdict } from '@/types';
import { MovieCard } from '@/components/ui/MovieCard';
import { Badge } from '@/components/ui/Badge';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<'All' | Industry>('All');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'year-desc' | 'year-asc' | 'title'>('rating');

  const loadData = async () => {
    const data = await movieService.getAll();
    setMovies(data);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('cinestars_data_updated', loadData);
    return () => window.removeEventListener('cinestars_data_updated', loadData);
  }, []);

  // Collect all unique genres
  const allGenres = useMemo(() => {
    const set = new Set<string>();
    movies.forEach((m) => m.genre.forEach((g) => set.add(g)));
    return ['All', ...Array.from(set).sort()];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    return movies
      .filter((m) => {
        if (selectedIndustry !== 'All' && m.industry !== selectedIndustry) {
          return false;
        }
        if (selectedGenre !== 'All' && !m.genre.includes(selectedGenre)) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = m.title.toLowerCase().includes(q);
          const matchesDirector = m.director.toLowerCase().includes(q);
          const matchesCast = m.leadActors?.some((a) => a.name.toLowerCase().includes(q));
          if (!matchesTitle && !matchesDirector && !matchesCast) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.imdbRating - a.imdbRating;
        }
        if (sortBy === 'year-desc') {
          return b.releaseYear - a.releaseYear;
        }
        if (sortBy === 'year-asc') {
          return a.releaseYear - b.releaseYear;
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [movies, selectedIndustry, selectedGenre, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('All');
    setSelectedGenre('All');
    setSortBy('rating');
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedIndustry !== 'All' || selectedGenre !== 'All' || sortBy !== 'rating';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Clapperboard className="w-3.5 h-3.5" />
          <span>Cinematic Catalog & Box Office Registry</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Movies & Box Office
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
          Explore iconic Bollywood and Hollywood cinema blockbusters, runtimes, IMDb ratings, and box
          office verdicts starring top heroes and heroines.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movie title, director, lead cast..."
              className="w-full bg-[#0b0f19] text-white pl-10 pr-10 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500/80 focus:outline-none text-sm placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Industry Selector */}
            <div className="flex items-center p-1 bg-[#0b0f19] rounded-xl border border-slate-800 text-xs font-medium">
              {(['All', 'Bollywood', 'Hollywood'] as const).map((ind) => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    selectedIndustry === ind
                      ? ind === 'Bollywood'
                        ? 'bg-amber-500 text-black font-bold'
                        : ind === 'Hollywood'
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-700 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>

            {/* Genre Dropdown */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-[#0b0f19] text-slate-300 text-xs font-medium px-3 py-2 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
            >
              {allGenres.map((g) => (
                <option key={g} value={g}>
                  {g === 'All' ? 'All Genres' : g}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0b0f19] text-slate-300 text-xs font-medium px-3 py-2 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
            >
              <option value="rating">Sort: IMDb Rating</option>
              <option value="year-desc">Sort: Year (Newest)</option>
              <option value="year-asc">Sort: Year (Earliest)</option>
              <option value="title">Sort: Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Results Meta */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          <div>
            Showing <span className="font-bold text-white">{filteredMovies.length}</span> of{' '}
            <span className="font-bold text-white">{movies.length}</span> movies
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredMovies.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-2xl border border-slate-800">
          <p className="text-slate-300 text-lg font-bold">No movies found</p>
          <p className="text-xs text-slate-500 mt-1">Try searching another term or resetting filters</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
