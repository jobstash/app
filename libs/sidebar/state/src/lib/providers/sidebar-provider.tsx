import { type ReactNode } from 'react';

import { SidebarContext } from '../contexts/sidebar-context';
import { useSidebar } from '../hooks/use-sidebar';

interface Props {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: Props) => {
  const value = useSidebar();

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
