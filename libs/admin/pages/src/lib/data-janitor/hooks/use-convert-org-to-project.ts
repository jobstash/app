import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { mwFetch } from '@jobstash/shared/data';

import { orgImportItemsAtom } from '../core/atoms';

const convertOrgToProject = async (orgId: string) => {
  const url = `${MW_URL}/organizations/transform-to-project/${orgId}`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `convertOrgToProject`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<MessageResponse>(url, options);

  if (!response.success) throw new Error(response.message);

  return response;
};

export const useConvertOrgToProject = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const [orgImportItems, setOrgImportItems] = useAtom(orgImportItemsAtom);

  return useMutation({
    mutationFn: (orgId: string) => convertOrgToProject(orgId),
    onSuccess({ message }, orgId) {
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

      notifSuccess({
        title: 'Convert Org to Project',
        message,
        autoClose: 10_000,
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
