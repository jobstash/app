import { useState } from 'react';

import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';

import { UpdateApplicantListMutFn } from '@jobstash/profile/core';

interface Props {
  activeList: 'all' | 'new' | 'shortlisted' | 'archived';
  isPending: boolean;
  mutate: UpdateApplicantListMutFn;
  selectedApplicants: Set<string>;
}

export const MultiSelectActions = ({
  activeList,
  isPending,
  mutate,
  selectedApplicants,
}: Props) => {
  const applicants = [...selectedApplicants];
  const hasNoApplicants = applicants.length === 0;

  const [lastClicked, setLastClicked] = useState<
    'archived' | 'shortlisted' | null
  >(null);

  const updateShortlist = () => {
    setLastClicked('shortlisted');
    mutate({ applicants, list: 'shortlisted' });
  };

  const updateArchived = () => {
    setLastClicked('archived');
    mutate({ applicants, list: 'archived' });
  };

  return (
    <div className="flex items-center gap-4">
      {activeList !== 'shortlisted' && (
        <ActionButton
          isLoading={isPending && lastClicked === 'shortlisted'}
          isDisabled={hasNoApplicants || isPending}
          buttonText="Bulk Shortlist"
          tooltipText={{ enabled: 'Shortlist selected applicants' }}
          onClick={updateShortlist}
        />
      )}

      {activeList !== 'archived' && (
        <ActionButton
          isLoading={isPending && lastClicked === 'archived'}
          isDisabled={hasNoApplicants || isPending}
          buttonText="Bulk Archive"
          tooltipText={{ enabled: 'Archive selected applicants' }}
          onClick={updateArchived}
        />
      )}

      <ActionButton
        isDisabled
        buttonText="Export CSV"
        tooltipText={{ enabled: 'Download CSV for selected applicants' }}
      />
    </div>
  );
};

const ActionButton = ({
  isLoading,
  isDisabled,
  buttonText,
  tooltipText,
  onClick,
}: {
  isLoading?: boolean;
  isDisabled: boolean;
  buttonText: string;
  tooltipText: { enabled: string; disabled?: string };
  onClick?: () => void;
}) =>
  isLoading ? (
    <Button isDisabled isLoading>
      {buttonText}
    </Button>
  ) : (
    <Tooltip
      content={
        isDisabled
          ? tooltipText.disabled ?? 'Select multiple applicants first'
          : tooltipText.enabled
      }
      placement="top-start"
    >
      <div>
        <Button isDisabled={isDisabled} onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </Tooltip>
  );
