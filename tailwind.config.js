/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    screens: {
      'sm': { 'max': '1099px' },
      'md': { 'min': '1100px', 'max': '1299px' },
      'lg': { 'min': '1300px', 'max': '1599px' },
      'xl': { 'min': '1600px', 'max': '1799px' },
    },
    fontSize: {
      xs: '1.05rem',
      sm: '1.2rem',
      base: '1.38rem',
      lg: '1.26rem',
      xl: '1.6rem',
      '1.5xl': '1.7rem',
      '2xl': '1.8rem',
    },
    extend: {
      transitionDuration: {
        DEFAULT: '333ms'
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out'
      },
      colors: {
        text: 'var(--text)',
        background: 'var(--background)',
        sidebarBackground: 'var(--sidebarBackground)',
        icon: 'var(--icon)',
        border: 'var(--border)',
        cardLightColor: 'var(--cardLightColor)',
        cardPastelColor: 'var(--cardPastelColor)',
        cardMediumColor: 'var(--cardMediumColor)',
        cardDarkColor: 'var(--cardDarkColor)',
        cardDeepColor: 'var(--cardDeepColor)',
      },
    },
  },
  plugins: [],
}


