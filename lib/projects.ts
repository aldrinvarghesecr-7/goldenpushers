export type Project = {
  slug: string;
  title: string;
  year: string;
  location: string;
  category: 'Wedding Storytelling' | 'Portraits' | 'Corporate Productions' | 'Private Events';
  shortDesc: string;
  description: string;
  heroImage: string;
  images: string[];
  edition: string;
  size: string;
};

export const projects: Project[] = [
  {
    slug: "chateau-vows",
    title: "Château Vows",
    year: "2024",
    location: "Geneva, CH",
    category: "Wedding Storytelling",
    shortDesc: "An intimate ceremony captured in raw emotion.",
    description: "A beautifully documented wedding day focusing on authentic candid moments and cinematic portraiture before the sunset.",
    heroImage: "/work/ig-1.jpg",
    images: ["/work/ig-1.jpg"],
    edition: "Full Storytelling",
    size: "Cinematic Film + 500 Stills",
  },
  {
    slug: "lakeside-toast",
    title: "Lakeside Toast",
    year: "2024",
    location: "Lake Como, IT",
    category: "Wedding Storytelling",
    shortDesc: "The celebration after the vows.",
    description: "Capturing the electric energy of the reception and the quiet, stolen glances between the couple as the evening unfolds.",
    heroImage: "/work/ig-2.jpg",
    images: ["/work/ig-2.jpg"],
    edition: "Full Storytelling",
    size: "Cinematic Film + 300 Stills",
  },
  {
    slug: "raw-portraiture",
    title: "Raw Portraiture",
    year: "2024",
    location: "Paris, FR",
    category: "Portraits",
    shortDesc: "Studio-lit editorial pre-wedding.",
    description: "A high-fashion approach to pre-wedding photography, utilizing dramatic lighting and deep contrasts.",
    heroImage: "/work/ig-3.jpg",
    images: ["/work/ig-3.jpg"],
    edition: "Pre-Wedding Shoot",
    size: "40 Retouched Stills",
  },
  {
    slug: "the-fittings",
    title: "The Fittings",
    year: "2024",
    location: "London, UK",
    category: "Corporate Productions",
    shortDesc: "Behind the scenes of the preparation.",
    description: "Documenting the meticulous details of the bride's preparation, the dress, and the quiet moments before the rush.",
    heroImage: "/work/ig-4.jpg",
    images: ["/work/ig-4.jpg"],
    edition: "Editorial Coverage",
    size: "50 Retouched Stills",
  },
  {
    slug: "golden-hour",
    title: "Golden Hour",
    year: "2024",
    location: "Santorini, GR",
    category: "Wedding Storytelling",
    shortDesc: "The perfect light over the caldera.",
    description: "Catching the last rays of the sun as the couple walks through the historic streets, creating timeless, glowing imagery.",
    heroImage: "/work/ig-5.jpg",
    images: ["/work/ig-5.jpg"],
    edition: "Destination Wedding",
    size: "Cinematic Film + 800 Stills",
  },
  {
    slug: "candid-joy",
    title: "Candid Joy",
    year: "2024",
    location: "Provence, FR",
    category: "Private Events",
    shortDesc: "Unscripted moments of pure happiness.",
    description: "A documentary-first approach to an exclusive private celebration, focusing 100% on natural, unposed interactions.",
    heroImage: "/work/ig-6.jpg",
    images: ["/work/ig-6.jpg"],
    edition: "Event Coverage",
    size: "200 Stills",
  }
];