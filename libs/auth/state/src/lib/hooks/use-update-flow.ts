import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type CheckWalletFlow } from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';
import { sentryMessage } from '@jobstash/shared/utils';

import { useNProgress } from '@jobstash/shared/state';

import { useAuthContext } from './use-auth-context';

export const useUpdateFlow = (successRoute?: string) => {
  const { startNProgress, stopNProgress } = useNProgress();

  const { push } = useRouter();
  const queryClient = useQueryClient();

  const { refetch } = useAuthContext();
  const { isLoading, mutate, mutateAsync } = useMutation({
    mutationFn: (flow: CheckWalletFlow) =>
      fetch(`${MW_URL}/siwe/update-flow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ flow }),
        mode: 'cors',
        credentials: 'include',
      }).then((res) => res.json()),
    onMutate() {
      startNProgress();
    },
    onSuccess(data) {
      const {
        data: { role, flow },
      } = data;

      queryClient.setQueryData(['check-wallet'], {
        success: true,
        message: 'Wallet checked successfully',
        data: { role, flow },
      });
      refetch();

      if (successRoute) {
        push(successRoute);
      }
    },
    onError(error) {
      sentryMessage(`updateFlow`, JSON.stringify(error));
      // TODO: Notification ?
    },
    onSettled() {
      queryClient.invalidateQueries(['check-wallet']);
      stopNProgress();
    },
  });

  return { isLoading, mutate, mutateAsync };
};
