'use client';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import ImageReveal from './ImageReveal';

export default function InstagramArchive() {
    // Curated Instagram vibes
    const archivePosts = [
        { id: 1, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop', alt: 'Monochrome Portrait' },
        { id: 2, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', alt: 'Fluid Gold 3D' },
        { id: 3, image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=800&auto=format&fit=crop', alt: 'Cultural Heritage' },
        { id: 4, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop', alt: 'Cinematic B&W' },
        { id: 5, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop', alt: 'Editorial Portrait' },
        { id: 6, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop', alt: 'Studio Focus' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-y border-white/10">
            {archivePosts.map((post) => (
                <a
                    key={post.id}
                    href="https://www.instagram.com/goldenpushers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square overflow-hidden border-r border-b border-white/10 flex items-center justify-center p-4 md:p-8"
                >
                    {/* Film Frame Styling */}
                    <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center group-hover:p-2 transition-all duration-300">
                        <ImageReveal delay={post.id * 0.1}>
                            <Image
                                src={post.image}
                                alt={post.alt}
                                fill
                                className="object-cover origin-center transform-gpu will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]"
                            />
                        </ImageReveal>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 z-10" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <span className="font-serif text-white tracking-widest text-lg md:text-xl border border-white/30 px-6 py-2 backdrop-blur-sm">VIEW ARCHIVE</span>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
