import { useQuery } from '@tanstack/react-query';

import { useAllTags, useMwVersionContext } from '@jobstash/shared/state';
import { getPairedTerms } from '@jobstash/admin/data';

export const usePairedTermsQuery = () => {
  const { isSuccess } = useAllTags();
  const { mwVersion } = useMwVersionContext();

  const { isLoading, data } = useQuery({
    queryKey: [mwVersion, 'godmodePairedTerms'],
    queryFn: async () => getPairedTerms(),
    enabled: isSuccess,
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    data,
  };
};
