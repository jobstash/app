import { memo, type ReactNode } from 'react';

import { cn } from '@jobstash/shared/utils';

interface Props {
  children: ReactNode;
}

const RightPanelStaticWrapper = ({ children }: Props) => (
  <div
    className={cn(
      'lg:hide-scrollbar fixed inset-0 z-50 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10 lg:mt-[100px]',
    )}
  >
    {children}
  </div>
);

export default memo(RightPanelStaticWrapper);
