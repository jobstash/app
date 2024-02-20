const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('node:path');
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  safelist: [
    {
      pattern: /(text|border|bg)-skill(1|2|3|4|5|6|7|8|9|10|11|12|13)/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['var(--font-lato)'],
        roboto: ['var(--font-roboto)'],
      },
      colors: {
        white: 'rgb(var(--color-white) / <alpha-value>)',
        white2: 'rgb(var(--color-border-white) / <alpha-value>)',
        black: 'rgb(var(--color-black) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--color-tertiary) / <alpha-value>)',
        quaternary: 'rgb(var(--color-quaternary) / <alpha-value>)',
        quinary: 'rgb(var(--color-quinary) / <alpha-value>)',
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
        gray: 'rgb(var(--color-gray) / <alpha-value>)',
        'dark-gray': 'rgb(var(--color-dark-gray) / <alpha-value>)',
        'darker-gray': 'rgb(var(--color-darker-gray) / <alpha-value>)',
        'base-black': 'var(--color-base-black)',
        filters: 'rgb(var(--color-mobile-filters) / <alpha-value>)',
        // Tech wrapper skill color pool
        skill1: '#F7FD36',
        skill2: '#CAE402',
        skill3: '#E2BF2B',
        skill4: '#FFE2AD',
        skill5: '#FFE6E2',
        skill6: '#DEF8EE',
        skill7: '#77CBBE',
        skill8: '#F79A7E',
        skill9: '#FB7D43',
        skill10: '#ECC6F7',
        skill11: '#F3A5F2',
        skill12: '#EC88E1',
      },
    },
    fontSize: {
      xs: ['10px', '16px'],
      sm: ['12px', '18px'],
      md: ['14px', '20px'],
      lg: ['16.8px', '20px'],
      xl: ['20px', '30px'],
      '2xl': ['24px', '32px'],
      '3xl': ['29px', '42px'],
      '4xl': ['34.8px', '50px'],
      '5xl': ['41px', '56px'],
      '6xl': ['50px', '72px'],
      '8xl': ['3.75rem', '1'],
    },
    keyframes: {
      'pulse-tw': {
        '0%, 100%': {
          opacity: 1,
        },
        '50%': {
          opacity: 0.5,
        },
      },
      spin: {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
      'reverse-spin': {
        from: {
          transform: 'rotate(360deg)',
        },
        to: {
          transform: 'rotate(0deg)',
        },
      },
      shake: {
        '10%, 90%': {
          transform: 'translate3d(-1px, 0, 0)',
        },
        '20%, 80%': {
          transform: 'translate3d(2px, 0, 0)',
        },
        '30%, 50%, 70%': {
          transform: 'translate3d(-4px, 0, 0)',
        },
        '40%, 60%': {
          transform: 'translate3d(4px, 0, 0)',
        },
      },
      'fade-in-left': {
        from: {
          opacity: 0,
          transform: 'translateX(-60px)',
        },
        to: {
          opacity: 1,
          transform: 'translateX(0px)',
        },
      },
    },
    animation: {
      'pulse-tw': 'pulse-tw 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      spin: 'spin 2.4s linear infinite',
      spin2: 'spin 0.4s linear infinite',
      'spin-slow': 'spin 220s linear infinite',
      'reverse-spin': 'reverse-spin 2.4s linear infinite',
      shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      'fade-in-left': 'fade-in-left 0.3s linear',
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      defaultTheme: 'dark',
      defaultExtendTheme: 'dark',
      themes: {
        dark: {
          colors: {
            default: {
              50: '#1E1E1E',
              100: '#353535',
              200: '#4D4D4D',
              300: '#656565',
              400: '#7D7D7D',
              500: '#959595',
              600: '#ADADAD',
              700: '#C5C5C5',
              800: '#DDDDDD',
              900: '#F5F5F5',
              DEFAULT: '#292929',
            },
          },
        },
      },
    }),
  ],
};
