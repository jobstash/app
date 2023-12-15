import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const RatingActions = () => {
  const { isDisabledRatingSave, saveRating } = useProfileOrgReviewFormContext();

  return (
    <div className="flex items-center justify-center pt-4 w-full gap-8">
      <Button
        variant="primary"
        className="px-8"
        isDisabled={isDisabledRatingSave}
        onClick={saveRating}
      >
        Save
      </Button>
    </div>
  );
};

export default RatingActions;
