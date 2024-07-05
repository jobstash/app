import { useMemo } from 'react';

import { ArchiveBoxIcon, HeartIcon } from '@heroicons/react/16/solid';

import { useJobApplicants } from '@jobstash/jobs/state';
import { useUpdateApplicantList } from '@jobstash/profile/state';

import { ActionButton } from './action-button';
import { CellProps } from './types';

type Props = CellProps & {
  orgId: string;
};

export const ActionsCell = ({ data, orgId }: Props) => {
  const { isPending, mutate } = useUpdateApplicantList({ orgId });

  const { data: shortListed, isFetching: isFetchingShortlisted } =
    useJobApplicants(orgId, 'shortlisted');

  const { data: archived, isFetching: isFetchingArchived } = useJobApplicants(
    orgId,
    'archived',
  );

  const isShortlisted = useMemo(
    () =>
      (shortListed ?? []).some(
        (applicant) => applicant.user.wallet === data?.user.wallet,
      ),
    [data?.user.wallet, shortListed],
  );

  const isArchived = useMemo(
    () =>
      (archived ?? []).some(
        (applicant) => applicant.user.wallet === data?.user.wallet,
      ),
    [archived, data?.user.wallet],
  );

  if (!data) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 w-full items-center justify-center">
        {/* <Tooltip content="Calendar Invite" delay={0}>
          <div className="flex h-max items-center">
            <Button isIconOnly>
              <CalendarDaysIcon className="h-8 w-8" />
            </Button>
          </div>
        </Tooltip> */}
        <ActionButton
          orgId={orgId}
          wallet={data.user.wallet}
          jobId={data.job.shortUUID}
          mutate={mutate}
          icon={<HeartIcon className="h-8 w-8" />}
          list="shortlisted"
          isListed={isShortlisted}
          isPending={isPending}
          isDisabled={!shortListed || isShortlisted || isFetchingShortlisted}
        />
        <ActionButton
          orgId={orgId}
          wallet={data.user.wallet}
          jobId={data.job.shortUUID}
          mutate={mutate}
          icon={<ArchiveBoxIcon className="h-8 w-8" />}
          list="archived"
          isListed={isArchived}
          isPending={isPending}
          isDisabled={!archived || isArchived || isFetchingArchived}
        />
      </div>
    </div>
  );
};
