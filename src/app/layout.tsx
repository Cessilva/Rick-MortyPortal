import type { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto_Condensed, Roboto } from 'next/font/google';

import { CharactersProvider } from '@/context/CharactersContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const robotoCondensed = Roboto_Condensed({
  variable: '--font-roboto-condensed',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Rick & Morty App',
  description: 'Character management app with React Context and Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.variable} ${roboto.variable}`}
        style={{ fontSmooth: 'antialiased' }}
      >
        <CharactersProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </CharactersProvider>
      </body>
    </html>
  );
}
