import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "Arial", "sans-serif"],
      },
      keyframes: {
        "grid-drift": {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-56px, -56px, 0)" },
        },
      },
      animation: {
        "grid-drift": "grid-drift 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
