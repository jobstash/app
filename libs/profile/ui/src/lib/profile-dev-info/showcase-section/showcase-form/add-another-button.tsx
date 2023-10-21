import {
  useProfileDevInfoContext,
  useProfileShowcaseFormContext,
} from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const AddAnotherButton = () => {
  const { showcases } = useProfileDevInfoContext();
  const { onClickAddAnother } = useProfileShowcaseFormContext();

  const buttonText = `Add ${showcases.length > 0 ? 'Another' : 'Showcase'}`;

  return (
    <Button variant="outline" size="sm" onClick={onClickAddAnother}>
      {buttonText}
    </Button>
  );
};

export default AddAnotherButton;
