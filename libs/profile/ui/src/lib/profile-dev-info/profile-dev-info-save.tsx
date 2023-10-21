import { useProfileDevInfoContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const ProfileDevInfoSave = () => {
  const {
    isLoading,
    skills,
    showcases,
    fetchedSkills,
    fetchedShowcases,
    mutateAsyncSkills,
    mutateAsyncShowcase,
  } = useProfileDevInfoContext();

  const isLoadingMutation =
    isLoading.skillsMutation || isLoading.showcaseMutation;

  const buttonText = isLoadingMutation ? 'Loading' : 'Save Details';

  const similarPayload =
    JSON.stringify({ skills, showcases }) ===
    JSON.stringify({ skills: fetchedSkills, showcases: fetchedShowcases });

  const disableSave = isLoadingMutation || similarPayload;

  const onClick = async () => {
    await Promise.all([
      ...(skills.length > 0 ? [mutateAsyncSkills({ skills })] : []),
      ...(showcases.length > 0
        ? [mutateAsyncShowcase({ showcase: showcases })]
        : []),
    ]);
  };

  return (
    <div className="pb-12 flex justify-center">
      <Button variant="primary" isDisabled={disableSave} onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default ProfileDevInfoSave;
