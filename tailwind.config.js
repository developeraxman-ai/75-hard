/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        command: {
          bg: '#07080a',
          card: '#111318',
          line: '#242833',
          gold: '#d7b46a',
        },
      },
    },
  },
  plugins: [],
};
