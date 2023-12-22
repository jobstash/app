import { useSkillsUsedContext } from '@jobstash/profile/state';

import CardActionButton from '../card-action-button';

const Action = () => {
  const { onClickSave } = useSkillsUsedContext();

  return (
    <div className="pt-3">
      <CardActionButton isDisabled={false} onClick={onClickSave} />
    </div>
  );
};

export default Action;
