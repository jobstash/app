import { useMutation } from '@tanstack/react-query';

import { deleteOrg } from '@jobstash/admin/data';

export const useDeleteOrg = (orgId: string) =>
  useMutation({
    mutationFn: () => deleteOrg(orgId),
  });
