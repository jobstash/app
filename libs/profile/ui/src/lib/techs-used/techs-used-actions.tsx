import { useTechsUsedContext } from '@jobstash/profile/state';

import CardActionButton from '../card-action-button';

const TechsUsedActions = () => {
  const { disableSave, onClickSave } = useTechsUsedContext();

  return (
    <div className="pt-3">
      <CardActionButton isDisabled={disableSave} onClick={onClickSave} />
    </div>
  );
};

export default TechsUsedActions;
