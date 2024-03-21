import Link from 'next/link';
import { memo, type ReactNode } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@jobstash/shared/utils';

interface Props {
  href: string;
  isActive: boolean;
  children: ReactNode;
  onClick: () => void;
}

const projectCard = cva(
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

const ProjectCardWrapper = ({ href, isActive, children, onClick }: Props) => (
  <Link href={href} scroll={false} onClick={onClick}>
    <div className={cn(projectCard({ isActive }))}>{children}</div>
  </Link>
);

export default memo(ProjectCardWrapper);
