import { Heading, Text } from '@jobstash/shared/ui';

const RatingHeader = () => (
  <>
    <Heading size="lg" fw="semibold">
      Rating
    </Heading>

    <Text color="dimmed">
      Provide valuable insight into the company&#39;s work culture, leadership
      style, and career opportunities and help others find the perfect fit.
    </Text>

    <div className="py-2 pb-4">
      <hr className="border-t border-white/10" />
    </div>
  </>
);

export default RatingHeader;
