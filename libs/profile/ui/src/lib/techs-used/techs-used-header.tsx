import { LoadingOverlay } from '@mantine/core';

import { useTechsUsedContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

const TechsUsedHeader = () => {
  const { isLoading } = useTechsUsedContext();

  return (
    <>
      <LoadingOverlay visible={isLoading} />

      <Heading size="lg" fw="semibold">
        Technologies Used
      </Heading>

      <Text color="dimmed">
        Please tell us about which Technologies you used to build this project.
      </Text>
      <Text color="dimmed">
        We use these Technologies to show you relevant projects, and if you mark
        yourself as available for work, we show these to our partner
        Organizations.
      </Text>
    </>
  );
};

export default TechsUsedHeader;
