import { Avatar, Button, Text } from '@jobstash/shared/ui';

const AccountCardConnectedButton = () => (
  <>
    <div className="text-center">
      <Text size="sm" color="dimmed">
        Connected Github Account:
      </Text>
    </div>

    <Button isFullWidth isDisabled variant="primary" className="justify-center">
      <div className="flex items-center gap-2">
        <Avatar
          isRounded
          src="https://i.pravatar.cc/69"
          alt={`@0xDev00r's avatar`}
          size="xs"
        />
        <Text size="sm" fw="semibold">
          @0xDev00r
        </Text>
      </div>
    </Button>
  </>
);

export default AccountCardConnectedButton;
