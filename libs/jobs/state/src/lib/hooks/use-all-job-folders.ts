import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getAllJobFolders } from '@jobstash/jobs/data';

export const useAllJobFolders = () => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'job-folders'],
    queryFn: () => getAllJobFolders(),
    staleTime: 1000 * 60 * 60, // 1hr
  });
};
