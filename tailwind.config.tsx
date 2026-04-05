import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A0A0A",
        "section-alt": "#121212",
        accent: "#D4AF77",
        "text-primary": "#FFFFFF",
        "text-secondary": "#CCCCCC",
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