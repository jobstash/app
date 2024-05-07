import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

const fakeMutate = async () => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 3000));
  //
  // throw new Error('pakyu');
};

export const useFakeMutation = () =>
  useMutation({
    mutationFn: () => fakeMutate(),
    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Organization',
        message: 'Please wait ...',
      });
    },
    onError() {
      notifError({
        id: TOAST_ID,
        title: 'Mutation Failed',
        message: 'Just kidding. dis fake.',
      });
    },
    onSuccess() {
      notifSuccess({
        id: TOAST_ID,
        title: 'Update org successful!',
        message: "That's weird. It should fail.",
      });
    },
  });

const TOAST_ID = 'org-list-mutation';
