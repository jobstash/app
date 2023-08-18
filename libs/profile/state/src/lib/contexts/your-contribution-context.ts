import { createContext, useContext } from 'react';

import { ProfileRepo } from '@jobstash/profile/core';

interface YourContributionContextProps {
  contribution: string;
  setContribution: (contribution: string) => void;
  isLoading: boolean;
  onSave: () => void;
  disableSave: boolean;
  profileRepo: ProfileRepo;
  username: string;
  avatar: string;
}

export const YourContributionContext =
  createContext<YourContributionContextProps | null>(null);

export const useYourContributionContext = () => {
  const context = useContext(YourContributionContext);
  if (!context) {
    throw new Error(
      `useYourContributionContext must be used within a YourContributionContextProvider`,
    );
  }

  return context;
};
