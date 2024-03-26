import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getAllTags } from '@jobstash/shared/data';

export const useAllTags = () => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'all-technologies'],
    queryFn: () => getAllTags(),
  });
};
