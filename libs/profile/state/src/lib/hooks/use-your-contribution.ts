import { useState } from 'react';

import { useDevProfileInfoContext } from '../contexts/dev-profile-info-context';
import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

import { useYourContributionMutation } from './use-your-contribution-mutation';

export const useYourContribution = () => {
  const { profileInfoData } = useDevProfileInfoContext();
  const username = profileInfoData?.username ?? '';
  const avatar = profileInfoData?.avatar ?? '';

  const { activeProfileRepo, profileRepo } = useProfileRepoPageContext();

  const [contribution, setContribution] = useState(
    activeProfileRepo?.contribution ?? '',
  );

  const { mutate } = useYourContributionMutation();

  const onSave = () => {
    if (activeProfileRepo) {
      mutate({
        id: activeProfileRepo.id,
        contribution,
      });
    }
  };

  const disableSave = contribution === activeProfileRepo?.contribution;

  return {
    contribution,
    setContribution,
    onSave,
    disableSave,
    profileRepo,
    username,
    avatar,
  };
};
