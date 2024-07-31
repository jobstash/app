import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getDevProfileInfo } from '@jobstash/profile/data';

export const useDevProfileInfo = () => {
  const { mwVersion } = useMwVersionContext();

  const { isLoading, data: profileInfoData } = useQuery({
    queryKey: [mwVersion, 'dev-profile-info'],
    queryFn: () => getDevProfileInfo(),
    select: (data) => ({
      ...data,
      // Sort email w/ main on top
      email: data.email.toSorted((a, b) =>
        a.main === b.main ? 0 : a.main ? -1 : 1,
      ),
    }),
  });

  return {
    isLoading,
    profileInfoData,
  };
};
