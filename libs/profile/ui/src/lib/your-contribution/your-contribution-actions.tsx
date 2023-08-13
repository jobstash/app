import { useYourContributionContext } from '@jobstash/profile/state';

import CardActionButton from '../card-action-button';

const YourContributionActions = () => {
  const { disableSave, onSave } = useYourContributionContext();

  return <CardActionButton isDisabled={disableSave} onClick={onSave} />;
};

export default YourContributionActions;
