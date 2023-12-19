import { useRouter } from 'next/router';

import { useSetAtom } from 'jotai';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { ROUTE_SECTION } from '@jobstash/shared/core';
import { createOrgReviewPath } from '@jobstash/organizations/utils';

import { useRoleClick } from '@jobstash/auth/state';
import { activeOrgIdAtom } from '@jobstash/organizations/state';

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

  const { roleClick } = useRoleClick(CHECK_WALLET_ROLES.DEV, () => {
    const orgSection = ROUTE_SECTION.ORGANIZATIONS;
    const isOrgSection = pathname.slice(0, orgSection.length) === orgSection;
    const reviewPath = createOrgReviewPath(org);

    if (isOrgSection) {
      setActiveOrgId(orgId);
      push(reviewPath);
    } else {
      window.location.href = reviewPath;
    }
  });

  return (
    <div className="flex items-center gap-4">
      {Boolean(aggregateRating) && (
        <AggregateRating
          aggregateRating={aggregateRating}
          onClick={roleClick}
        />
      )}

      <ReviewCount reviewCount={reviewCount} onClick={roleClick} />
    </div>
  );
};

export default OrgReviewCardSets;
