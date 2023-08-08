import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import NProgress from 'nprogress';

import { type CheckWalletFlow } from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';
import { sentryMessage } from '@jobstash/shared/utils';

import { useAuthContext } from './use-auth-context';

export const useUpdateFlow = (successRoute: string) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const { refetch } = useAuthContext();
  const { isLoading, mutate } = useMutation({
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
      NProgress.start();
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

      push(successRoute);
    },
    onError(error) {
      sentryMessage(`updateFlow`, JSON.stringify(error));
      // TODO: Notification ?
    },
    onSettled() {
      NProgress.done();
    },
  });

  return { isLoading, mutate };
};
