// Import 'tailwindcss/tailwind.css';
import '../src/styles/globals.css';
import 'joi/dist/joi-browser.min.js';

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

export const decorators = [(Story) => <Story />];
