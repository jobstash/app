import { useQuery } from '@tanstack/react-query';

import { useAllTags } from '@jobstash/shared/state';
import { getBlockedTags } from '@jobstash/admin/data';

export const useBlockedTagsQuery = () => {
  const { isSuccess: enabled } = useAllTags();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['godmodeBlockedTags'],
    queryFn: async () => getBlockedTags(),
    enabled,
  });

  return {
    isLoading,
    isFetching,
    data,
  };
};
