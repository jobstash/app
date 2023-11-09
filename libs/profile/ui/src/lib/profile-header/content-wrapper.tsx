import { type ReactNode } from 'react';

import { cn } from '@jobstash/shared/utils';

import { useProfileHeaderContext } from '@jobstash/profile/state';

interface Props {
  children: ReactNode;
}

const ProfileHeaderContentWrapper = ({ children }: Props) => {
  const { isLoading } = useProfileHeaderContext();

  return (
    <div
      className={cn('relative flex flex-col gap-6', {
        'opacity-40 pointer-events-none': isLoading,
      })}
    >
      {children}
    </div>
  );
};

export default ProfileHeaderContentWrapper;
