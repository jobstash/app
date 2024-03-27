import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type CheckWalletFlow } from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';
import { getLSMwVersion, sentryMessage } from '@jobstash/shared/utils';

import { useAuthContext } from './use-auth-context';

export const useUpdateFlow = (successRoute?: string) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const mwVersion = getLSMwVersion();

  const { refetch } = useAuthContext();
  const {
    isPending: isLoading,
    mutate,
    mutateAsync,
  } = useMutation({
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
    onSuccess(data) {
      const {
        data: { role, flow },
      } = data;

      queryClient.setQueryData([mwVersion, 'check-wallet'], {
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
      queryClient.invalidateQueries({ queryKey: [mwVersion, 'check-wallet'] });
    },
  });

  return { isLoading, mutate, mutateAsync };
};
