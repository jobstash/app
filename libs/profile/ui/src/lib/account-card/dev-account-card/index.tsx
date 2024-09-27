import { useAccountCard } from '@jobstash/profile/state';

import AccountCardDeleteButton from '../account-card-delete-button';
import AccountCardModal from '../account-card-modal';
import AccountCardTitle from '../account-card-title';
import AccountCardWrapper from '../account-card-wrapper';

import { AffiliatedOrganizations } from './affiliated-organizations';
import { AvailableAccounts } from './available-accounts';
import { ConnectedAccounts } from './connected-accounts';

export const DevAccountCard = () => {
  const { opened, open, startDelete, onClickDelete, close } = useAccountCard();

  return (
    <>
      <AccountCardModal
        opened={opened}
        close={close}
        isLoading={startDelete}
        onClickDelete={onClickDelete}
      />
      <AccountCardWrapper>
        <div className="flex flex-col gap-6 pb-4">
          <AccountCardTitle />

          <div className="flex flex-col gap-6">
            <AvailableAccounts />
            <ConnectedAccounts />
            <AffiliatedOrganizations />
          </div>
        </div>

        <hr className="border-t border-white/10" />

        <div className="flex flex-col gap-4 py-2">
          <AccountCardDeleteButton open={open} />
        </div>
      </AccountCardWrapper>
    </>
  );
};
