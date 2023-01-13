/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "5xl": "4px 4px 40px -8px rgba(21,21,21,0.7)",
      },
    },
  },
  plugins: [],
};
