import Link from 'next/link';
import { memo, type ReactNode } from 'react';

import { cva } from 'class-variance-authority';

import { featuredGradientBorderStyle } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

interface Props {
  href: string | null;
  isActive: boolean;
  isForExperts: boolean;
  isFeatured: boolean;
  children: ReactNode;
  onClick: () => void;
}

const jobCard = cva(
  [
    'flex flex-col p-6 gap-2.5 rounded-3xl bg-white/5',
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

const JobCardWrapper = ({
  href,
  isActive,
  isForExperts,
  isFeatured,
  children,
  onClick,
}: Props) => {
  if (!href)
    return (
      <div onClick={onClick}>
        <InnerWrapper
          isActive={isActive}
          isFeatured={isFeatured}
          isForExperts={isForExperts}
        >
          {children}
        </InnerWrapper>
      </div>
    );

  return (
    <Link href={href} scroll={false} onClick={onClick}>
      <InnerWrapper
        isActive={isActive}
        isFeatured={isFeatured}
        isForExperts={isForExperts}
      >
        {children}
      </InnerWrapper>
    </Link>
  );
};

export default memo(JobCardWrapper);

interface InnerWrapperProps {
  isActive: boolean;
  isForExperts: boolean;
  isFeatured: boolean;
  children: ReactNode;
}

const InnerWrapper = ({
  isActive,
  isForExperts,
  isFeatured,
  children,
}: InnerWrapperProps) => (
  <div
    style={isFeatured || isForExperts ? featuredGradientBorderStyle : undefined}
  >
    <div className={cn(jobCard({ isActive }))}>{children}</div>
  </div>
);
