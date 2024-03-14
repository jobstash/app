import { getEmailAvatar } from '@jobstash/profile/utils';

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

  const { profileInfoData } = useOrgProfileInfoContext();

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