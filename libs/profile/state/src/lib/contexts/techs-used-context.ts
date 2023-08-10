import { createContext } from 'react';

import { type TechsUsedContextProps } from '@jobstash/profile/core';

export const TechsUsedContext = createContext<TechsUsedContextProps | null>(
  null,
);
