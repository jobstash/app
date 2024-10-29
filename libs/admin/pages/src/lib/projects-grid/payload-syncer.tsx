import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { GRID_UNDO_EVENT } from '@jobstash/admin/core';

import {
  projectsGridEditRowPayloadAtom,
  useUpdateProject,
} from '@jobstash/admin/state';

export const ProjectsGridPayloadSyncer = () => {
  const [atomValue, setAtomValue] = useAtom(projectsGridEditRowPayloadAtom);

  const { mutate } = useUpdateProject(atomValue?.id ?? '');

  useEffect(() => {
    if (atomValue) {
      mutate(atomValue.payload, {
        onError() {
          // Revert cell content if mutation fails
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent(GRID_UNDO_EVENT.PROJECTS));
          }
        },
        onSettled() {
          // Reset atom for future use
          setAtomValue(null);
        },
      });
    }
  }, [atomValue, mutate, setAtomValue]);

  return null;
};
