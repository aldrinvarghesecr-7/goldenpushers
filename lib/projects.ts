export type Project = {
  slug: string;
  title: string;
  year: string;
  location: string;
  category: 'Landscapes' | 'Portraits' | 'Urban';
  shortDesc: string;
  description: string;
  heroImage: string;
  images: string[];
  edition: string;
  size: string;
};

export const projects: Project[] = [
  {
    slug: "eternal-peaks",
    title: "Eternal Peaks",
    year: "2025",
    location: "Patagonia, Chile",
    category: "Landscapes",
    shortDesc: "First and last light on the Andes.",
    description: "A 7-day solo expedition capturing dramatic light transitions on Torres del Paine.",
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=95",
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=95", "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=2400&q=95"],
    edition: "Limited to 25",
    size: "24×36 in",
  },
  // ... (add the other 3 projects from previous messages)
];