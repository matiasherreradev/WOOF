/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'Lato', 'sans-serif'],
        'sans-Dancing': ['Dancing Script', 'sans-serif'],
      }
  },
  plugins: [],
}
}