import CinematicCanvas from '@/components/3d/CinematicCanvas';
import KonamiCode from '@/components/KonamiCode';

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden">
      <KonamiCode />
      <CinematicCanvas />
    </main>
  );
}