'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  Grid,
  List,
  Sparkles,
  Trophy,
  Calendar,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { celebrityService } from '@/lib/services/celebrityService';
import { Celebrity, Industry, GenderRole } from '@/types';
import { CelebrityCard } from '@/components/ui/CelebrityCard';
import { Badge } from '@/components/ui/Badge';

function CelebritiesContent() {
  const searchParams = useSearchParams();

  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<'All' | Industry>('All');
  const [selectedRole, setSelectedRole] = useState<'All' | GenderRole>('All');
  const [sortBy, setSortBy] = useState<'trending' | 'name' | 'debut-desc' | 'debut-asc' | 'awards'>('trending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync URL search params on mount
  useEffect(() => {
    const urlIndustry = searchParams.get('industry');
    const urlRole = searchParams.get('role');
    if (urlIndustry === 'Bollywood' || urlIndustry === 'Hollywood') {
      setSelectedIndustry(urlIndustry);
    }
    if (urlRole === 'Hero' || urlRole === 'Heroine') {
      setSelectedRole(urlRole);
    }
  }, [searchParams]);

  const loadData = async () => {
    const data = await celebrityService.getAll();
    setCelebrities(data);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('cinestars_data_updated', loadData);
    return () => window.removeEventListener('cinestars_data_updated', loadData);
  }, []);

  // Filter & sort logic
  const filteredCelebrities = useMemo(() => {
    return celebrities
      .filter((celeb) => {
        // Industry filter
        if (selectedIndustry !== 'All' && celeb.industry !== selectedIndustry) {
          return false;
        }
        // Role filter
        if (selectedRole !== 'All' && celeb.role !== selectedRole) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = celeb.name.toLowerCase().includes(q);
          const matchesRealName = celeb.realName?.toLowerCase().includes(q);
          const matchesBio = celeb.biography.toLowerCase().includes(q);
          const matchesDebut = celeb.debutMovie.toLowerCase().includes(q);
          if (!matchesName && !matchesRealName && !matchesBio && !matchesDebut) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'trending') {
          return (a.trendingRank || 99) - (b.trendingRank || 99);
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'debut-desc') {
          return b.debutYear - a.debutYear;
        }
        if (sortBy === 'debut-asc') {
          return a.debutYear - b.debutYear;
        }
        if (sortBy === 'awards') {
          return b.awards.length - a.awards.length;
        }
        return 0;
      });
  }, [celebrities, selectedIndustry, selectedRole, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('All');
    setSelectedRole('All');
    setSortBy('trending');
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedIndustry !== 'All' || selectedRole !== 'All' || sortBy !== 'trending';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bollywood & Hollywood Cinema Hall of Fame</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Celebrity Directory
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
          Browse profiles of iconic Bollywood heroes & heroines and Hollywood superstars. Filter by
          industry, category, debut era, and award milestones.
        </p>
      </div>

      {/* Top Filter Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, debut movie, biography..."
              className="w-full bg-[#0b0f19] text-white pl-10 pr-10 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500/80 focus:outline-none text-sm placeholder:text-slate-500"
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

          {/* Quick Filter Buttons & Sort */}
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

            {/* Role Selector */}
            <div className="flex items-center p-1 bg-[#0b0f19] rounded-xl border border-slate-800 text-xs font-medium">
              {(['All', 'Hero', 'Heroine'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    selectedRole === r
                      ? 'bg-slate-700 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {r === 'All' ? 'All Roles' : `${r}es`}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0b0f19] text-slate-300 text-xs font-medium px-3 py-2 rounded-xl border border-slate-800 focus:border-amber-500 focus:outline-none"
            >
              <option value="trending">Sort: Trending</option>
              <option value="name">Sort: Name (A-Z)</option>
              <option value="debut-desc">Sort: Debut (Newest)</option>
              <option value="debut-asc">Sort: Debut (Earliest)</option>
              <option value="awards">Sort: Most Awards</option>
            </select>
          </div>
        </div>

        {/* Active Filters / Results Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          <div>
            Showing <span className="font-bold text-white">{filteredCelebrities.length}</span> of{' '}
            <span className="font-bold text-white">{celebrities.length}</span> stars
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Celebrities Grid */}
      {filteredCelebrities.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-2xl border border-slate-800">
          <p className="text-slate-300 text-lg font-bold">No celebrities found</p>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search keywords</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-amber-500 text-black text-xs font-bold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCelebrities.map((celebrity) => (
            <CelebrityCard key={celebrity.id} celebrity={celebrity} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CelebritiesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
          Loading Celebrities Directory...
        </div>
      }
    >
      <CelebritiesContent />
    </Suspense>
  );
}
