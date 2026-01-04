import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      color: {
        primary: { DEFAULT: "#4E27BC" },
        background: { DEFAULT: "#F1FAFF" },
        white: { DEFAULT: "#FFFFFF" },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
