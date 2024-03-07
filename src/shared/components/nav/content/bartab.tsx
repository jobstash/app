'use client';

import { usePathname } from 'next/navigation';
import { MouseEventHandler } from 'react';

import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

import { cn } from '~/shared/utils/cn';
import { useCloseNav } from '~/shared/hooks/use-close-nav';

export interface BartabProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  isMobile?: boolean;
}

export const Bartab = (props: BartabProps) => {
  const { icon, text, href, isMobile } = props;

  const pathname = usePathname();
  const isActive = href === pathname.slice(0, href.length);

  const { closeNav } = useCloseNav();

  const onClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    closeNav();
  };

  const btnClassName = cn('justify-start bg-none', {
    'bg-gradient-to-l from-[#8743FF] to-[#4136F1]': isActive || isMobile,
  });

  const textClassName = 'text-2xl text-white md:text-sm md:font-semibold';

  return (
    <Button
      fullWidth
      as={Link}
      href={href}
      radius="sm"
      startContent={icon}
      className={btnClassName}
      onClick={onClick}
      data-active={isActive}
    >
      <span className={textClassName}>{text}</span>
    </Button>
  );
};
