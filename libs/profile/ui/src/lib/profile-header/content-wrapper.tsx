import { type ReactNode } from 'react';

import { cn } from '@jobstash/shared/utils';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import ProfileHeaderSkeleton from './profile-header-skeleton';

interface Props {
  children: ReactNode;
}

const ProfileHeaderContentWrapper = ({ children }: Props) => {
  const { isLoading, username, email } = useProfileHeaderContext();

  const showHeader = username || email;

  return (
    <div
      className={cn('relative flex flex-col gap-6 lg:gap-4 min-h-[130px]', {
        'opacity-40 pointer-events-none': isLoading && username,
      })}
    >
      {showHeader ? children : <ProfileHeaderSkeleton />}
    </div>
  );
};

export default ProfileHeaderContentWrapper;
