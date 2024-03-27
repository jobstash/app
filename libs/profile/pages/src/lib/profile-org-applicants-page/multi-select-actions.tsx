import { useState } from 'react';

import { UpdateApplicantListMutFn } from '@jobstash/profile/core';

import { TableMultiSelectActionButton } from '@jobstash/profile/ui';

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
        <TableMultiSelectActionButton
          isLoading={isPending && lastClicked === 'shortlisted'}
          isDisabledTooltip={hasNoApplicants}
          isDisabled={hasNoApplicants || isPending}
          buttonText="Bulk Shortlist"
          tooltipText={{ enabled: 'Shortlist selected applicants' }}
          onClick={updateShortlist}
        />
      )}

      {activeList !== 'archived' && (
        <TableMultiSelectActionButton
          isLoading={isPending && lastClicked === 'archived'}
          isDisabledTooltip={hasNoApplicants}
          isDisabled={hasNoApplicants || isPending}
          buttonText="Bulk Archive"
          tooltipText={{ enabled: 'Archive selected applicants' }}
          onClick={updateArchived}
        />
      )}

      <TableMultiSelectActionButton
        isDisabled
        isDisabledTooltip={hasNoApplicants}
        buttonText="Export CSV"
        tooltipText={{ enabled: 'Download CSV for selected applicants' }}
      />
    </div>
  );
};
