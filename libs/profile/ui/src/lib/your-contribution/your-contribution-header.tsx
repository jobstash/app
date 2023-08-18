import { LoadingOverlay } from '@mantine/core';

import { useYourContributionContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

const YourContributionHeader = () => {
  const { isLoading } = useYourContributionContext();

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Heading size="lg" fw="semibold">
        Describe your contribution
      </Heading>
      <div>
        <Text color="dimmed">
          If this repository contains work that you’d like to showcase to
          potential employers, please describe in a technical and quantifiable
          way what your contribution has been.
        </Text>
      </div>
      <hr className="border-t border-white/10" />
    </>
  );
};

export default YourContributionHeader;
