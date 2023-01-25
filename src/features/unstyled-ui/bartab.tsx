import type { MouseEventHandler, ReactNode } from 'react';

import clsx from 'clsx';

interface Props {
  leftSection: ReactNode;
  children: ReactNode;
  isActive?: boolean;
  onClick: MouseEventHandler;
}

export const BarTab = ({ isActive, leftSection, children, onClick }: Props) => (
  <button
    className={clsx(
      'flex h-16 w-full items-center rounded-2xl border border-zinc-700 hover:bg-zinc-700',
      { 'bg-zinc-700': isActive },
    )}
    onClick={onClick}
  >
    <div className="w-12">{leftSection}</div>
    {children}
  </button>
);
