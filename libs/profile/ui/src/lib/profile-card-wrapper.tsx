import { memo, type ReactNode } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@jobstash/shared/utils';

interface Props {
  isActive: boolean;
  children: ReactNode;
  onClick: () => void;
}

const profileCard = cva(
  [
    'flex flex-col p-6 gap-4 rounded-3xl bg-white/5 lg:mb-8',
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

const ProfileCardWrapper = ({ isActive, children, onClick }: Props) => (
  <div onClick={onClick}>
    <div className={cn(profileCard({ isActive }))}>{children}</div>
  </div>
);

export default memo(ProfileCardWrapper);