import { useProfileShowcaseFormContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const AddAnotherButton = () => {
  const { onClickAddAnother } = useProfileShowcaseFormContext();

  return (
    <Button variant="outline" size="sm" onClick={onClickAddAnother}>
      Add Another
    </Button>
  );
};

export default AddAnotherButton;
