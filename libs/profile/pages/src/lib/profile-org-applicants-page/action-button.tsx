import { useMemo } from 'react';

import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';

import { UpdateApplicantListMutFn } from '@jobstash/profile/core';

import { useJobApplicants } from '@jobstash/jobs/state';

interface Props {
  orgId: string | null | undefined;
  wallet: string;
  isPending: boolean;
  mutate: UpdateApplicantListMutFn;
  icon: React.ReactNode;
  list: 'shortlisted' | 'archived';
}

export const ActionButton = ({
  orgId,
  wallet,
  isPending,
  mutate,
  icon,
  list,
}: Props) => {
  const { data, isFetching } = useJobApplicants(orgId, list);

  const isInList = useMemo(
    () => (data ?? []).some((applicant) => applicant.user.wallet === wallet),
    [data, wallet],
  );

  const addToShortList = () => {
    mutate({ applicants: [wallet], list });
  };

  return (
    <Tooltip
      content={isInList ? `Already ${list}` : `Add to ${list}`}
      isDisabled={!data}
      delay={0}
    >
      <div>
        <Button
          isIconOnly
          isLoading={!orgId || isPending}
          isDisabled={!data || isInList || isFetching}
          onClick={addToShortList}
        >
          {icon}
        </Button>
      </div>
    </Tooltip>
  );
};
