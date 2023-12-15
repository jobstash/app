import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

import CardActionButton from '../card-action-button';

const YourReviewActions = () => {
  const { isDisabledReviewSave, saveReview } = useProfileOrgReviewFormContext();

  return (
    <CardActionButton isDisabled={isDisabledReviewSave} onClick={saveReview} />
  );
};

export default YourReviewActions;
