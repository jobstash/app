import { memo } from 'react';

import {
  useProfileOrgReviewList,
  useProfileReviewsPageContext,
} from '@jobstash/profile/state';

import {
  ProfileOrgReviewCard,
  ProfileOrgReviewEmptyList,
} from '@jobstash/profile/ui';
import {
  ListErrorMessage,
  ListNextPageLoader,
  Loader,
} from '@jobstash/shared/ui';

const ProfileOrgReviewList = () => {
  const { activeProfileOrgReview } = useProfileReviewsPageContext();

  const {
    isLoading,
    error,
    profileOrgReviewListItems,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
  } = useProfileOrgReviewList();

  if (isLoading) return <LoadingState />;
  if (profileOrgReviewListItems.length === 0 && !error) return <EmptyList />;

  return (
    <div className="flex flex-col gap-y-4 py-4">
      {profileOrgReviewListItems.map((profileOrgReview) => (
        <ProfileOrgReviewCard
          key={profileOrgReview.org.id}
          profileOrgReview={profileOrgReview}
          isActive={activeProfileOrgReview?.org.id === profileOrgReview.org.id}
        />
      ))}

      <ListNextPageLoader
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        inViewRef={inViewRef}
        itemsLength={profileOrgReviewListItems.length}
        text="No more organization reviews to load"
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
    <ProfileOrgReviewEmptyList />
  </div>
);

export default memo(ProfileOrgReviewList);