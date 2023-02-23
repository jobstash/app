const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lato)'],
        roboto: ['var(--font-roboto)'],
      },
      colors: {
        // Allow opacity e.g. text-primary/50, text-white/50
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--color-tertiary))',
        quaternary: 'rgb(var(--color-quaternary))',
        black: 'rgb(var(--color-black) / <alpha-value>)',
        white: 'rgb(var(--color-white) / <alpha-value>)',
        grey: 'var(--color-grey)',
        tech: 'var(--color-tech)',
        card: 'var(--color-card)',
        ivory: 'var(--color-ivory)',
        sidebarTitle: 'var(--color-sidebarTitle)',
        greyMedium: 'rgb(var(--color-medium-grey) / <alpha-value>)',
        darkGrey: 'rgb(var(--color-dark-grey) / <alpha-value>)',
        darkerGrey: 'rgb(var(--color-darker-grey) / <alpha-value>)',
        // SkillHolder Colors
        react: 'rgb(var(--color-react) / <alpha-value>)',
        jest: 'rgb(var(--color-jest) / <alpha-value>)',
        html: 'rgb(var(--color-html) / <alpha-value>)',
        cplus: 'rgb(var(--color-cplus) / <alpha-value>)',
        webgl: 'rgb(var(--color-webgl) / <alpha-value>)',
        css: 'rgb(var(--color-css) / <alpha-value>)',
        typescript: 'rgb(var(--color-typescript) / <alpha-value>)',
        docker: 'rgb(var(--color-docker) / <alpha-value>)',
        solidity: 'rgb(var(--color-solidity) / <alpha-value>)',
        python: 'rgb(var(--color-python) / <alpha-value>)',
        php: 'rgb(var(--color-php) / <alpha-value>)',
        chashtag: 'rgb(var(--color-chashtag) / <alpha-value>)',
        javascript: 'rgb(var(--color-javascript) / <alpha-value>)',
      },
      backgroundImage: {
        app: 'linear-gradient(116.16deg, #141317 3.32%, rgba(18, 18, 22, 0.7) 96.7%)',
      },
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
    keyframes: {
      // Dropdown menu
      'scale-in': {
        '0%': { opacity: 0, transform: 'scale(0)' },
        '100%': { opacity: 1, transform: 'scale(1)' },
      },
      'slide-down': {
        '0%': { opacity: 0, transform: 'translateY(-10px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      'slide-up': {
        '0%': { opacity: 0, transform: 'translateY(10px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
    animation: {
      // Dropdown menu
      'scale-in': 'scale-in 0.2s ease-in-out',
      'slide-down': 'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },
  plugins: [
    // Initialize with default values
    require('tailwindcss-radix')(),
  ],
};
