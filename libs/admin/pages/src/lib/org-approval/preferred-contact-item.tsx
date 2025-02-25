import { Tooltip } from "@heroui/tooltip";

import { OrgProfileInfo } from '@jobstash/profile/core';
import { cn, notifSuccess } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

interface Props {
  contact: OrgProfileInfo['contact'];
}

export const PreferredContactItem = ({
  contact: { value, preferred },
}: Props) => {
  const onClick = () => {
    if (navigator && value) {
      navigator.clipboard.writeText(value);
      notifSuccess({
        title: `Contact copied to clipboard!`,
        message: `"${value}"`,
      });
    }
  };

  const content = value ? 'Copy Contact' : 'No Preferred Contact';

  return (
    <Tooltip content={content}>
      <button
        type="button"
        className={cn('cursor-pointer', { 'cursor-default': !value })}
        onClick={onClick}
      >
        <Text>
          {value && preferred ? `${preferred}: ${value}` : preferred ?? 'N/A'}
        </Text>
      </button>
    </Tooltip>
  );
};
