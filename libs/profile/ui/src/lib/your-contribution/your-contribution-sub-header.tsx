import { useYourContributionContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

const YourContributionSubHeader = () => {
  const {
    profileRepo: {
      name,
      description,
      contribution: { count },
    },
    username,
  } = useYourContributionContext();

  return (
    <>
      <div className="flex items-center justify-between w-full -mt-4">
        <Heading size="md" fw="semibold">
          {name}
        </Heading>
        <Heading size="sm" fw="semibold">
          {username}
        </Heading>
      </div>

      <hr className="border-t border-white/10" />

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
