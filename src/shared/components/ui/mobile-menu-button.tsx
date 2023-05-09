import { memo } from 'react';

import { useSetAtom } from 'jotai';

import { navbarOpenAtom } from '~/features/sidebar/atoms';

import Button from '../base/button';
import { HamburgerIcon } from '../icons';

const MobileMenuButton = () => {
  const setNavbarOpen = useSetAtom(navbarOpenAtom);

  return (
    <div className="-mr-2 ml-auto self-center lg:hidden">
      <Button
        size="md"
        variant="transparent"
        onClick={() => setNavbarOpen((prev) => !prev)}
      >
        <HamburgerIcon />
      </Button>
    </div>
  );
};

export default memo(MobileMenuButton);
