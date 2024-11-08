import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { useUpdateNote } from '@jobstash/profile/state';

import { noteUpdatePayloadAtom } from './atoms';

export const NoteUpdatePayloadSyncer = () => {
  const [payload, setPayload] = useAtom(noteUpdatePayloadAtom);
  const { mutate } = useUpdateNote();

  useEffect(() => {
    if (payload) {
      mutate(
        {
          wallet: payload.wallet,
          note: payload.note,
        },
        {
          onSettled() {
            // Reset atom for future use
            setPayload(null);
          },
        },
      );
    }
  }, [mutate, payload, setPayload]);

  return null;
};
