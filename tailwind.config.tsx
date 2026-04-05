import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#030303",
        "section-alt": "#0A0A0A",
        accent: "#CEA900",
        "text-primary": "#FFFFFF",
        "text-secondary": "#AFAFAF",
        "text-muted": "#666666",
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