import { useYourContributionContext } from '@jobstash/profile/state';

import { Heading, LogoTitle, Text } from '@jobstash/shared/ui';

const YourContributionSubHeader = () => {
  const {
    profileRepo: {
      name,
      description,
      contribution: { count },
    },
    username,
    avatar,
  } = useYourContributionContext();

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <Heading size="md" fw="semibold">
          {name}
        </Heading>
        <LogoTitle
          title={username}
          avatarProps={{ src: avatar, alt: `${username}'s avatar` }}
        />
      </div>

      <div className="flex justify-between w-full gap-12">
        <Text size="sm" color="dimmed">
          {description}
        </Text>
        <div className="min-w-[120px] text-right">
          <Text size="sm" color="dimmed">
            {`${count} Contributions`}
          </Text>
        </div>
      </div>
    </>
  );
};

export default YourContributionSubHeader;
