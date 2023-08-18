import { useState } from 'react';

import { useProfileInfoContext } from '../contexts/profile-info-context';
import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

import { useYourContributionMutation } from './use-your-contribution-mutation';

export const useYourContribution = () => {
  const { profileInfoData } = useProfileInfoContext();
  const username = profileInfoData?.username ?? '';
  const avatar = profileInfoData?.avatar ?? '';

  const { activeProfileRepo, profileRepo } = useProfileRepoPageContext();

  const [contribution, setContribution] = useState(
    activeProfileRepo?.contribution.summary ?? '',
  );

  const { isLoading, mutate } = useYourContributionMutation();

  const onSave = () => {
    if (activeProfileRepo) {
      mutate({
        id: activeProfileRepo.id,
        contribution,
      });
    }
  };

  const disableSave = contribution === activeProfileRepo?.contribution.summary;

  return {
    contribution,
    setContribution,
    isLoading,
    onSave,
    disableSave,
    profileRepo,
    username,
    avatar,
  };
};
