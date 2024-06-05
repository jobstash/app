import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { type ProfileShowcasePayload } from '@jobstash/profile/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { postProfileShowcase } from '@jobstash/profile/data';

const TOAST_ID = 'showcase-mutation';

export const useProfileShowcaseMutation = (onSuccessCb: () => void) => {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: (payload: ProfileShowcasePayload) =>
      postProfileShowcase(payload),

    onMutate() {
      notifications.hide(TOAST_ID);
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Showcase',
        message: 'Please wait while we update your showcase',
      });
    },
    onSuccess({ message }, vars) {
      notifSuccess({
        id: TOAST_ID,
        title: 'Showcase Updated',
        message,
      });

      queryClient.setQueryData(
        [mwVersion, 'profile-showcase', address],
        vars.showcase,
      );
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'profile-showcase', address],
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
