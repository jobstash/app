'use client';

import { MutableRefObject, ReactNode, useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

import { ClassValue } from 'clsx';

import { cn } from '~/shared/utils/cn';

interface Props {
  children: ReactNode;
  className?: ClassValue;
}

export const DraggableWrapper = ({ children, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(ref as MutableRefObject<HTMLDivElement>);

  return (
    <div
      className={cn('hide-scrollbar overflow-x-scroll p-1', className)}
      ref={ref}
      {...events}
    >
      {children}
    </div>
  );
};
