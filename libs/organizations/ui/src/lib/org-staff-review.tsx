import { type OrgReview } from '@jobstash/organizations/core';
import { REPORT_UI_CTX } from '@jobstash/shared/core';
import { prettyTimestamp } from '@jobstash/shared/utils';

import { RightPanelCardBorder } from '@jobstash/right-panel/ui';
import {
  CardMenu,
  CardSet,
  Heading,
  ReportMenuItem,
  Text,
} from '@jobstash/shared/ui';

import { createOrgStaffReviewTags } from './utils/create-org-staff-review-tags';
import OrgRatingList from './org-rating-list';

interface Props {
  orgId: string;
  orgReview: Omit<OrgReview, 'compensation'>;
}

const OrgStaffReview = ({ orgId, orgReview }: Props) => {
  const { reviewedTimestamp, review, rating } = orgReview;
  const { title, pros, cons } = review;

  const tags = createOrgStaffReviewTags(review);

  const other = JSON.stringify({ orgId, reviewTitle: title });

  return (
    <RightPanelCardBorder>
      <div className="flex flex-col p-6 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between items-end flex-wrap">
            <div className="flex h-fit w-full items-center justify-between gap-2 relative">
              <Heading size="lg" fw="semibold">
                {title}
              </Heading>
              <CardMenu>
                <ReportMenuItem
                  ui={REPORT_UI_CTX.ORG_REVIEW_CARD}
                  other={other}
                />
              </CardMenu>
            </div>
            {reviewedTimestamp && (
              <Text size="sm" color="dimmed">
                {prettyTimestamp(reviewedTimestamp)}
              </Text>
            )}
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {tags.map(({ id, text, link, icon }) => (
                <CardSet key={id} link={link} icon={icon}>
                  {text}
                </CardSet>
              ))}
            </div>
          )}
        </div>

        <hr className="border-t border-white/10" />

        <div className="flex flex-col gap-2">
          <Heading size="sm" fw="semibold">
            Rating
          </Heading>
          <OrgRatingList orgRating={rating} />
        </div>

        {(pros || cons) && <hr className="border-t border-white/10" />}

        {pros && (
          <div className="flex flex-col gap-2">
            <Heading size="sm" fw="semibold">
              Pros
            </Heading>
            <Text color="dimmed">{pros}</Text>
          </div>
        )}

        {cons && (
          <div className="flex flex-col gap-2">
            <Heading size="sm" fw="semibold">
              Cons
            </Heading>
            <Text color="dimmed">{cons}</Text>
          </div>
        )}
      </div>
    </RightPanelCardBorder>
  );
};

export default OrgStaffReview;
