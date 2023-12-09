import { getEmailAvatar } from '@jobstash/profile/utils';

import { useProfileInfoContext } from '@jobstash/profile/state';

import { Avatar, Text } from '@jobstash/shared/ui';

import AccountCardConnectedButton from './account-card-connected-button';

const AccountCardEmailButton = () => {
  const { profileInfoData } = useProfileInfoContext();

  if (!profileInfoData?.email) return null;

  return (
    <AccountCardConnectedButton
      label="Connected Email Account:"
      isDisabled={!profileInfoData}
      href={null}
    >
      <div className="flex items-center gap-3">
        {profileInfoData ? (
          <>
            <Avatar
              isRounded
              src={getEmailAvatar(profileInfoData.email)}
              alt={`${profileInfoData.email}'s avatar`}
              size="xs"
            />
            <Text fw="semibold">{profileInfoData.email}</Text>
          </>
        ) : (
          <Text>Loading</Text>
        )}
      </div>
    </AccountCardConnectedButton>
  );
};

export default AccountCardEmailButton;
