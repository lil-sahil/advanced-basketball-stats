/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "sidebar-stats": ["Oswald", "sans-serif"],
        "sidebar-player-name": ["Rubik", "sans-serif"],
      },
      backgroundImage: {
        "main-background": "url('./assets/dark-bg.jpg')",
      },
    },
  },
  plugins: [],
};
