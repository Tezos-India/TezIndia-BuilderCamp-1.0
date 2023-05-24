/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      animation: {
        Anytime: 'Anytime 6s ease-in-out infinite',
        Anywhere:'Anywhere 6s ease-in-out infinite',
      },

      keyframes: {
        Anytime: {
          '2%,48%': { opacity: '100%' },
          '51%,100%': { opacity: '0%' },
        },
        Anywhere: {
          '51%,98%': { opacity: '100%' },
          '4%,48%': { opacity: '0%' },
        }
      },

      fontFamily:{
        brandonBoldItalic : 'brandonBoldItalic, sans-serif',
        brandonBlack : 'brandonBlack, sans-serif',
        brandonLight : 'brandonLight, sans-serif',
        brandonLightItalic : 'brandonLightItalic, sans-serif',
        brandonMediumItalic : 'brandonMediumItalic, sans-serif',
        brandonRegularItalic:'brandonRegularItalic, sans-serif',
        brandonThinItalic:'brandonThinItalic,sans-serif'
      },
    },
  },
  plugins: [],
}
