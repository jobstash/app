import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getATSClient } from '@jobstash/profile/data';

export const useATSClient = () => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'get-ats-client'],
    queryFn: async () => getATSClient(),
    staleTime: 1000 * 60 * 60,
  });
};
