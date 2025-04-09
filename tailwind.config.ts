import type { Config } from "tailwindcss";

const config: Config = {
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
        // Fashion-oriented color palette
        primary: {
          50: "#f7f2f7",
          100: "#efe4ef",
          200: "#e0cce0",
          300: "#d1b4d1",
          400: "#b78cb7",
          500: "#a56ea5",
          600: "#8f4c8f",
          700: "#793e79",
          800: "#633363",
          900: "#522b52",
          950: "#2d182d",
        },
        fashion: {
          black: "#000000",
          charcoal: "#36454F",
          navy: "#0c1d3d",
          burgundy: "#7b2d42",
          beige: "#f3e9dc",
          cream: "#f9f5f0",
          blush: "#de6e7f",
          gold: "#d4af37",
          silver: "#c0c0c0",
          sage: "#afb69c",
          olive: "#65734b",
          terracotta: "#c67d5e",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
        strong: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
