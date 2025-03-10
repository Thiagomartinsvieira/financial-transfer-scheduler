/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a56db",
        "primary-dark": "#1e429f",
        "primary-light": "#3f83f8",
      },
    },
  },
  plugins: [],
};
