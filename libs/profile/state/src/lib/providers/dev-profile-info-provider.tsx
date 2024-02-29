import { type ReactNode } from 'react';

import { DevProfileInfoContext } from '../contexts/dev-profile-info-context';
import { useDevProfileInfo } from '../hooks/use-dev-profile-info';

interface Props {
  children: ReactNode;
}

export const DevProfileInfoProvider = ({ children }: Props) => {
  const value = useDevProfileInfo();

  return (
    <DevProfileInfoContext.Provider value={value}>
      {children}
    </DevProfileInfoContext.Provider>
  );
};
