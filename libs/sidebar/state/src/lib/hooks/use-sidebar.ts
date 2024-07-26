import { useAtomValue } from 'jotai';

import { useAuthContext } from '@jobstash/auth/state';
import { isOpenFullscreenNavAtom } from '@jobstash/shared/state';

export const useSidebar = () => {
  const isOpenNav = useAtomValue(isOpenFullscreenNavAtom);

  const { role } = useAuthContext();

  return {
    sidebarOpen: isOpenNav,
    role,
  };
};
