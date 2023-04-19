// Import 'tailwindcss/tailwind.css';
import '../src/styles/globals.css';

import { themes } from '@storybook/theming';
import { initialize, mswDecorator } from 'msw-storybook-addon';

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

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
});

export const decorators = [(Story) => <Story />, mswDecorator];
