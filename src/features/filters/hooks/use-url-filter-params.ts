import { useRouter } from 'next/router';

import { getFilterFromQuery } from '../utils';

export const useUrlFilterParams = () => {
  const { query, push } = useRouter();
  return { ...getFilterFromQuery(query), push };
};
