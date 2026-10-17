import { Movie } from '@/types';
import { initialMovies } from '@/data/initialMovies';

const STORAGE_KEY = 'cinestars_movies_v1';

function getStoredMovies(): Movie[] {
  if (typeof window === 'undefined') {
    return initialMovies;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMovies));
      return initialMovies;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialMovies;
  } catch (error) {
    console.error('Failed to read movies from localStorage:', error);
    return initialMovies;
  }
}

function saveMovies(items: Movie[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cinestars_data_updated'));
  } catch (error) {
    console.error('Failed to save movies to localStorage:', error);
  }
}

export const movieService = {
  async getAll(): Promise<Movie[]> {
    return getStoredMovies();
  },

  async getBySlug(slug: string): Promise<Movie | null> {
    const list = getStoredMovies();
    const item = list.find((m) => m.slug.toLowerCase() === slug.toLowerCase());
    return item || null;
  },

  async getById(id: string): Promise<Movie | null> {
    const list = getStoredMovies();
    const item = list.find((m) => m.id === id);
    return item || null;
  },

  async create(data: Omit<Movie, 'id'>): Promise<Movie> {
    const list = getStoredMovies();
    const newMovie: Movie = {
      ...data,
      id: `mov-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    };
    const updated = [newMovie, ...list];
    saveMovies(updated);
    return newMovie;
  },

  async update(id: string, updates: Partial<Movie>): Promise<Movie> {
    const list = getStoredMovies();
    const index = list.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error(`Movie with id ${id} not found.`);
    }
    const updatedItem: Movie = {
      ...list[index],
      ...updates,
      id,
    };
    list[index] = updatedItem;
    saveMovies([...list]);
    return updatedItem;
  },

  async delete(id: string): Promise<boolean> {
    const list = getStoredMovies();
    const filtered = list.filter((m) => m.id !== id);
    if (filtered.length === list.length) {
      return false;
    }
    saveMovies(filtered);
    return true;
  },

  resetToDefault(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMovies));
    window.dispatchEvent(new Event('cinestars_data_updated'));
  },

  exportJSON(): string {
    return JSON.stringify(getStoredMovies(), null, 2);
  },

  importJSON(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        saveMovies(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
};
