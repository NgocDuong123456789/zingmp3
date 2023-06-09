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
        },
        'rotate-center': {
          ' 0%': {
            '-webkit-transform': 'rotate(0)',
            transform: 'rotate(0)'
          },
          '100%': {
            '-webkit-transform': 'rotate(360deg)',
            transform: 'rotate(360deg)'
          }
        },
        'rotate-center-pause': {
          ' 0%': {
            '-webkit-transform': 'rotate(0)',
            transform: 'rotate(0)'
          },
          '100%': {
            '-webkit-transform': 'rotate(360deg)',
            transform: 'rotate(360deg)'
          }
        },
        'scale-up-image': {
          ' 0%': {
            '-webkit-transform': 'scale(1)',
            transform: 'scale(1)'
          },
          '100%': {
            '-webkit-transform': 'scale(1.2)',
            transform: 'scale(1.2)'
          }
        }
      },
      animation: {
        slide: ' slide-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        rotateCenter:'rotate-center 4s linear infinite',
        'rotate-center-pause':'rotate-center-pause 0.5s linear  3 both',
        'scale-up-image':'scale-up-image 1s linear',
      }
    }
  },
  plugins:[  require('@tailwindcss/line-clamp'),]
}
