import { type ReactNode } from 'react';

import { MantineProvider as BaseMantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

interface Props {
  children: ReactNode;
}

const MantineProvider = ({ children }: Props) => (
  <BaseMantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{ colorScheme: 'dark', cursorType: 'pointer' }}
  >
    <Notifications position="top-right" />
    {children}
  </BaseMantineProvider>
);

export default MantineProvider;
