import { memo } from 'react';

import {
  useProfileRepoList,
  useProfileRepoPageContext,
} from '@jobstash/profile/state';

import { ProfileRepoCard, ProfileRepoEmptyList } from '@jobstash/profile/ui';
import {
  Heading,
  ListNextPageLoader,
  Loader,
  NotFoundSvg,
  Text,
} from '@jobstash/shared/ui';

const ProfileRepoList = () => {
  const { activeProfileRepo, isLoadingCard } = useProfileRepoPageContext();

  const {
    isLoading,
    error,
    profileRepoListItems,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
    isFetching,
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
          isLoading={
            activeProfileRepo?.id === profileRepo.id &&
            (isLoadingCard || isFetching)
          }
        />
      ))}

      <ListNextPageLoader
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        inViewRef={inViewRef}
        itemsLength={profileRepoListItems.length}
        text="No more repositories to load"
      />

      {error && (
        <div className="flex flex-col gap-4 items-center justify-center py-12">
          <NotFoundSvg />
          <div className="flex flex-col items-center gap-y-2 pt-4">
            <Heading size="xl" fw="semibold">
              Dataset Update in Progress
            </Heading>
            <div className="max-w-lg text-center w-full">
              <Text color="dimmed">
                We&#39;re working to bring you an updated experience. Service
                will be restored soon.
              </Text>
            </div>
          </div>
        </div>
      )}
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
