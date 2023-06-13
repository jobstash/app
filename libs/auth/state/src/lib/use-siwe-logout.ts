import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getSiweLogout } from '@jobstash/auth/data';

export const useSiweLogout = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: () => getSiweLogout(),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['siwe-nonce'] });
      queryClient.invalidateQueries({ queryKey: ['siwe-session'] });
      queryClient.invalidateQueries({ queryKey: ['siwe-message'] });
    },
  });

  return {
    siweLogout: mutateAsync,
    siweLogoutError: error,
    siweLogoutIsLoading: isLoading,
  };
};
