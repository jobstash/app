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
      <div
        id="profile-right-panel-your-contribution"
        className="flex flex-col gap-4"
      >
        {children}
      </div>
    </YourContributionContext.Provider>
  );
};
