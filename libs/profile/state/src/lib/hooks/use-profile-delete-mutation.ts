import { useMutation } from '@tanstack/react-query';

import { postDeleteProfile } from '@jobstash/profile/data';

export const useProfileDeleteMutation = (onSuccessCb: () => void) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: () => postDeleteProfile(),
    onSuccess() {
      onSuccessCb();
    },
  });

  return { isLoading, mutate };
};
