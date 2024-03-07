import { useAtom } from 'jotai';

import { showFullscreenNavAtom } from '~/shared/atoms/show-fullscreen-nav-atom';

export const useCloseNav = () => {
  const [showNav, setShowNav] = useAtom(showFullscreenNavAtom);

  const closeNav = () => {
    setShowNav(false);
  };

  return { showNav, closeNav };
};
