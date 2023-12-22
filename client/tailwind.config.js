/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1130px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        pink: "rgb(254, 67, 110)",
        darkPink: "rgb(224, 36, 94)",
      },
    },
  },
  plugins: [require("autoprefixer")],
};
