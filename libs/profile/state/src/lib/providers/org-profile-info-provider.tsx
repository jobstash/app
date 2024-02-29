import { type ReactNode } from 'react';

import { OrgProfileInfoContext } from '../contexts/org-profile-info-context';
import { useOrgProfileInfo } from '../hooks/use-org-profile-info';

interface Props {
  children: ReactNode;
}

export const OrgProfileInfoProvider = ({ children }: Props) => {
  const value = useOrgProfileInfo();

  return (
    <OrgProfileInfoContext.Provider value={value}>
      {children}
    </OrgProfileInfoContext.Provider>
  );
};
