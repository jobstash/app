import { ReactNode } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { ArrowCircleUpRightIcon } from '../icons';

import { Text } from './text';

const cardset = cva(
  [
    'flex justify-center items-center gap-x-1',
    'rounded w-fit h-[26px]',
    'transition-color duration-200 ease-in-out',
  ],
  {
    variants: {
      hasLink: {
        true: 'bg-dark-gray px-2 py-1 hover:bg-gray active:bg-dark-gray cursor-pointer active:translate-y-[2px]',
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
  isAudit?: boolean;
}

export const CardSet = ({ icon, children, link, isAudit }: CardSetProps) => (
  <button className={cardset({ hasLink: Boolean(link) })}>
    {icon}
    <Text size="sm">{children}</Text>
    {isAudit && <ArrowCircleUpRightIcon />}
  </button>
);
