/* eslint-disable jsx-a11y/accessible-emoji */
import { type OrgReview } from '@jobstash/organizations/core';
import { prettyTimestamp } from '@jobstash/shared/utils';

import { RightPanelCardBorder } from '@jobstash/right-panel/ui';
import { Heading, Text } from '@jobstash/shared/ui';

interface Props {
  orgReview: OrgReview;
}

const OrgStaffReview = ({ orgReview }: Props) => {
  const { reviewedTimestamp, review, compensation, rating } = orgReview;
  const { title, pros, cons, location, timezone, workingHours } = review;

  const ts = reviewedTimestamp ? prettyTimestamp(reviewedTimestamp) : null;

  return (
    <RightPanelCardBorder>
      <div className="flex flex-col p-6 gap-4">
        <div className="flex flex-col gap-2">
          <Heading size="lg" fw="semibold">
            {title}
          </Heading>
          {ts && (
            <Text color="dimmed" size="sm">
              {ts}
            </Text>
          )}
        </div>
        <hr className="border-t border-white/10" />

        <div className="flex flex-col gap-2">
          <Heading size="sm" fw="semibold">
            Pros
          </Heading>
          <Text color="dimmed">{pros}</Text>
        </div>

        <div className="flex flex-col gap-2">
          <Heading size="sm" fw="semibold">
            Cons
          </Heading>
          <Text color="dimmed">{cons}</Text>
        </div>

        <div className="flex flex-col gap-2">
          <Heading size="sm" fw="semibold">
            Not sure where to put this 🤔
          </Heading>
          <Text color="dimmed" className="pl-4">
            <pre>
              {JSON.stringify(
                { location, timezone, workingHours },
                undefined,
                '\t',
              )}
            </pre>
          </Text>
        </div>

        <div className="flex flex-col gap-2">
          <Heading size="sm" fw="semibold">
            Should we include this?
          </Heading>
          <Text color="dimmed" className="pl-4">
            <pre>
              {JSON.stringify(
                { compensation, userRating: rating },
                undefined,
                '\t',
              )}
            </pre>
          </Text>
        </div>
      </div>
    </RightPanelCardBorder>
  );
};

export default OrgStaffReview;
