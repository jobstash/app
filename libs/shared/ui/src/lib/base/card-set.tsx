import {
  memo,
  type MouseEventHandler,
  type ReactNode,
  useCallback,
} from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';

import { cn } from '@jobstash/shared/utils';

import ArrowCircleUpRightIcon from '../icons/arrow-circle-up-right-icon';

import Text from './text';

const cardset = cva(
  [
    'flex items-center gap-x-1 rounded pointer-events-none',
    'transition-color duration-200 ease-in-out transform translate-x-0 translate-y-0',
    '[&>svg]:mt-[1px]',
  ],
  {
    variants: {
      hasLink: {
        true: [
          'bg-white/10 px-2 py-1 cursor-pointer relative mt-0 pointer-events-auto',
          'before:transition-all before:content-[""] before:rounded before:z-20 before:absolute before:inset-0 before:border before:border-white/40 before:opacity-0 hover:before:opacity-100 hover:bg-white/20',
        ],
        false: 'bg-none cursor-default',
      },
    },
  },
);

type CardSetVariantProps = VariantProps<typeof cardset>;

interface CardSetProps extends CardSetVariantProps {
  icon: ReactNode;
  children: ReactNode;
  link?: string;
  showLinkIcon?: boolean;
  onClick?: MouseEventHandler;
  className?: ClassValue;
}

const CardSet = ({
  icon,
  children,
  link,
  showLinkIcon = true,
  onClick,
  className,
}: CardSetProps) => {
  const hasLink =
    Boolean(link) && link !== '#' && typeof window !== 'undefined';
  const onClickLink = useCallback(() => window.open(link, '_blank'), [link]);

  const onClickCardSet: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onClick) {
      onClick(e);
    } else if (hasLink) {
      onClickLink();
    }
  };

  return (
    <button
      type="button"
      className={cn(
        cardset({ hasLink: hasLink || Boolean(onClick) }),
        className,
      )}
      onClick={onClickCardSet}
    >
      {icon}
      {children && <Text size="sm">{children}</Text>}
      {Boolean(link) && showLinkIcon && <ArrowCircleUpRightIcon />}
    </button>
  );
};

export default memo(CardSet);
