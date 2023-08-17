import { memo, type ReactNode } from 'react';

import { type ClassValue } from 'clsx';

import { cn } from '@jobstash/shared/utils';

interface Props {
  children: ReactNode;
  className?: ClassValue[];
}

const PickRoleSection = ({ children, className = [] }: Props) => (
  <div className={cn('flex items-center justify-center', ...className)}>
    <div className="flex flex-col space-y-6 rounded-3xl bg-gradient-to-r from-[#141317] to-black/60 p-8">
      <hr className="border-t border-white/10" />
      {children}
    </div>
  </div>
);

export default memo(PickRoleSection);