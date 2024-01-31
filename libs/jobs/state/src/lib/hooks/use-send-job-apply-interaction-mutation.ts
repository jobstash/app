import { useMutation } from '@tanstack/react-query';

import { sendJobApplyInteraction } from '@jobstash/jobs/data';

export const useSendJobApplyInteractionMutation = () => {
  const { mutate } = useMutation({
    mutationFn: (shortUUID: string) => sendJobApplyInteraction(shortUUID),
  });

  return { mutate };
};
