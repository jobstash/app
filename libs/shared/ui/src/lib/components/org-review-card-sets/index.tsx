import { useRouter } from 'next/router';

import { useSetAtom } from 'jotai';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { ROUTE_SECTION } from '@jobstash/shared/core';
import { createOrgReviewPath } from '@jobstash/organizations/utils';

import { useRoleClick } from '@jobstash/auth/state';
import { activeOrgIdAtom } from '@jobstash/organizations/state';
import { useUserReview } from '@jobstash/profile/state';

import AggregateRating from './aggregate-rating';
import ReviewCount from './review-count';

interface Props {
  org: {
    name: string;
    orgId: string;
    aggregateRating: number;
    reviewCount: number;
  };
}

const OrgReviewCardSets = ({ org }: Props) => {
  const { push, pathname } = useRouter();
  const setActiveOrgId = useSetAtom(activeOrgIdAtom);

  const { aggregateRating, reviewCount, orgId } = org;
  const hasReviewCount = reviewCount > 0;

  const openReviewsTab = () => {
    const orgSection = ROUTE_SECTION.ORGANIZATIONS;
    const isOrgSection = pathname.slice(0, orgSection.length) === orgSection;
    const reviewPath = createOrgReviewPath(org);

    if (isOrgSection) {
      setActiveOrgId(orgId);
      push(reviewPath, undefined, { scroll: false });
    } else {
      window.location.href = reviewPath;
    }
  };

  const openProfileReviews = () => {
    push('/profile/reviews');
  };

  const { isAuthd, roleClick } = useRoleClick(
    CHECK_WALLET_ROLES.DEV,
    openReviewsTab,
  );

  const { hasReviewed, org: reviewedOrg } = useUserReview(orgId);

  const onClickReview =
    isAuthd && org
      ? openProfileReviews
      : hasReviewCount
      ? openReviewsTab
      : roleClick;

  return (
    <div className="flex items-center gap-4 shrink-0">
      {Boolean(aggregateRating) && (
        <AggregateRating
          aggregateRating={aggregateRating}
          onClick={roleClick}
        />
      )}

      {isAuthd && !reviewedOrg ? null : (
        <ReviewCount
          isAuthd={isAuthd}
          hasReviewed={hasReviewed}
          reviewCount={reviewCount}
          onClick={onClickReview}
        />
      )}
    </div>
  );
};

export default OrgReviewCardSets;
