/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Instrument Serif'", 'serif'],
        body: ["'Barlow'", 'sans-serif'],
      },
      colors: {
        fog: '#EAE5EC',
        lilac: '#C2A4FF',
        dim: '#5E5E5E',
      },
    },
  },
  plugins: [],
}
