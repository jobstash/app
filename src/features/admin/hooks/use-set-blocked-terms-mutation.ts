import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

export const useSetBlockedTermsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      technologyNameList,
      creatorWallet,
    }: {
      technologyNameList: string[];
      creatorWallet: string;
    }) => {
      const url = `${NEXT_PUBLIC_MW_URL}/technologies/set-blocked-terms`;
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

      queryClient.invalidateQueries({
        queryKey: ['godmode-technologies'],
      });
      queryClient.invalidateQueries({
        queryKey: ['godmode-blocked-technologies'],
      });

      return data;
    },
  });
};
