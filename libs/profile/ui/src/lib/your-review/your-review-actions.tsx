import { useYourReviewContext } from '@jobstash/profile/state';

import CardActionButton from '../card-action-button';

const YourReviewActions = () => {
  const { disableSave, onClickSave } = useYourReviewContext();

  return <CardActionButton isDisabled={disableSave} onClick={onClickSave} />;
};

export default YourReviewActions;
