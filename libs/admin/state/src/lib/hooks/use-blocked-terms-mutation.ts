import { useMutation } from '@tanstack/react-query';

import { type BlockedTermsPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postSetBlockedTerms } from '@jobstash/admin/data';

export const useBlockedTermsMutation = (successCb: () => void) => {
  const {
    isLoading: isLoadingSetBlockedTerms,
    mutateAsync: mutateAsyncSetBlockedTerms,
  } = useMutation({
    mutationFn: ({ tagNameList }: BlockedTermsPayload) =>
      postSetBlockedTerms({ tagNameList }),
    onSuccess(_, { tagNameList }) {
      const title = `New Blocked Term${tagNameList.length > 1 ? 's' : ''}`;

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
        title: 'Block Term Failed',
        message: (data as Error).message,
      });
    },
  });

  return { isLoadingSetBlockedTerms, mutateAsyncSetBlockedTerms };
};
