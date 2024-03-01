import { Chip } from '@nextui-org/chip';
import { Tooltip } from '@nextui-org/tooltip';

import { OrgProfileInfo } from '@jobstash/profile/core';
import { shortTimestamp } from '@jobstash/shared/utils';

interface Props {
  subscriberStatus: OrgProfileInfo['subscriberStatus'];
}

export const SubscriberItem = ({
  subscriberStatus: { status, expires },
}: Props) => {
  const text = status ? 'YES' : 'NO';

  const content = status
    ? expires
      ? `Until ${shortTimestamp(expires)}`
      : 'Subscribed'
    : 'Not Subscribed';

  return (
    <div className="flex justify-center w-20">
      <Tooltip content={content}>
        <button type="button" className="cursor-default">
          <Chip>{text}</Chip>
        </button>
      </Tooltip>
    </div>
  );
};
