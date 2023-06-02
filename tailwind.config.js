/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'slide-right': {
          ' 0%': {
            '-webkit-transform': 'translateX(0px)',
            transform: 'translateX(0px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0px)',
            transform: 'translateX(0px)'
          }
        }
      },
      animation: {
        slide: ' slide-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
      }
    }
  },
  plugins:[  require('@tailwindcss/line-clamp'),]
}
