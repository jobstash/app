import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, ReactNode } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { ArrowCircleUpRightIcon } from '../icons';

import Text from './text';

const cardset = cva(
  [
    'flex justify-center items-center gap-x-1',
    'rounded w-fit h-[26px]',
    'transition-color duration-200 ease-in-out',
  ],
  {
    variants: {
      hasLink: {
        true: 'bg-white/10 px-2 py-1 hover:bg-white/20 active:bg-white/30 cursor-pointer active:translate-y-[2px]',
        false: 'bg-none cursor-default',
      },
    },
  },
);

type CardSetVariantProps = VariantProps<typeof cardset>;

interface CardSetProps extends CardSetVariantProps {
  icon: ReactNode;
  children: string;
  link?: string;
  showLinkIcon?: boolean;
}

const CardSet = ({
  icon,
  children,
  link,
  showLinkIcon = true,
}: CardSetProps) => {
  const btn = (
    <button className={cardset({ hasLink: Boolean(link) })}>
      {icon}
      <Text size="sm">{children}</Text>
      {Boolean(link) && showLinkIcon && <ArrowCircleUpRightIcon />}
    </button>
  );

  if (!link || link === '#') return btn;

  return (
    <Link href={link} target="_blank" rel="noopener">
      {btn}
    </Link>
  );
};

export default memo(CardSet);
