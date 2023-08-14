import { useProfileHeaderContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const ProfileHeaderSaveButton = () => {
  const { disableSave, saveProfileInfo } = useProfileHeaderContext();

  return (
    <Button
      isDisabled={disableSave}
      variant="primary"
      size="lg"
      textProps={{ size: 'md' }}
      className="px-10"
      onClick={saveProfileInfo}
    >
      Save
    </Button>
  );
};

export default ProfileHeaderSaveButton;
