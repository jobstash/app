import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { useAllTags } from '@jobstash/shared/state';
import { getBlockedTags } from '@jobstash/admin/data';

export const useBlockedTagsQuery = () => {
  const { isSuccess: enabled } = useAllTags();

  const mwVersion = getLSMwVersion();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: [mwVersion, 'godmodeBlockedTags'],
    queryFn: async () => getBlockedTags(),
    enabled,
  });

  return {
    isLoading,
    isFetching,
    data,
  };
};
