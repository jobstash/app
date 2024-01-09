import { type OrgReview } from '@jobstash/organizations/core';
import { prettyTimestamp } from '@jobstash/shared/utils';

import { RightPanelCardBorder } from '@jobstash/right-panel/ui';
import { CardSet, Heading, Text } from '@jobstash/shared/ui';

import { createOrgStaffReviewTags } from './utils/create-org-staff-review-tags';
import OrgRatingList from './org-rating-list';

interface Props {
  orgReview: Omit<OrgReview, 'compensation'>;
}

const OrgStaffReview = ({ orgReview }: Props) => {
  const { reviewedTimestamp, review, rating } = orgReview;
  const { title, pros, cons } = review;

  const tags = createOrgStaffReviewTags(review);

  return (
    <RightPanelCardBorder>
      <div className="flex flex-col p-6 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between items-end flex-wrap">
            <div className="w-full">
              <Heading size="lg" fw="semibold">
                {title}
              </Heading>
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
