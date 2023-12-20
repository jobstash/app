import { useProfileHeaderContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const ProfileHeaderSaveButton = () => {
  const { disableSave, saveProfileInfo } = useProfileHeaderContext();

  return (
    <div className="flex flex-col gap-2">
      <div className="h-5" />
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
    </div>
  );
};

export default ProfileHeaderSaveButton;
