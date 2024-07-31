import { useRouter } from 'next/router';
import { useState } from 'react';

import { useDisclosure } from '@mantine/hooks';

import { useAuthContext } from '@jobstash/auth/state';

import { useProfileDeleteMutation } from './use-profile-delete-mutation';

export const useAccountCard = () => {
  const { logout } = useAuthContext();
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const [startDelete, setStartDelete] = useState(false);

  const onSuccessCb = async () => {
    close();
    await logout();
    await router.push('/jobs');
  };

  const { mutate } = useProfileDeleteMutation(() => onSuccessCb());

  const onClickDelete = () => {
    setStartDelete(true);
    mutate();
  };

  return {
    opened,
    open,
    close,
    startDelete,
    onClickDelete,
  };
};
