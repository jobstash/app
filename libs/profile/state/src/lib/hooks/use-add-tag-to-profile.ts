import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Tag } from '@jobstash/shared/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { postProfileSkills } from '@jobstash/profile/data';

const TOAST_ID = 'add-tag-to-profile';

export const useAddTagToProfile = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const { isPending, mutate } = useMutation({
    mutationFn: (tag: Tag) =>
      postProfileSkills({ skills: [{ ...tag, canTeach: false }] }),
    onMutate() {
      notifications.hide(TOAST_ID);
      notifLoading({
        id: TOAST_ID,
        title: 'Adding tag to profile',
        message: 'Please wait while we update your profile',
      });
    },
    onSuccess(_data, vars) {
      notifSuccess({
        id: TOAST_ID,
        title: 'Update Profile',
        message: `"${vars.name}" has been added to your profile`,
      });
    },
    onError(error) {
      notifError({
        id: TOAST_ID,
        title: 'Update Failed!',
        message: (error as Error).message,
      });
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'profile-skills'],
      });
    },
  });

  return { isPending, mutate };
};
