import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { deleteOrg } from '@jobstash/admin/data';

import { orgImportItemsAtom } from '../atoms/data-janitor-atoms';

export const useDeleteOrg = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const [orgImportItems, setOrgImportItems] = useAtom(orgImportItemsAtom);

  return useMutation({
    mutationFn: (orgId: string) => deleteOrg(orgId),
    onSuccess({ message }, orgId) {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-orgs'],
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'org-details', orgId, undefined],
      });

      // Remove the org from the import items list
      const updatedItems = orgImportItems.filter(
        (orgImportItem) => orgId !== orgImportItem.id,
      );
      setOrgImportItems(updatedItems);

      notifSuccess({
        title: 'Organization Deleted',
        message,
      });
    },
    onError({ message }) {
      notifError({
        title: 'Delete Organization Failed!',
        message,
      });
    },
  });
};
