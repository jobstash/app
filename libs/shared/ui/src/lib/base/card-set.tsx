import { memo, type MouseEventHandler, type ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';
import {
  LamaIcon,
} from '@jobstash/shared/ui';

import { cn } from '@jobstash/shared/utils';

import ArrowCircleUpRightIcon from '../icons/arrow-circle-up-right-icon';

import Text from './text';

const cardset = cva(
  [
    'flex items-center gap-x-1 rounded pointer-events-none min-h-[28px] shrink-0 truncate',
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
      isDisabled: {
        true: 'opacity-30 select-none pointer-events-none',
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
  isDisabled?: boolean;
  isExternal?: boolean;
}

const CardSet = ({
  icon,
  children,
  link,
  showLinkIcon = true,
  onClick,
  className,
  isDisabled,
  isExternal = true,
}: CardSetProps) => {
  const hasLink =
    Boolean(link) && link !== '#' && typeof window !== 'undefined';

  const target = isExternal ? '_blank' : '_self';
  const onClickLink = () => window.open(link, target);

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
        cardset({ hasLink: hasLink || Boolean(onClick), isDisabled }),
        className,
      )}
      onClick={onClickCardSet}
    >
      <div className="shrink-0">{icon}</div>
      {typeof children === 'string' ? (
        <div className="truncate flex max-w-[240px] sm:max-w-md lg:max-w-lg">
          <Text size="sm">{children}</Text>
          {(children.includes('Funding') || children.includes('TVL')) && <span className='ml-0.5 [&>svg]:h-2'><LamaIcon /></span>}
        </div>
      ) : (
        children
      )}
      {Boolean(link) && showLinkIcon && (
        <div className="shrink-0">
          <ArrowCircleUpRightIcon />
        </div>
      )}
      
    </button>
  );
};

export default memo(CardSet);
