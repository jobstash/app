import { createContext, useContext } from 'react';

import { ProfileInfo } from '@jobstash/profile/core';

interface ProfileInfoContextProps {
  isLoading: boolean;
  profileInfoData: ProfileInfo | undefined;
}

export const ProfileInfoContext = createContext<ProfileInfoContextProps | null>(
  null,
);

export const useProfileInfoContext = () => {
  const context = useContext(ProfileInfoContext);
  if (!context) {
    throw new Error(
      'useProfileInfoContext must be used within a ProfileInfoProvider',
    );
  }

  return context;
};
