import { useProfileInfoContext } from '@jobstash/profile/state';

import { Avatar, Text } from '@jobstash/shared/ui';

import AccountCardConnectedButton from './account-card-connected-button';

const AccountCardGithubButton = () => {
  const { profileInfoData } = useProfileInfoContext();

  if (!profileInfoData?.username) return null;

  return (
    <AccountCardConnectedButton
      label="Connected Github Account:"
      isDisabled={!profileInfoData}
      href={
        profileInfoData ? `https://github.com/${profileInfoData.username}` : '#'
      }
    >
      <div className="flex items-center gap-3">
        {profileInfoData ? (
          <>
            <Avatar
              isRounded
              src={profileInfoData.avatar ?? ''}
              alt={`${profileInfoData.username}'s avatar`}
              size="xs"
            />
            <Text fw="semibold">{profileInfoData.username}</Text>
          </>
        ) : (
          <Text>Loading</Text>
        )}
      </div>
    </AccountCardConnectedButton>
  );
};

export default AccountCardGithubButton;
