const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['LINE Seed Sans TH', ...fontFamily.sans],
        sans: ['Sarabun', ...fontFamily.sans],
      },
      colors: {
        'op-oxford-blue': '#00063E',
        'ict-turquoise': '#56d7b8',
        'ict-magenta-process': '#f2048a',
        'dst-prussian-blue': '#003366',
        'dst-sunglow': '#ffc914',
      },
      backgroundImage: {
        'base-overlay': "url('/static/images/bg/bg-base-overlay.png')",
        'planet-moon': "url('/static/images/bg/planet-moon.png')",
        'type-button-overlay-primary':
          "url('/static/images/types/type-button-overlay.svg')",
        'type-button-overlay-secondary':
          "url('/static/images/types/type-button-overlay-secondary.svg')",
        'base-desktop': 'url(/static/images/background/base-desktop.svg)',
        'landing-desktop': 'url(/static/images/background/landing-desktop.svg)',
        'stardust-desktop':
          'url(/static/images/background/stardust-desktop.svg)',
        'base-mobile': 'url(/static/images/background/base-mobile.svg)',
        'landing-mobile': 'url(/static/images/background/landing-mobile.svg)',
        'stardust-mobile': 'url(/static/images/background/stardust-mobile.svg)',
        'space-desktop': 'url(/static/images/background/space-desktop.svg)',
      },
      backgroundSize: {
        'size-half': '50%',
        'size-full': '100%',
        'size-double': '200%',
        'size-triple': '300%',
      },
    },
  },
  plugins: [],
}

module.exports = config
