import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserShowcasePayload } from '@jobstash/shared/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { postProfileShowcase } from '@jobstash/profile/data';

const TOAST_ID = 'showcase-mutation';

export const useProfileShowcaseMutation = (onSuccessCb: () => void) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: (payload: UserShowcasePayload) => postProfileShowcase(payload),

    onMutate() {
      notifications.hide(TOAST_ID);
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Showcase',
        message: 'Please wait while we update your showcase',
      });
    },
    async onSuccess({ message }, vars) {
      notifSuccess({
        id: TOAST_ID,
        title: 'Showcase Updated',
        message,
      });

      const queryKey = [mwVersion, 'profile-showcase'];
      await queryClient.invalidateQueries({
        queryKey,
      });

      onSuccessCb();
    },
    onError(error) {
      notifError({
        id: TOAST_ID,
        title: 'Showcase Failed!',
        message: (error as Error).message,
      });
    },
  });

  return { isLoading, mutate };
};
