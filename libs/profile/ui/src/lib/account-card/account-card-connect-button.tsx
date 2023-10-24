import { Button, Text } from '@jobstash/shared/ui';

const AccountCardConnectButton = () => (
  <>
    <div className="text-center text-sm">
      <Text size="sm" color="dimmed">
        If you would like to add additional Github account to your profile
        request access below.
      </Text>
    </div>

    <Button
      isFullWidth
      isDisabled
      variant="outline"
      className="justify-center py-3"
    >
      Connect Another Github Account
    </Button>
  </>
);

export default AccountCardConnectButton;
