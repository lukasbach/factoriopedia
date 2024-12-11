/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        blackDark: "#242324",
        blackMedium: "#313031",
        blackLight: "#403f40",
        grayLight: "#8e8e8e",
        orangeDark: "#ffab00",
        orangeLight: "#f1be64"

      },
      boxShadow: {
        'inset-1': 'inset 0px 0px 6px 2px rgba(0,0,0,1)',
        'btnz': 'inset 0px -2px 7px 0px #000000, 0px 2px 4px 1px rgba(0,0,0,0.77), inset 0px 1px 4px -1px rgba(255,255,255,0.8);',
        'orangeglow': 'inset 0px -2px 3px 0px rgba(0,0,0,0.7), 0px 1px 3px 2px rgba(255,171,0,0.3), inset 0px 1px 2px 0px rgba(255,255,255,0.8);',
        'deepinset': 'inset 0px 2px 4px 2px rgba(0,0,0,1);',
        'btn-small': 'inset 0px -2px 3px 0px rgba(0,0,0,0.7), 0px 2px 4px 1px rgba(0,0,0,0.3), inset 0px 1px 2px -1px rgba(255,255,255,0.5);',
        'btn-large': 'inset 0px -2px 3px 0px rgba(0,0,0,0.7), 0px 2px 4px 1px rgba(0,0,0,0.3), inset 0px 2px 2px -1px rgba(255,255,255,0.5);'
      }
    },
  },
  plugins: [],
}

