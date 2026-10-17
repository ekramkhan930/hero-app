import { Celebrity } from '@/types';
import { initialCelebrities } from '@/data/initialCelebrities';

const STORAGE_KEY = 'cinestars_celebrities_v2';

function normalizeCelebrity(c: any): Celebrity {
  let role = c.role;
  if (role === 'Hero') role = 'Actor';
  if (role === 'Heroine') role = 'Actress';
  return { ...c, role };
}

function getStoredCelebrities(): Celebrity[] {
  if (typeof window === 'undefined') {
    return initialCelebrities;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCelebrities));
      return initialCelebrities;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(normalizeCelebrity);
    }
    return initialCelebrities;
  } catch (error) {
    console.error('Failed to read celebrities from localStorage:', error);
    return initialCelebrities;
  }
}

function saveCelebrities(items: Celebrity[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cinestars_data_updated'));
  } catch (error) {
    console.error('Failed to save celebrities to localStorage:', error);
  }
}

export const celebrityService = {
  async getAll(): Promise<Celebrity[]> {
    return getStoredCelebrities();
  },

  async getBySlug(slug: string): Promise<Celebrity | null> {
    const list = getStoredCelebrities();
    const item = list.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
    return item || null;
  },

  async getById(id: string): Promise<Celebrity | null> {
    const list = getStoredCelebrities();
    const item = list.find((c) => c.id === id);
    return item || null;
  },

  async create(data: Omit<Celebrity, 'id'>): Promise<Celebrity> {
    const list = getStoredCelebrities();
    const newCelebrity: Celebrity = {
      ...data,
      id: `star-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    };
    const updated = [newCelebrity, ...list];
    saveCelebrities(updated);
    return newCelebrity;
  },

  async update(id: string, updates: Partial<Celebrity>): Promise<Celebrity> {
    const list = getStoredCelebrities();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Celebrity with id ${id} not found.`);
    }
    const updatedItem: Celebrity = {
      ...list[index],
      ...updates,
      id, // Preserve id
    };
    list[index] = updatedItem;
    saveCelebrities([...list]);
    return updatedItem;
  },

  async delete(id: string): Promise<boolean> {
    const list = getStoredCelebrities();
    const filtered = list.filter((c) => c.id !== id);
    if (filtered.length === list.length) {
      return false;
    }
    saveCelebrities(filtered);
    return true;
  },

  resetToDefault(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCelebrities));
    window.dispatchEvent(new Event('cinestars_data_updated'));
  },

  exportJSON(): string {
    return JSON.stringify(getStoredCelebrities(), null, 2);
  },

  importJSON(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        saveCelebrities(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
};
