import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Music Universe — Songs as Stars',
  description: 'Explore music as a 3D universe. Songs are stars, genres are galaxies, playlists are constellations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
