import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import { OrgUpdatePayload } from '@jobstash/admin/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { updateOrg } from './update-org';

export const useUpdateOrg = () =>
  // CHECK: Invalidate allOrgs fetch? Check table rerender behavior

  useMutation({
    mutationFn: ({
      orgId,
      payload,
    }: {
      orgId: string;
      payload: OrgUpdatePayload;
    }) => updateOrg(orgId, payload),

    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Organization',
        message: 'Please wait ...',
      });
      throw new Error('pakyu');
    },
    onSuccess({ message }) {
      notifSuccess({
        id: TOAST_ID,
        title: 'Org Update Successful!',
        message,
        autoClose: 10_000,
      });
    },
    onError(data) {
      notifError({
        id: TOAST_ID,
        title: 'Org Update Failed!',
        message: (data as Error).message,
      });
    },
  });

const TOAST_ID = 'org-list-mutation';
