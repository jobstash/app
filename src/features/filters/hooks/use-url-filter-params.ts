import { useRouter } from 'next/router';

import { getFilterFromQuery } from '../utils/get-filter-from-query';

export const useUrlFilterParams = () => {
  const { query, push } = useRouter();
  return { ...getFilterFromQuery(query), push };
};
