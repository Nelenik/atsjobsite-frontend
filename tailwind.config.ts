import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import containerQueries from "@tailwindcss/container-queries";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      screens: {
        "md-lg": "992px",
      },
      backgroundImage: {
        hero: "url('/assets/bg-2.webp')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        accent2: {
          DEFAULT: "var(--accent2",
          foreground: "var(--accent2-foreground",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "slide-up": {
          "0%": {
            height: "var(--radix-collapsible-content-height)",
          },
          "100%": {
            height: "0px",
          },
        },
        "slide-down": {
          "0%": {
            height: "0px",
          },
          "100%": {
            height: "var(--radix-collapsible-content-height)",
          },
        },
        "fade-in-out": {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "move-border": {
          "100%": {
            "stroke-dashoffset": "1000",
          },
        },
      },
      animation: {
        "slide-up": "slide-up 200ms ease",
        "slide-down": "slide-down 200ms ease",
        "fade-in-out": "2s fade-in-out 200ms ease ",
        "move-border": "30s move-border linear infinite", //for moving border
      },
    },
  },
  plugins: [animatePlugin, containerQueries],
} satisfies Config;
