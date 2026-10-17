'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Film,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  Clock,
  X,
} from 'lucide-react';
import { movieService } from '@/lib/services/movieService';
import { Movie, Industry, BoxOfficeVerdict } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { MovieModal } from '@/components/admin/MovieModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState<'All' | Industry>('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Movie | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    const data = await movieService.getAll();
    setMovies(data);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('cinestars_data_updated', loadData);
    return () => window.removeEventListener('cinestars_data_updated', loadData);
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter((m) => {
      if (industryFilter !== 'All' && m.industry !== industryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          m.title.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.genre.some((g) => g.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [movies, industryFilter, searchQuery]);

  const handleOpenAdd = () => {
    setEditingMovie(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setIsModalOpen(true);
  };

  const handleSave = async (data: any) => {
    if (editingMovie) {
      await movieService.update(editingMovie.id, data);
    } else {
      await movieService.create(data);
    }
    await loadData();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await movieService.delete(deleteTarget.id);
      setDeleteTarget(null);
      await loadData();
    } finally {
      setIsDeleting(false);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Film className="w-7 h-7 text-indigo-400" />
            <span>Manage Movies</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create, modify, and delete Bollywood & Hollywood film catalog records.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Movie</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movie title, director, or genre..."
            className="w-full bg-[#0b0f19] text-white pl-10 pr-10 py-2 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs placeholder:text-slate-500"
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

        {/* Industry Filter */}
        <div className="flex items-center p-1 bg-[#0b0f19] rounded-xl border border-slate-800 text-xs font-medium">
          {(['All', 'Bollywood', 'Hollywood'] as const).map((ind) => (
            <button
              key={ind}
              onClick={() => setIndustryFilter(ind)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                industryFilter === ind
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
      </div>

      {/* Movies Table */}
      <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="py-3.5 px-4">Movie</th>
                <th className="py-3.5 px-4">Industry</th>
                <th className="py-3.5 px-4">Director</th>
                <th className="py-3.5 px-4">Box Office Verdict</th>
                <th className="py-3.5 px-4">IMDb Rating</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredMovies.map((movie) => (
                <tr key={movie.id} className="hover:bg-slate-900/40 transition-colors">
                  {/* Poster & Title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-10 h-14 rounded-lg object-cover border border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white text-sm">{movie.title}</div>
                        <div className="text-[11px] text-slate-400">
                          {movie.releaseYear} • {movie.runtimeMinutes}m
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Industry */}
                  <td className="py-3 px-4">
                    <Badge variant={movie.industry === 'Bollywood' ? 'gold' : 'indigo'} size="sm">
                      {movie.industry}
                    </Badge>
                  </td>

                  {/* Director */}
                  <td className="py-3 px-4 text-slate-300 font-medium">
                    {movie.director}
                  </td>

                  {/* Verdict */}
                  <td className="py-3 px-4">
                    <Badge variant={getVerdictVariant(movie.boxOfficeVerdict)} size="sm">
                      {movie.boxOfficeVerdict}
                    </Badge>
                  </td>

                  {/* Rating */}
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {movie.imdbRating}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/movies/${movie.slug}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleOpenEdit(movie)}
                        className="p-1.5 rounded-lg text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-colors"
                        title="Edit Movie"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeleteTarget(movie)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Movie"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredMovies.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    No movies match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Movie Modal */}
      <MovieModal
        isOpen={isModalOpen}
        movie={editingMovie}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Movie"
        itemName={deleteTarget?.title || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
