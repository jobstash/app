import { createContext, useContext } from 'react';

import { type CheckWalletRole } from '@jobstash/auth/core';

interface SidebarContextProps {
  sidebarOpen: boolean;
  role: CheckWalletRole;
}

export const SidebarContext = createContext<SidebarContextProps | null>(null);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useRatingContext must be used within a RatingProvider');
  }

  return context;
};
