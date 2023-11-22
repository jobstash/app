import { type ReactNode } from 'react';

import { YourContributionContext } from '../contexts/your-contribution-context';
import { useYourContribution } from '../hooks/use-your-contribution';
import { useYourContributionTour } from '../hooks/use-your-contribution-tour';

interface Props {
  children: ReactNode;
}

export const YourContributionProvider = ({ children }: Props) => {
  const value = useYourContribution();

  useYourContributionTour();

  return (
    <YourContributionContext.Provider value={value}>
      {children}
    </YourContributionContext.Provider>
  );
};
