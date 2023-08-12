import { type ReactNode } from 'react';

import { type TechsUsedProps } from '@jobstash/profile/core';

import { TechsUsedContext } from '../contexts/techs-used-context';
import { useTechsUsed } from '../hooks/use-techs-used';

interface Props extends TechsUsedProps {
  children: ReactNode;
}

export const TechsUsedProvider = ({
  allTechs,
  profileRepo,
  children,
}: Props) => {
  const value = useTechsUsed({ allTechs, profileRepo });

  return (
    <TechsUsedContext.Provider value={value}>
      <div id="profile-right-panel-techs-used" className="flex flex-col gap-6">
        {children}
      </div>
    </TechsUsedContext.Provider>
  );
};
