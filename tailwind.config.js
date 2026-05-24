/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ap: { red: "#E61E25", gold: "#F5A623" },
        navy: { DEFAULT: "#0D1B2A", light: "#1E2D3D" },
      },
      fontFamily: { mono: ["DM Mono", "monospace"] },
    },
  },
  plugins: [],
};
