import { toast } from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getSiweLogout } from '@jobstash/auth/data';

export const useSiweLogout = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: () => getSiweLogout(),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['siwe-nonce'] });
      queryClient.invalidateQueries({ queryKey: ['siwe-session'] });
      queryClient.invalidateQueries({ queryKey: ['siwe-message'] });
      toast.success('Wallet has been disconnected');
    },
  });

  return {
    siweLogout: mutate,
    siweLogoutError: error,
    siweLogoutIsLoading: isLoading,
  };
};
