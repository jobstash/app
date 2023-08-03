import { memo } from 'react';

import { type ProfileOrgReview } from '@jobstash/profile/core';

import ProfileCardWrapper from './profile-card-wrapper';

interface Props {
  isActive: boolean;
  profileOrgReview: ProfileOrgReview;
}

const ProfileOrgReviewCard = (props: Props) => {
  const { isActive, profileOrgReview } = props;

  return (
    <ProfileCardWrapper isActive={isActive} onClick={() => null}>
      <div>ProfileOrgReviewCard</div>
    </ProfileCardWrapper>
  );
};

export default memo(ProfileOrgReviewCard);
