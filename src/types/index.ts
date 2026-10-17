export type Industry = 'Bollywood' | 'Hollywood';
export type GenderRole = 'Hero' | 'Heroine';

export type BoxOfficeVerdict =
  | 'All-Time Blockbuster'
  | 'Blockbuster'
  | 'Super Hit'
  | 'Hit'
  | 'Semi Hit'
  | 'Average'
  | 'Flop';

export interface FilmographyItem {
  movieId?: string;
  title: string;
  year: number;
  role: string;
  verdict: BoxOfficeVerdict;
  rating: number; // e.g. 8.4
  posterUrl: string;
  genre: string[];
  director?: string;
}

export interface Award {
  id: string;
  name: string;
  category: string;
  year: number;
  movieTitle?: string;
}

export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  imdb?: string;
  wikipedia?: string;
}

export interface Celebrity {
  id: string;
  slug: string;
  name: string;
  realName?: string;
  industry: Industry;
  role: GenderRole;
  profileImage: string;
  bannerImage: string;
  galleryImages: string[];
  dob: string;
  age?: number;
  birthplace: string;
  height: string;
  nationality: string;
  zodiacSign?: string;
  spouse?: string;
  debutYear: number;
  debutMovie: string;
  biography: string;
  actingStyle?: string;
  trivia: string[];
  socialLinks: SocialLinks;
  awards: Award[];
  filmography: FilmographyItem[];
  featured: boolean;
  trendingRank?: number;
  boxOfficeTotalGross?: string;
}

export interface MovieCastMember {
  celebrityId?: string;
  name: string;
  role: string;
  profileImage: string;
  isLead?: boolean;
}

export interface Movie {
  id: string;
  slug: string;
  title: string;
  industry: Industry;
  releaseYear: number;
  genre: string[];
  director: string;
  producer?: string;
  musicDirector?: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  imdbRating: number;
  runtimeMinutes: number;
  boxOfficeVerdict: BoxOfficeVerdict;
  budget?: string;
  worldwideGross?: string;
  trailerUrl?: string;
  leadActors: MovieCastMember[];
  featured?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  avatarUrl?: string;
}

export interface FilterState {
  searchQuery: string;
  industry: 'All' | Industry;
  role: 'All' | GenderRole;
  era: 'All' | 'classic' | '90s' | '2000s' | 'modern';
  sortBy: 'featured' | 'name' | 'debut' | 'rating' | 'awards';
}
