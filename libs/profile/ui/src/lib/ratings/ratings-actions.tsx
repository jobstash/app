import { useRatingContext } from '@jobstash/profile/state';

import CardActionButton from '../card-action-button';

const RatingActions = () => {
  const { disableActions, onClickSave } = useRatingContext();

  return <CardActionButton isDisabled={disableActions} onClick={onClickSave} />;
};

export default RatingActions;
