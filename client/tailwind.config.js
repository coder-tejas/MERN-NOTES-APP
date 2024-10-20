/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#2B85FF",
        secondary:"#EF863E",
      },
      boxShadow: {
        'custom-blue': 'rgba(46, 110, 240, 0.4) 0px 5px, rgba(46, 110, 240, 0.3) 0px 10px, rgba(46, 110, 240, 0.2) 0px 15px, rgba(46, 110, 240, 0.1) 0px 20px, rgba(46, 110, 240, 0.05) 0px 25px',
        'custom-blue1': 'rgba(46, 110, 240, 0.4) 5px 5px, rgba(46, 110, 240, 0.3) 10px 10px, rgba(46, 110, 240, 0.2) 15px 15px, rgba(46, 110, 240, 0.1) 20px 20px, rgba(46, 110, 240, 0.05) 25px 25px',

      },
    },
  },
  plugins: [],
}