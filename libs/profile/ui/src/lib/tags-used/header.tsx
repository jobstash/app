import { Heading, Text } from '@jobstash/shared/ui';

const Header = () => (
  <>
    <Heading size="lg" fw="semibold">
      Skills Used
    </Heading>

    <Text color="dimmed">
      Please tell us about which skills you used to build this project.
    </Text>

    <Text color="dimmed">
      We use these skills to show you relevant projects, and if you mark
      yourself as available for work, we show these to our partner
      Organizations.
    </Text>
  </>
);

export default Header;
