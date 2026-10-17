import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/context/AuthContext';
import { FavoritesProvider } from '@/lib/context/FavoritesContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'CineStars | Bollywood & Hollywood Stars & Filmography Hub',
  description:
    'Comprehensive encyclopedia of Bollywood & Hollywood heroes and heroines, complete movie filmographies, box office verdicts, awards, and real-time management dashboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#07090e] text-slate-100">
      <body className="min-h-full flex flex-col antialiased selection:bg-amber-500 selection:text-black">
        <AuthProvider>
          <FavoritesProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
