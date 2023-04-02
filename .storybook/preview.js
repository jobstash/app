// Import 'tailwindcss/tailwind.css';
import '../src/styles/globals.css';
import 'joi/dist/joi-browser.min.js';

import { themes } from '@storybook/theming';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  // Implement figma background (no light theme defined yet, may change in the future)
  backgrounds: {
    default: 'default',
    values: [{ name: 'default', value: '#1E1E1E' }],
  },
  // Unblinding dark Storybook
  darkMode: {
    // Set the initial theme
    current: 'dark',
    dark: { ...themes.dark },
    light: { ...themes.light },
  },
};

export const decorators = [(Story) => <Story />];
