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
      colors: {
        "main-gold": "#FFD700",
        "main-basketball-orange": "#F88158",
        "main-background-dark": "rgba(18,18,18,255)",
        "secondary-background-light-dark": "rgba(30,30,30,255)",
      },
    },
  },
  plugins: [],
};
