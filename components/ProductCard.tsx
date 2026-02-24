import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/projects';

export default function CollectionGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-8">
      {products.map((p) => (
        <Link key={p.slug} href={`/collections/${p.slug}`} className="group">
          <div className="overflow-hidden aspect-[4/3] relative">
            <Image
              src={p.image}
              alt={p.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-baseline">
              <h3 className="font-serif text-3xl">{p.name}</h3>
              <span className="text-accent text-lg font-medium">{p.price}</span>
            </div>
            <p className="text-text-secondary mt-2 tracking-wide">{p.shortDesc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}