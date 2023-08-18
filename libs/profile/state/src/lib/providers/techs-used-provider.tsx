import { type ReactNode } from 'react';

import { TechsUsedContext } from '../contexts/techs-used-context';
import { useTechsUsed } from '../hooks/use-techs-used';

interface Props {
  children: ReactNode;
}

export const TechsUsedProvider = ({ children }: Props) => {
  const value = useTechsUsed();

  return (
    <TechsUsedContext.Provider value={value}>
      <div id="profile-right-panel-techs-used" className="flex flex-col gap-4">
        {children}
      </div>
    </TechsUsedContext.Provider>
  );
};
