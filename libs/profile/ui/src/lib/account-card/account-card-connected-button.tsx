import { useProfileInfoContext } from '@jobstash/profile/state';

import { Avatar, Button, LinkButton, Text } from '@jobstash/shared/ui';

const AccountCardConnectedButton = () => {
  const { profileInfoData } = useProfileInfoContext();

  return (
    <>
      <div className="text-center">
        <Text size="sm" color="dimmed">
          Connected Github Account:
        </Text>
      </div>

      <LinkButton
        isFullWidth
        external
        isDisabled={!profileInfoData}
        variant="primary"
        className="justify-center"
        linkProps={{
          href: profileInfoData
            ? `https://github.com/${profileInfoData.username}`
            : '#',
        }}
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
      </LinkButton>
    </>
  );
};

export default AccountCardConnectedButton;
