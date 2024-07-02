import { useYourContributionContext } from '@jobstash/profile/state';

import { Heading, LogoTitle, Text } from '@jobstash/shared/ui';

const SubHeader = () => {
  const {
    profileRepo: { name, description },
    username,
    avatar,
  } = useYourContributionContext();

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between w-full">
        <Heading size="md" fw="semibold">
          {name}
        </Heading>
        <LogoTitle
          title={username}
          avatarProps={{ src: avatar, alt: `${username}'s avatar` }}
        />
      </div>

      <div className="flex items-center justify-between w-full">
        <Text color="dimmed" className="text-sm shrink-0">
          {description}
        </Text>
      </div>
    </>
  );
};

export default SubHeader;
