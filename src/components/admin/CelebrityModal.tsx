'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Sparkles, Upload, Film, Trophy, Check } from 'lucide-react';
import { Celebrity, Industry, GenderRole, BoxOfficeVerdict, FilmographyItem, Award } from '@/types';

interface CelebrityModalProps {
  isOpen: boolean;
  celebrity?: Celebrity | null;
  onClose: () => void;
  onSave: (data: Omit<Celebrity, 'id'> | Celebrity) => Promise<void>;
}

export function CelebrityModal({ isOpen, celebrity, onClose, onSave }: CelebrityModalProps) {
  const isEditing = !!celebrity;

  const [activeTab, setActiveTab] = useState<'basic' | 'stats' | 'trivia_social' | 'filmography'>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [realName, setRealName] = useState('');
  const [slug, setSlug] = useState('');
  const [industry, setIndustry] = useState<Industry>('Bollywood');
  const [role, setRole] = useState<GenderRole>('Actor');
  const [profileImage, setProfileImage] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [birthplace, setBirthplace] = useState('');
  const [height, setHeight] = useState('');
  const [nationality, setNationality] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');
  const [spouse, setSpouse] = useState('');
  const [debutYear, setDebutYear] = useState<number | ''>(2000);
  const [debutMovie, setDebutMovie] = useState('');
  const [boxOfficeTotalGross, setBoxOfficeTotalGross] = useState('');
  const [biography, setBiography] = useState('');
  const [actingStyle, setActingStyle] = useState('');

  const [triviaList, setTriviaList] = useState<string[]>([]);
  const [newTriviaInput, setNewTriviaInput] = useState('');

  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [imdb, setImdb] = useState('');

  const [filmography, setFilmography] = useState<FilmographyItem[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);

  // Filmography quick add fields
  const [newFilmTitle, setNewFilmTitle] = useState('');
  const [newFilmYear, setNewFilmYear] = useState<number | ''>(2023);
  const [newFilmRole, setNewFilmRole] = useState('');
  const [newFilmVerdict, setNewFilmVerdict] = useState<BoxOfficeVerdict>('Blockbuster');
  const [newFilmRating, setNewFilmRating] = useState<number | ''>(7.5);

  // Awards quick add fields
  const [newAwardName, setNewAwardName] = useState('Filmfare Award');
  const [newAwardCat, setNewAwardCat] = useState('Best Actor');
  const [newAwardYear, setNewAwardYear] = useState<number | ''>(2023);

  useEffect(() => {
    if (celebrity) {
      setName(celebrity.name || '');
      setRealName(celebrity.realName || '');
      setSlug(celebrity.slug || '');
      setIndustry(celebrity.industry || 'Bollywood');
      setRole(celebrity.role || 'Actor');
      setProfileImage(celebrity.profileImage || '');
      setBannerImage(celebrity.bannerImage || '');
      setDob(celebrity.dob || '');
      setAge(celebrity.age || '');
      setBirthplace(celebrity.birthplace || '');
      setHeight(celebrity.height || '');
      setNationality(celebrity.nationality || '');
      setZodiacSign(celebrity.zodiacSign || '');
      setSpouse(celebrity.spouse || '');
      setDebutYear(celebrity.debutYear || 2000);
      setDebutMovie(celebrity.debutMovie || '');
      setBoxOfficeTotalGross(celebrity.boxOfficeTotalGross || '');
      setBiography(celebrity.biography || '');
      setActingStyle(celebrity.actingStyle || '');
      setTriviaList(celebrity.trivia || []);
      setInstagram(celebrity.socialLinks?.instagram || '');
      setTwitter(celebrity.socialLinks?.twitter || '');
      setImdb(celebrity.socialLinks?.imdb || '');
      setFilmography(celebrity.filmography || []);
      setAwards(celebrity.awards || []);
    } else {
      // Defaults for new
      setName('');
      setRealName('');
      setSlug('');
      setIndustry('Bollywood');
      setRole('Actor');
      setProfileImage('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800');
      setBannerImage('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600');
      setDob('1990-01-01');
      setAge(34);
      setBirthplace('Mumbai, India');
      setHeight("5' 10\"");
      setNationality('Indian');
      setZodiacSign('Capricorn');
      setSpouse('');
      setDebutYear(2010);
      setDebutMovie('First Step');
      setBoxOfficeTotalGross('$500 Million+ USD');
      setBiography('');
      setActingStyle('');
      setTriviaList([]);
      setInstagram('');
      setTwitter('');
      setImdb('');
      setFilmography([]);
      setAwards([]);
    }
    setActiveTab('basic');
    setErrorMessage('');
  }, [celebrity, isOpen]);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing && !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const addTrivia = () => {
    if (newTriviaInput.trim()) {
      setTriviaList([...triviaList, newTriviaInput.trim()]);
      setNewTriviaInput('');
    }
  };

  const removeTrivia = (index: number) => {
    setTriviaList(triviaList.filter((_, i) => i !== index));
  };

  const addFilmographyItem = () => {
    if (!newFilmTitle.trim()) return;
    const item: FilmographyItem = {
      title: newFilmTitle.trim(),
      year: Number(newFilmYear) || new Date().getFullYear(),
      role: newFilmRole.trim() || 'Lead Character',
      verdict: newFilmVerdict,
      rating: Number(newFilmRating) || 7.0,
      posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
      genre: ['Drama', 'Action'],
    };
    setFilmography([item, ...filmography]);
    setNewFilmTitle('');
  };

  const removeFilmographyItem = (index: number) => {
    setFilmography(filmography.filter((_, i) => i !== index));
  };

  const addAwardItem = () => {
    if (!newAwardName.trim()) return;
    const item: Award = {
      id: `aw-${Date.now()}`,
      name: newAwardName.trim(),
      category: newAwardCat.trim() || 'Best Actor',
      year: Number(newAwardYear) || new Date().getFullYear(),
    };
    setAwards([item, ...awards]);
    setNewAwardName('');
  };

  const removeAwardItem = (index: number) => {
    setAwards(awards.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Celebrity name is required.');
      setActiveTab('basic');
      return;
    }
    if (!biography.trim()) {
      setErrorMessage('Biography is required.');
      setActiveTab('stats');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload: any = {
        name: name.trim(),
        realName: realName.trim() || undefined,
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        industry,
        role,
        profileImage: profileImage.trim() || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800',
        bannerImage: bannerImage.trim() || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600',
        galleryImages: celebrity?.galleryImages || [],
        dob,
        age: age ? Number(age) : undefined,
        birthplace,
        height,
        nationality,
        zodiacSign: zodiacSign.trim() || undefined,
        spouse: spouse.trim() || undefined,
        debutYear: Number(debutYear) || 2000,
        debutMovie: debutMovie.trim() || 'Debut Film',
        biography: biography.trim(),
        actingStyle: actingStyle.trim() || undefined,
        trivia: triviaList,
        socialLinks: {
          instagram: instagram.trim() || undefined,
          twitter: twitter.trim() || undefined,
          imdb: imdb.trim() || undefined,
        },
        awards,
        filmography,
        featured: celebrity?.featured ?? true,
        boxOfficeTotalGross: boxOfficeTotalGross.trim() || undefined,
      };

      if (isEditing && celebrity) {
        payload.id = celebrity.id;
      }

      await onSave(payload);
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to save celebrity.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl my-8 bg-[#0d121f] border border-slate-700/80 rounded-2xl shadow-2xl glass-panel overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{isEditing ? `Edit: ${celebrity?.name}` : 'Add New Celebrity'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter biography, personal stats, filmography, and awards.
            </p>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800 bg-slate-900/40 px-5 gap-4 overflow-x-auto">
          {[
            { id: 'basic', label: '1. Basic Info' },
            { id: 'stats', label: '2. Stats & Biography' },
            { id: 'trivia_social', label: '3. Trivia & Socials' },
            { id: 'filmography', label: `4. Filmography & Awards (${filmography.length + awards.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Display Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Shah Rukh Khan"
                    required
                    className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Real / Birth Name</label>
                  <input
                    type="text"
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                    placeholder="e.g. Shahrukh Khan"
                    className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value as Industry)}
                    className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  >
                    <option value="Bollywood">Bollywood</option>
                    <option value="Hollywood">Hollywood</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Category</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as GenderRole)}
                    className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  >
                    <option value="Actor">Actor (Male Lead)</option>
                    <option value="Actress">Actress (Female Lead)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. shah-rukh-khan"
                    className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Profile Portrait Image URL
                  </label>
                  <input
                    type="url"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  />
                  {profileImage && (
                    <div className="mt-2 w-16 h-20 rounded-lg overflow-hidden border border-slate-700">
                      <img src={profileImage} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Backdrop Banner Image URL
                  </label>
                  <input
                    type="url"
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  />
                  {bannerImage && (
                    <div className="mt-2 w-32 h-16 rounded-lg overflow-hidden border border-slate-700">
                      <img src={bannerImage} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STATS & BIOGRAPHY */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Birth</label>
                  <input
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="YYYY-MM-DD"
                    className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                    placeholder="58"
                    className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Height</label>
                  <input
                    type="text"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="5ft 8in (173 cm)"
                    className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nationality</label>
                  <input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder="Indian / American"
                    className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Birthplace</label>
                  <input
                    type="text"
                    value={birthplace}
                    onChange={(e) => setBirthplace(e.target.value)}
                    placeholder="New Delhi, India"
                    className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Debut Movie & Year</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={debutMovie}
                      onChange={(e) => setDebutMovie(e.target.value)}
                      placeholder="Deewana"
                      className="flex-1 bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                    />
                    <input
                      type="number"
                      value={debutYear}
                      onChange={(e) => setDebutYear(e.target.value ? Number(e.target.value) : '')}
                      placeholder="1992"
                      className="w-20 bg-[#0b0f19] text-white px-2 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Career Box Office</label>
                  <input
                    type="text"
                    value={boxOfficeTotalGross}
                    onChange={(e) => setBoxOfficeTotalGross(e.target.value)}
                    placeholder="$1.4 Billion+ USD"
                    className="w-full bg-[#0b0f19] text-white px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Biography <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  placeholder="Comprehensive career story, breakthrough roles, cultural impact..."
                  required
                  className="w-full bg-[#0b0f19] text-white p-3.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Acting Style & Signature Persona
                </label>
                <textarea
                  rows={2}
                  value={actingStyle}
                  onChange={(e) => setActingStyle(e.target.value)}
                  placeholder="Intense expressive eyes, method acting transformations..."
                  className="w-full bg-[#0b0f19] text-white p-3.5 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 3: TRIVIA & SOCIALS */}
          {activeTab === 'trivia_social' && (
            <div className="space-y-6">
              {/* Trivia list */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Trivia & Lesser-Known Facts
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTriviaInput}
                    onChange={(e) => setNewTriviaInput(e.target.value)}
                    placeholder="e.g. Longest-running film in Indian cinema history..."
                    className="flex-1 bg-[#0b0f19] text-white px-3.5 py-2 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={addTrivia}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {triviaList.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300"
                    >
                      <span className="flex-1 pr-3">{t}</span>
                      <button
                        type="button"
                        onClick={() => removeTrivia(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {triviaList.length === 0 && (
                    <p className="text-xs text-slate-500 italic">No trivia added yet.</p>
                  )}
                </div>
              </div>

              {/* Social profiles */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 mb-3">
                  Official Profiles & Social Links
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Instagram URL</label>
                    <input
                      type="url"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="https://instagram.com/..."
                      className="w-full bg-[#0b0f19] text-white px-3.5 py-2 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">X (Twitter) URL</label>
                    <input
                      type="url"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      placeholder="https://twitter.com/..."
                      className="w-full bg-[#0b0f19] text-white px-3.5 py-2 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">IMDb Profile URL</label>
                    <input
                      type="url"
                      value={imdb}
                      onChange={(e) => setImdb(e.target.value)}
                      placeholder="https://www.imdb.com/name/..."
                      className="w-full bg-[#0b0f19] text-white px-3.5 py-2 rounded-xl border border-slate-700/80 focus:border-amber-500 focus:outline-none text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FILMOGRAPHY & AWARDS */}
          {activeTab === 'filmography' && (
            <div className="space-y-6">
              {/* Add Filmography */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <Film className="w-4 h-4" />
                  <span>Filmography & Movies List ({filmography.length})</span>
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 mb-3">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <input
                      type="text"
                      value={newFilmTitle}
                      onChange={(e) => setNewFilmTitle(e.target.value)}
                      placeholder="Movie Title *"
                      className="bg-[#0b0f19] text-white px-3 py-2 rounded-lg border border-slate-700 text-xs"
                    />
                    <input
                      type="number"
                      value={newFilmYear}
                      onChange={(e) => setNewFilmYear(e.target.value ? Number(e.target.value) : '')}
                      placeholder="Year"
                      className="bg-[#0b0f19] text-white px-3 py-2 rounded-lg border border-slate-700 text-xs"
                    />
                    <input
                      type="text"
                      value={newFilmRole}
                      onChange={(e) => setNewFilmRole(e.target.value)}
                      placeholder="Character / Role"
                      className="bg-[#0b0f19] text-white px-3 py-2 rounded-lg border border-slate-700 text-xs"
                    />
                    <select
                      value={newFilmVerdict}
                      onChange={(e) => setNewFilmVerdict(e.target.value as BoxOfficeVerdict)}
                      className="bg-[#0b0f19] text-white px-3 py-2 rounded-lg border border-slate-700 text-xs"
                    >
                      <option value="All-Time Blockbuster">All-Time Blockbuster</option>
                      <option value="Blockbuster">Blockbuster</option>
                      <option value="Super Hit">Super Hit</option>
                      <option value="Hit">Hit</option>
                      <option value="Average">Average</option>
                      <option value="Flop">Flop</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={addFilmographyItem}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Movie to Filmography</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filmography.map((film, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{film.title}</span>
                        <span className="text-slate-400">({film.year})</span>
                        <span className="text-amber-400">• {film.role}</span>
                        <span className="text-emerald-400">• {film.verdict}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFilmographyItem(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Awards */}
              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" />
                  <span>Awards & Honors ({awards.length})</span>
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 mb-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={newAwardName}
                      onChange={(e) => setNewAwardName(e.target.value)}
                      placeholder="Award Name (e.g. Oscar, Filmfare)"
                      className="bg-[#0b0f19] text-white px-3 py-2 rounded-lg border border-slate-700 text-xs"
                    />
                    <input
                      type="text"
                      value={newAwardCat}
                      onChange={(e) => setNewAwardCat(e.target.value)}
                      placeholder="Category (e.g. Best Actor)"
                      className="bg-[#0b0f19] text-white px-3 py-2 rounded-lg border border-slate-700 text-xs"
                    />
                    <input
                      type="number"
                      value={newAwardYear}
                      onChange={(e) => setNewAwardYear(e.target.value ? Number(e.target.value) : '')}
                      placeholder="Year"
                      className="bg-[#0b0f19] text-white px-3 py-2 rounded-lg border border-slate-700 text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addAwardItem}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Award</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {awards.map((award, idx) => (
                    <div
                      key={award.id || idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-400">{award.year}</span>
                        <span className="font-semibold text-white">{award.name}</span>
                        <span className="text-slate-300">({award.category})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAwardItem(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            {activeTab !== 'basic' && (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'filmography') setActiveTab('trivia_social');
                  else if (activeTab === 'trivia_social') setActiveTab('stats');
                  else if (activeTab === 'stats') setActiveTab('basic');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              >
                Previous Step
              </button>
            )}

            {activeTab !== 'filmography' ? (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'basic') setActiveTab('stats');
                  else if (activeTab === 'stats') setActiveTab('trivia_social');
                  else if (activeTab === 'trivia_social') setActiveTab('filmography');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white"
              >
                Next Step
              </button>
            ) : null}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Star' : 'Create Celebrity'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
