import { createContext, useContext } from 'react';

import { DevProfileInfo } from '@jobstash/profile/core';

interface DevProfileInfoContextProps {
  isLoading: boolean;
  profileInfoData: DevProfileInfo | undefined;
}

export const DevProfileInfoContext =
  createContext<DevProfileInfoContextProps | null>(null);

export const useDevProfileInfoContext = () => {
  const context = useContext(DevProfileInfoContext);
  if (!context) {
    throw new Error(
      'useDevProfileInfoContext must be used within a DevProfileInfoProvider',
    );
  }

  return context;
};
