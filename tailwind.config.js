/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // theme-aware tokens driven by CSS variables (see globals.css :root)
        ink: "rgb(var(--ink) / <alpha-value>)", // primary text / contrast
        paper: "rgb(var(--paper) / <alpha-value>)", // base surface
        smoke: "rgb(var(--smoke) / <alpha-value>)", // raised panel
        stone: "rgb(var(--stone) / <alpha-value>)", // subtle accents
        ash: "rgb(var(--ash) / <alpha-value>)", // muted text
        line: "rgb(var(--line) / <alpha-value>)", // hairline borders
      },
      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        display: ["Archivo", "Helvetica Neue", "Arial", "sans-serif"],
        mega: ["Anton", "Archivo", "Impact", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.32em",
        wide2: "0.18em",
        tightest: "-0.03em",
      },
      maxWidth: {
        site: "1560px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRev: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        marquee: "marquee 30s linear infinite",
        marqueeFast: "marquee 18s linear infinite",
        marqueeRev: "marqueeRev 34s linear infinite",
        kenburns: "kenburns 14s ease-out forwards",
      },
    },
  },
  plugins: [],
};
