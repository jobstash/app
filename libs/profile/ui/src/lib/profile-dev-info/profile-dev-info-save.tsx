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

  const isEqualFetchedSkills =
    JSON.stringify(skills.map((s) => s.name).sort()) ===
    JSON.stringify(fetchedSkills.map((s) => s.name).sort());
  const isEqualFetchedShowcase =
    JSON.stringify(showcases.map((s) => s.url).sort()) ===
    JSON.stringify(fetchedShowcases.map((s) => s.url).sort());

  const similarPayload = isEqualFetchedSkills && isEqualFetchedShowcase;

  const disableSave = isLoadingMutation || similarPayload;

  const onClick = async () => {
    console.log('onClick skills =', skills);
    await Promise.all([
      ...(isEqualFetchedSkills ? [] : [mutateAsyncSkills({ skills })]),
      ...(isEqualFetchedShowcase
        ? []
        : [
            mutateAsyncShowcase({
              showcase: showcases.map((s) => (({ id, ...o }) => o)(s)),
            }),
          ]),
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
