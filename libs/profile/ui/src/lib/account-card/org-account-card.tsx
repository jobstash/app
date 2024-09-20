/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { usePrivy } from '@privy-io/react-auth';

import { getAvatarSrc } from '@jobstash/shared/utils';

import {
  useAccountCard,
  useOrgProfileInfoContext,
} from '@jobstash/profile/state';

import AccountCardDeleteButton from './account-card-delete-button';
import AccountCardModal from './account-card-modal';
import AccountCardTitle from './account-card-title';
import AccountCardWrapper from './account-card-wrapper';
import ConnectedAccount from './connected-account';

export const OrgAccountCard = () => {
  const { opened, open, startDelete, onClickDelete } = useAccountCard();

  const { user } = usePrivy();
  const { profileInfoData } = useOrgProfileInfoContext();

  if (!user) return null;
  if (user.linkedAccounts.length < 2) return null;
  if (!profileInfoData) return null;

  const { email } = profileInfoData;

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

          {email.length > 0 && (
            <ConnectedAccount
              label="Connected Email Account:"
              avatar={getAvatarSrc(email[0].email)!}
              text={email[0].email}
            />
          )}
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
