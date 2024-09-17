import {
  useAccountCard,
  useDevProfileInfoContext,
} from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

import AccountCardDeleteButton from '../account-card-delete-button';
import AccountCardModal from '../account-card-modal';
import AccountCardTitle from '../account-card-title';
import AccountCardWrapper from '../account-card-wrapper';
import ConnectGithubAccount from '../connect-github-account';

import { AccountText } from './account-text';
import { ConnectEmailForm } from './connect-email-form';
import { DevEmails } from './dev-emails';

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

          {profileInfoData?.username && profileInfoData?.avatar && (
            <div className="flex flex-col gap-4">
              <Text size="lg" fw="bold">
                Connected Github Account:
              </Text>
              <AccountText
                text={profileInfoData.username}
                avatar={profileInfoData.avatar}
              />
            </div>
          )}

          <DevEmails />
        </div>

        <div className="opacity-40 pointer-events-none">
          {profileInfoData && !profileInfoData.username && (
            <ConnectGithubAccount />
          )}
        </div>

        <div className="opacity-40 pointer-events-none">
          <ConnectEmailForm />
        </div>

        <hr className="border-t border-white/10" />

        <div className="flex flex-col gap-4 py-2">
          <AccountCardDeleteButton open={open} />
        </div>
      </AccountCardWrapper>
    </>
  );
};
