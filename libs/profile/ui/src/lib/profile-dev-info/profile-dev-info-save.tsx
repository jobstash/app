import { useProfileDevInfoContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const ProfileDevInfoSave = () => {
  const { isLoading, mutateSkills } = useProfileDevInfoContext();

  const isLoadingMutation =
    isLoading.skillsMutation || isLoading.showcaseMutation;
  const buttonText = isLoadingMutation ? 'Loading' : 'Save Details';

  return (
    <div className="pb-12">
      <Button variant="primary" isDisabled={isLoadingMutation}>
        {buttonText}
      </Button>
    </div>
  );
};

export default ProfileDevInfoSave;
