'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favoriteCelebrities: string[];
  favoriteMovies: string[];
  toggleCelebrity: (id: string) => void;
  toggleMovie: (id: string) => void;
  isCelebrityFavorite: (id: string) => boolean;
  isMovieFavorite: (id: string) => boolean;
  totalFavoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const CELEB_STORAGE = 'cinestars_fav_celebs';
const MOVIE_STORAGE = 'cinestars_fav_movies';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteCelebrities, setFavoriteCelebrities] = useState<string[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedCelebs = localStorage.getItem(CELEB_STORAGE);
      if (savedCelebs) setFavoriteCelebrities(JSON.parse(savedCelebs));

      const savedMovies = localStorage.getItem(MOVIE_STORAGE);
      if (savedMovies) setFavoriteMovies(JSON.parse(savedMovies));
    } catch (e) {
      console.error('Failed to load favorites from localStorage', e);
    }
  }, []);

  const toggleCelebrity = (id: string) => {
    setFavoriteCelebrities((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(CELEB_STORAGE, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const toggleMovie = (id: string) => {
    setFavoriteMovies((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(MOVIE_STORAGE, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const isCelebrityFavorite = (id: string) => favoriteCelebrities.includes(id);
  const isMovieFavorite = (id: string) => favoriteMovies.includes(id);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteCelebrities,
        favoriteMovies,
        toggleCelebrity,
        toggleMovie,
        isCelebrityFavorite,
        isMovieFavorite,
        totalFavoritesCount: favoriteCelebrities.length + favoriteMovies.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
