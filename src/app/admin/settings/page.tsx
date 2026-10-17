'use client';

import React, { useState } from 'react';
import {
  Settings,
  Download,
  RotateCcw,
  Database,
  Code2,
  CheckCircle,
  AlertTriangle,
  FileJson,
  Copy,
} from 'lucide-react';
import { celebrityService } from '@/lib/services/celebrityService';
import { movieService } from '@/lib/services/movieService';

export default function AdminSettingsPage() {
  const [resetSuccess, setResetSuccess] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const handleExportCelebrities = () => {
    const jsonStr = celebrityService.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cinestars-celebrities-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMovies = () => {
    const jsonStr = movieService.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cinestars-movies-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleResetToDefault = () => {
    if (confirm('Are you sure you want to reset all records to the original seed data? Any custom entries created in this browser will be reset.')) {
      celebrityService.resetToDefault();
      movieService.resetToDefault();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  const copySampleSchema = () => {
    const schemaSql = `-- PostgreSQL / Prisma Database Schema for CineStars

CREATE TABLE celebrities (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    real_name VARCHAR(255),
    industry VARCHAR(32) NOT NULL, -- 'Bollywood' | 'Hollywood'
    role VARCHAR(32) NOT NULL,     -- 'Hero' | 'Heroine'
    profile_image TEXT NOT NULL,
    banner_image TEXT,
    gallery_images TEXT[],
    dob VARCHAR(32),
    age INT,
    birthplace VARCHAR(255),
    height VARCHAR(64),
    nationality VARCHAR(64),
    zodiac_sign VARCHAR(32),
    spouse VARCHAR(255),
    debut_year INT NOT NULL,
    debut_movie VARCHAR(255),
    biography TEXT NOT NULL,
    acting_style TEXT,
    trivia TEXT[],
    social_links JSONB,
    awards JSONB,
    filmography JSONB,
    featured BOOLEAN DEFAULT true,
    trending_rank INT,
    box_office_total_gross VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE movies (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    industry VARCHAR(32) NOT NULL,
    release_year INT NOT NULL,
    genre TEXT[],
    director VARCHAR(255) NOT NULL,
    producer VARCHAR(255),
    music_director VARCHAR(255),
    synopsis TEXT NOT NULL,
    poster_url TEXT NOT NULL,
    backdrop_url TEXT,
    imdb_rating NUMERIC(3, 1),
    runtime_minutes INT,
    box_office_verdict VARCHAR(64),
    budget VARCHAR(128),
    worldwide_gross VARCHAR(128),
    trailer_url TEXT,
    lead_actors JSONB,
    featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`;

    navigator.clipboard.writeText(schemaSql);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <Settings className="w-7 h-7 text-amber-400" />
          <span>Database & System Settings</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Export catalog JSON files, reset to seed data, and preview database schemas for your upcoming backend.
        </p>
      </div>

      {resetSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>Successfully reset celebrities and movies dataset to initial seed records!</span>
        </div>
      )}

      {/* Export / Reset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Data */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Export Dataset as JSON</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Download your current active database as clean JSON files.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Use these exported JSON files to populate your future MongoDB collections or PostgreSQL tables
            without manual retyping.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleExportCelebrities}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <FileJson className="w-4 h-4" />
              <span>Export Celebrities (.json)</span>
            </button>

            <button
              onClick={handleExportMovies}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <FileJson className="w-4 h-4" />
              <span>Export Movies (.json)</span>
            </button>
          </div>
        </div>

        {/* Reset Database */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Reset to Default Seed Data</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Restore the default curated Bollywood & Hollywood icons.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            If you ever need to restore the full seed data including Shah Rukh Khan, Leonardo DiCaprio,
            Deepika Padukone, Oppenheimer, and Jawan, click below.
          </p>

          <div className="pt-2">
            <button
              onClick={handleResetToDefault}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Database to Initial Seeds</span>
            </button>
          </div>
        </div>
      </div>

      {/* Backend API & DB Architecture Blueprint */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Backend & Database Architecture Blueprint</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Ready-to-use SQL schema designed to match the frontend types 100%.
              </p>
            </div>
          </div>

          <button
            onClick={copySampleSchema}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedSchema ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          When you are ready to implement your API routes (e.g., <code className="text-amber-400">/api/celebrities</code> and <code className="text-amber-400">/api/movies</code>) or connect Supabase/Prisma/PostgreSQL, simply update the two service files:
          <code className="text-indigo-300 block mt-1">
            • src/lib/services/celebrityService.ts
            <br />• src/lib/services/movieService.ts
          </code>
          No UI components or layouts will require any refactoring!
        </p>

        <div className="bg-[#05070a] rounded-xl p-4 border border-slate-800/80 overflow-x-auto text-xs font-mono text-slate-400 max-h-60">
          <pre>{`-- Ready to execute SQL table structure
CREATE TABLE celebrities (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    real_name VARCHAR(255),
    industry VARCHAR(32) NOT NULL,
    role VARCHAR(32) NOT NULL,
    profile_image TEXT NOT NULL,
    banner_image TEXT,
    dob VARCHAR(32),
    birthplace VARCHAR(255),
    debut_year INT NOT NULL,
    biography TEXT NOT NULL,
    trivia TEXT[],
    awards JSONB,
    filmography JSONB
);`}</pre>
        </div>
      </div>
    </div>
  );
}
