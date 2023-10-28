import { useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { useAuthContext } from '@jobstash/auth/state';

import { sidebarOpenAtom } from '../atoms/sidebar-open-atom';

export const useSidebar = () => {
  const sidebarOpen = useAtomValue(sidebarOpenAtom);

  useEffect(() => {
    const el = document.querySelectorAll('html')[0];
    if (sidebarOpen) {
      el.classList.add('disable-scroll');
    } else {
      el.classList.remove('disable-scroll');
    }
  }, [sidebarOpen]);

  //
  // const { isSignedIn } = useSIWE();
  const isSignedIn = false;

  const { role } = useAuthContext();

  return {
    sidebarOpen,
    isSignedIn,
    role,
  };
};
