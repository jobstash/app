import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { deleteProject } from '@jobstash/admin/data';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess({ message }, id) {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-projects'],
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'project-details', id, undefined],
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'project-item', id],
      });

      notifSuccess({
        title: 'Project Deleted',
        message,
      });
    },
    onError({ message }) {
      notifError({
        title: 'Delete Project Failed!',
        message,
      });
    },
  });
};
