import { ReactNode } from 'react';

import clsx from 'clsx';

import type { VoidFn } from '~/core/types';

interface Props {
  isActive: boolean;
  children: ReactNode;
  onClick: VoidFn;
}

export const JobListingWrapper = ({ isActive, children, onClick }: Props) => (
  <div
    className={clsx(
      'flex flex-col space-y-6 rounded-3xl border  border-zinc-500 p-8 hover:cursor-pointer hover:bg-zinc-700',
      { 'bg-zinc-800': isActive },
    )}
    onClick={onClick}
  >
    {children}
  </div>
);
