import { User } from '@/types';

const AUTH_STORAGE_KEY = 'cinestars_auth_session';

export const DEMO_ADMIN: User = {
  id: 'usr-admin-01',
  email: 'admin@cinestars.com',
  name: 'Cinema Administrator',
  role: 'admin',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
};

export interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}

export const authService = {
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  login(email: string, password: string): LoginResult {
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      return { success: false, error: 'Email address is required.' };
    }
    if (!emailRegex.test(trimmedEmail)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!password) {
      return { success: false, error: 'Password is required.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    // Accept demo admin or any valid email/password combination for testing
    let user: User;
    if (trimmedEmail === 'admin@cinestars.com' && password === 'admin123') {
      user = DEMO_ADMIN;
    } else {
      user = {
        id: `usr-${Date.now()}`,
        email: trimmedEmail,
        name: trimmedEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        role: 'admin',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      };
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      window.dispatchEvent(new Event('cinestars_auth_changed'));
    }

    return { success: true, user };
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new Event('cinestars_auth_changed'));
    }
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },
};
