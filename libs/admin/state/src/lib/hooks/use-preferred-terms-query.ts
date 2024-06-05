import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getPreferredTerms } from '@jobstash/admin/data';

export const usePreferredTermsQuery = () => {
  const { mwVersion } = useMwVersionContext();

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
