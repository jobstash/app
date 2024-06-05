import { useQuery } from '@tanstack/react-query';

import { useAllTags, useMwVersionContext } from '@jobstash/shared/state';
import { getBlockedTags } from '@jobstash/admin/data';

export const useBlockedTagsQuery = () => {
  const { mwVersion } = useMwVersionContext();
  const { isSuccess } = useAllTags();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: [mwVersion, 'godmodeBlockedTags'],
    queryFn: async () => getBlockedTags(),
    enabled: isSuccess,
  });

  return {
    isLoading,
    isFetching,
    data,
  };
};
