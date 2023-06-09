import { toast } from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type SiweVerifyPayload } from '@jobstash/auth/core';

import { postSiweVerify } from '@jobstash/auth/data';

export const useSiweVerify = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: (payload: SiweVerifyPayload) => postSiweVerify(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['siwe-nonce'] });
      queryClient.invalidateQueries({ queryKey: ['siwe-session'] });
      queryClient.invalidateQueries({ queryKey: ['siwe-message'] });
      toast.success('Ethereum Sign-In Successful');
    },
  });

  return {
    siweVerify: mutate,
    siweVerifyError: error,
    siweVerifyIsLoading: isLoading,
  };
};
