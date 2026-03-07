'use client';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function InstagramArchive() {
    // Using some project images as mock static Instagram posts
    const archivePosts = projects.slice(0, 6).map((p, i) => ({
        id: i,
        image: p.heroImage,
        alt: `Archive post ${i + 1}`
    }));

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
                        <Image
                            src={post.image}
                            alt={post.alt}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="font-serif text-white tracking-widest text-lg md:text-xl border border-white/30 px-6 py-2 backdrop-blur-sm">VIEW ARCHIVE</span>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
