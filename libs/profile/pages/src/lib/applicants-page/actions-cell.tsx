import {
  ArchiveBoxIcon,
  CalendarDaysIcon,
  HeartIcon,
} from '@heroicons/react/16/solid';
import { Button, Tooltip } from '@nextui-org/react';

import { useUpdateApplicantList } from '@jobstash/profile/state';

import { ActionButton } from './action-button';
import { CellProps } from './types';

type Props = CellProps & {
  orgId: string;
};

export const ActionsCell = ({ data, orgId }: Props) => {
  const { isPending, mutate } = useUpdateApplicantList({ orgId });

  if (!data) return null;

  const {
    user: { wallet },
    job: { shortUUID: jobId },
  } = data;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 w-full items-center justify-center">
        <Tooltip content="Calendar Invite" delay={0}>
          <div className="flex h-max items-center">
            <Button isIconOnly>
              <CalendarDaysIcon className="h-8 w-8" />
            </Button>
          </div>
        </Tooltip>
        <ActionButton
          orgId={orgId}
          wallet={wallet}
          jobId={jobId}
          isPending={isPending}
          mutate={mutate}
          list="shortlisted"
          icon={<HeartIcon className="h-8 w-8" />}
        />
        <ActionButton
          orgId={orgId}
          wallet={wallet}
          jobId={jobId}
          isPending={isPending}
          mutate={mutate}
          list="archived"
          icon={<ArchiveBoxIcon className="h-8 w-8" />}
        />
      </div>
    </div>
  );
};
