'use client';

import React, { useState, useEffect } from 'react';
import { X, Film, Check, Plus, Trash2 } from 'lucide-react';
import { Movie, Industry, BoxOfficeVerdict, MovieCastMember, Celebrity } from '@/types';
import { celebrityService } from '@/lib/services/celebrityService';

interface MovieModalProps {
  isOpen: boolean;
  movie?: Movie | null;
  onClose: () => void;
  onSave: (data: Omit<Movie, 'id'> | Movie) => Promise<void>;
}

export function MovieModal({ isOpen, movie, onClose, onSave }: MovieModalProps) {
  const isEditing = !!movie;

  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [industry, setIndustry] = useState<Industry>('Bollywood');
  const [releaseYear, setReleaseYear] = useState<number | ''>(2023);
  const [runtimeMinutes, setRuntimeMinutes] = useState<number | ''>(150);
  const [genresInput, setGenresInput] = useState('Action, Drama');
  const [director, setDirector] = useState('');
  const [producer, setProducer] = useState('');
  const [musicDirector, setMusicDirector] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [backdropUrl, setBackdropUrl] = useState('');
  const [imdbRating, setImdbRating] = useState<number | ''>(7.5);
  const [boxOfficeVerdict, setBoxOfficeVerdict] = useState<BoxOfficeVerdict>('Blockbuster');
  const [budget, setBudget] = useState('₹150 Crore');
  const [worldwideGross, setWorldwideGross] = useState('₹500 Crore');

  // Cast members
  const [leadActors, setLeadActors] = useState<MovieCastMember[]>([]);
  const [newCastCelebId, setNewCastCelebId] = useState('');
  const [newCastName, setNewCastName] = useState('');
  const [newCastRole, setNewCastRole] = useState('');

  useEffect(() => {
    celebrityService.getAll().then(setCelebrities);
  }, []);

  useEffect(() => {
    if (movie) {
      setTitle(movie.title || '');
      setSlug(movie.slug || '');
      setIndustry(movie.industry || 'Bollywood');
      setReleaseYear(movie.releaseYear || 2023);
      setRuntimeMinutes(movie.runtimeMinutes || 150);
      setGenresInput(movie.genre?.join(', ') || 'Action, Drama');
      setDirector(movie.director || '');
      setProducer(movie.producer || '');
      setMusicDirector(movie.musicDirector || '');
      setSynopsis(movie.synopsis || '');
      setPosterUrl(movie.posterUrl || '');
      setBackdropUrl(movie.backdropUrl || '');
      setImdbRating(movie.imdbRating || 7.5);
      setBoxOfficeVerdict(movie.boxOfficeVerdict || 'Blockbuster');
      setBudget(movie.budget || '');
      setWorldwideGross(movie.worldwideGross || '');
      setLeadActors(movie.leadActors || []);
    } else {
      setTitle('');
      setSlug('');
      setIndustry('Bollywood');
      setReleaseYear(2023);
      setRuntimeMinutes(150);
      setGenresInput('Action, Drama');
      setDirector('');
      setProducer('');
      setMusicDirector('');
      setSynopsis('');
      setPosterUrl('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800');
      setBackdropUrl('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600');
      setImdbRating(7.5);
      setBoxOfficeVerdict('Blockbuster');
      setBudget('₹200 Crore');
      setWorldwideGross('₹800 Crore');
      setLeadActors([]);
    }
    setErrorMessage('');
  }, [movie, isOpen]);

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing && !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleSelectCelebForCast = (id: string) => {
    setNewCastCelebId(id);
    const found = celebrities.find((c) => c.id === id);
    if (found) {
      setNewCastName(found.name);
    }
  };

  const addCastMember = () => {
    if (!newCastName.trim()) return;
    const found = celebrities.find((c) => c.id === newCastCelebId);
    const item: MovieCastMember = {
      celebrityId: newCastCelebId || undefined,
      name: newCastName.trim(),
      role: newCastRole.trim() || 'Lead Protagonist',
      profileImage: found?.profileImage || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
      isLead: true,
    };
    setLeadActors([...leadActors, item]);
    setNewCastCelebId('');
    setNewCastName('');
    setNewCastRole('');
  };

  const removeCastMember = (index: number) => {
    setLeadActors(leadActors.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Movie title is required.');
      return;
    }
    if (!director.trim()) {
      setErrorMessage('Director name is required.');
      return;
    }
    if (!synopsis.trim()) {
      setErrorMessage('Movie synopsis is required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const parsedGenres = genresInput
        .split(',')
        .map((g) => g.trim())
        .filter(Boolean);

      const payload: any = {
        title: title.trim(),
        slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        industry,
        releaseYear: Number(releaseYear) || 2023,
        genre: parsedGenres.length > 0 ? parsedGenres : ['Drama'],
        director: director.trim(),
        producer: producer.trim() || undefined,
        musicDirector: musicDirector.trim() || undefined,
        synopsis: synopsis.trim(),
        posterUrl: posterUrl.trim() || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
        backdropUrl: backdropUrl.trim() || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600',
        imdbRating: Number(imdbRating) || 7.0,
        runtimeMinutes: Number(runtimeMinutes) || 120,
        boxOfficeVerdict,
        budget: budget.trim() || undefined,
        worldwideGross: worldwideGross.trim() || undefined,
        leadActors,
        featured: movie?.featured ?? true,
      };

      if (isEditing && movie) {
        payload.id = movie.id;
      }

      await onSave(payload);
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to save movie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl my-8 bg-[#0d121f] border border-slate-700/80 rounded-2xl shadow-2xl glass-panel overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Film className="w-5 h-5 text-indigo-400" />
              <span>{isEditing ? `Edit: ${movie?.title}` : 'Add New Movie'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter details, box office collection, director, and link lead cast.
            </p>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Movie Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Jawan / Oppenheimer"
                required
                className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. jawan"
                className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs"
              />
            </div>
          </div>

          {/* Industry, Release Year, Runtime, Rating */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value as Industry)}
                className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs"
              >
                <option value="Bollywood">Bollywood</option>
                <option value="Hollywood">Hollywood</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Release Year</label>
              <input
                type="number"
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value ? Number(e.target.value) : '')}
                placeholder="2023"
                className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Runtime (mins)</label>
              <input
                type="number"
                value={runtimeMinutes}
                onChange={(e) => setRuntimeMinutes(e.target.value ? Number(e.target.value) : '')}
                placeholder="165"
                className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">IMDb Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={imdbRating}
                onChange={(e) => setImdbRating(e.target.value ? Number(e.target.value) : '')}
                placeholder="8.5"
                className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs"
              />
            </div>
          </div>

          {/* Verdict, Budget, Gross */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Box Office Verdict</label>
              <select
                value={boxOfficeVerdict}
                onChange={(e) => setBoxOfficeVerdict(e.target.value as BoxOfficeVerdict)}
                className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs"
              >
                <option value="All-Time Blockbuster">All-Time Blockbuster</option>
                <option value="Blockbuster">Blockbuster</option>
                <option value="Super Hit">Super Hit</option>
                <option value="Hit">Hit</option>
                <option value="Average">Average</option>
                <option value="Flop">Flop</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Budget</label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="₹250 Crore / $150M"
                className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Worldwide Gross</label>
              <input
                type="text"
                value={worldwideGross}
                onChange={(e) => setWorldwideGross(e.target.value)}
                placeholder="₹1,150 Crore / $950M"
                className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs"
              />
            </div>
          </div>

          {/* Director, Genres */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Director <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                placeholder="Christopher Nolan / Atlee / Sanjay Leela Bhansali"
                required
                className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Genres (comma-separated)
              </label>
              <input
                type="text"
                value={genresInput}
                onChange={(e) => setGenresInput(e.target.value)}
                placeholder="Action, Thriller, Sci-Fi"
                className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs"
              />
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Synopsis & Storyline <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={3}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="Detailed storyline summary..."
              required
              className="w-full bg-[#0b0f19] text-white p-3.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs leading-relaxed"
            />
          </div>

          {/* Poster & Backdrop URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Poster Image URL</label>
              <input
                type="url"
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Backdrop Banner URL</label>
              <input
                type="url"
                value={backdropUrl}
                onChange={(e) => setBackdropUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-xs"
              />
            </div>
          </div>

          {/* Lead Actors / Cast Linking */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Lead Cast & Linked Celebrities
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 mb-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <select
                  value={newCastCelebId}
                  onChange={(e) => handleSelectCelebForCast(e.target.value)}
                  className="bg-[#0b0f19] text-white px-3 py-2 rounded-lg border border-slate-700 text-xs"
                >
                  <option value="">Select Existing Star...</option>
                  {celebrities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.industry} {c.role})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newCastName}
                  onChange={(e) => setNewCastName(e.target.value)}
                  placeholder="Actor / Actress Name *"
                  className="bg-[#0b0f19] text-white px-3 py-2 rounded-lg border border-slate-700 text-xs"
                />
                <input
                  type="text"
                  value={newCastRole}
                  onChange={(e) => setNewCastRole(e.target.value)}
                  placeholder="Character Role (e.g. Tony Stark)"
                  className="bg-[#0b0f19] text-white px-3 py-2 rounded-lg border border-slate-700 text-xs"
                />
              </div>
              <button
                type="button"
                onClick={addCastMember}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Cast Member</span>
              </button>
            </div>

            <div className="space-y-2 max-h-36 overflow-y-auto">
              {leadActors.map((actor, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{actor.name}</span>
                    <span className="text-amber-400">as {actor.role}</span>
                    {actor.celebrityId && (
                      <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded">
                        Linked Profile
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCastMember(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
          >
            <Check className="w-4 h-4" />
            <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Movie' : 'Create Movie'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
