import { type ReactNode } from 'react';

import { YourContributionContext } from '../contexts/your-contribution-context';
import { useYourContribution } from '../hooks/use-your-contribution';

interface Props {
  children: ReactNode;
}

export const YourContributionProvider = ({ children }: Props) => {
  const value = useYourContribution();

  return (
    <YourContributionContext.Provider value={value}>
      {children}
    </YourContributionContext.Provider>
  );
};
