/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        bgBlackDark: "#242324",
        bgBlackMedium: "#313031",
        bgBlackLight: "#403f40",
        bgGrayLight: "#8e8e8e",
        darkOrange: "#ffab00",
        lightOrange: "#f1be64"

      },
      boxShadow: {
        'inset-1': 'inset 0px 0px 6px 2px rgba(0,0,0,1)',
        'btn1': 'inset 0px -2px 7px 0px #000000, 0px 2px 4px 1px rgba(0,0,0,0.77), inset 0px 1px 4px -1px rgba(255,255,255,0.8);'
      }
    },
  },
  plugins: [],
}

