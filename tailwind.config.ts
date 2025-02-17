import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#10172A",
          light: "#192A45",
          dark: "#0D1424",
        },
        accent: {
          blue: "#A8C6FA",
          green: "#4CAF50",
          red: "#FF4D4F",
        },
        light: {
          bg: "#F8FAFC",
          card: "#FFFFFF",
          text: "#1E293B",
          muted: "#64748B",
          border: "#E2E8F0",
          hover: "#F1F5F9",
        },
        border: "#D1D5DB",
        input: "#F7F7F7",
        ring: "#66DE93",
        background: "#F7F7F7",
        foreground: "#10172A",
        primary: {
          DEFAULT: "#3498DB",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F7F7F7",
          foreground: "#10172A",
        },
        destructive: {
          DEFAULT: "#E74C3C",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#AAAAAA",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "border-flow": {
          "0%": {
            "background-size": "100% 200%",
            "background-position": "0% 0%",
          },
          "50%": {
            "background-size": "100% 200%",
            "background-position": "0% 100%",
          },
          "100%": {
            "background-size": "100% 200%",
            "background-position": "0% 0%",
          },
        },
        pulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in": "slide-in 0.2s ease-out",
        "gradient-x": "gradient-x 3s ease-in-out infinite",
        "border-flow": "border-flow 4s ease infinite",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
