import { memo } from 'react';

import { ProfileRepo } from '@jobstash/profile/core';

import { useProfileRepoList } from '@jobstash/profile/state';

import { ProfileRepoCard, ProfileRepoEmptyList } from '@jobstash/profile/ui';
import { Loader } from '@jobstash/shared/ui';

interface Props {
  initProfileRepo: ProfileRepo | null;
  activeProfileRepo: ProfileRepo | null;
}

const ProfileRepoList = (props: Props) => {
  const { initProfileRepo, activeProfileRepo } = props;

  const {
    isLoading,
    error,
    profileRepoListItems,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
  } = useProfileRepoList(initProfileRepo);

  if (isLoading) {
    return (
      <div className="py-4">
        {initProfileRepo && (
          <ProfileRepoCard isActive profileRepo={initProfileRepo} />
        )}
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (profileRepoListItems.length === 0 && !error) {
    return (
      <div className="py-8">
        <ProfileRepoEmptyList />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 py-4">
      {profileRepoListItems.map((profileRepo) => (
        <ProfileRepoCard
          key={profileRepo.id}
          profileRepo={profileRepo}
          isActive={activeProfileRepo?.id === profileRepo.id}
        />
      ))}

      {profileRepoListItems.length > 0 && (
        <div ref={inViewRef} className="flex items-center justify-center pb-10">
          {isFetchingNextPage && <Loader />}
          {!hasNextPage && <p>No more repositories to load</p>}
        </div>
      )}
      {(error as Error)?.message && (
        <div className="py-8">
          <p>error = {(error as Error).message}</p>
        </div>
      )}
    </div>
  );
};

export default memo(ProfileRepoList);
