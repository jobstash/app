import { prettyTimestamp } from '~/shared/utils/pretty-timestamp';
import { DetailsPanelCardWrapper } from '~/shared/components/details-panel/card-wrapper';
import { Divider } from '~/shared/components/divider';
import { Heading } from '~/shared/components/heading';
import { InfoTags } from '~/shared/components/info-tags';
import { Text } from '~/shared/components/text';

import { OrgReview } from '~/orgs/core/schemas';

import { createStaffReviewTags } from './create-staff-review-tags';
import { RatingList } from './rating-list';

interface Props {
  reportMenu: React.ReactNode;
  review: Omit<OrgReview, 'compensation'>;
}

export const StaffReview = ({ reportMenu, review }: Props) => {
  const { reviewedTimestamp, review: staffReview, rating } = review;
  const { title, pros, cons } = staffReview;

  const tags = createStaffReviewTags(staffReview);

  if (!title) return null;

  return (
    <DetailsPanelCardWrapper>
      <div className={TEXT_WRAPPER_CLASSNAME}>
        <div className="flex w-full flex-wrap items-end justify-between">
          <div className="relative flex h-fit w-full items-center justify-between gap-2">
            <Heading text={title} />
            {reportMenu}
          </div>
          {reviewedTimestamp && (
            <Text text={prettyTimestamp(reviewedTimestamp)} />
          )}
        </div>

        <InfoTags
          compact
          tags={tags}
          classNames={{ wrapper: 'gap-1 lg:gap-4' }}
        />
        <Divider />
      </div>

      <div className={TEXT_WRAPPER_CLASSNAME}>
        <Heading text={HEADING_TEXT.RATINGS} />
        <RatingList rating={rating} />
      </div>

      {(pros || cons) && <Divider />}

      {pros && (
        <div className={TEXT_WRAPPER_CLASSNAME}>
          <Heading text={HEADING_TEXT.PROS} />
          <Text text={pros} />
        </div>
      )}

      {cons && (
        <div className={TEXT_WRAPPER_CLASSNAME}>
          <Heading text={HEADING_TEXT.CONS} />
          <Text text={cons} />
        </div>
      )}
    </DetailsPanelCardWrapper>
  );
};

const HEADING_TEXT = {
  RATINGS: 'Ratings',
  PROS: 'Pros',
  CONS: 'Cons',
};

const TEXT_WRAPPER_CLASSNAME = 'flex flex-col gap-2';
