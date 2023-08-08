import { memo } from 'react';

import { type ProfileOrgReview } from '@jobstash/profile/core';

import { useProfileOrgReviewList } from '@jobstash/profile/state';

import {
  ProfileOrgReviewCard,
  ProfileOrgReviewEmptyList,
} from '@jobstash/profile/ui';
import { Loader } from '@jobstash/shared/ui';

interface Props {
  initProfileOrgReview: ProfileOrgReview | null;
  activeProfileOrgReview: ProfileOrgReview | null;
}

const ProfileOrgReviewList = (props: Props) => {
  const { initProfileOrgReview, activeProfileOrgReview } = props;

  const {
    isLoading,
    error,
    profileOrgReviewListItems,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
  } = useProfileOrgReviewList(initProfileOrgReview);

  if (isLoading) {
    return (
      <div className="py-4">
        {initProfileOrgReview && (
          <ProfileOrgReviewCard
            isActive
            profileOrgReview={initProfileOrgReview}
          />
        )}
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (profileOrgReviewListItems.length === 0 && !error) {
    return (
      <div className="py-8">
        <ProfileOrgReviewEmptyList />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 py-4">
      {profileOrgReviewListItems.map((profileOrgReview) => (
        <ProfileOrgReviewCard
          key={profileOrgReview.org.id}
          profileOrgReview={profileOrgReview}
          isActive={activeProfileOrgReview?.org.id === profileOrgReview.org.id}
        />
      ))}

      {profileOrgReviewListItems.length > 0 && (
        <div ref={inViewRef} className="flex items-center justify-center pb-10">
          {isFetchingNextPage && <Loader />}
          {!hasNextPage && <p>No more organization reviews to load</p>}
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

export default memo(ProfileOrgReviewList);
