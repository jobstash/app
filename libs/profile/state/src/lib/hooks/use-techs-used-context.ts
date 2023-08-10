import { useContext } from 'react';

import { TechsUsedContext } from '../contexts/techs-used-context';

export const useTechsUsedContext = () => {
  const context = useContext(TechsUsedContext);
  if (!context) {
    throw new Error(
      'useTechsUsedContext must be used within a TechsUsedProvider',
    );
  }

  return context;
};
