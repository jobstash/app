import { createContext, useContext } from 'react';

interface SidebarContextProps {
  sidebarOpen: boolean;
}

export const SidebarContext = createContext<SidebarContextProps | null>(null);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useRatingContext must be used within a RatingProvider');
  }

  return context;
};
