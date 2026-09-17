import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 「AIっぽいけど難しくない」ための落ち着いた配色
        brand: {
          50: "#f2f5ff",
          100: "#e6ebff",
          200: "#c3cfff",
          300: "#9fb0ff",
          400: "#6f85ff",
          500: "#4b63f0",
          600: "#3a4dd1",
          700: "#2f3ea8",
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
