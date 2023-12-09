import { useRouter } from 'next/router';
import { useState } from 'react';

import { useDisclosure } from '@mantine/hooks';
import { useDisconnect } from 'wagmi';

import { useProfileDeleteMutation } from '@jobstash/profile/state';

import AccountCardConnectButton from './account-card-connect-button';
import AccountCardDeleteButton from './account-card-delete-button';
import AccountCardEmailButton from './account-card-email-button';
import AccountCardGithubButton from './account-card-github-button';
import AccountCardModal from './account-card-modal';
import AccountCardTitle from './account-card-title';
import AccountCardWrapper from './account-card-wrapper';

const AccountCard = () => {
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

  return (
    <>
      <AccountCardModal
        opened={opened}
        close={close}
        isLoading={startDelete}
        onClickDelete={onClickDelete}
      />
      <AccountCardWrapper>
        <hr className="border-t border-white/10" />

        <div className="flex flex-col gap-2 py-4 text-center">
          <AccountCardTitle />
          <AccountCardGithubButton />
          <AccountCardEmailButton />
        </div>

        <hr className="border-t border-white/10" />

        <div className="flex flex-col gap-4 py-4">
          <AccountCardConnectButton />
        </div>

        <hr className="border-t border-white/10" />

        <div className="flex flex-col gap-4 py-2">
          <AccountCardDeleteButton open={open} />
        </div>

        <hr className="border-t border-white/10" />
      </AccountCardWrapper>
    </>
  );
};

export default AccountCard;
