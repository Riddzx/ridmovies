/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./dist/home.js", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      animation: {
        "spin-logo": "spin 4s ease-in-out infinite",
      },
      colors: {
        dark: "#272727",
        primary: "#e50914", //#E50914 //3BF686
        table: "#52556e",
        star: "#FFFF00",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
