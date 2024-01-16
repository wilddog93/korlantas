/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '3/8': '37.5%',
        '5/8': '62.5%',
      },
      colors: {
        primary: colors.blue,
        secondary: colors.violet,
        dark: colors.gray,
        error: colors.red,
        teal: colors.teal,
      },
    },
  },
  plugins: [],
}