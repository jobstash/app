import { createContext, useContext } from 'react';

import { OrgProfileInfo } from '@jobstash/profile/core';

interface OrgProfileInfoContextProps {
  isLoading: boolean;
  profileInfoData: OrgProfileInfo | undefined;
}

export const OrgProfileInfoContext =
  createContext<OrgProfileInfoContextProps | null>(null);

export const useOrgProfileInfoContext = () => {
  const context = useContext(OrgProfileInfoContext);
  if (!context) {
    throw new Error(
      'useOrgProfileInfoContext must be used within a OrgProfileInfoProvider',
    );
  }

  return context;
};
