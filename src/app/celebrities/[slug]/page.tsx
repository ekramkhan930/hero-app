'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Film,
  Trophy,
  Calendar,
  MapPin,
  Heart,
  Share2,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  Star,
  CheckCircle,
  HelpCircle,
  Globe,
  Edit3,
} from 'lucide-react';
import { celebrityService } from '@/lib/services/celebrityService';
import { movieService } from '@/lib/services/movieService';
import { Celebrity, Movie } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useFavorites } from '@/lib/context/FavoritesContext';
import { useAuth } from '@/lib/context/AuthContext';
import { MovieCard } from '@/components/ui/MovieCard';

export default function CelebrityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { isCelebrityFavorite, toggleCelebrity } = useFavorites();
  const { isAuthenticated } = useAuth();

  const [celebrity, setCelebrity] = useState<Celebrity | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [coStars, setCoStars] = useState<Celebrity[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'filmography' | 'awards' | 'gallery'>('overview');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const loadData = async () => {
      const celeb = await celebrityService.getBySlug(slug);
      if (!celeb) return;
      setCelebrity(celeb);

      // Find movies featuring this celebrity
      const allMovies = await movieService.getAll();
      const matchedMovies = allMovies.filter(
        (m) =>
          m.leadActors.some((a) => a.celebrityId === celeb.id || a.name.toLowerCase() === celeb.name.toLowerCase()) ||
          celeb.filmography.some((f) => f.title.toLowerCase() === m.title.toLowerCase())
      );
      setRelatedMovies(matchedMovies);

      // Find co-stars from same industry
      const allCelebs = await celebrityService.getAll();
      const peers = allCelebs.filter((c) => c.industry === celeb.industry && c.id !== celeb.id).slice(0, 4);
      setCoStars(peers);
    };

    loadData();
    window.addEventListener('cinestars_data_updated', loadData);
    return () => window.removeEventListener('cinestars_data_updated', loadData);
  }, [slug]);

  if (!celebrity) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex-1">
        <p className="text-xl font-bold text-white">Celebrity not found</p>
        <p className="text-sm text-slate-400 mt-2">The star profile you are looking for might have been moved or removed.</p>
        <Link
          href="/celebrities"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-black font-bold text-sm rounded-xl hover:bg-amber-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </Link>
      </div>
    );
  }

  const isFav = isCelebrityFavorite(celebrity.id);
  const isBollywood = celebrity.industry === 'Bollywood';

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const getVerdictBadgeVariant = (verdict: string) => {
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
      {/* ========================================================
          1. HERO BACKDROP & PROFILE HEADER
      ======================================================== */}
      <div className="relative w-full overflow-hidden bg-slate-950 border-b border-slate-900">
        {/* Backdrop Image */}
        <div className="absolute inset-0 h-[450px] w-full overflow-hidden">
          <img
            src={celebrity.bannerImage || celebrity.profileImage}
            alt=""
            className="w-full h-full object-cover object-center opacity-25 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 relative z-10">
          {/* Back Navigation & Breadcrumb */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/celebrities"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Celebrities</span>
            </Link>

            <div className="flex items-center gap-2">
              {/* Share button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>

              {/* Admin Quick Jump */}
              {isAuthenticated && (
                <Link
                  href="/admin/celebrities"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-semibold transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit in Admin</span>
                </Link>
              )}
            </div>
          </div>

          {/* Profile Card Header */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8">
            {/* Portrait Image */}
            <div className="relative w-44 h-56 sm:w-56 sm:h-72 rounded-2xl overflow-hidden glass-panel border-2 border-amber-500/30 shadow-2xl shrink-0">
              <img
                src={celebrity.profileImage}
                alt={celebrity.name}
                className="w-full h-full object-cover object-top"
              />
              <button
                onClick={() => toggleCelebrity(celebrity.id)}
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

            {/* Info Block */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <Badge variant={isBollywood ? 'gold' : 'indigo'} size="md">
                  {celebrity.industry} Cinema
                </Badge>
                <Badge variant="default" size="md">
                  {celebrity.role}
                </Badge>
                {celebrity.trendingRank && (
                  <Badge variant="amber" size="md">
                    Trending #{celebrity.trendingRank}
                  </Badge>
                )}
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  {celebrity.name}
                </h1>
                {celebrity.realName && celebrity.realName !== celebrity.name && (
                  <p className="text-sm text-slate-400 mt-1">Real Name: {celebrity.realName}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  Debut: {celebrity.debutYear} ({celebrity.debutMovie})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {celebrity.birthplace}
                </span>
                {celebrity.age && (
                  <>
                    <span>•</span>
                    <span>{celebrity.age} years old</span>
                  </>
                )}
              </div>

              {/* Box office tag */}
              {celebrity.boxOfficeTotalGross && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>Career Box Office: {celebrity.boxOfficeTotalGross}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
            {[
              { id: 'overview', label: 'Biography & Overview' },
              { id: 'filmography', label: `Filmography & Movies (${celebrity.filmography.length})` },
              { id: 'awards', label: `Awards & Accolades (${celebrity.awards.length})` },
              { id: 'gallery', label: `Photo Gallery (${celebrity.galleryImages?.length || 1})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================
          2. TAB CONTENTS
      ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Biography & Trivia */}
            <div className="lg:col-span-2 space-y-8">
              {/* Biography */}
              <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Biography & Legacy</span>
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {celebrity.biography}
                </p>

                {celebrity.actingStyle && (
                  <div className="pt-4 border-t border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                      Acting Style & Signature Persona
                    </h4>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {celebrity.actingStyle}
                    </p>
                  </div>
                )}
              </div>

              {/* Trivia & Fascinating Facts */}
              {celebrity.trivia && celebrity.trivia.length > 0 && (
                <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-400" />
                    <span>Trivia & Lesser-Known Facts</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {celebrity.trivia.map((t, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs sm:text-sm text-slate-300"
                      >
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Cataloged Movies */}
              {relatedMovies.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Film className="w-5 h-5 text-indigo-400" />
                    <span>Featured in Cataloged Movies</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedMovies.map((m) => (
                      <MovieCard key={m.id} movie={m} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Personal Stats & Socials */}
            <div className="space-y-6">
              {/* Personal Details Card */}
              <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-3">
                  Personal Information
                </h3>
                <dl className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <dt className="text-slate-400">Date of Birth</dt>
                    <dd className="font-semibold text-white">{celebrity.dob}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <dt className="text-slate-400">Height</dt>
                    <dd className="font-semibold text-white">{celebrity.height}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <dt className="text-slate-400">Nationality</dt>
                    <dd className="font-semibold text-white">{celebrity.nationality}</dd>
                  </div>
                  {celebrity.zodiacSign && (
                    <div className="flex justify-between py-1 border-b border-slate-800/50">
                      <dt className="text-slate-400">Zodiac Sign</dt>
                      <dd className="font-semibold text-white">{celebrity.zodiacSign}</dd>
                    </div>
                  )}
                  {celebrity.spouse && (
                    <div className="flex justify-between py-1 border-b border-slate-800/50">
                      <dt className="text-slate-400">Spouse</dt>
                      <dd className="font-semibold text-white text-right">{celebrity.spouse}</dd>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <dt className="text-slate-400">Debut Movie</dt>
                    <dd className="font-semibold text-amber-400">{celebrity.debutMovie} ({celebrity.debutYear})</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="text-slate-400">Industry</dt>
                    <dd className="font-semibold text-white">{celebrity.industry}</dd>
                  </div>
                </dl>
              </div>

              {/* Official Social Links */}
              <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-3">
                  Official Profiles & Links
                </h3>
                <div className="space-y-2">
                  {celebrity.socialLinks.instagram && (
                    <a
                      href={celebrity.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-pink-400" />
                        <span>Instagram</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  )}

                  {celebrity.socialLinks.twitter && (
                    <a
                      href={celebrity.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-sky-400" />
                        <span>X (Twitter)</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  )}

                  {celebrity.socialLinks.imdb && (
                    <a
                      href={celebrity.socialLinks.imdb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-amber-400" />
                        <span>IMDb Biography</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  )}
                </div>
              </div>

              {/* Co-Stars & Peers */}
              {coStars.length > 0 && (
                <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-3">
                    Other {celebrity.industry} Icons
                  </h3>
                  <div className="space-y-3">
                    {coStars.map((peer) => (
                      <Link
                        key={peer.id}
                        href={`/celebrities/${peer.slug}`}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-900 transition-colors group"
                      >
                        <img
                          src={peer.profileImage}
                          alt={peer.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-700"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                            {peer.name}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {peer.role} • Debut {peer.debutYear}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: COMPLETE FILMOGRAPHY */}
        {activeTab === 'filmography' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-white">Complete Filmography</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Chronological list of landmark movies, roles, box office verdicts, and ratings.
                </p>
              </div>
            </div>

            {/* Filmography Cards / Table */}
            <div className="space-y-3">
              {celebrity.filmography.map((film, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 gap-4 transition-all"
                >
                  <div className="flex items-center gap-4">
                    {film.posterUrl ? (
                      <img
                        src={film.posterUrl}
                        alt={film.title}
                        className="w-12 h-16 rounded-lg object-cover shrink-0 border border-slate-700"
                      />
                    ) : (
                      <div className="w-12 h-16 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                        <Film className="w-5 h-5 text-slate-500" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg font-bold text-white">{film.title}</span>
                        <span className="text-xs font-semibold text-slate-400">({film.year})</span>
                      </div>
                      <p className="text-xs text-amber-300 font-medium mt-0.5">Role: {film.role}</p>
                      {film.director && (
                        <p className="text-[11px] text-slate-400 mt-0.5">Director: {film.director}</p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {film.genre.map((g) => (
                          <span key={g} className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                    <Badge variant={getVerdictBadgeVariant(film.verdict)} size="md">
                      {film.verdict}
                    </Badge>

                    {film.rating > 0 && (
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{film.rating} / 10</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AWARDS & HONORS */}
        {activeTab === 'awards' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black text-white">Awards, Accolades & Civilian Honors</h3>
              <p className="text-xs text-slate-400 mt-1">
                Official recognition from Academy Awards, Filmfare, National Film Awards, and international festivals.
              </p>
            </div>

            {celebrity.awards.length === 0 ? (
              <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 text-slate-400 text-sm">
                No awards currently recorded for this star.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {celebrity.awards.map((award) => (
                  <div
                    key={award.id}
                    className="p-5 rounded-2xl glass-panel border border-slate-800/80 hover:border-amber-500/40 transition-all flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-400">{award.year}</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{award.name}</h4>
                      <p className="text-xs text-slate-300 mt-0.5">{award.category}</p>
                      {award.movieTitle && (
                        <p className="text-[11px] text-slate-500 mt-1 italic">Film: {award.movieTitle}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PHOTO GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black text-white">Photo Gallery & Red Carpet Stills</h3>
              <p className="text-xs text-slate-400 mt-1">
                High-resolution cinema production stills, film festival appearances, and portraits.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[celebrity.profileImage, ...(celebrity.galleryImages || [])].map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedGalleryImg(imgUrl)}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass-panel border border-slate-800 cursor-pointer hover:border-amber-500/50 transition-all"
                >
                  <img
                    src={imgUrl}
                    alt={`${celebrity.name} still ${idx + 1}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-bold text-white bg-black/70 px-3 py-1.5 rounded-lg border border-white/20">
                      Click to View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedGalleryImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedGalleryImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
            <img
              src={selectedGalleryImg}
              alt="Preview"
              className="max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <button
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
