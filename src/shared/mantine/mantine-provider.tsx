import { ReactNode } from 'react';

import { MantineProvider as BaseMantineProvider } from '@mantine/core';

interface Props {
  children: ReactNode;
}

export const MantineProvider = ({ children }: Props) => (
  <BaseMantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{ colorScheme: 'dark', cursorType: 'pointer' }}
  >
    {children}
  </BaseMantineProvider>
);
