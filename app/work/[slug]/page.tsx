import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug);
  if (!project) notFound();

  return (
    <div className="pt-20">
      <div className="relative h-[85vh]">
        <motion.div layoutId={`image-${project.slug}`} className="absolute inset-0">
          <Image src={project.heroImage} alt={project.title} fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <Link href="/work" className="text-sm tracking-widest hover:text-accent">← BACK TO WORK</Link>
          <h1 className="font-serif text-7xl mt-6 leading-none">{project.title}</h1>
          <p className="text-accent text-3xl mt-4">{project.year} • {project.location}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-20">
        <p className="text-xl text-text-secondary leading-relaxed">{project.description}</p>
        <Button href="#" variant="primary" className="mt-16 w-full">INQUIRE FOR PRINT</Button>
      </div>

      <div className="overflow-x-auto pb-32 flex gap-6 px-8 snap-x snap-mandatory scrollbar-hide">
        {project.images.map((img, i) => (
          <motion.div key={i} className="flex-shrink-0 w-[90vw] md:w-[620px] snap-center" whileHover={{ scale: 1.01 }}>
            <Image src={img} alt="" width={1200} height={800} className="rounded-xl" sizes="90vw" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}