import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /(text|border|bg)-skill(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
  ],
  theme: {
    screens: {
      sm: '360px',
      md: '640px',
      lg: '1280px',
    },
    extend: {
      colors: {
        white: 'rgb(var(--color-white) / <alpha-value>)',
        'base-dark': 'var(--color-base-dark)',
        'dark-gray': 'rgb(var(--color-dark-gray) / <alpha-value>)',
        'darker-gray': 'rgb(var(--color-darker-gray) / <alpha-value>)',
        'darkest-gray': 'rgb(var(--color-darkest-gray) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        'mid-primary': 'rgb(var(--color-mid-primary) / <alpha-value>)',
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
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        lato: ['var(--font-lato)'],
      },
      keyframes: {
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        spin: 'spin 2.4s linear infinite',
        spin2: 'spin 0.4s linear infinite',
        'spin-slow': 'spin 220s linear infinite',
      },
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
              DEFAULT: '#1E1E1E',
            },
          },
        },
      },
    }),
  ],
};
export default config;
