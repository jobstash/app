import { useMutation } from '@tanstack/react-query';

import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

export const useUnsetBlockedTermsMutation = () =>
  useMutation({
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
  });
