import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { v4 } from 'uuid';

import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { importProject } from '@jobstash/admin/data';

import { projectImportItemsAtom } from '../core/atoms';
import { ImportItem } from '../core/types';
interface Payload {
  url: string;
  name: string;
  orgId?: string;
  defiLlamaSlug?: string;
}

export const useProjectImport = (shouldPersist = true) => {
  const setImportItems = useSetAtom(projectImportItemsAtom);

  return useMutation({
    mutationFn: (payload: Payload) => importProject(payload),
    onSuccess(_, { name, url }) {
      if (shouldPersist) {
        setImportItems((prev: ImportItem[]) => {
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
        message: 'Project has been queued for import',
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
