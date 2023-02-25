import { type ReactNode } from 'react';

import { Text } from './text';

export interface CardHeadingProps {
  children: ReactNode;
}

export const CardHeading = ({ children }: CardHeadingProps) => (
  <Text fw="bold" size="xl" htmlTag="h2" color="white" className="font-sans">
    {children}
  </Text>
);
