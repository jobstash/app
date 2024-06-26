import { Tooltip } from '@nextui-org/tooltip';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const ProfileHeaderSaveButton = () => {
  const { disableSave, hasMissingFields, saveProfileInfo } =
    useProfileHeaderContext();

  return (
    <div className="flex flex-col gap-2 w-fit">
      <Tooltip content={hasMissingFields ? 'Some fields are empty' : ''}>
        <div>
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
      </Tooltip>
    </div>
  );
};

export default ProfileHeaderSaveButton;
