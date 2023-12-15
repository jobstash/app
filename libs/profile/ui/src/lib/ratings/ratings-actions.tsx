import { useRatingContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const RatingActions = () => {
  const { disableActions, onClickSave } = useRatingContext();

  return (
    <div className="flex items-center justify-center pt-4 w-full gap-8">
      <Button
        variant="primary"
        className="px-8"
        isDisabled={disableActions}
        onClick={onClickSave}
      >
        Save
      </Button>

      <Button
        variant="outline"
        className="px-8 bg-darker-gray"
        isDisabled={disableActions}
      >
        Delete
      </Button>
    </div>
  );
};

export default RatingActions;
