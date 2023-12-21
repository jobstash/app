import { useSkillsUsedContext } from '@jobstash/profile/state';

import CardActionButton from '../card-action-button';

const Action = () => {
  const { disableSave, onClickSave } = useSkillsUsedContext();

  return (
    <div className="pt-3">
      <CardActionButton isDisabled={disableSave} onClick={onClickSave} />
    </div>
  );
};

export default Action;
