import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useAccount } from 'wagmi';

import { ProfileSkillsPayload } from '@jobstash/profile/core';
import {
  getLSMwVersion,
  notifError,
  notifLoading,
  notifSuccess,
} from '@jobstash/shared/utils';

import { postProfileSkills } from '@jobstash/profile/data';

import { activeProfileRepoAtom } from '../atoms/active-profile-repo-atom';

const TOAST_ID = 'skills-mutation';

export const useProfileSkillsMutation = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const mwVersion = getLSMwVersion();

  const [activeRepo, setActiveRepo] = useAtom(activeProfileRepoAtom);

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: (payload: ProfileSkillsPayload) => postProfileSkills(payload),
    onMutate() {
      notifications.hide(TOAST_ID);
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Skills',
        message: 'Please wait while we update your skills',
      });
    },
    onSuccess({ message }, vars) {
      notifSuccess({
        id: TOAST_ID,
        title: 'Skills Updated!',
        message,
      });

      queryClient.setQueryData(['profile-skills', address], vars.skills);

      // Sync active profile repo skills
      // Active repo is only assigned on initial load or when selection changes
      // It's not synced during mutations
      let shouldUpdateSkills = false;
      const updatedRepoTags = activeRepo?.tags ?? [];
      for (const skillPayload of vars.skills) {
        for (const [i, activeSkill] of updatedRepoTags.entries()) {
          const isSameSkill = activeSkill.id === skillPayload.id;
          const isNotSynced = activeSkill.canTeach !== skillPayload.canTeach;
          if (isSameSkill && isNotSynced) {
            updatedRepoTags[i].canTeach = skillPayload.canTeach;
            shouldUpdateSkills = true;
          }
        }
      }

      if (shouldUpdateSkills && activeRepo) {
        setActiveRepo({ ...activeRepo, tags: updatedRepoTags });
      }
    },
    onError(error) {
      notifError({
        id: TOAST_ID,
        title: 'Skills Failed!',
        message: (error as Error).message,
      });
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'profile-skills', address],
      });
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'profile-repo-list'],
      });
    },
  });

  return { isLoading, mutate };
};
