import { useMutation } from '@tanstack/react-query';

import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

export const useBlockedTermMutation = () => {
  console.log('');

  return useMutation({
    mutationFn: async (technologyName: string) => {
      const res = await fetch(
        `${NEXT_PUBLIC_MW_URL}/technologies/set-blocked-term`,
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
        },
      );

      const data = await res.json();
      console.log('res.ok =', res.ok, 'data =', data);
    },
  });
};
