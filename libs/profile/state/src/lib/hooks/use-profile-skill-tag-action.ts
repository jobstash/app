import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Tag, UserSkill } from '@jobstash/shared/core';
import {
  normalizeString,
  notifError,
  notifLoading,
  notifSuccess,
} from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { postProfileSkills } from '@jobstash/profile/data';

interface MutationPayload {
  userSkills: UserSkill[];
  tag: Tag;
  isDelete: boolean;
}

const TOAST_ID = 'profile-skill-tag-action';

export const useProfileSkillTagAction = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const { isPending, mutate } = useMutation({
    mutationFn({ userSkills, tag, isDelete }: MutationPayload) {
      const skills = isDelete
        ? userSkills.filter(
            (s) => normalizeString(s.name) !== normalizeString(tag.name),
          )
        : [...userSkills, { ...tag, canTeach: false }];

      return postProfileSkills({ skills });
    },
    onMutate({ isDelete }) {
      notifications.hide(TOAST_ID);
      notifLoading({
        id: TOAST_ID,
        title: `${isDelete ? 'Removing' : 'Adding'} tag to profile`,
        message: 'Please wait while we update your profile',
      });
    },
    async onSuccess(_data, { isDelete, tag: { name } }) {
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'profile-skills'],
      });
      notifSuccess({
        id: TOAST_ID,
        title: 'Update Profile',
        message: `"${name}" has been ${
          isDelete ? 'removed' : 'added'
        } to your profile`,
      });
    },
    onError(error) {
      notifError({
        id: TOAST_ID,
        title: 'Update Failed!',
        message: (error as Error).message,
      });
    },
  });

  return { isPending, mutate };
};
