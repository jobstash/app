import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getSavedJobs } from '@jobstash/jobs/data';

export const useSavedJobs = () => {
  const { isAuthenticated } = useAuthContext();
  const { mwVersion } = useMwVersionContext();

  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [mwVersion, 'saved-jobs', isAuthenticated],
    queryFn: () => getSavedJobs(isAuthenticated),
    staleTime: 1000 * 60 * 60,
  });

  return { isLoading, isError, data, isFetching };
};
