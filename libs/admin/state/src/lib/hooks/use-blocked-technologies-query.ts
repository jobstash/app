import { useQuery } from '@tanstack/react-query';

import { useAllTechnologies } from '@jobstash/shared/state';
import { getBlockedTechnologies } from '@jobstash/admin/data';

export const useBlockedTechnologiesQuery = () => {
  const { isSuccess: enabled } = useAllTechnologies();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['godmodeBlockedTechnologies'],
    queryFn: async () => getBlockedTechnologies(),
    enabled,
  });

  return {
    isLoading,
    isFetching,
    data,
  };
};
