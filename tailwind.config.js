/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
