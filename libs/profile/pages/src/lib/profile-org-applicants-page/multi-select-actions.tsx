import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';

import { UpdateApplicantListMutFn } from '@jobstash/profile/core';

interface Props {
  isPending: boolean;
  mutate: UpdateApplicantListMutFn;
  selectedApplicants: Set<string>;
}

export const MultiSelectActions = ({
  isPending,
  mutate,
  selectedApplicants,
}: Props) => {
  const applicants = [...selectedApplicants];

  const hasNoApplicants = applicants.length === 0;

  const updateShortlist = () => {
    mutate({ applicants, list: 'shortlisted' });
  };

  const updateArchived = () => {
    mutate({ applicants, list: 'archived' });
  };

  return (
    <div className="flex items-center gap-4">
      <ActionButton
        isLoading={isPending}
        isDisabled={hasNoApplicants}
        buttonText="Bulk Shortlist"
        tooltipText={{ enabled: 'Shortlist selected applicants' }}
        onClick={updateShortlist}
      />
      <ActionButton
        isLoading={isPending}
        isDisabled={hasNoApplicants}
        buttonText="Bulk Archive"
        tooltipText={{ enabled: 'Archive selected applicants' }}
        onClick={updateArchived}
      />
      <ActionButton
        isLoading={isPending}
        isDisabled={hasNoApplicants}
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
  isLoading: boolean;
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
