import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-dm-serif)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        'surface-2': "var(--surface-2)",
        'surface-3': "var(--surface-3)",
        border: "var(--border)",
        'text-primary': "var(--text-primary)",
        'text-secondary': "var(--text-secondary)",
        'text-muted': "var(--text-muted)",
        accent: "var(--accent)",
        'accent-light': "var(--accent-light)",
        red: "var(--red)",
        'red-light': "var(--red-light)",
        yellow: "var(--yellow)",
        'yellow-light': "var(--yellow-light)",
        blue: "var(--blue)",
        'blue-light': "var(--blue-light)",
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
