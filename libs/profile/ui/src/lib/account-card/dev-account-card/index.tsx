import {
  useAccountCard,
  useDevProfileInfoContext,
} from '@jobstash/profile/state';

import AccountCardDeleteButton from '../account-card-delete-button';
import AccountCardModal from '../account-card-modal';
import AccountCardTitle from '../account-card-title';
import AccountCardWrapper from '../account-card-wrapper';

import { LinkedAccounts } from './linked-accounts';

export const DevAccountCard = () => {
  const { opened, open, startDelete, onClickDelete, close } = useAccountCard();

  const { profileInfoData } = useDevProfileInfoContext();
  const showTopDivider =
    profileInfoData?.username || (profileInfoData?.email.length ?? 0) > 0;

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
          {showTopDivider && <hr className="border-t border-white/10" />}

          <LinkedAccounts />
        </div>

        <hr className="border-t border-white/10" />

        <div className="flex flex-col gap-4 py-2">
          <AccountCardDeleteButton open={open} />
        </div>
      </AccountCardWrapper>
    </>
  );
};
