'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Film,
  Star,
  Clock,
  Calendar,
  Heart,
  Share2,
  ArrowLeft,
  DollarSign,
  Clapperboard,
  Users,
  Play,
  Sparkles,
} from 'lucide-react';
import { movieService } from '@/lib/services/movieService';
import { celebrityService } from '@/lib/services/celebrityService';
import { Movie, Celebrity } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useFavorites } from '@/lib/context/FavoritesContext';
import { MovieCard } from '@/components/ui/MovieCard';

export default function MovieDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { isMovieFavorite, toggleMovie } = useFavorites();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [celebrityMap, setCelebrityMap] = useState<Record<string, Celebrity>>({});
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const loadData = async () => {
      const currentMovie = await movieService.getBySlug(slug);
      if (!currentMovie) return;
      setMovie(currentMovie);

      // Load all celebrities to cross-link
      const allCelebs = await celebrityService.getAll();
      const map: Record<string, Celebrity> = {};
      allCelebs.forEach((c) => {
        map[c.id] = c;
        map[c.name.toLowerCase()] = c;
      });
      setCelebrityMap(map);

      // Related movies in same industry
      const allMovies = await movieService.getAll();
      setRelatedMovies(
        allMovies.filter((m) => m.industry === currentMovie.industry && m.id !== currentMovie.id).slice(0, 4)
      );
    };

    loadData();
    window.addEventListener('cinestars_data_updated', loadData);
    return () => window.removeEventListener('cinestars_data_updated', loadData);
  }, [slug]);

  if (!movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex-1">
        <p className="text-xl font-bold text-white">Movie not found</p>
        <p className="text-sm text-slate-400 mt-2">The movie you are looking for is not in our database.</p>
        <Link
          href="/movies"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Movies</span>
        </Link>
      </div>
    );
  }

  const isFav = isMovieFavorite(movie.id);
  const isBollywood = movie.industry === 'Bollywood';

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

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
    <div className="flex flex-col min-h-screen">
      {/* Backdrop Header */}
      <div className="relative w-full overflow-hidden bg-slate-950 border-b border-slate-900">
        <div className="absolute inset-0 h-[450px] w-full overflow-hidden">
          <img
            src={movie.backdropUrl || movie.posterUrl}
            alt=""
            className="w-full h-full object-cover object-center opacity-25 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 relative z-10">
          {/* Navigation & Actions */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/movies"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Movies</span>
            </Link>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          {/* Main Info */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8">
            {/* Poster */}
            <div className="relative w-44 h-64 sm:w-56 sm:h-80 rounded-2xl overflow-hidden glass-panel border border-slate-700 shadow-2xl shrink-0">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => toggleMovie(movie.id)}
                className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform hover:scale-110 ${
                  isFav
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : 'bg-black/40 text-slate-300 border border-white/10 hover:text-white'
                }`}
                title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <Badge variant={isBollywood ? 'gold' : 'indigo'} size="md">
                  {movie.industry} Cinema
                </Badge>
                <Badge variant={getVerdictVariant(movie.boxOfficeVerdict)} size="md">
                  {movie.boxOfficeVerdict}
                </Badge>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  {movie.title}
                </h1>
                <p className="text-sm text-slate-400 mt-1">Directed by {movie.director}</p>
              </div>

              {/* Badges / Rating / Runtime */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  IMDb {movie.imdbRating} / 10
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {movie.runtimeMinutes} minutes
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Released: {movie.releaseYear}
                </span>
              </div>

              {/* Genre Pills */}
              <div className="flex flex-wrap justify-center md:justify-start gap-1.5 pt-1">
                {movie.genre.map((g) => (
                  <span
                    key={g}
                    className="text-xs bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-lg"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Synopsis & Star Cast */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Clapperboard className="w-5 h-5 text-indigo-400" />
                <span>Synopsis & Storyline</span>
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {movie.synopsis}
              </p>
            </div>

            {/* Cast & Characters (with clickable links to Celebrities) */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Lead Heroes, Heroines & Cast</span>
              </h3>
              <p className="text-xs text-slate-400">
                Click on any celebrity to view their full biography, awards, and complete movie list.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {movie.leadActors.map((actor, idx) => {
                  const linkedCeleb =
                    (actor.celebrityId && celebrityMap[actor.celebrityId]) ||
                    celebrityMap[actor.name.toLowerCase()];

                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all"
                    >
                      <img
                        src={actor.profileImage || linkedCeleb?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                        alt={actor.name}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        {linkedCeleb ? (
                          <Link
                            href={`/celebrities/${linkedCeleb.slug}`}
                            className="text-sm font-bold text-white hover:text-amber-400 transition-colors flex items-center gap-1 group"
                          >
                            <span className="truncate">{actor.name}</span>
                            <span className="text-xs text-amber-400 group-hover:translate-x-0.5 transition-transform">
                              →
                            </span>
                          </Link>
                        ) : (
                          <p className="text-sm font-bold text-white truncate">{actor.name}</p>
                        )}
                        <p className="text-xs text-amber-300 font-medium truncate mt-0.5">
                          as {actor.role}
                        </p>
                        {linkedCeleb && (
                          <span className="inline-block text-[10px] text-slate-400 mt-1">
                            Verified {linkedCeleb.role} Profile
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Related Movies */}
            {relatedMovies.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">More from {movie.industry}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedMovies.map((m) => (
                    <MovieCard key={m.id} movie={m} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Col: Box Office & Production Stats */}
          <div className="space-y-6">
            {/* Box Office Numbers */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-3">
                Box Office & Commercial Verdict
              </h3>
              <dl className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <dt className="text-slate-400">Verdict</dt>
                  <dd>
                    <Badge variant={getVerdictVariant(movie.boxOfficeVerdict)} size="sm">
                      {movie.boxOfficeVerdict}
                    </Badge>
                  </dd>
                </div>
                {movie.budget && (
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <dt className="text-slate-400">Production Budget</dt>
                    <dd className="font-semibold text-white">{movie.budget}</dd>
                  </div>
                )}
                {movie.worldwideGross && (
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <dt className="text-slate-400">Worldwide Gross</dt>
                    <dd className="font-bold text-emerald-400">{movie.worldwideGross}</dd>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <dt className="text-slate-400">IMDb Rating</dt>
                  <dd className="font-bold text-amber-400">{movie.imdbRating} / 10</dd>
                </div>
              </dl>
            </div>

            {/* Crew Details */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-3">
                Crew & Production
              </h3>
              <dl className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <dt className="text-slate-400">Director</dt>
                  <dd className="font-semibold text-white">{movie.director}</dd>
                </div>
                {movie.producer && (
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <dt className="text-slate-400">Producer</dt>
                    <dd className="font-semibold text-white text-right">{movie.producer}</dd>
                  </div>
                )}
                {movie.musicDirector && (
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <dt className="text-slate-400">Music Composer</dt>
                    <dd className="font-semibold text-white">{movie.musicDirector}</dd>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <dt className="text-slate-400">Release Year</dt>
                  <dd className="font-semibold text-white">{movie.releaseYear}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
