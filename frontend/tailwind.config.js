/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {},
    screens: {
        'sm': '576px', 
        'md': '768px', 
        'lg': '992px',
        'xl': '1272px',
        '2xl': '1272px', 
      }
  },
  plugins: [],
}
