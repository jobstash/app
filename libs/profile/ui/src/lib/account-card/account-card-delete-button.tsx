import { Button as MButton } from '@mantine/core';

import { Text } from '@jobstash/shared/ui';

interface Props {
  open: () => void;
}

const AccountCardDeleteButton = ({ open }: Props) => (
  <>
    <div className="text-center text-sm">
      <Text size="sm" color="dimmed">
        DANGER ZONE!
      </Text>
    </div>

    <MButton
      fullWidth
      radius="md"
      color="red"
      className="bg-red-500"
      size="lg"
      classNames={{
        inner: 'text-md',
      }}
      onClick={open}
    >
      Delete JobStash Account
    </MButton>
  </>
);

export default AccountCardDeleteButton;
