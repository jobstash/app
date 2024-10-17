import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { deleteOrg } from '@jobstash/admin/data';

export const useDeleteOrg = (orgId: string) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: () => deleteOrg(orgId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-orgs'],
      });
    },
  });
};
