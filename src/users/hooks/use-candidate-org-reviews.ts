import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { QUERY_STALETIME } from '~/shared/core/constants';

import { getCandidateOrgReviews } from '../api/get-candidate-org-reviews';
import { userQueryKeys } from '../core/query-keys';

export const useCandidateOrgReviews = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: userQueryKeys.orgReviews(address),
    queryFn: () => getCandidateOrgReviews(),
    enabled: !!address,
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
