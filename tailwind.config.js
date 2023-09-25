/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      neutral: colors.neutral,
      },
      screens: {
        'short': { 'raw': '(min-height: 400px)'},
        'tall': { 'raw': '(min-height: 800px)'},
      }
    },
  },
  plugins: [],
}

