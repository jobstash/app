import { Chip } from '@heroui/chip';

interface Props {
  isBlocked: boolean;
}

export const IsBlockedIndicator = ({ isBlocked }: Props) => {
  if (!isBlocked) return null;

  return (
    <Chip size="sm" variant="flat" color="danger">
      Blocked
    </Chip>
  );
};
