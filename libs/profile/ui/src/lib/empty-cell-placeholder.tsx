import { cn } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

interface Props {
  text?: string;
  isCentered?: boolean;
}

export const EmptyCellPlaceholder = ({
  isCentered = true,
  text = 'Coming Soon',
}: Props) => (
  <div className={cn({ 'flex w-full justify-center': isCentered })}>
    <Text color="dimmed">{text}</Text>
  </div>
);
