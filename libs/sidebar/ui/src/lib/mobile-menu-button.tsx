import { memo, type ReactNode, useCallback } from 'react';

import { useSetAtom } from 'jotai';

import { sidebarOpenAtom } from '@jobstash/sidebar/state';

import { Button } from '@jobstash/shared/ui';

interface Props {
  children: ReactNode;
}

const MobileMenuButton = ({ children }: Props) => {
  const setSidebarOpen = useSetAtom(sidebarOpenAtom);
  const onClick = useCallback(
    () => setSidebarOpen((prev) => !prev),
    [setSidebarOpen],
  );

  return (
    <Button size="md" variant="transparent" onClick={onClick}>
      {children}
    </Button>
  );
};

export default memo(MobileMenuButton);
