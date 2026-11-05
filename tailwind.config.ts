import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          50: "#FCF9EE",
          100: "#F7F0D4",
          200: "#EFE0A7",
          300: "#E4CE77",
          400: "#D8B84E",
          500: "#C8A127", // Champagne Gold Primary
          600: "#A9821C",
          700: "#846217",
          800: "#6B4E17",
          900: "#5A4017",
          DEFAULT: "#C8A127",
        },
        champagne: {
          50: "#FAF7F2",
          100: "#F3EDE1",
          200: "#E6D9C3",
          300: "#D7C2A1",
          400: "#C7AA80",
          500: "#BA9566",
          600: "#AB8154",
        },
        ivory: {
          50: "#FCFAF6",
          100: "#FAF7EF",
          200: "#F4EEDB",
          300: "#EAE1C3",
          DEFAULT: "#FAF7EF",
        },
        obsidian: {
          900: "#09090B",
          850: "#121215",
          800: "#18181B",
          700: "#27272A",
          600: "#3F3F46",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        gold: "0 4px 20px -2px rgba(200, 161, 39, 0.25)",
        "gold-lg": "0 10px 30px -5px rgba(200, 161, 39, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
