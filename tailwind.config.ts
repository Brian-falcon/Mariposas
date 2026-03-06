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
        primary: {
          50: "#fef3e2",
          100: "#fde4c0",
          200: "#fbd49a",
          300: "#f9c374",
          400: "#f7b44e",
          500: "#f5a623",
          600: "#e0941a",
          700: "#c67d15",
          800: "#a86611",
          900: "#8a4f0d",
        },
        soft: {
          blue: "#4A90D9",
          green: "#5CB85C",
          purple: "#9B59B6",
          coral: "#E86B6B",
        },
      },
      fontSize: {
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
