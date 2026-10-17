'use client';

import React from 'react';
import Link from 'next/link';
import { Celebrity } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Trophy, Film, Heart, Sparkles, MapPin, Calendar } from 'lucide-react';
import { useFavorites } from '@/lib/context/FavoritesContext';

interface CelebrityCardProps {
  celebrity: Celebrity;
}

export function CelebrityCard({ celebrity }: CelebrityCardProps) {
  const { isCelebrityFavorite, toggleCelebrity } = useFavorites();
  const isFav = isCelebrityFavorite(celebrity.id);

  const isBollywood = celebrity.industry === 'Bollywood';

  return (
    <div
      className={`group relative flex flex-col rounded-2xl overflow-hidden glass-panel border transition-all duration-300 ${
        isBollywood ? 'glow-card border-slate-800/80 hover:border-amber-500/40' : 'glow-card-indigo border-slate-800/80 hover:border-indigo-500/40'
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
        <img
          src={celebrity.profileImage}
          alt={celebrity.name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant={isBollywood ? 'gold' : 'indigo'} size="sm">
              {celebrity.industry}
            </Badge>
            <Badge variant="default" size="sm">
              {celebrity.role}
            </Badge>
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCelebrity(celebrity.id);
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

        {/* Trending / Debut Year Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 z-10">
          <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            Debut: {celebrity.debutYear}
          </span>

          {celebrity.awards.length > 0 && (
            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-amber-300">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              {celebrity.awards.length} Awards
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 bg-[#0a0e17]/90">
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <Link
              href={`/celebrities/${celebrity.slug}`}
              className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1"
            >
              {celebrity.name}
            </Link>
          </div>
          {celebrity.realName && celebrity.realName !== celebrity.name && (
            <p className="text-xs text-slate-400">({celebrity.realName})</p>
          )}
        </div>

        {/* Origin / Birthplace */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate">{celebrity.birthplace}</span>
        </div>

        {/* Biography Snippet */}
        <p className="text-xs text-slate-300/80 line-clamp-2 leading-relaxed mb-4 flex-1">
          {celebrity.biography}
        </p>

        {/* Filmography mini indicator */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Film className="w-3.5 h-3.5 text-slate-400" />
            <span>{celebrity.filmography.length} Featured Movies</span>
          </span>

          <Link
            href={`/celebrities/${celebrity.slug}`}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 group/btn"
          >
            <span>View Profile</span>
            <span className="transition-transform group-hover/btn:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
