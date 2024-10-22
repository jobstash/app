import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { updateProjectRel } from '@jobstash/admin/data';

export const useUpdateProjectRel = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: ({
      op,
      orgId,
      projectId,
    }: {
      op?: 'add' | 'remove';
      orgId: string;
      projectId: string;
    }) => updateProjectRel({ op, orgId, projectId }),
    onSuccess({ message }, { orgId, projectId }) {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'get-managed-org', orgId],
      });
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-orgs'],
      });
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-projects'],
      });
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'org-details', orgId, undefined],
      });
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'project-details', projectId, undefined],
      });

      notifSuccess({
        title: 'Updated Project Relationship',
        message,
      });
    },
    onError({ message }) {
      notifError({
        title: 'Failed!',
        message,
      });
    },
  });
};
