import { memo, type ReactNode, useCallback } from 'react';

import { useSetAtom } from 'jotai';

import { isOpenFullscreenNavAtom } from '@jobstash/shared/state';

import { Button } from '@jobstash/shared/ui';

interface Props {
  children: ReactNode;
}

const MobileMenuButton = ({ children }: Props) => {
  const isOpenNav = useSetAtom(isOpenFullscreenNavAtom);
  const onClick = useCallback(() => isOpenNav((prev) => !prev), [isOpenNav]);

  return (
    <Button size="md" variant="transparent" onClick={onClick}>
      {children}
    </Button>
  );
};

export default memo(MobileMenuButton);
