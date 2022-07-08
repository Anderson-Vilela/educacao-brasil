/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        1740: { max: '1740px' },
        1470: { max: '1470px' },
        1200: { max: '1200px' },
        laptop: { max: '1024px' },
        tablet: { max: '768px' },
        phone: { max: '520px' },
      },
      colors: {
        primaryColor_1: '#D16FFF',
        primaryColor_2: '#7DC143',
        primaryColor_3: '#2F2E41',
        backgroundColor_1: '#ECECEC',
      },
      fontFamily: {
        Montserrat: 'Montserrat, sans-serif',
      },
    },
  },
  plugins: [],
};
