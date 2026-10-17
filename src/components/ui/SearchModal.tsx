'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Film, User, Star, ArrowRight } from 'lucide-react';
import { celebrityService } from '@/lib/services/celebrityService';
import { movieService } from '@/lib/services/movieService';
import { Celebrity, Movie } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (isOpen) {
      celebrityService.getAll().then(setCelebrities);
      movieService.getAll().then(setMovies);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredCelebrities = trimmed
    ? celebrities.filter(
        (c) =>
          c.name.toLowerCase().includes(trimmed) ||
          c.realName?.toLowerCase().includes(trimmed) ||
          c.industry.toLowerCase().includes(trimmed) ||
          c.role.toLowerCase().includes(trimmed)
      ).slice(0, 5)
    : [];

  const filteredMovies = trimmed
    ? movies.filter(
        (m) =>
          m.title.toLowerCase().includes(trimmed) ||
          m.director.toLowerCase().includes(trimmed) ||
          m.genre.some((g) => g.toLowerCase().includes(trimmed)) ||
          m.industry.toLowerCase().includes(trimmed)
      ).slice(0, 5)
    : [];

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#0b0f19] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Bollywood & Hollywood stars, movies, directors, genres..."
            className="w-full bg-transparent text-white text-base placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white bg-slate-800/80 px-2 py-1 rounded border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
          {!trimmed && (
            <div className="text-center py-8">
              <p className="text-sm text-slate-400">
                Type anything to search stars (e.g. &quot;Shah Rukh&quot;, &quot;DiCaprio&quot;, &quot;Deepika&quot;, &quot;Margot&quot;) or movies (e.g. &quot;Jawan&quot;, &quot;Oppenheimer&quot;).
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['Shah Rukh Khan', 'Leonardo DiCaprio', 'Deepika Padukone', 'Oppenheimer', 'Jawan', 'Barbie'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700/60 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {trimmed && filteredCelebrities.length === 0 && filteredMovies.length === 0 && (
            <div className="text-center py-10">
              <p className="text-slate-400">No results found for &quot;{query}&quot;</p>
              <p className="text-xs text-slate-500 mt-1">Try searching by actor name, movie title, or genre</p>
            </div>
          )}

          {/* Celebrities Results */}
          {filteredCelebrities.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Celebrities ({filteredCelebrities.length})
                </span>
              </div>
              <div className="space-y-1.5">
                {filteredCelebrities.map((celeb) => (
                  <div
                    key={celeb.id}
                    onClick={() => handleSelect(`/celebrities/${celeb.slug}`)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer border border-transparent hover:border-slate-700/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={celeb.profileImage}
                        alt={celeb.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="text-sm font-semibold text-white">{celeb.name}</div>
                        <div className="text-xs text-slate-400">
                          {celeb.role} • Debut {celeb.debutYear}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={celeb.industry === 'Bollywood' ? 'gold' : 'indigo'} size="sm">
                        {celeb.industry}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Movies Results */}
          {filteredMovies.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5" /> Movies ({filteredMovies.length})
                </span>
              </div>
              <div className="space-y-1.5">
                {filteredMovies.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => handleSelect(`/movies/${movie.slug}`)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer border border-transparent hover:border-slate-700/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-8 h-11 rounded object-cover border border-slate-700"
                      />
                      <div>
                        <div className="text-sm font-semibold text-white">{movie.title}</div>
                        <div className="text-xs text-slate-400">
                          {movie.releaseYear} • Dir. {movie.director}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-amber-400 font-bold mr-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {movie.imdbRating}
                      </div>
                      <Badge variant={movie.industry === 'Bollywood' ? 'gold' : 'indigo'} size="sm">
                        {movie.industry}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Quick discovery across cinema database</span>
          <Link
            href="/search"
            onClick={onClose}
            className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
          >
            <span>Advanced Search Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
