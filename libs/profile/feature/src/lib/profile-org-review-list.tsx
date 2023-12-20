import { memo } from 'react';

import { PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';

import {
  useProfileOrgReviewList,
  useProfileReviewsPageContext,
} from '@jobstash/profile/state';

import {
  ProfileOrgReviewCard,
  ProfileOrgReviewEmptyList,
} from '@jobstash/profile/ui';
import { ListErrorMessage, Loader } from '@jobstash/shared/ui';

const ProfileOrgReviewList = () => {
  const { activeProfileOrgReview, setActiveTab } =
    useProfileReviewsPageContext();

  const { isLoading, error, profileOrgReviewListItems } =
    useProfileOrgReviewList();

  if (isLoading) return <LoadingState />;
  if (profileOrgReviewListItems.length === 0 && !error) return <EmptyList />;

  const onClickEdit = () => {
    setActiveTab(PROFILE_RIGHT_PANEL_TAB.YOUR_REVIEW);
  };

  return (
    <div className="flex flex-col gap-y-4">
      {profileOrgReviewListItems.map((profileOrgReview) => (
        <ProfileOrgReviewCard
          key={profileOrgReview.org.id}
          profileOrgReview={profileOrgReview}
          isActive={activeProfileOrgReview?.org.id === profileOrgReview.org.id}
          onClickEdit={onClickEdit}
        />
      ))}

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
