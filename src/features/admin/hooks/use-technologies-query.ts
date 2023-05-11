import { useQuery } from '@tanstack/react-query';

import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

import { AdminTechnology } from '../core/types';

export const useTechnologiesQuery = () =>
  useQuery({
    queryKey: ['godmode-technologies', NEXT_PUBLIC_MW_URL],
    queryFn: async () => {
      const url = `${NEXT_PUBLIC_MW_URL}/technologies`;
      const res = await fetch(url, {
        credentials: 'include',
        mode: 'cors',
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      if (data.data.length > 0) {
        return data.data.map((d: AdminTechnology) => d.name) as string[];
      }

      return [];
    },
  });
