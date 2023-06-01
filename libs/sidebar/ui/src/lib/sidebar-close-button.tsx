import { memo, type ReactNode, useCallback } from 'react';

import { useAtom } from 'jotai';

import { sidebarOpenAtom } from '@jobstash/sidebar/state';

import { Button } from '@jobstash/shared/ui';

interface Props {
  children: ReactNode;
}

const SidebarCloseButton = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  const onClick = useCallback(
    () => setSidebarOpen(!sidebarOpen),
    [setSidebarOpen, sidebarOpen],
  );

  return (
    <Button size="sm" variant="transparent" onClick={onClick}>
      {children}
    </Button>
  );
};

export default memo(SidebarCloseButton);
