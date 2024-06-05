import { useQuery } from '@tanstack/react-query';

import { getAllTags } from '@jobstash/shared/data';

import { useMwVersionContext } from './use-mw-version-context';

export const useAllTags = () => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'all-technologies'],
    queryFn: () => getAllTags(),
  });
};
