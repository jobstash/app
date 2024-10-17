import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { useMwVersionContext } from '@jobstash/shared/state';
import { deleteOrg } from '@jobstash/admin/data';

import { orgImportItemsAtom } from '../core/atoms';

export const useDeleteOrg = (orgId: string) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const [orgImportItems, setOrgImportItems] = useAtom(orgImportItemsAtom);

  return useMutation({
    mutationFn: () => deleteOrg(orgId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-orgs'],
      });

      // Remove the org from the import items list
      const updatedItems = orgImportItems.filter(
        (orgImportItem) => orgId !== orgImportItem.id,
      );
      setOrgImportItems(updatedItems);
    },
  });
};
