import { cn } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

export const ComingSoonCell = ({
  isCentered = true,
}: {
  isCentered?: boolean;
}) => (
  <div className={cn({ 'flex w-full justify-center': isCentered })}>
    <Text color="dimmed">Coming Soon</Text>
  </div>
);
