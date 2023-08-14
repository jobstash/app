import { LoadingOverlay, Switch } from '@mantine/core';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { LogoTitle, Text } from '@jobstash/shared/ui';

const ProfileHeaderTitle = () => {
  const {
    isLoading,
    username,
    avatar,
    isAvailableForWork,
    setIsAvailableForWork,
  } = useProfileHeaderContext();

  return (
    <>
      <LoadingOverlay visible={isLoading} />

      <div className="flex items-center gap-6">
        <LogoTitle
          title={username}
          avatarProps={{
            src: avatar,
            alt: `${username}'s avatar`,
            isRounded: true,
          }}
          size="lg"
        />
        <Switch
          size="md"
          label={
            <Text size="lg" color="dimmed">
              Available for work
            </Text>
          }
          color="green"
          checked={isAvailableForWork}
          onChange={(e) => setIsAvailableForWork(e.currentTarget.checked)}
        />
      </div>
    </>
  );
};

export default ProfileHeaderTitle;
