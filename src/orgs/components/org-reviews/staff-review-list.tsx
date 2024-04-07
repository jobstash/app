import { OrgReview } from '~/orgs/core/schemas';

import { StaffReview } from './staff-review';

interface Props {
  orgId: string;
  reviews: Omit<OrgReview, 'compensation'>[];
}

export const StaffReviewList = ({ orgId, reviews }: Props) => {
  const reportMenu = <p>{`[${orgId}]`}</p>;

  return (
    <>
      {reviews.map((review) => (
        <StaffReview
          key={JSON.stringify(review)}
          review={review}
          reportMenu={reportMenu}
        />
      ))}
    </>
  );
};
