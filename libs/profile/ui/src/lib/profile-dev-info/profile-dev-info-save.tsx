import { motion } from 'framer-motion';

import {
  type ProfileShowcase,
  type ProfileSkill,
} from '@jobstash/profile/core';

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
    JSON.stringify(skills.sort(sortSkill)) ===
    JSON.stringify(fetchedSkills.sort(sortSkill));

  const isEqualFetchedShowcase =
    JSON.stringify(
      showcases.map(({ label, url }) => ({ label, url })).sort(sortShowcase),
    ) ===
    JSON.stringify(
      fetchedShowcases
        .map(({ label, url }) => ({ label, url }))
        .sort(sortShowcase),
    );

  const similarPayload = isEqualFetchedSkills && isEqualFetchedShowcase;

  const disableSave = isLoadingMutation || similarPayload;

  const onClick = async () => {
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
    <motion.div layout>
      <div className="pb-12 flex justify-center">
        <Button variant="primary" isDisabled={disableSave} onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfileDevInfoSave;

const sortSkill = (a: ProfileSkill, b: ProfileSkill) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;

  return 0;
};

type SortedShowcase = Omit<ProfileShowcase, 'id'>;
const sortShowcase = (a: SortedShowcase, b: SortedShowcase) => {
  if (a.label < b.label) return -1;
  if (a.label > b.label) return 1;

  return 0;
};
