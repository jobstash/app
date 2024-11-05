import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { v4 } from 'uuid';

import { ImportItem } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { importOrg } from '@jobstash/admin/data';

import { orgImportItemsAtom } from '../atoms/data-janitor-atoms';

interface Payload {
  name: string;
  url: string;
}

export const useOrgImport = (shouldPersist = true) => {
  const setOrgImportItems = useSetAtom(orgImportItemsAtom);

  return useMutation({
    mutationFn: (payload: Payload) => importOrg(payload),
    onSuccess(_data, { name, url }) {
      // Allow duplicate urls
      if (shouldPersist) {
        setOrgImportItems((prev: ImportItem[]) => {
          const updateditems = [...prev];
          updateditems.push({
            id: v4(),
            name,
            url,
            status: 'pending',
            ts: Date.now(),
          });
          return updateditems;
        });
      }

      notifSuccess({
        title: 'Success!',
        message: 'Organization has been queued for import',
        autoClose: 10_000,
      });
    },
    onError({ message }) {
      notifError({
        title: 'Import Failed!',
        message,
        autoClose: 10_000,
      });
    },
  });
};
