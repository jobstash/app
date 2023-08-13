import { useTechsUsedContext } from '@jobstash/profile/state';

import CardActionButton from '../card-action-button';

const TechsUsedActions = () => {
  const { disableSave, onClickSave } = useTechsUsedContext();

  return <CardActionButton isDisabled={disableSave} onClick={onClickSave} />;
};

export default TechsUsedActions;
