import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getPreferredTerms } from '@jobstash/admin/data';

export const usePreferredTermsQuery = () => {
  const mwVersion = getLSMwVersion();

  const { isLoading, data, isFetching } = useQuery({
    queryKey: [mwVersion, 'preferredTerms'],
    queryFn: async () => getPreferredTerms(),
  });

  return {
    isLoading,
    data,
    isFetching,
  };
};
