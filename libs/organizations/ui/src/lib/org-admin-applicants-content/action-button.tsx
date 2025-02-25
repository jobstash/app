import { useState } from 'react';

import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

import { UpdateApplicantListMutFn } from '@jobstash/profile/core';

interface Props {
  orgId: string | null | undefined;
  wallet: string;
  jobId: string;
  mutate: UpdateApplicantListMutFn;
  icon: React.ReactNode;
  list: 'shortlisted' | 'archived';
  isListed: boolean;
  isPending: boolean;
  isDisabled: boolean;
}

export const ActionButton = ({
  orgId,
  wallet,
  jobId,
  mutate,
  icon,
  list,
  isListed,
  isPending,
  isDisabled,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const addToShortList = () => {
    setIsLoading(true);
    mutate(
      { applicants: [{ wallet, job: jobId }], list },
      {
        onSettled: () => setIsLoading(false),
      },
    );
  };

  return (
    <Tooltip
      content={isListed ? `Already ${list}` : `Add to ${list}`}
      isDisabled={isDisabled}
      delay={0}
    >
      <div className="flex h-max items-center">
        <Button
          isIconOnly
          isLoading={!orgId || isLoading}
          isDisabled={isDisabled || isPending}
          onClick={addToShortList}
        >
          {icon}
        </Button>
      </div>
    </Tooltip>
  );
};
