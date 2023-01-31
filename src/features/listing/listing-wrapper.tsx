import type { MouseEventHandler, ReactNode } from 'react';

import clsx from 'clsx';

import type { VoidFn } from '~/core/types';

interface Props {
  isActive: boolean;
  children: ReactNode;
  onClick: MouseEventHandler;
}

/** This component is the wrapper of listings posted on main panel */
export const ListingWrapper = ({ isActive, children, onClick }: Props) => (
  <div
    className={clsx(
      'flex flex-col space-y-4 rounded-3xl p-6 hover:cursor-pointer',
      { 'bg-gradient-to-l from-primary to-secondary': isActive },
      { 'bg-white/5 hover:bg-white/10': !isActive },
    )}
    onClick={onClick}
  >
    {children}
  </div>
);
