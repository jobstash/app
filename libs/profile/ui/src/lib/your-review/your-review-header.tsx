import { LoadingOverlay } from '@mantine/core';

import { useYourReviewContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

const YourReviewHeader = () => {
  const { isLoading } = useYourReviewContext();

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Heading size="lg" fw="semibold">
        Your Review
      </Heading>
      <Text color="dimmed">
        By sharing your own experiences and honest feedback, you can help other
        developers make more informed decisions about where to work.
      </Text>

      <div className="py-2">
        <hr className="border-t border-white/10" />
      </div>
    </>
  );
};

export default YourReviewHeader;
