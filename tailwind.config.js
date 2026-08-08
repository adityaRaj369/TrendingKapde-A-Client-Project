/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        paper: "#ffffff",
        smoke: "#f4f4f2",
        stone: "#e7e6e2",
        ash: "#8a8a8a",
        line: "#e4e4e1",
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
