'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Film, Users, Trash2, ArrowRight } from 'lucide-react';
import { useFavorites } from '@/lib/context/FavoritesContext';
import { celebrityService } from '@/lib/services/celebrityService';
import { movieService } from '@/lib/services/movieService';
import { Celebrity, Movie } from '@/types';
import { CelebrityCard } from '@/components/ui/CelebrityCard';
import { MovieCard } from '@/components/ui/MovieCard';

export default function FavoritesPage() {
  const { favoriteCelebrities, favoriteMovies, totalFavoritesCount } = useFavorites();
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'celebrities' | 'movies'>('all');

  useEffect(() => {
    const load = async () => {
      const [allCelebs, allMovs] = await Promise.all([
        celebrityService.getAll(),
        movieService.getAll(),
      ]);
      setCelebrities(allCelebs.filter((c) => favoriteCelebrities.includes(c.id)));
      setMovies(allMovs.filter((m) => favoriteMovies.includes(m.id)));
    };
    load();
  }, [favoriteCelebrities, favoriteMovies]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>Personal Bookmarks & Watchlist</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            My Favorites
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Your saved Bollywood and Hollywood celebrities and bookmarked movies.
          </p>
        </div>

        {totalFavoritesCount > 0 && (
          <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-medium self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'all' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({celebrities.length + movies.length})
            </button>
            <button
              onClick={() => setActiveTab('celebrities')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'celebrities' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Stars ({celebrities.length})
            </button>
            <button
              onClick={() => setActiveTab('movies')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'movies' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Movies ({movies.length})
            </button>
          </div>
        )}
      </div>

      {totalFavoritesCount === 0 ? (
        <div className="text-center py-24 glass-panel rounded-3xl border border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No Favorites Saved Yet</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Browse through our Bollywood & Hollywood celebrities and movie catalog and click the heart icon
            to build your personal cinema collection.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/celebrities"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-xl transition-colors"
            >
              Browse Stars
            </Link>
            <Link
              href="/movies"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Browse Movies
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Celebrities */}
          {(activeTab === 'all' || activeTab === 'celebrities') && celebrities.length > 0 && (
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Saved Celebrities ({celebrities.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {celebrities.map((c) => (
                  <CelebrityCard key={c.id} celebrity={c} />
                ))}
              </div>
            </div>
          )}

          {/* Movies */}
          {(activeTab === 'all' || activeTab === 'movies') && movies.length > 0 && (
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2 mb-6">
                <Film className="w-5 h-5 text-indigo-400" />
                <span>Watchlist Movies ({movies.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((m) => (
                  <MovieCard key={m.id} movie={m} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
