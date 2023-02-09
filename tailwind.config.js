const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lato)', ...fontFamily.sans],
      },
      colors: {
        // Allow opacity e.g. text-primary/50, text-white/50
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        black: 'rgb(var(--color-black) / <alpha-value>)',
        white: 'rgb(var(--color-white) / <alpha-value>)',
        grey: 'var(--color-grey)',
        tech: 'var(--color-tech)',
        card: 'var(--color-card)',
        ivory: 'var(--color-ivory)',
        // Need a better and more generic name
        sidebarTitle: 'var(--color-sidebarTitle)',
      },
      backgroundImage: {
        app: 'linear-gradient(116.16deg, #141317 3.32%, rgba(18, 18, 22, 0.7) 96.7%)'
      }
    },
    /*
		 	UNOFFICIAL:
				- the following tailwind setup is NOT FINAL
				- these are based on the figma file 
				- needs to be discussed by the team in the future
		*/
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
    },
  },
  plugins: [],
};
