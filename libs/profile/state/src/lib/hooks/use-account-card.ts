import { useRouter } from 'next/router';
import { useState } from 'react';

import { useDisclosure } from '@mantine/hooks';
import { useDisconnect } from 'wagmi';

import { useProfileDeleteMutation } from './use-profile-delete-mutation';

export const useAccountCard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const [startDelete, setStartDelete] = useState(false);
  const { disconnect } = useDisconnect();

  const onSuccessCb = () => {
    disconnect();
    close();
    router.push('/');
  };

  const { mutate } = useProfileDeleteMutation(() => onSuccessCb());

  const onClickDelete = () => {
    setStartDelete(true);
    mutate();
  };

  return {
    opened,
    open,
    startDelete,
    onClickDelete,
  };
};
