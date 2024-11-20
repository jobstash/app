import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getJobFolder } from '@jobstash/jobs/data';

export const useJobFolder = (slug: string) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'job-folders', slug],
    queryFn: () => getJobFolder(slug),
    staleTime: 1000 * 60 * 60, // 1hr
  });
};
