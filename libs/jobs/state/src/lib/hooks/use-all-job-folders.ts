import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getAllJobFolders } from '@jobstash/jobs/data';

export const useAllJobFolders = () => {
  const { isAuthenticated } = useAuthContext();
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'job-folders'],
    queryFn: () => getAllJobFolders(),
    staleTime: 1000 * 60 * 60, // 1hr
    enabled: isAuthenticated,
    select: ({ message, success, data }) => ({
      message,
      success,
      data: data.sort((a, b) => b.jobs.length - a.jobs.length),
    }),
  });
};
