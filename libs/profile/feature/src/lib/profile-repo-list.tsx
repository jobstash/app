import { memo } from 'react';

import {
  useProfileRepoList,
  useProfileRepoPageContext,
} from '@jobstash/profile/state';

import { ProfileRepoCard, ProfileRepoEmptyList } from '@jobstash/profile/ui';
import {
  ListErrorMessage,
  ListNextPageLoader,
  Loader,
} from '@jobstash/shared/ui';

const ProfileRepoList = () => {
  const { activeProfileRepo } = useProfileRepoPageContext();

  const {
    isLoading,
    error,
    profileRepoListItems,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
  } = useProfileRepoList();

  if (isLoading) return <LoadingState />;
  if (profileRepoListItems.length === 0 && !error) return <EmptyList />;

  return (
    <div className="flex flex-col gap-y-4 py-4">
      {profileRepoListItems.map((profileRepo) => (
        <ProfileRepoCard
          key={profileRepo.id}
          profileRepo={profileRepo}
          isActive={activeProfileRepo?.id === profileRepo.id}
        />
      ))}

      <ListNextPageLoader
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        inViewRef={inViewRef}
        itemsLength={profileRepoListItems.length}
        text="No more repositories to load"
      />

      <ListErrorMessage error={error} />
    </div>
  );
};

const LoadingState = () => (
  <div className="py-4">
    <div className="flex h-full w-full items-center justify-center">
      <Loader />
    </div>
  </div>
);

const EmptyList = () => (
  <div className="py-8">
    <ProfileRepoEmptyList />
  </div>
);

export default memo(ProfileRepoList);
