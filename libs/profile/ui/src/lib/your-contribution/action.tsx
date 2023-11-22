import { useYourContributionContext } from '@jobstash/profile/state';

import CardActionButton from '../card-action-button';

const Action = () => {
  const { disableSave, onSave } = useYourContributionContext();

  return <CardActionButton isDisabled={disableSave} onClick={onSave} />;
};

export default Action;
