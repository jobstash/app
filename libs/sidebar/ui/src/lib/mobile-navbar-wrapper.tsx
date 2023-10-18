import { memo, type ReactNode } from 'react';

import { useAtomValue } from 'jotai';

import { cn } from '@jobstash/shared/utils';

import { sidebarOpenAtom } from '@jobstash/sidebar/state';

interface Props {
  children: ReactNode;
}

const MobileNavbarWrapper = ({ children }: Props) => {
  const sidebarOpen = useAtomValue(sidebarOpenAtom);

  return (
    <nav
      className={cn(
        'inset-0 w-full bg-opacity-75 bg-gradient-to-r from-quinary from-20% to-primary p-4 transition-all duration-300 lg:hidden',
        { 'z-50 opacity-100 fixed overflow-auto h-screen': sidebarOpen },
        {
          'opacity-0 -z-50 absolute h-0 overflow-hidden pointer-events-none':
            !sidebarOpen,
        },
      )}
    >
      {children}
    </nav>
  );
};

export default memo(MobileNavbarWrapper);
