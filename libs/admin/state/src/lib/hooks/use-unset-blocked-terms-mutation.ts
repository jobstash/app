import { useMutation } from '@tanstack/react-query';

import { BlockedTermsPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postUnsetBlockedTerms } from '@jobstash/admin/data';

export const useUnsetBlockedTermsMutation = (successCb: () => void) => {
  const {
    isPending: isLoadingUnsetBlockedTerms,
    mutateAsync: mutateAsyncUnsetBlockedTerms,
  } = useMutation({
    mutationFn: ({ tagNameList }: BlockedTermsPayload) =>
      postUnsetBlockedTerms({ tagNameList }),
    onSuccess(_, { tagNameList }) {
      const title = `New Unblocked Term${tagNameList.length > 1 ? 's' : ''}`;

      const message = `${tagNameList.join(', ')}`;

      notifSuccess({
        title,
        message,
        autoClose: 10_000,
      });

      successCb();
    },
    onError(data) {
      notifError({
        title: 'Unblock Term Failed',
        message: (data as Error).message,
      });
    },
  });

  return { isLoadingUnsetBlockedTerms, mutateAsyncUnsetBlockedTerms };
};
