import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B0B0C",
        "section-alt": "#111113",
        accent: "#C6A95E",
        "text-primary": "#F5F5F5",
        "text-secondary": "#A1A1A6",
        "text-muted": "#6E6E73",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.075em",
      },
    },
  },
  plugins: [],
};
export default config;