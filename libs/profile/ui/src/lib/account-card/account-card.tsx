import { useRouter } from 'next/router';
import { useState } from 'react';

import { useDisclosure } from '@mantine/hooks';
import { useDisconnect } from 'wagmi';

import { getEmailAvatar } from '@jobstash/profile/utils';

import {
  useDevProfileInfoContext,
  useProfileDeleteMutation,
} from '@jobstash/profile/state';

import AccountCardDeleteButton from './account-card-delete-button';
import AccountCardModal from './account-card-modal';
import AccountCardTitle from './account-card-title';
import AccountCardWrapper from './account-card-wrapper';
import ConnectEmailAccount from './connect-email-account';
import ConnectGithubAccount from './connect-github-account';
import ConnectedAccount from './connected-account';

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

  const { profileInfoData } = useDevProfileInfoContext();

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

        <div className="flex flex-col gap-6 py-4 text-center">
          <AccountCardTitle />

          {profileInfoData?.email && (
            <ConnectedAccount
              label="Connected Email Account:"
              avatar={getEmailAvatar(profileInfoData.email)}
              text={profileInfoData.email}
            />
          )}

          {profileInfoData?.username && profileInfoData?.avatar && (
            <ConnectedAccount
              label="Connected Github Account:"
              avatar={profileInfoData.avatar}
              text={profileInfoData.username}
            />
          )}
        </div>

        {profileInfoData && (
          <>
            {!profileInfoData.username && <ConnectGithubAccount />}
            {!profileInfoData.email && <ConnectEmailAccount />}
          </>
        )}

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
