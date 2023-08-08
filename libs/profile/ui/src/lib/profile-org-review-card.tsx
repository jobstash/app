import { memo, useCallback } from 'react';

import { Rating } from '@mantine/core';
import { useSetAtom } from 'jotai';

import { type ProfileOrgReview } from '@jobstash/profile/core';
import { EVENT_CARD_CLICK } from '@jobstash/shared/core';
import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import { activeProfileOrgReviewAtom } from '@jobstash/profile/state';

import {
  Button,
  CardSet,
  CommitIcon,
  EditIcon,
  EndDateIcon,
  LogoTitle,
  MembershipStatusIcon,
  StartDateIcon,
} from '@jobstash/shared/ui';

import ProfileCardWrapper from './profile-card-wrapper';

interface Props {
  isActive: boolean;
  profileOrgReview: ProfileOrgReview;
}

const ProfileOrgReviewCard = (props: Props) => {
  const { isActive, profileOrgReview } = props;
  const { org, rating, membershipStatus, startDate, endDate, commitCount } =
    profileOrgReview;

  const total =
    Object.values(rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const overallRating = total / Object.keys(rating).length;

  const setActiveProfileOrgReview = useSetAtom(activeProfileOrgReviewAtom);

  const onClick = useCallback(() => {
    setActiveProfileOrgReview(profileOrgReview);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));
  }, [profileOrgReview, setActiveProfileOrgReview]);

  return (
    <ProfileCardWrapper isActive={isActive} onClick={onClick}>
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <LogoTitle
            title={org.name}
            location={org.location}
            avatarProps={{
              src: org.logo ?? getGoogleLogoUrl(org.url),
              alt: org.name,
            }}
          />
          <Button left={<EditIcon />} variant="translucent">
            Edit Your Review
          </Button>
        </div>

        {rating && overallRating ? (
          <div>
            <Rating readOnly fractions={2} value={overallRating} />
          </div>
        ) : null}

        <hr className="border-t border-white/10" />

        {membershipStatus && (
          <CardSet
            icon={<MembershipStatusIcon />}
          >{`Membership Status: ${membershipStatus}`}</CardSet>
        )}

        {(startDate || endDate || commitCount) && (
          <div className="flex items-center gap-4">
            {startDate && (
              <CardSet icon={<StartDateIcon />}>{`Start Date: ${
                new Date(startDate).toLocaleString().split(',')[0]
              }`}</CardSet>
            )}
            {endDate && (
              <CardSet icon={<EndDateIcon />}>{`End Date: ${
                new Date(endDate).toLocaleString().split(',')[0]
              }`}</CardSet>
            )}
            {commitCount && (
              <CardSet
                icon={<CommitIcon />}
              >{`Number of Your Commits: ${commitCount}`}</CardSet>
            )}
          </div>
        )}
      </div>
    </ProfileCardWrapper>
  );
};

export default memo(ProfileOrgReviewCard);
