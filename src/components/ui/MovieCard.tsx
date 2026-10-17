'use client';

import React from 'react';
import Link from 'next/link';
import { Movie } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Star, Heart, Clock, Clapperboard } from 'lucide-react';
import { useFavorites } from '@/lib/context/FavoritesContext';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { isMovieFavorite, toggleMovie } = useFavorites();
  const isFav = isMovieFavorite(movie.id);

  const getVerdictVariant = (verdict: string) => {
    switch (verdict) {
      case 'All-Time Blockbuster':
        return 'gold';
      case 'Blockbuster':
      case 'Super Hit':
        return 'emerald';
      case 'Hit':
        return 'indigo';
      default:
        return 'default';
    }
  };

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden glass-panel border border-slate-800/80 hover:border-amber-500/40 glow-card transition-all duration-300">
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <Badge variant={movie.industry === 'Bollywood' ? 'gold' : 'indigo'} size="sm">
            {movie.industry}
          </Badge>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMovie(movie.id);
            }}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-2 rounded-full backdrop-blur-md transition-transform duration-200 hover:scale-110 ${
              isFav
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-black/40 text-slate-300 border border-white/10 hover:text-white hover:bg-black/60'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Verdict Badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          <Badge variant={getVerdictVariant(movie.boxOfficeVerdict)} size="sm">
            {movie.boxOfficeVerdict}
          </Badge>

          <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 text-xs font-bold text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{movie.imdbRating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 bg-[#0a0e17]/90">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <Link
            href={`/movies/${movie.slug}`}
            className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1"
          >
            {movie.title}
          </Link>
          <span className="text-xs font-medium text-slate-400 shrink-0">{movie.releaseYear}</span>
        </div>

        {/* Director & Duration */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2.5">
          <span className="truncate">Dir: {movie.director}</span>
          <span>•</span>
          <span className="flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {movie.runtimeMinutes}m
          </span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 3).map((g) => (
            <span key={g} className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">
              {g}
            </span>
          ))}
        </div>

        {/* Lead Actors Preview */}
        {movie.leadActors && movie.leadActors.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 mt-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="text-slate-500 text-[11px] shrink-0">Cast:</span>
              <span className="text-slate-300 text-[11px] truncate">
                {movie.leadActors.map((a) => a.name).join(', ')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
