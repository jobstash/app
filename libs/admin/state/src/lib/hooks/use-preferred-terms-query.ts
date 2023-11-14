import { useQuery } from '@tanstack/react-query';

import { getPreferredTerms } from '@jobstash/admin/data';

export const usePreferredTermsQuery = () => {
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ['preferredTerms'],
    queryFn: async () => getPreferredTerms(),
  });

  return {
    isLoading,
    data,
    isFetching,
  };
};
