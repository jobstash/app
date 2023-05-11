import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

export const useUnsetBlockedTermsMutation = (
  successCb: (payload: string[]) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; data: boolean },
    { message: string },
    { technologyNameList: string[]; creatorWallet: string },
    undefined
  >({
    mutationFn: async ({
      technologyNameList,
      creatorWallet,
    }: {
      technologyNameList: string[];
      creatorWallet: string;
    }) => {
      const url = `${NEXT_PUBLIC_MW_URL}/technologies/unset-blocked-terms`;
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ technologyNameList, creatorWallet }),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      return data;
    },

    onSuccess(_, { technologyNameList }) {
      queryClient.invalidateQueries({
        queryKey: ['godmode-technologies'],
      });
      queryClient.invalidateQueries({
        queryKey: ['godmode-blocked-technologies'],
      });
      successCb(technologyNameList);
    },
  });
};
