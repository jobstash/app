/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
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
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
        gray: 'rgb(var(--color-gray) / <alpha-value>)',
        'dark-gray': 'rgb(var(--color-dark-gray) / <alpha-value>)',
        'darker-gray': 'rgb(var(--color-darker-gray) / <alpha-value>)',
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
      pulse: {
        '0%, 100%': {
          opacity: 1,
        },
        '50%': {
          opacity: 0.5,
        },
      },
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-15%)',
          'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
        },
        '50%': {
          transform: 'translateY(0)',
          'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
        },
      },
    },
    animation: {
      // Dropdown menu
      'scale-in': 'scale-in 0.2s ease-in-out',
      'slide-down': 'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      bounce: 'bounce 1.5s infinite',
    },
  },
  plugins: [
    // Initialize with default values
    require('tailwindcss-radix')(),
  ],
};
