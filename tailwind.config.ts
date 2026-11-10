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
        theme: {
          primary: "#A6B9BE",
          secondary: "#D8D2C6",
        },
        sage: {
          50: "#F4F6F7",
          100: "#E5EBED",
          200: "#D2DDE0",
          300: "#BDCCD0",
          400: "#A6B9BE",
          500: "#8FA5AA",
          600: "#738B90",
          700: "#5A6F74",
          800: "#435458",
          900: "#2F3C3F",
          DEFAULT: "#A6B9BE",
        },
        sand: {
          50: "#FAF9F7",
          100: "#F4F2EE",
          200: "#E7E3DC",
          300: "#D8D2C6",
          400: "#C7C0B2",
          500: "#B5AC9C",
          600: "#9C9281",
          700: "#7E7566",
          800: "#5F584C",
          900: "#413C34",
          DEFAULT: "#D8D2C6",
        },
        gold: {
          50: "#FAF9F7",
          100: "#F4F2EE",
          200: "#E7E3DC",
          300: "#D8D2C6", // Theme Secondary: Warm Sand #D8D2C6
          400: "#A6B9BE", // Theme Primary: Mineral Slate #A6B9BE
          500: "#A6B9BE", // Theme Primary (#A6B9BE)
          600: "#8FA5AA",
          700: "#738B90",
          800: "#5A6F74",
          900: "#2F3C3F",
          DEFAULT: "#A6B9BE",
        },
        champagne: {
          50: "#FAF9F7",
          100: "#F4F2EE",
          200: "#E7E3DC",
          300: "#D8D2C6", // Theme Secondary: #D8D2C6
          400: "#C7C0B2",
          500: "#B5AC9C",
          600: "#9C9281",
          DEFAULT: "#D8D2C6",
        },
        ivory: {
          50: "#FAF9F7",
          100: "#F4F2EE",
          200: "#E7E3DC",
          300: "#D8D2C6",
          DEFAULT: "#D8D2C6",
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
        gold: "0 4px 20px -2px rgba(166, 185, 190, 0.28)",
        "gold-lg": "0 10px 30px -5px rgba(166, 185, 190, 0.38)",
      },
    },
  },
  plugins: [],
};
export default config;
