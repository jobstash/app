// Import 'tailwindcss/tailwind.css';
import '../src/styles/globals.css';
import 'joi/dist/joi-browser.min.js';

import { Lato, Roboto } from '@next/font/google';
import { themes } from '@storybook/theming';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  // Implement figma background (no light theme defined yet, may change in the future)
  backgrounds: {
    default: 'default',
    values: [{ name: 'default', value: '#131317' }],
  },
  // Unblinding dark Storybook
  darkMode: {
    // Set the initial theme
    current: 'dark',
    dark: { ...themes.dark },
    light: { ...themes.light },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
});

export const decorators = [
  (Story) => (
    <div className={`${lato.variable} ${roboto.variable} font-roboto`}>
      <Story />
    </div>
  ),
];
