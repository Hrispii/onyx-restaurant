/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold:   '#c9a84c',
        muted:  '#888888',
        card:   '#141414',
        border: '#222222',
        bg:     '#0a0a0a',
      },
    },
  },
  plugins: [],
}