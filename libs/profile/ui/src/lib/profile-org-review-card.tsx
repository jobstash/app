import { memo, useCallback } from 'react';

import { Rating } from '@mantine/core';
import { useSetAtom } from 'jotai';

import { type ProfileOrgReview } from '@jobstash/profile/core';
import { EVENT_CARD_CLICK } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

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
  onClickEdit: () => void;
}

const ProfileOrgReviewCard = (props: Props) => {
  const { isActive, profileOrgReview, onClickEdit } = props;
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
    <ProfileCardWrapper isActive={isActive} isLoading={false} onClick={onClick}>
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <LogoTitle
            title={org.name}
            location={org.location}
            avatarProps={{
              src: getLogoUrl(org.website ?? '', org.logo),
              alt: org.name,
            }}
          />
          <Button
            left={<EditIcon />}
            variant="translucent"
            onClick={onClickEdit}
          >
            Edit Your Review
          </Button>
        </div>

        <div>
          <Rating readOnly fractions={2} value={overallRating} size="md" />
        </div>

        <hr className="border-t border-white/10" />

        <CardSet icon={<MembershipStatusIcon />}>{`Membership Status: ${
          membershipStatus ?? 'N/A'
        }`}</CardSet>

        <div className="flex items-center gap-4">
          <CardSet icon={<StartDateIcon />}>{`First Commit: ${
            startDate
              ? new Date(startDate).toLocaleString().split(',')[0]
              : 'N/A'
          }`}</CardSet>

          <CardSet icon={<EndDateIcon />}>{`Last Commit: ${
            endDate ? new Date(endDate).toLocaleString().split(',')[0] : 'N/A'
          }`}</CardSet>

          <CardSet icon={<CommitIcon />}>{`Number of Your Commits: ${
            commitCount ?? 'N/A'
          }`}</CardSet>
        </div>
      </div>
    </ProfileCardWrapper>
  );
};

export default memo(ProfileOrgReviewCard);
