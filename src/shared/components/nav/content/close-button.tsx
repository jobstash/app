'use client';

import { MouseEventHandler } from 'react';

import { Button } from '@nextui-org/button';

import { cn } from '~/shared/utils/cn';
import { useCloseNav } from '~/shared/hooks/use-close-nav';

export const CloseButton = () => {
  const { showNav, closeNav } = useCloseNav();

  const onClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    closeNav();
  };

  return (
    <Button
      isIconOnly
      aria-label="Close Nav"
      className={cn('md:hidden', { hidden: !showNav })}
      onClick={onClick}
      variant="light"
    >
      <CloseSvg />
    </Button>
  );
};

const CloseSvg = () => (
  <svg
    width="32"
    height="33"
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.3431 9.33586C9.95257 8.94534 9.3194 8.94534 8.92888 9.33586C8.53836 9.72639 8.53836 10.3596 8.92888 10.7501L14.5858 16.407L8.92895 22.0638C8.53843 22.4543 8.53843 23.0875 8.92895 23.478C9.31948 23.8685 9.95264 23.8685 10.3432 23.478L16 17.8212L21.6568 23.478C22.0473 23.8685 22.6805 23.8685 23.071 23.478C23.4615 23.0875 23.4615 22.4543 23.071 22.0638L17.4142 16.407L23.0711 10.7501C23.4616 10.3596 23.4616 9.72639 23.0711 9.33586C22.6806 8.94534 22.0474 8.94534 21.6569 9.33586L16 14.9928L10.3431 9.33586Z"
      fill="#F9FAFB"
    />
  </svg>
);
