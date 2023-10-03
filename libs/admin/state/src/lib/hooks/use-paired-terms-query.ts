import { useQuery } from '@tanstack/react-query';

import { useAllTags } from '@jobstash/shared/state';
import { getPairedTerms } from '@jobstash/admin/data';

export const usePairedTermsQuery = () => {
  const { isSuccess: enabled } = useAllTags();

  const { isLoading, data } = useQuery({
    queryKey: ['godmodePairedTerms'],
    queryFn: async () => getPairedTerms(),
    enabled,
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    data,
  };
};
