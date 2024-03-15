import { MutableRefObject, ReactNode, useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

import { ClassValue } from 'clsx';

import { cn } from '@jobstash/shared/utils';

interface Props {
  children: ReactNode;
  className?: ClassValue;
  isHorizontal?: boolean;
}

const DraggableWrapper = (props: Props) => {
  const { children, className, isHorizontal = true } = props;

  const ref = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(ref as MutableRefObject<HTMLDivElement>);

  return (
    <div
      ref={ref}
      className={cn(
        'hide-scrollbar p-1',
        { 'overflow-x-scroll': isHorizontal },
        className,
      )}
      {...events}
    >
      {children}
    </div>
  );
};

export default DraggableWrapper;
