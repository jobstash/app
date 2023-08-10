import { useTechsUsedContext } from '@jobstash/profile/state';

import CardActionButton from '../card-action-button';

const TechsUsedAction = () => {
  const { disableSave, onClickSave } = useTechsUsedContext();

  return <CardActionButton isDisabled={disableSave} onClick={onClickSave} />;
};

export default TechsUsedAction;
