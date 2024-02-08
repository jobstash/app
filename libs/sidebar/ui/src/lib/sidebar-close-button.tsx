import { memo, type ReactNode, useCallback } from 'react';

import { useAtom } from 'jotai';

import { isOpenFullscreenNavAtom } from '@jobstash/shared/state';

import { Button } from '@jobstash/shared/ui';

interface Props {
  children: ReactNode;
}

const SidebarCloseButton = ({ children }: Props) => {
  const [isOpenNav, setIsOpenNav] = useAtom(isOpenFullscreenNavAtom);

  const onClick = useCallback(
    () => setIsOpenNav(!isOpenNav),
    [setIsOpenNav, isOpenNav],
  );

  return (
    <Button size="sm" variant="transparent" onClick={onClick}>
      {children}
    </Button>
  );
};

export default memo(SidebarCloseButton);
