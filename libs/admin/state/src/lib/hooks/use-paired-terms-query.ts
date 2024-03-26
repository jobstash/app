import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { useAllTags } from '@jobstash/shared/state';
import { getPairedTerms } from '@jobstash/admin/data';

export const usePairedTermsQuery = () => {
  const { isSuccess: enabled } = useAllTags();

  const mwVersion = getLSMwVersion();

  const { isLoading, data } = useQuery({
    queryKey: [mwVersion, 'godmodePairedTerms'],
    queryFn: async () => getPairedTerms(),
    enabled,
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    data,
  };
};
