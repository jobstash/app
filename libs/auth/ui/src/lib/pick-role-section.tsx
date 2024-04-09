import { memo, type ReactNode } from 'react';

import { type ClassValue } from 'clsx';

import { cn } from '@jobstash/shared/utils';

interface Props {
  children: ReactNode;
  className?: ClassValue[];
  withTopHr?: boolean;
}

const PickRoleSection = ({
  children,
  className = [],
  withTopHr = true,
}: Props) => (
  <div className={cn('flex items-center justify-center', ...className)}>
    <div className="flex flex-col  space-y-4 rounded-3xl bg-white/5 p-8">
      {/* {withTopHr && <hr className="border-t border-white/10" />} */}
      {children}
    </div>
  </div>
);

export default memo(PickRoleSection);
