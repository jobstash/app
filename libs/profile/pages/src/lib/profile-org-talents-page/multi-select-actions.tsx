import { useState } from 'react';

import { TableListOption, UpdateTableListOption } from '@jobstash/profile/core';

import { TableMultiSelectActionButton } from '@jobstash/profile/ui';

interface Props {
  activeList: TableListOption;
  isPending: boolean;
  selectedTalents: Set<string>;
}

export const MultiSelectActions = ({
  activeList,
  isPending,
  selectedTalents,
}: Props) => {
  const applicants = [...selectedTalents];
  const hasNoApplicants = applicants.length === 0;

  const [lastClicked, setLastClicked] = useState<UpdateTableListOption | null>(
    null,
  );

  const updateList = (list: UpdateTableListOption) => {
    setLastClicked(list);
    console.log(`TODO: mutate ${list}`);
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
          onClick={() => updateList('shortlisted')}
        />
      )}

      {activeList !== 'archived' && (
        <TableMultiSelectActionButton
          isLoading={isPending && lastClicked === 'archived'}
          isDisabledTooltip={hasNoApplicants}
          isDisabled={hasNoApplicants || isPending}
          buttonText="Bulk Archive"
          tooltipText={{ enabled: 'Archive selected applicants' }}
          onClick={() => updateList('archived')}
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
