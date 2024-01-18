import { memo, useCallback } from 'react';

import { Rating } from '@mantine/core';
import { useSetAtom } from 'jotai';

import { type ProfileOrgReview } from '@jobstash/profile/core';
import { EVENT_CARD_CLICK } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { activeProfileOrgReviewAtom } from '@jobstash/profile/state';
import { mobileRightPanelOpenAtom, useIsMobile } from '@jobstash/shared/state';

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

  const isMobile = useIsMobile();

  const total =
    Object.values(rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const overallRating = total / Object.keys(rating).length;

  const setActiveProfileOrgReview = useSetAtom(activeProfileOrgReviewAtom);
  const setMobileRightPanelOpen = useSetAtom(mobileRightPanelOpenAtom);

  const onClick = useCallback(() => {
    if (isMobile) setMobileRightPanelOpen(true);
    setActiveProfileOrgReview(profileOrgReview);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));
  }, [
    isMobile,
    profileOrgReview,
    setActiveProfileOrgReview,
    setMobileRightPanelOpen,
  ]);

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
            isIcon={isMobile}
            left={isMobile ? null : <EditIcon />}
            variant="translucent"
            onClick={onClickEdit}
          >
            {isMobile ? <EditIconLg /> : 'Edit Your Review'}
          </Button>
        </div>

        <div>
          <Rating readOnly fractions={2} value={overallRating} size="md" />
        </div>

        <hr className="border-t border-white/10" />

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <CardSet icon={<MembershipStatusIcon />}>{`Membership Status: ${
            membershipStatus ?? 'N/A'
          }`}</CardSet>

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

export const EditIconLg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);
