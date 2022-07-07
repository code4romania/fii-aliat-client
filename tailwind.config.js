const colors = require('tailwindcss/colors');

module.exports = {
  content: ['src/**/*.vue', 'public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans',
        serif: 'Fraunces, serif',
      },
      letterSpacing: {
        tight: '-.025em',
        normal: '0',
        wide: '.05em',
        wider: '.1em',
        widest: '.2em',
      },
      fontSize: {
        '10xl': '12em',
      },
      colors: {
        black: '#1d1d1d',
        white: '#ffffff',
      },
    },
    // gray: colors.trueGray,
  },
  plugins: [
    //
    require('@tailwindcss/typography'),
  ],
};
