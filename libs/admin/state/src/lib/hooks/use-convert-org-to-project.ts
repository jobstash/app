import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { convertOrgToProject } from '@jobstash/admin/data';

import { orgImportItemsAtom } from '../atoms/data-janitor-atoms';

export const useConvertOrgToProject = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const [orgImportItems, setOrgImportItems] = useAtom(orgImportItemsAtom);

  return useMutation({
    mutationFn: (orgId: string) => convertOrgToProject(orgId),
    onSuccess(_data, orgId) {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-orgs'],
      });
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'org-details', orgId, undefined],
      });
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-projects'],
      });

      // Remove the org from the import items list
      const updatedItems = orgImportItems.filter(
        (orgImportItem) => orgId !== orgImportItem.id,
      );
      setOrgImportItems(updatedItems);

      push('/godmode/projects/manage').then(() => {
        notifSuccess({
          title: 'Organizations Converted!',
          message: 'Search for the organization in the projects list.',
          autoClose: 10_000,
        });
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
