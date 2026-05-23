import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        mango: {
          50: "#fff9db",
          100: "#fff1a8",
          300: "#ffd447",
          500: "#f7b500",
          700: "#b87700"
        },
        leaf: {
          50: "#edf8ee",
          100: "#d5f0d8",
          500: "#21864b",
          700: "#125631",
          900: "#0b321f"
        },
        cream: "#fff8ea",
        ink: "#17140d"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 20, 13, 0.12)",
        glow: "0 20px 80px rgba(247, 181, 0, 0.24)"
      },
      fontFamily: {
        sans: [
          "Hind Siliguri",
          "var(--font-bangla-sans)",
          "Inter",
          "system-ui",
          "sans-serif"
        ],
        display: [
          "Hind Siliguri",
          "var(--font-bangla-sans)",
          "system-ui",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
