'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Sparkles,
  Trophy,
  Film,
  X,
} from 'lucide-react';
import { celebrityService } from '@/lib/services/celebrityService';
import { Celebrity, Industry, GenderRole } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { CelebrityModal } from '@/components/admin/CelebrityModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';

export default function AdminCelebritiesPage() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState<'All' | Industry>('All');
  const [roleFilter, setRoleFilter] = useState<'All' | GenderRole>('All');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCelebrity, setEditingCelebrity] = useState<Celebrity | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Celebrity | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    const data = await celebrityService.getAll();
    setCelebrities(data);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('cinestars_data_updated', loadData);
    return () => window.removeEventListener('cinestars_data_updated', loadData);
  }, []);

  const filteredCelebrities = useMemo(() => {
    return celebrities.filter((c) => {
      if (industryFilter !== 'All' && c.industry !== industryFilter) return false;
      if (roleFilter !== 'All' && c.role !== roleFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.realName?.toLowerCase().includes(q) ||
          c.debutMovie.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [celebrities, industryFilter, roleFilter, searchQuery]);

  const handleOpenAdd = () => {
    setEditingCelebrity(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (celeb: Celebrity) => {
    setEditingCelebrity(celeb);
    setIsModalOpen(true);
  };

  const handleSave = async (data: any) => {
    if (editingCelebrity) {
      await celebrityService.update(editingCelebrity.id, data);
    } else {
      await celebrityService.create(data);
    }
    await loadData();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await celebrityService.delete(deleteTarget.id);
      setDeleteTarget(null);
      await loadData();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-amber-400" />
            <span>Manage Celebrities</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create, modify, and delete Bollywood & Hollywood actors and actresses records.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Celebrity</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search star by name or debut film..."
            className="w-full bg-[#0b0f19] text-white pl-10 pr-10 py-2 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs placeholder:text-slate-500"
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

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
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

          {/* Role Filter */}
          <div className="flex items-center p-1 bg-[#0b0f19] rounded-xl border border-slate-800 text-xs font-medium">
            {(['All', 'Actor', 'Actress'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  roleFilter === r
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r === 'All' ? 'All Roles' : r === 'Actor' ? 'Actors' : 'Actresses'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Celebrities Table */}
      <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="py-3.5 px-4">Celebrity</th>
                <th className="py-3.5 px-4">Industry & Role</th>
                <th className="py-3.5 px-4">Debut</th>
                <th className="py-3.5 px-4">Filmography</th>
                <th className="py-3.5 px-4">Awards</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCelebrities.map((celeb) => (
                <tr key={celeb.id} className="hover:bg-slate-900/40 transition-colors">
                  {/* Celebrity Name & Photo */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={celeb.profileImage}
                        alt={celeb.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white text-sm">{celeb.name}</div>
                        {celeb.realName && celeb.realName !== celeb.name && (
                          <div className="text-[11px] text-slate-400">({celeb.realName})</div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Industry & Role */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <Badge variant={celeb.industry === 'Bollywood' ? 'gold' : 'indigo'} size="sm">
                        {celeb.industry}
                      </Badge>
                      <Badge variant="default" size="sm">
                        {celeb.role}
                      </Badge>
                    </div>
                  </td>

                  {/* Debut */}
                  <td className="py-3 px-4 text-slate-300">
                    <span className="font-semibold">{celeb.debutYear}</span>
                    <span className="text-slate-500 block text-[11px] truncate max-w-[150px]">
                      {celeb.debutMovie}
                    </span>
                  </td>

                  {/* Filmography count */}
                  <td className="py-3 px-4 text-slate-300">
                    <span className="flex items-center gap-1 font-semibold">
                      <Film className="w-3.5 h-3.5 text-slate-400" />
                      {celeb.filmography.length} movies
                    </span>
                  </td>

                  {/* Awards */}
                  <td className="py-3 px-4 text-slate-300">
                    <span className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Trophy className="w-3.5 h-3.5" />
                      {celeb.awards.length} awards
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View Public Page */}
                      <Link
                        href={`/celebrities/${celeb.slug}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="View Public Profile"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      {/* Edit */}
                      <button
                        onClick={() => handleOpenEdit(celeb)}
                        className="p-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                        title="Edit Star"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => setDeleteTarget(celeb)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Star"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCelebrities.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    No celebrities match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Celebrity Modal */}
      <CelebrityModal
        isOpen={isModalOpen}
        celebrity={editingCelebrity}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Celebrity"
        itemName={deleteTarget?.name || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
