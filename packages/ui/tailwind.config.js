const boxShadow = {
  'inset-1': 'inset 0px 1px 3px 1px rgba(0,0,0,.5)',
  'btnz': 'inset 0px -2px 7px 0px #000000, 0px 2px 4px 1px rgba(0,0,0,0.77), inset 0px 1px 4px -1px rgba(255,255,255,0.8);',
  'orangeglow': 'inset 0px -2px 3px 0px rgba(0,0,0,0.7), 0px 1px 3px 2px rgba(255,171,0,0.3), inset 0px 1px 2px 0px rgba(255,255,255,0.8);',
  'deepinset': 'inset 0px 2px 4px 2px rgba(0,0,0,1);',
  'technology': 'inset 0px -2px 3px 0px rgba(0,0,0,0.7), 0px 2px 4px 1px rgba(0,0,0,0.3), inset 0px 2px 2px -1px rgba(255,255,255,0.7);',
  'topglow-1': 'inset 0px 2px 2px -1px rgba(255,255,255,0.7);',
  'topglow-2': 'inset 0px 1px 3px -1px rgba(255,255,255,0.5);',
  'btn-small': 'inset 0px -2px 3px 0px rgba(0,0,0,0.7), 0px 2px 4px 1px rgba(0,0,0,0.3), inset 0px 1px 2px -1px rgba(255,255,255,0.5);',
  'btn-large': 'inset 0px -2px 3px 0px rgba(0,0,0,0.7), 0px 2px 4px 1px rgba(0,0,0,0.3), inset 0px 2px 2px -1px rgba(255,255,255,0.5);',
  'grid-backdrop': 'inset 0px 1px 1px -1px rgba(255,255,255,0.5), 0px 1px 1px 1px rgba(0,0,0,0.2);',
};

const colors = {
  blackDark: "#242324",
  blackMedium: "#313031",
  blackLight: "#403f40",
  grayLight: "#8e8e8e",
  orangeDark: "#ffab00",
  orangeLight: "#f1be64",
  textYellow: "#ddb843",
  textGreen: "#299b37",
  textBeige: "#e8d2b0",
  textBlue: "#77bcda"
};
const variants = ["hover", "active"];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors,
      boxShadow
    },
  },
  safelist: [
    ...Object.keys(boxShadow).map(value => ({ pattern: new RegExp(`shadow-${value}$`), variants })),
    ...Object.keys(colors).map(value => ({ pattern: new RegExp(`bg-${value}$`), variants })),
  ],
  plugins: [],
}

