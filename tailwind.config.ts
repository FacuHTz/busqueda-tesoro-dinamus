import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Fredoka", "ui-rounded", "system-ui", "-apple-system", "sans-serif"],
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-8px)" },
          "40%": { transform: "translateX(8px)" },
          "60%": { transform: "translateX(-6px)" },
          "80%": { transform: "translateX(6px)" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "60%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pop: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        sadPulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(251, 191, 36, 0.25)" },
          "50%": { boxShadow: "0 0 40px rgba(251, 191, 36, 0.5)" },
        },
      },
      animation: {
        shake: "shake 0.45s ease-in-out",
        bounceIn: "bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        pop: "pop 0.3s ease-out both",
        fadeUp: "fadeUp 0.4s ease-out both",
        floaty: "floaty 3s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        sadPulse: "sadPulse 1s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
