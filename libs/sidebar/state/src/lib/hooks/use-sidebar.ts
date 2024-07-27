import { useAtomValue } from 'jotai';

import { isOpenFullscreenNavAtom } from '@jobstash/shared/state';

export const useSidebar = () => {
  const isOpenNav = useAtomValue(isOpenFullscreenNavAtom);

  return {
    sidebarOpen: isOpenNav,
  };
};
