import { Chip } from '@nextui-org/react';

interface Props {
  isOnline: boolean;
}

export const IsOnlineIndicator = ({ isOnline }: Props) => (
  <Chip size="sm" variant="flat" color={isOnline ? 'success' : 'secondary'}>
    {isOnline ? 'Online' : 'Offline'}
  </Chip>
);
