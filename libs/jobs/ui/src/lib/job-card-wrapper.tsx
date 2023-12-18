import Link from 'next/link';
import { memo, type ReactNode } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@jobstash/shared/utils';

interface Props {
  href: string | null;
  isActive: boolean;
  children: ReactNode;
  onClick: () => void;
}

const jobCard = cva(
  [
    'flex flex-col p-6 gap-2.5 rounded-3xl bg-white/5 lg:mb-8',
    'cursor-pointer hover:bg-white/10',
    'transition-all hover:ring-1 hover:ring-inset hover:ring-white/20',
  ],
  {
    variants: {
      isActive: {
        true: 'bg-gradient-to-l from-primary to-tertiary hover:after:hidden cursor-default hover:ring-0',
      },
    },
  },
);

const JobCardWrapper = ({ href, isActive, children, onClick }: Props) => {
  if (!href)
    return (
      <div onClick={onClick}>
        <InnerWrapper isActive={isActive}>{children}</InnerWrapper>
      </div>
    );

  return (
    <Link href={href} scroll={false} onClick={onClick}>
      <InnerWrapper isActive={isActive}>{children}</InnerWrapper>
    </Link>
  );
};

export default memo(JobCardWrapper);

const InnerWrapper = ({
  isActive,
  children,
}: {
  isActive: boolean;
  children: ReactNode;
}) => <div className={cn(jobCard({ isActive }))}>{children}</div>;
