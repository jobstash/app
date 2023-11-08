import { useQuery } from '@tanstack/react-query';

import { getPreferredTerms } from '@jobstash/admin/data';

export const usePreferredTermsQuery = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['preferredTerms'],
    queryFn: async () => getPreferredTerms(),
  });

  return {
    isLoading,
    data,
  };
};
