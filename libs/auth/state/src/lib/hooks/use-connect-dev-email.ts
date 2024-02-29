import { FormEventHandler } from 'react';

import { useSendMagicLink } from './use-send-magic-link';

export const useConnectDevEmail = () => {
  const {
    isSuccess,
    isPending: isLoading,
    isError,
    mutate,
  } = useSendMagicLink('dev');

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const destination = formData.get('destination');

    if (destination && typeof destination === 'string') {
      mutate(destination);
    }
  };

  return {
    isSuccess,
    isLoading,
    isError,
    onSubmit,
  };
};
